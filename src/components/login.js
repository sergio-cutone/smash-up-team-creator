import React, { useEffect, useState } from "react"
import { StaticImage } from "gatsby-plugin-image"

const Login = ({
  onEmail,
  onPassword,
  onSignIn,
  signInError,
  emailError,
  passwordError,
}) => {
  const [email, emailState] = useState("")
  useEffect(() => {
    const url_string = window.location.href
    const url = new URL(url_string)
    const email = url.searchParams.get("email") || ""
    if (email) {
      emailState(email)
      onEmail(email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleEmail = value => {
    emailState(value)
    onEmail(value)
  }
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      onPassword("")
      onSignIn()
    }
  }

  return (
    <section className="fixed w-full h-full bg-black bg-opacity-80 z-50 top-0 left-0 p-5 text-center">
      <div className="max-w-xl bg-white p-3 rounded mx-auto border-4 border-blue-500">
        <StaticImage
          src="../images/smashup-logo.png"
          alt="SmashUp!"
          placeholder="blurred"
          layout="fixed"
          width={240}
          className="mb-2 mx-auto"
        />
        <div className="text-xl mb-3 font-bold">Firebase Sign In</div>
        <form>
          <div className={`mb-3 ${emailError ? "text-red-500" : "text-black"}`}>
            Email
            <br />
            <input
              type="email"
              name="email"
              className={`border-2 p-2 rounded ${
                emailError ? "border-red-500" : "border-black"
              }`}
              onChange={e => handleEmail(e.target.value)}
              value={email}
            />
          </div>
          <div
            className={`mb-3 ${passwordError ? "text-red-500" : "text-black"}`}
          >
            Password
            <br />
            <input
              type="password"
              name="pw"
              className={`border-2 p-2 rounded ${
                passwordError ? "border-red-500" : "border-black"
              }`}
              onChange={e => onPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </form>
        {!signInError || signInError}
        <div className="mt-3">
          <button
            className="hover:bg-blue-300 bg-blue-500 py-2 px-4 rounded text-white"
            onClick={e => onSignIn()}
          >
            Sign In
          </button>
        </div>
      </div>
    </section>
  )
}
export default Login
