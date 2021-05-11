import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Footer = () => {
  return (
    <footer className="text-center py-3">
      © {new Date().getFullYear()} Sergio Cutone
      <div className="mx-auto mt-2">
        <StaticImage
          src="../images/gatsby.png"
          alt="Gatsby logo"
          title="Gatsby logo"
          placeholder="blurred"
          layout="fullWidth"
          className="inline-block w-10 h-10 mr-2 rounded-full bg-white"
        />
        <StaticImage
          src="../images/tailwindcss.png"
          alt="Tailwind CSS logo"
          title="Tailwind CSS logo"
          placeholder="blurred"
          layout="fullWidth"
          className="inline-block w-10 h-10 mr-2 rounded-full bg-white"
        />
        <StaticImage
          src="../images/firebase.png"
          alt="Firebase logo"
          title="Firebase logo"
          placeholder="blurred"
          layout="fullWidth"
          className="inline-block w-10 h-10 rounded-full bg-white"
        />
      </div>
    </footer>
  )
}

export default Footer
