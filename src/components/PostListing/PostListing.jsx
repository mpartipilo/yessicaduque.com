import React from "react";
import { Link } from "gatsby";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        excerpt: postEdge.node.excerpt,
        summary: postEdge.node.summary || "",
        timeToRead: postEdge.node.timeToRead
      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    return (
      <div>
        <ul>
          {/* Your post list here. */
          postList.map(post => (
            <li key={post.title}>
              <Link to={post.path}>
                <h1>{post.title}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostListing;
