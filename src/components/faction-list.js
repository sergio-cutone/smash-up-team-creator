import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import GetFaction from "../components/helpers"

const FactionList = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___stars], order: ASC }) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              complexity
              icon {
                childImageSharp {
                  gatsbyImageData(
                    width: 100
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
              stars
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `)
  const defaultData = data.allMarkdownRemark.edges.map(node => node)
  const [dataState, setData] = useState(defaultData)
  const [updateState, setState] = useState(false)

  const factionNameSort = (order, orderby) => {
    let sortFaction = dataState
    sortFaction.sort((a, b) => {
      let nameA = a.node.frontmatter.stars
      let nameB = b.node.frontmatter.stars
      if (orderby === "title") {
        nameA = a.node.frontmatter.title.toUpperCase()
        nameB = b.node.frontmatter.title.toUpperCase()
      }
      if (nameA < nameB) {
        return -1 * order
      }
      if (nameA > nameB) {
        return 1 * order
      }

      // names must be equal
      return 0
    })
    return sortFaction
  }

  const sortFactions = event => {
    switch (event) {
      case "nameASC":
        setData(factionNameSort(1, "title"))
        break
      case "nameDESC":
        setData(factionNameSort(-1, "title"))
        break
      case "complexityDESC":
        setData(factionNameSort(-1, "complexity"))
        break
      default:
        setData(defaultData)
        break
    }
    setState(!updateState)
  }

  return (
    <>
      <h1>Get To Know Your Factions</h1>
      <div className="text-left">
        <span>Sort by: </span>
        <select
          onBlur={e => {
            sortFactions(e.target.value)
          }}
          className="mb-5 items-start"
        >
          <option value="complexity">Complexity (Low - High)</option>
          <option value="complexityDESC">Complexity (High - Low)</option>
          <option value="nameASC">Name (A - Z)</option>
          <option value="nameDESC">Name (Z - A)</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {dataState.map(({ node }, i) => (
          <Link
            to={node.fields.slug}
            className="text-center mb-5 p-4 rounded-xl md:shadow-lg hover:bg-gray-200 bg-white"
            key={i}
          >
            <h3>{node.frontmatter.title}</h3>
            <div>
              <GatsbyImage image={getImage(node.frontmatter.icon)} alt="icon" />
            </div>
            <GetFaction slug={node.fields.slug} />
            <strong>Complexity: </strong>
            {node.frontmatter.complexity}
          </Link>
        ))}
      </div>
    </>
  )
}

export default FactionList
