import React from "react"
import SEO from "../components/seo"
import Buttons from "../components/buttons"
import FactionList from "../components/faction-list"
import Layout from "../components/layout"

const Home = ({ data }) => {
  return (
    <>
      <SEO title="Home" />
      <div className="text-center">
        <Buttons />
        <FactionList />
      </div>
    </>
  )
}
Home.Layout = Layout
export default Home
