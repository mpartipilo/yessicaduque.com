const config = require("./data/SiteConfig");

const pathPrefix = config.pathPrefix === "/" ? "" : config.pathPrefix;

module.exports = {
    pathPrefix: config.pathPrefix,
    siteMetadata: {
        siteUrl: config.siteUrl + pathPrefix,
        rssMetadata: {
            site_url: config.siteUrl + pathPrefix,
            feed_url: config.siteUrl + pathPrefix + config.siteRss,
            title: config.siteTitle,
            description: config.siteDescription,
            image_url: `${config.siteUrl + pathPrefix}/logos/logo-512.png`,
            author: config.userName,
            copyright: config.copyright
        }
    },
    plugins: [
        "gatsby-plugin-sass",
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "posts",
                path: `${__dirname}/content/${config.blogPostDir}`
            }
        },
        {
            resolve: "gatsby-source-cockpit",
            options: {
                host: "http://content.yessicaduque.com",
                accessToken: "account-0aaa1438863e50a40c082513a1dc16",
                collectionName: ["Gallery", "Blog"]
            }
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 690
                        }
                    },
                    {
                        resolve: "gatsby-remark-responsive-iframe"
                    },
                    "gatsby-remark-prismjs",
                    "gatsby-remark-copy-linked-files",
                    "gatsby-remark-autolink-headers"
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
                icons: [
                    {
                        src: "/logos/logo-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "/logos/logo-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            }
        },
        "gatsby-plugin-offline",
        {
            resolve: "gatsby-plugin-feed",
            options: {
                setup(ref) {
                    const ret = ref.query.site.siteMetadata.rssMetadata;
                    ret.allCockpitBlog = ref.query.allCockpitBlog;
                    ret.generator =
                        "Yessica Duque - Food styling and photography";
                    return ret;
                },
                query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                author
                copyright
              }
            }
          }
        }
      `,
                feeds: [
                    {
                        serialize(ctx) {
                            const { rssMetadata } = ctx.query.site.siteMetadata;
                            return ctx.query.allCockpitBlog.edges.map(edge => ({
                                categories: edge.node.entry.tags,
                                date: edge.node.properties._modified,
                                title: edge.node.entry.title,
                                description:
                                    edge.node.childCockpitBlogExcerptTextNode
                                        .childMarkdownRemark.excerpt,
                                author: rssMetadata.author,
                                url:
                                    rssMetadata.site_url +
                                    edge.node.fields.slug,
                                guid:
                                    rssMetadata.site_url +
                                    edge.node.fields.slug,
                                custom_elements: [
                                    {
                                        "content:encoded":
                                            edge.node
                                                .childCockpitBlogContentTextNode
                                                .childMarkdownRemark.html
                                    }
                                ]
                            }));
                        },
                        query: `
                        {
                            allCockpitBlog(limit: 100, sort: {fields: [properties____modified], order: DESC}) {
                              edges {
                                node {
                                  host
                                  properties {
                                    title_slug
                                    _modified
                                  }
                                  childCockpitBlogExcerptTextNode {
                                    childMarkdownRemark {
                                      excerpt
                                      html
                                    }
                                  }
                                  childCockpitBlogContentTextNode {
                                    childMarkdownRemark {
                                      timeToRead
                                      html
                                    }
                                  }
                                  entry {
                                    title
                                    tags
                                  }
                                  fields {
                                    slug
                                  }
                                }
                              }
                            }
                          }                          `,
                        output: config.siteRss
                    }
                ]
            }
        }
    ]
};
