import React from "react";
import Helmet from "react-helmet";
import { Container, Jumbotron, Row, Col } from "reactstrap";
import UserInfo from "../components/UserInfo/UserInfo";
/* import Disqus from "../components/Disqus/Disqus"; */
import PostTags from "../components/PostTags/PostTags";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "../scss/post.scss";

export default class PostTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext;
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div className="blogPost">
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <article>
          <Container>
            <Row>
              <Col>
                <Jumbotron fluid>
                  <div
                    style={{
                      backgroundImage: `url('/img/gallery/p/${encodeURI(
                        post.cover
                      )}')`
                    }}
                  />
                </Jumbotron>
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <span className="badge badge-default">
                    Posted {post.date}
                  </span>
                  <div className="pull-right">
                    <PostTags tags={post.tags} />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <SocialLinks postPath={slug} postNode={postNode} />
              </Col>
            </Row>
            <Row>
              <Col>
                <UserInfo config={config} />
                {/* <Disqus postNode={postNode} /> */}
              </Col>
            </Row>
          </Container>
        </article>
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      fields {
        slug
      }
    }
  }
`;
