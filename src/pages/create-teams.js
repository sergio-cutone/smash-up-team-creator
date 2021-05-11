import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as buttonStyles from "../components/buttons.module.css"
import { css } from "@emotion/react"
import { navigate } from "gatsby"

const CreateTeams = ({ data, location }) => {
  const numberOfPlayers = location.state.numberOfPlayersSelected
  const cleanList = location.state.cleanList
  const [inputList, setInputList] = useState(cleanList)
  const [factionState, setFactions] = useState([])
  const [updateState, updateTeams] = useState(false)

  useEffect(() => {
    const factionList = data.allMarkdownRemark.edges.map(
      ({ node }) => node.frontmatter
    )
    for (let i = 0; i < numberOfPlayers; i++) {
      inputList[i].factions = smashUp(factionList)
    }
    setInputList(inputList)
    return () => {}
  }, [])

  const smashUp = function smashUpFactions(factionList) {
    let tempFaction = []
    while (tempFaction.length < 2) {
      tempFaction.push(
        factionList.splice(
          Math.floor(Math.random() * (factionList.length - 1)),
          1
        )
      )
    }
    setFactions(factionList)
    return tempFaction
  }

  const changeTeam = function createNewTeam(teamId) {
    const updateTeam = inputList.find((element, index) => {
      return teamId === index
    })
    updateTeam.factions.forEach(element => {
      factionState.push(element[0])
    })
    updateTeam.factions = smashUp(factionState)
    updateTeams(!updateState)
  }

  let teamContent = "...Loading"
  const displayTeams = inputList.map((element, i) => {
    if (element.factions) {
      teamContent = element.factions.map((b, i) => {
        const image = getImage(b[0].icon)
        return (
          <div
            key={i}
            css={css`
              background: #efefef;
            `}
            className="mb-5 p-4 rounded-xl shadow-lg"
          >
            <GatsbyImage image={image} alt="icon" key={i} />
            <h3>{b[0].title}</h3>
            <div>
              <strong>Complexity:</strong> {b[0].complexity}
            </div>
          </div>
        )
      })
      return (
        <div
          key={i}
          css={css`
            background: #fff;
          `}
          className="text-center mb-5 p-4 rounded-xl md:shadow-lg"
        >
          <h2>{inputList[i].playername || "Team " + (i + 1)}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {teamContent}
          </div>
          <button
            className={`w-24 ${buttonStyles.selected}`}
            onClick={() => {
              changeTeam(i)
            }}
          >
            Change
          </button>
        </div>
      )
    }
  })

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <h1 className="text-left">{numberOfPlayers} Team SmashUp!</h1>
          </div>
          <div>
            <button
              className={buttonStyles.unselected + " md:float-right mb-3 w-24"}
              onClick={() => {
                navigate("/match/", {
                  state: { inputList },
                })
              }}
            >
              Play!
            </button>
          </div>
        </div>
        {displayTeams}
      </div>
    </>
  )
}

export const query = graphql`
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
                  width: 150
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
          html
          excerpt
        }
      }
    }
  }
`
CreateTeams.Layout = Layout

export default CreateTeams
