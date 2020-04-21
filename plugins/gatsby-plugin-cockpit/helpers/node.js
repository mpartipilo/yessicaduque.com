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
    assetsMap,
    config,
  }) {
    this.collectionsItems = collectionsItems;
    this.singletonItems = singletonItems;
    this.store = store;
    this.cache = cache;
    this.createNode = createNode;
    this.assetsMap = assetsMap;
    this.config = config;
    this.getFileAsset = this.getFileAsset.bind(this);
  }

  async createItemsNodes() {
    Promise.all(
      this.collectionsItems.map(({ fields, entries, name }) => {
        const nodes = entries.map((entry) =>
          this.createCollectionItemNode({
            entry,
            name,
            fields,
          })
        );

        return {
          name,
          nodes,
          fields,
        };
      }),
      this.singletonItems.map(({ name, data }) => {
        const node = this.createSingletonItemNode({
          data,
          name,
        });

        return {
          name: "region",
          node,
        };
      })
    );
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
    var fieldsByType = fieldHandlers.getAllFields(fields);

    //2
    const nodeEntry = Object.keys(fieldsByType).reduce(
      (acc, fieldtype) => ({
        ...acc,
        ...fieldHandlers.handlers[fieldtype](
          fieldsByType[fieldtype],
          fields,
          entry,
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
      id: entry._id,
      children: [],
      parent: null,
      internal: {
        type: singular(name),
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(entry))
          .digest(`hex`),
      },
    };

    this.createNode(node);
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
    this.createNode(node);
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
    this.createNode(node);
    return node;
  }
};
