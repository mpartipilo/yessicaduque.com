const limit = require("simple-rate-limiter");
const { createRemoteFileNode } = require("gatsby-source-filesystem");
const validUrl = require("valid-url");
const { result } = require("lodash");

const limited = limit((args, callback) => {
  createRemoteFileNode(args).then((x) => {
    callback(x);
  });
})
  .to(10)
  .per(1000);

// A function that returns a promise to resolve into the data //fetched from the API or an error
const createRemoteFileNodeThrottled = (args) => {
  return new Promise((resolve, reject) => limited(args, (r) => resolve(r)));
};

async function createRemoteAssetByPath(
  asset,
  store,
  cache,
  createNode,
  createNodeId
) {
  const url = asset.path;
  const cacheKey = `cockpitAsset${url}`;

  // If we don't have cached data, download the file
  try {
    const { id, internal, ext, name } = await createRemoteFileNodeThrottled({
      url,
      store,
      cache,
      createNode,
      createNodeId,
    });

    var result = {
      url,
      id,
      ext,
      name,
      modified: asset.modified,
      contentDigest: internal.contentDigest,
    };

    if (id) {
      await cache.set(cacheKey, result);
    }
  } catch (e) {
    console.log(e);
    // Ignore
  }

  return result;
}

function createAssetsMap(allResults) {
  return allResults.reduce(
    (acc, { url, id }) => ({
      ...acc,
      [url]: id,
    }),
    {}
  );
}

class AssetMapHelpers {
  constructor({
    assets,
    store,
    cache,
    createNode,
    createNodeId,
    touchNode,
    collectionsItems,
    config,
    reporter,
  }) {
    this.assets = assets;
    this.store = store;
    this.cache = cache;
    this.createNode = createNode;
    this.createNodeId = createNodeId;
    this.touchNode = touchNode;
    this.collectionsItems = collectionsItems;
    this.config = config;
    this.config.host = config.baseURL + config.folder;
    this.reporter = reporter;
  }

  addAllOtherImagesPathsToAssetsArray() {
    this.collectionsItems.map(({ entries, fields }) => {
      const imageFields = Object.keys(fields).filter(
        (fieldname) => fields[fieldname].type === "image"
      );
      imageFields.forEach((fieldname) => {
        entries.forEach((entry) => {
          if (entry[fieldname].path) {
            let path = entry[fieldname].path;
            if (!validUrl.isUri(path)) {
              path = this.config.host + "/" + path;
            }
            if (validUrl.isUri(path)) {
              this.assets.push({
                path,
              });
            } else {
              throw new Error(
                "The path of an image seems to be malformed -> ",
                path
              );
            }
          }
        });
      });
    });
  }

  // gets all assets and adds them as file nodes
  // returns a map of url => node id
  async createAssetsNodes() {
    this.addAllOtherImagesPathsToAssetsArray();

    const allRemoteAssetsPromises = this.assets.map((asset) =>
      createRemoteAssetByPath(
        asset,
        this.store,
        this.cache,
        this.createNode,
        this.createNodeId,
        this.touchNode
      )
    );

    const resolved = await Promise.all(allRemoteAssetsPromises);

    const finalAssetsMap = createAssetsMap(resolved);

    return finalAssetsMap;
  }
}

module.exports = {
  AssetMapHelpers,
  createAssetsMap,
};
