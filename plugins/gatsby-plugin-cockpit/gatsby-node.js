const createNodeHelpers = require("gatsby-node-helpers").default;
const CockpitSDK = require("cockpit-sdk").default;

const {
  AssetMapHelpers,
  CockpitHelpers,
  CreateNodesHelpers,
} = require("./helpers");
const extendNodeType = require("./extend-node-type");

exports.sourceNodes = async (
  { actions, reporter, store, cache },
  pluginOptions
) => {
  const { createNode, touchNode } = actions;
  const {
    createNodeFactory,
    generateNodeId,
    generateTypeName,
  } = createNodeHelpers({
    typePrefix: `Cockpit`,
  });

  const defaultConfig = {
    baseURL: "",
    folder: "",
    accessToken: "",
    sanitizeHtmlConfig: {},
    customComponents: [],
  };

  const config = Object.assign(defaultConfig, pluginOptions.cockpitConfig);
  const host = config.baseURL + config.folder;

  reporter.info(`Cockpit host: ${host}`);
  reporter.info(`Cockpit access token: ${config.accessToken}`);

  const cockpit = new CockpitSDK({
    host,
    accessToken: config.accessToken,
  });

  const cockpitHelpers = new CockpitHelpers(cockpit, config, reporter);

  const [{ assets }, collectionsItems, singletonItems] = await Promise.all([
    cockpit.assets(),
    cockpitHelpers.getCockpitCollections(),
    cockpitHelpers.getCockpitSingletons(),
  ]);

  reporter.info(`Assets retrieved: Found ${assets.length} assets`);

  const newAssets = assets.map(({ path, ...asset }) => ({
    ...asset,
    path: `${host}/storage/uploads${path}`,
  }));

  const assetMapHelpers = new AssetMapHelpers({
    assets: newAssets,
    store,
    cache,
    createNode,
    createNodeId: generateNodeId,
    touchNode,
    collectionsItems,
    config,
    reporter,
  });

  reporter.info(`Creating remote file nodes for Assets...`);
  const assetsMap = await assetMapHelpers.createAssetsNodes();
  reporter.info(`Finished creating remote file nodes`);

  const createNodesHelpers = new CreateNodesHelpers({
    collectionsItems,
    singletonItems,
    store,
    cache,
    createNode,
    assetsMap,
    config,
  });

  await createNodesHelpers.createItemsNodes();
};

//exports.setFieldsOnGraphQLNodeType = extendNodeType;
