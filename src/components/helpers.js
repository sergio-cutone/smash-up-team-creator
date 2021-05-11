import React from "react"

const GetFaction = props => {
  let split = props.slug.split("/")
  return (
    <div>
      <strong>Faction: </strong>
      {split[2].toUpperCase()}
    </div>
  )
}

export default GetFaction
