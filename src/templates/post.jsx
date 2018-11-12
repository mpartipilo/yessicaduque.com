import React from "react";
import { graphql } from 'gatsby';
import Moment from "react-moment";
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
    const { data, pageContext } = this.props;
    const { slug } = pageContext;
    const postNode = data.blog;
    const post = postNode.entry;

    post.date = postNode.properties._modified * 1000;

    return (
      <div className="blogPost">
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO
          postPath={slug}
          postNode={postNode}
          ogImage={`${postNode.host}/storage/uploads${encodeURI(
            post.image.path
          )}`}
          postSEO
        />
        <article>
          <Container>
            <Row>
              <Col>
                <Jumbotron fluid>
                  <div
                    style={{
                      backgroundImage: `url('${
                        postNode.host
                      }/storage/uploads${encodeURI(post.image.path)}')`
                    }}
                  />
                </Jumbotron>
                <h1>{post.title}</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      postNode.childCockpitBlogContentTextNode
                        .childMarkdownRemark.html
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <span className="badge badge-default">
                    Posted <Moment format="YYYY-MM-DD">{post.date}</Moment>
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
    blog(fields: { slug: { eq: $slug } }) {
      id
      properties {
        _modified
      }
      childExcerptTextNode {
        childMarkdownRemark {
          internal {
            content
          }
          html
        }
      }
      childContentTextNode {
        childMarkdownRemark {
          internal {
            content
          }
          timeToRead
          excerpt
          html
        }
      }
      entry {
        title_slug
        image {
          path
          title
          mime
          description
          size
          image
          video
          audio
          archive
          document
          code
          _by
          width
          height
          _id
        }
        title
        tags
      }
    }
  }
`;
