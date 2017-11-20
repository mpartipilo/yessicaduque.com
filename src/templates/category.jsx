// import React from "react";
// import Helmet from "react-helmet";
// import PostListing from "../components/PostListing/PostListing";
// import config from "../../data/SiteConfig";
// 
// /* eslint "react/jsx-indent": 0 */
// /* eslint "react/jsx-indent-props": 0 */
// 
// export default class CategoryTemplate extends React.Component {
//     render() {
//         const { category } = this.props.pathContext;
//         const postEdges = this.props.data.allCockpitBlog.edges;
//         return (
//             <div className="category-container">
//                 <Helmet
//                     title={`Posts in category "${category}" | ${config.siteTitle}`}
//                 />
//                 <PostListing postEdges={postEdges} />
//             </div>
//         );
//     }
// }
// 
// /* eslint no-undef: "off" */
// export const pageQuery = graphql`
//     query CategoryPage($category: String) {
//         allCockpitBlog(
//             limit: 100
//             sort: { fields: properties____modified, order: DESC }
//             filter: { entry: { category: { eq: $category } } }
//         ) {
//             totalCount
//             edges {
//                 node {
//                     host
//                     properties {
//                         title_slug
//                         _modified
//                     }
//                     childCockpitBlogExcerptTextNode {
//                         childMarkdownRemark {
//                             html
//                         }
//                     }
//                     childCockpitBlogContentTextNode {
//                         childMarkdownRemark {
//                             timeToRead
//                             html
//                         }
//                     }
//                     entry {
//                         title
//                         tags
//                         category
//                     }
//                 }
//             }
//         }
//     }
// `;
// 