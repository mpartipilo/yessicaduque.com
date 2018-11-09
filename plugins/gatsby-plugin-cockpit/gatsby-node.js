const CockpitSDK = require("cockpit-sdk").default;
const {
  AssetMapHelpers,
  CockpitHelpers,
  CreateNodesHelpers
} = require("./helpers");
const extendNodeType = require("./extend-node-type");

exports.sourceNodes = async (
  { actions: { createNode, createNodeId, touchNode }, reporter, store, cache },
  pluginOptions
) => {
  const defaultConfig = {
    baseURL: "",
    folder: "",
    accessToken: "",
    sanitizeHtmlConfig: {},
    customComponents: []
  };

  const config = Object.assign(defaultConfig, pluginOptions.cockpitConfig);
  const host = config.baseURL + config.folder;

  reporter.info(`Cockpit host: ${host}`);
  reporter.info(`Cockpit access token: ${config.accessToken}`);

  const cockpit = new CockpitSDK({
    host,
    accessToken: config.accessToken
  });

  const cockpitHelpers = new CockpitHelpers(cockpit, config, reporter);

  const regionsItems = [];
  const [{ assets }, collectionsItems] = await Promise.all([
    cockpit.assets(),
    cockpitHelpers.getCockpitCollections()
  ]);

  reporter.info(`Assets retrieved: Found ${assets.length} assets`);

  assets.forEach(
    asset => (asset.path = host + "/storage/uploads" + asset.path)
  );

  const assetMapHelpers = new AssetMapHelpers({
    assets,
    store,
    cache,
    createNode,
    createNodeId,
    touchNode,
    collectionsItems,
    config,
    reporter
  });

  reporter.info(`Creating remote file nodes for Assets...`);
  const assetsMap = await assetMapHelpers.createAssetsNodes();
  reporter.info(`Finished creating remote file nodes`);

  const createNodesHelpers = new CreateNodesHelpers({
    collectionsItems,
    regionsItems,
    store,
    cache,
    createNode,
    assetsMap,
    config
  });

  await createNodesHelpers.createItemsNodes();
};

//exports.setFieldsOnGraphQLNodeType = extendNodeType;
