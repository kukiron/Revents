import React from "react"
import { Label } from "semantic-ui-react"

const renderError = error =>
  error && (
    <Label basic color="red">
      {error}
    </Label>
  )

export default renderError
