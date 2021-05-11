import React, { useState } from "react"
import * as buttonStyles from "./buttons.module.css"
import { navigate } from "gatsby"

const Buttons = () => {
  const [numberOfPlayersSelected, setNumberOfPlayersSelected] = useState()
  const [errorState, setErrorState] = useState(false)
  const [inputList, setInputList] = useState(setPlayerData())

  function setPlayerData(playerData = [], numberOfPlayers = 4) {
    for (let i = 0; i < numberOfPlayers; i++) {
      playerData.push({ playername: "", score: 0, error: false })
    }
    return playerData
  }

  const createTeams = function navigateToCreateTeamsPage() {
    const cleanList = inputList.filter(input => (input.playername ? input : ""))
    navigate("/create-teams/", {
      state: { cleanList, numberOfPlayersSelected },
    })
  }

  const inputValidation = function validatePlayerNames() {
    let isValid = true
    inputList.forEach((input, i) => {
      if (!input.playername && i < numberOfPlayersSelected) {
        inputList[i].error = true
        isValid = false
        setErrorState(true)
      } else {
        inputList[i].error = false
      }
    })
    isValid = isValid ? createTeams() : ""
  }

  const handleInput = function handlePlayerInputChange(input, index) {
    const { name, value } = input.target
    const tempInputList = [...inputList]
    tempInputList[index][name] = value
    tempInputList[index]["error"] = false
    setErrorState(false)
    setInputList(tempInputList)
  }

  const setPlayerCount = function setNumberOfPlayers(player) {
    setInputList(setPlayerData())
    setNumberOfPlayersSelected(player)
    setErrorState(false)
  }

  return (
    <div className="text-center mb-5 p-4 rounded-xl md:shadow-lg bg-white">
      <h2>
        {numberOfPlayersSelected
          ? numberOfPlayersSelected + " Players Selected"
          : "Select Number of Players"}
      </h2>
      {errorState ? (
        <div className="text-red-600">Player Names Required</div>
      ) : (
        ""
      )}
      {[2, 3, 4].map(player => (
        <div key={player} className="mb-5">
          <div>
            {numberOfPlayersSelected === player
              ? inputList.map((input, i) => {
                  return i < numberOfPlayersSelected ? (
                    <div key={i} className="mb-2">
                      <input
                        className={`rounded-md border-2 p-1 border-black
                          ${input.error ? "border-red-600" : "border-black"}
                        `}
                        type="text"
                        onChange={e => handleInput(e, i)}
                        name="playername"
                        placeholder={"Player " + (i + 1) + " Name"}
                      />
                    </div>
                  ) : (
                    ""
                  )
                })
              : ""}
          </div>
          <button
            onClick={() => {
              numberOfPlayersSelected === player
                ? inputValidation()
                : setPlayerCount(player)
            }}
            className={`text-2xl w-48 
              ${
                numberOfPlayersSelected === player
                  ? buttonStyles.selected
                  : buttonStyles.unselected
              }`}
          >
            {numberOfPlayersSelected === player
              ? "Create Teams!"
              : player + " Players"}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Buttons
