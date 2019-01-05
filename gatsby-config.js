const config = require("./data/SiteConfig");

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: config.siteMetadata,
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-cockpit",
      options: {
        cockpitConfig: {
          // baseURL: "http://localhost:3001",
          baseURL: "http://content.yessicaduque.com",
          folder: "",
          accessToken: "account-0aaa1438863e50a40c082513a1dc16",
          collections: ["Gallery", "Blog", "Posts"],
          regions: ["about", "Services"]
        }
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 320
            }
          },
          {
            resolve: "gatsby-remark-responsive-iframe"
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: config.googleAnalyticsID
      }
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: config.themeColor
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-netlify-cache",
    "gatsby-transformer-sharp",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-twitter",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitle,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "minimal-ui",
        icon: "src/favicon.png"
      }
    }
  ]
};
