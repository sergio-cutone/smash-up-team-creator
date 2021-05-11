/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { StaticImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer"
import Login from "../components/login.js"
import firestore from "../services/firestore"
import "./layout.css"
import "@fontsource/open-sans"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const [email, emailState] = useState(false)
  const [emailError, emailErrorState] = useState(false)
  const [password, passwordState] = useState(false)
  const [passwordError, passwordErrorState] = useState(false)
  const [signedIn, signedInState] = useState(false)
  const [signInError, signInErrorState] = useState(false)
  const handleEmail = value => {
    emailState(value)
  }

  useEffect(() => {
    signedIn ? signedInState(true) : signedInState(false)
  }, [signedIn])

  const handlePassword = value => {
    passwordState(value)
  }
  const handleSignIn = () => {
    emailErrorState(!email ? true : false)
    passwordErrorState(!password ? true : false)
    if (!email || !password) return false
    firestore
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        signInErrorState(false)
        signedInState(true)
        // ...
      })
      .catch(error => {
        var errorCode = error.code
        var errorMessage = error.message
        signedInState(false)
        signInErrorState(error.message)
        console.log(errorCode, errorMessage)
      })
  }
  const handleSignOut = () => {
    firestore
      .auth()
      .signOut()
      .then(() => {
        signedInState(false)
      })
      .catch(error => {
        // An error happened.
        console.log(error)
      })
  }
  return (
    <>
      <Header
        signedIn={signedIn}
        siteTitle={data.site.siteMetadata?.title || `Title`}
        onSignOut={handleSignOut}
      />
      <main className="p-5 max-w-screen-lg mx-auto text-center">
        {children}
      </main>
      <Footer />
      {signedIn || (
        <Login
          signedIn={signedIn}
          signInError={signInError}
          onEmail={handleEmail}
          onPassword={handlePassword}
          onSignIn={handleSignIn}
          emailError={emailError}
          passwordError={passwordError}
        />
      )}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
