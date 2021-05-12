import React, { useEffect, useState, useRef } from "react"
import firestore from "../services/firestore"
import Layout from "../components/layout"
import * as buttonStyles from "../components/buttons.module.css"
import { navigate } from "gatsby"

const fbCollection = require("../services/fb-collection")

const Play = ({ location }) => {
  const { state = {} } = location
  const { inputList } = state
  let teamsFactions = inputList ? inputList : []
  const [winnerState, stateWinner] = useState()
  const docId = useRef()
  var db = firestore.firestore()

  const setStorage = function setFirebaseStorageData() {
    var firestoreObject = []
    teamsFactions.forEach((teamselement, i) => {
      if (teamselement.factions) {
        let teamObject = {
          playername: teamselement.playername,
          team1: teamselement.factions[0][0].title,
          team2: teamselement.factions[1][0].title,
          score: teamselement.score,
        }
        firestoreObject.push(teamObject)
      }
    })
    return firestoreObject
  }

  const handlePlayerInputChange = (e, index) => {
    const list = [...teamsFactions]
    const { name, value } = e.target
    list[index][name] = value
    teamsFactions = list
  }

  useEffect(() => {
    db.settings({
      timestampsInSnapshots: true,
    })
    db.collection(fbCollection)
      .add({ teams: setStorage() })
      .then(function (docRef) {
        docId.current = docRef.id
        console.log("Document written with ID: ", docRef.id)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error)
      })
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db])

  const setWinner = function setWinner(firebaseDocumentId, teamId) {
    console.log(firebaseDocumentId)
    db.collection(fbCollection)
      .doc(firebaseDocumentId)
      .update({
        winner: teamId,
        timestamp: firestore.firestore.FieldValue.serverTimestamp(),
        teams: setStorage(),
      })
      .then(function () {
        stateWinner(teamId)
        console.log("WINNERSTATE", winnerState)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error)
      })
  }

  const checkWin = function checkIfThereIsAWinner() {
    return Number(winnerState) >= 0 ? true : false
  }

  const setFactions = function SetFactions(factions) {
    if (!factions) return false
    return factions.map((element, i) =>
      element ? <h4 key={i}>{element[0].title}</h4> : ""
    )
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <h1>Teams Set... Play!</h1>
        </div>
        {checkWin() ? (
          <div>
            <button
              className={buttonStyles.unselected + " md:float-right mb-4"}
              onClick={() => {
                navigate("/stats/")
              }}
            >
              View Stats
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {teamsFactions.map((element, i) =>
          element.playername ? (
            <div
              key={i}
              className="text-center p-4 rounded-xl md:shadow-lg bg-white"
            >
              <h2 className="indigo-dark">
                {element.playername || "Team " + (i + 1)}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {setFactions(element.factions)}
              </div>
              {winnerState === i ? (
                <h3 className="text-green-500">Winner!</h3>
              ) : checkWin() ? (
                <h3 className="text-red-700">Try Again</h3>
              ) : (
                <div>
                  <div className="text-center">
                    <input
                      type="number"
                      className="mb-2 mr-auto ml-auto rounded-md border-black border-2"
                      placeholder="Score"
                      name="score"
                      onChange={e => handlePlayerInputChange(e, i)}
                    />
                  </div>
                  <button
                    className={buttonStyles.selected}
                    onClick={() => {
                      setWinner(docId.current, i)
                    }}
                  >
                    Winner
                  </button>
                </div>
              )}
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </>
  )
}
Play.Layout = Layout

export default Play
