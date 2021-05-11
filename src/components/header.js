import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { navigate } from "gatsby"
import * as buttonStyles from "../components/buttons.module.css"

const Header = ({ signedIn, onSignOut }) => (
  <header className="mb-5">
    <div className="p-5 max-w-screen-lg mx-auto">
      <div className="grid md:grid-flow-col md:auto-cols-auto">
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <StaticImage
              src="../images/smashup-logo.png"
              alt="A dinosaur"
              placeholder="blurred"
              layout="fixed"
              width={240}
              className="mb-2 mx-auto md:mx-0"
            />
          </Link>
        </h1>
        <div className="text-center md:text-right">
          <button
            onClick={() => {
              navigate("/factions/")
            }}
            className={`w-20 mr-2 text-xs ${buttonStyles.unselected}`}
          >
            Factions
          </button>
          <button
            onClick={() => {
              navigate("/stats/")
            }}
            className={`w-20 mr-2 text-xs ${buttonStyles.unselected}`}
          >
            Stats
          </button>
          {signedIn && (
            <button
              className={`w-20 text-xs ${buttonStyles.unselected}`}
              onClick={onSignOut}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
