import React from "react"
import { Link } from "react-router-dom"

const NotFound = ({ location }) => (
  <div>
    <h1>
      Error 404. Not Found!
      <br />
    </h1>
    <h3>
      Back to <Link to="/">Homepage</Link>
    </h3>
  </div>
)

export default NotFound
