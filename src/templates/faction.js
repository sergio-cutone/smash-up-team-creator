import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import GetFaction from "../components/helpers"
import * as buttonStyles from "../components/buttons.module.css"

const BlogPost = ({ data }) => {
  const post = data.markdownRemark
  const image = getImage(post.frontmatter.icon)

  return (
    <>
      <div className="text-center mb-5 p-4 rounded-xl md:shadow-lg bg-white">
        <h1>{post.frontmatter.title}</h1>
        <GatsbyImage image={image} alt={post.frontmatter.title} />
        <div className="mb-5">
          <strong>Complexity: </strong>
          {post.frontmatter.complexity}
          <GetFaction slug={post.fields.slug} />
        </div>
        <p dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <button
        onClick={() => window.history.back()}
        className={buttonStyles.selected}
      >
        Go back
      </button>
    </>
  )
}

BlogPost.Layout = Layout
export default BlogPost

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        complexity
        icon {
          childImageSharp {
            gatsbyImageData(
              width: 150
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
      fields {
        slug
      }
    }
  }
`
