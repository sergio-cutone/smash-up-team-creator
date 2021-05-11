import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import firestore from "../services/firestore"

const fbCollection = require("../services/fb-collection")

const Stats = () => {
  const [matchState, setMatchState] = useState([])
  const [deleteMatch, setDeleteMatch] = useState(false)
  var db = firestore.firestore()
  useEffect(() => {
    getMatches()
    return () => {}
  }, [])

  const getMatches = function getMatchesFromFirebase() {
    let allMatches = []
    db.collection(fbCollection)
      .orderBy("timestamp", "asc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          allMatches.push({ data: doc.data(), docId: doc.id })
        })
        setMatchState(allMatches)
      })
  }

  const deleteMatches = function deleteMatchesFromFirebase(docId) {
    let verify = window.confirm("Are you sure you want to delete this match?")
    if (verify === true) {
      db.collection(fbCollection)
        .doc(docId)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!")
          setDeleteMatch(!deleteMatch)
          getMatches()
        })
        .catch(error => {
          console.error("Error removing document: ", error)
        })
    }
  }

  const displayMatches = matchState.map((match, i) => {
    let date = String(match.data.timestamp.toDate())
    const getTeams = Object.entries(match.data.teams).map(a => a[1])
    const teams = getTeams.map((team, i) => (
      <div
        className={
          "p-4 rounded-xl " +
          (i === match.data.winner ? "bg-green-300" : "bg-white")
        }
        key={i}
      >
        <div className="border-b-2 border-black">
          <strong>{team.playername}</strong>
        </div>
        <div>{team.team1}</div>
        <div>{team.team2}</div>
        <div>
          <strong>Score: </strong>
          {team.score}
        </div>
      </div>
    ))

    return (
      <div key={i} className="mb-5 p-4 rounded-xl shadow-lg bg-white">
        <div className="text-xs mb-1">
          <button
            onClick={() => {
              deleteMatches(match.docId)
            }}
            className="float-right text-red-700"
          >
            Delete
          </button>{" "}
          {date}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 ">{teams}</div>
      </div>
    )
  })

  return (
    <>
      <h1>Statistics</h1>
      {displayMatches}
    </>
  )
}
Stats.Layout = Layout

export default Stats
