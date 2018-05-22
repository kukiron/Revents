import React from "react"
import { Link } from "react-router-dom"

const NotFound = ({ location }) => (
  <div>
    <h4>
      The path <code>{location.pathname}</code> couldn't be found
      <br />
      Back to <Link to="/">Homepage</Link>
    </h4>
  </div>
)

export default NotFound
