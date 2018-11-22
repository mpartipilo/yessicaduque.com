import React, { Component } from "react";
import _ from "lodash";
import { Link } from "gatsby";

class RecipeTags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <div className="post-tag-container">
        {tags &&
          tags.map(tag => (
            <Link
              key={tag}
              style={{ textDecoration: "none" }}
              to={`/recipes/tags/${_.kebabCase(tag)}`}
            >
              <span
                className="badge badge-pill badge-default"
                style={{ marginRight: 3 }}
              >
                {tag}
              </span>
            </Link>
          ))}
      </div>
    );
  }
}

export default RecipeTags;
