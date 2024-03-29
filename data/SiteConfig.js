const siteMetadata = {
  title: "Yessica Duque",
  titleTemplate: "%s · Food Styling & Photography",
  description:
    "Professional website from Yessica Duque about food styling, cooking and professional photography.",
  siteUrl: "http://yessicaduque.com", // No trailing slash allowed!
  image: "/img/profile.jpg", // Path to your image you placed in the 'static' folder
  twitterUsername: "@YekaMagenta"
};

module.exports = {
  blogPostDir: "blog", // The name of directory that contains your posts.
  siteMetadata,
  siteTitle: siteMetadata.title, // Site title.
  siteTitleAlt: "Yessica Duque Photography & Food Stylist ", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: siteMetadata.siteUrl, // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: siteMetadata.description, // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "UA-109211942-1", // GA tracking ID.
  disqusShortname: "", // Disqus shortname.
  postDefaultCategoryID: "Recipes", // Default category for posts.
  userName: "yessica", // Username to display in the author segment.
  userTwitter: "YekaMagenta", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "The Hague, Netherlands", // User location to display in the author segment.
  userAvatar: "http://yessicaduque.com/img/profile.jpg", // User avatar to display in the author segment.
  userDescription: "Professional food stylist and photographer", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "Facebook",
      url: "https://www.facebook.com/yessicaduquephotographer/",
      iconClassName: "facebook"
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/yessica_duque_photography/",
      iconClassName: "instagram"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/YekaMagenta/",
      iconClassName: "twitter"
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/yessicaduque/",
      iconClassName: "linkedin"
    },
    {
      label: "Email",
      url: "mailto:info@yessicaduque.com",
      iconClassName: "envelope"
    }
  ],
  copyright: "Copyright © 2017. Yessica Duque", // Copyright string for the footer of the website and RSS feed.
  designedBy: {
    label: "Design & Development by ",
    name: "Michelangelo Partipilo",
    url: "https://www.linkedin.com/in/mpartipilo/"
  },
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};
