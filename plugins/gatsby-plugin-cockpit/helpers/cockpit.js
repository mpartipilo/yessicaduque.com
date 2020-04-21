module.exports = class CockpitHelpers {
  constructor(cockpit, config, reporter) {
    this.cockpit = cockpit;
    this.config = config;
    this.reporter = reporter;
    this.tick = {};
  }

  // get cockpit collection items by collection name
  async getCollectionItems(name) {
    this.reporter.info(`Fetching Cockpit Collection ${name}`);
    const { fields, entries } = await this.cockpit.collectionGet(name);
    // this.tick();
    return { fields, entries, name };
  }

  // get all cockpit collections, together with their items
  async getCockpitCollections() {
    const collections = await this.getCollectionNames();
    this.reporter.info(`Specified Collections:`);
    // this.reporter.list(`collection names`, collections);
    // this.tick = this.reporter.progress(collections.length);

    return Promise.all(
      collections.map((name) => this.getCollectionItems(name))
    );
  }

  async getCollectionNames() {
    const allCollections = await this.cockpit.collectionList();
    const explictlyDefinedCollections = this.config.collections;

    return explictlyDefinedCollections instanceof Array
      ? allCollections.filter(
          (name) => explictlyDefinedCollections.indexOf(name) > -1
        )
      : allCollections;
  }

  // get list of singletons
  async getSingletonItems(name) {
    const template = await this.cockpit.singletonGet(name);
    return { data: { template }, name };
  }

  // get all cockpit singletons, together with their items
  async getCockpitSingletons() {
    const items = await this.getSingletonNames();
    return Promise.all(
      items.map((name) => {
        return this.getSingletonItems(name);
      })
    );
  }

  async getSingletonNames() {
    const allSingletons = await this.cockpit.singletonList();
    const explictlyDefinedSingletons = this.config.singletons;

    return explictlyDefinedSingletons instanceof Array
      ? allSingletons.filter(
          (name) => explictlyDefinedSingletons.indexOf(name) > -1
        )
      : allSingletons;
  }
};
