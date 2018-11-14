const validUrl = require("valid-url");

const fieldType = "layout";

function getLayoutSettingFileLocation(setting) {
  let fileLocation;
  let assets = [];

  // if setting.path exists it is an images
  if (setting !== null && setting.path !== undefined) {
    fileLocation = this.getFileAsset(setting.path);
    if (fileLocation) {
      assets.push(fileLocation);
      setting.localFileId = fileLocation;
    }
  }
  // if setting[0].path exists it is an array of images
  else if (
    setting !== null &&
    typeof setting === "object" &&
    setting[0] != undefined &&
    setting[0].path !== undefined
  ) {
    Object.keys(setting).forEach(imageKey => {
      const image = setting[imageKey];

      fileLocation = this.getFileAsset(image.path);
      if (fileLocation) {
        image.localFileId = fileLocation;
        assets.push(fileLocation);
      }

      setting[imageKey] = image;
    });
  }

  return {
    setting,
    assets
  };
}

// look into Cockpit CP_LAYOUT_COMPONENTS for image and images.
function parseCustomComponent(node, fieldname) {
  const {
    settings
  } = node;
  const nodeAssets = [];

  Object.keys(settings).map((key, index) => {
    const {
      setting,
      assets
    } = this.getLayoutSettingFileLocation(
      settings[key]
    );
    settings[key] = setting;
    assets.map(asset => nodeAssets.push(asset));
  });
  node.settings = settings;

  // filter duplicate assets
  const seenAssets = {};
  const distinctAssets = nodeAssets.filter(asset => {
    const seen = seenAssets[asset] !== undefined;
    seenAssets[asset] = true;
    return !seen;
  });

  return {
    node,
    nodeAssets: distinctAssets
  };
}

function parseLayout(layout, fieldname, isColumn = false) {
  let layoutAssets = [];

  const parsedLayout = layout.map(node => {
    if (node.component === "text" || node.component === "html") {
      parseWysiwygField(node.settings.text || node.settings.html).then(
        ({ wysiwygImagesMap, imageSources, images }) => {
          Object.entries(wysiwygImagesMap).forEach(([key, value], index) => {
            const { name, ext, contentDigest } = images[index];
            const newUrl = "/static/" + name + "-" + contentDigest + ext;
            if (node.settings.text) {
              node.settings.text = node.settings.text.replace(
                imageSources[index],
                newUrl
              );
            }
            if (node.settings.html) {
              node.settings.html = node.settings.html.replace(
                imageSources[index],
                newUrl
              );
            }
          });
        }
      );
    }

    // parse Cockpit Custom Components (defined in plugin config in /gatsby-config.js)
    if (this.config.customComponents.includes(node.component)) {
      const {
        node: customNode,
        nodeAssets: customComponentAssets
      } = this.parseCustomComponent(node, fieldname);

      node = customNode;
      layoutAssets = layoutAssets.concat(customComponentAssets);
    }

    if (node.children) {
      if (!isColumn) {
        console.log("component: ", node.component);
      } else {
        console.log("column");
      }

      const {
        parsedLayout: childrenLayout,
        layoutAssets: childrenAssets
      } = this.parseLayout(node.children, fieldname);
      node.children = childrenLayout;
      layoutAssets = layoutAssets.concat(childrenAssets);
    }
    if (node.columns) {
      const {
        parsedLayout: columnsLayout,
        layoutAssets: columnsAssets
      } = this.parseLayout(node.columns, fieldname, true);
      node.columns = childrenLayout;
      layoutAssets = layoutAssets.concat(columnsAssets);
    }

    return node;
  });

  return {
    parsedLayout,
    layoutAssets
  };
}

function parseWysiwygField(field, { createRemoteAssetByPath }) {
  const srcRegex = /src\s*=\s*"(.+?)"/gi;
  let imageSources;
  try {
      imageSources = field
      .match(srcRegex)
      .map(src => src.substr(5).slice(0, -1));
  } catch (error) {
      return {
      images: [],
      wysiwygImagesMap: [],
      imageSources: []
      };
  }
  
  const validImageUrls = imageSources.map(src =>
      validUrl.isUri(src) ? src : this.config.host + src
  );
  
  const wysiwygImagesPromises = validImageUrls.map(url =>
      createRemoteAssetByPath(url, this.store, this.cache, this.createNode)
  );
  
  const imagesFulfilled = await Promise.all(wysiwygImagesPromises);
  
  const images = imagesFulfilled.map(({
      contentDigest,
      ext,
      name
  }) => ({
      contentDigest,
      ext,
      name
  }));
  
  const wysiwygImagesMap = await createAssetsMap(imagesFulfilled);
  
  return {
      images,
      wysiwygImagesMap,
      imageSources
  };
}
  
function composeEntryFields(fields, entry) {
  return fields.reduce((acc, fieldname) => {
    if (entry[fieldname] == null) return;
    if (typeof entry[fieldname] === "string")
      entry[fieldname] = eval("(" + entry[fieldname] + ")");

    if (entry[fieldname].length === 0) {
      return acc;
    }
    const { parsedLayout, layoutAssets } = parseLayout(
      entry[fieldname],
      fieldname
    );

    if (layoutAssets.length > 0) {
      const key = fieldname + "_files___NODE";
      if (acc[key] !== undefined) acc[key] = acc[key].concat(layoutAssets);
      else acc[key] = layoutAssets;
    }

    return acc;
  }, {});
}

module.exports = {
  fieldType,
  composeEntryFields
};
