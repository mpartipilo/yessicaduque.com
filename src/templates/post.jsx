import React from "react";
import { graphql } from "gatsby";
import Moment from "react-moment";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "reactstrap";
import Img from "gatsby-image";
import Layout from "../components/Layout";
import UserInfo from "../components/UserInfo/UserInfo";
/* import Disqus from "../components/Disqus/Disqus"; */
import PostTags from "../components/PostTags/PostTags";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";

export default class PostTemplate extends React.Component {
  render() {
    const { location, invert, data, pageContext } = this.props;
    const { slug } = pageContext;
    const postNode = data.post;
    const post = postNode.entry;

    post.date = postNode.properties._modified * 1000;

    const heroImage = postNode.entry.image.localFile.childImageSharp.fluid;

    return (
      <Layout location={location} invert={invert}>
        <div className="blogPost">
          <Helmet>
            <title>{`${post.title} | ${config.siteTitle}`}</title>
          </Helmet>
          <SEO
            postPath={slug}
            postNode={postNode}
            ogImage={heroImage.src}
            postSEO
          />
          <article>
            <Container>
              <Row>
                <Col>
                  <Img fluid={heroImage} />
                  <h1>{post.title}</h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        postNode.entry.excerpt.markdown.childMarkdownRemark
                          .html,
                    }}
                  />
                  <hr />
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        postNode.entry.content.markdown.childMarkdownRemark
                          .html,
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
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    post(fields: { slug: { eq: $slug } }) {
      id
      properties {
        _modified
      }
      entry {
        tags
        title
        title_slug
        excerpt {
          markdown {
            childMarkdownRemark {
              html
            }
          }
        }
        content {
          markdown {
            childMarkdownRemark {
              timeToRead
              html
            }
          }
        }
        image {
          localFile {
            id
            childImageSharp {
              id
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
