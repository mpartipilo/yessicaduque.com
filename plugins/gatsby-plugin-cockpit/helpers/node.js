const { singular } = require("pluralize");
const crypto = require("crypto");
const _ = require("lodash");

const fieldHandlers = require("../field-handlers");

module.exports = class CreateNodesHelpers {
  constructor({
    collectionsItems,
    singletonItems,
    store,
    cache,
    createNode,
    createNodeId,
    createContentDigest,
    assetsMap,
    config,
  }) {
    this.collectionsItems = collectionsItems;
    this.singletonItems = singletonItems;
    this.store = store;
    this.cache = cache;
    this.createNode = createNode;
    this.createNodeId = createNodeId;
    this.createContentDigest = createContentDigest;
    this.assetsMap = assetsMap;
    this.config = config;
    this.getFileAsset = this.getFileAsset.bind(this);
  }

  async createItemsNodes() {
    await this.collectionsItems.forEach(async ({ fields, entries, name }) => {
      await entries.forEach(async (entry) => {
        const node = this.createCollectionItemNode({
          entry,
          name,
          fields,
        });

        await this.createNode(node);
      });
    });

    await this.singletonItems.forEach(async ({ name, data }) => {
      const node = this.createSingletonItemNode({
        data,
        name,
      });

      await this.createNode(node);
    });
  }

  getFileAsset(path) {
    let fileLocation;

    Object.keys(this.assetsMap).forEach((key) => {
      if (key.includes(path)) {
        fileLocation = this.assetsMap[key];
      }
    });

    return fileLocation;
  }

  createCollectionItemNode({ entry, fields, name }) {
    //1
    const typeName = singular(name);
    const nodeId = this.createNodeId(`${typeName}-${entry._id}`);
    const fieldsByType = fieldHandlers.getAllFields(fields);

    //2
    const nodeEntry = Object.keys(fieldsByType).reduce(
      (acc, fieldtype) => ({
        ...acc,
        ...fieldHandlers.handlers[fieldtype](
          fieldsByType[fieldtype],
          fields,
          entry,
          nodeId,
          this
        ),
      }),
      {}
    );

    //3
    const node = {
      entry: nodeEntry,
      properties: {
        _created: entry._created,
        _modified: entry._modified,
      },
      id: nodeId,
      children: [],
      parent: null,
      internal: {
        type: typeName,
        contentDigest: this.createContentDigest(JSON.stringify(entry)),
      },
    };

    return node;
  }

  createSingletonItemNode({ data, name }) {
    const node = {
      ...data,
      name: name,
      children: [],
      parent: null,
      id: `singleton-${name}`,
      internal: {
        type: "singleton",
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(data))
          .digest(`hex`),
      },
    };

    return node;
  }

  createRegionItemNode({ data, name }) {
    const node = {
      ...data,
      name: name,
      children: [],
      parent: null,
      id: `region-${name}`,
      internal: {
        type: "region",
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(data))
          .digest(`hex`),
      },
    };

    return node;
  }
};
