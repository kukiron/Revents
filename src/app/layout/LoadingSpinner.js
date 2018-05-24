import React from "react"
import { Dimmer, Loader } from "semantic-ui-react"

const LoadingSpinner = ({ inverted }) => (
  <Dimmer inverted={inverted} active={true}>
    <Loader content="Loading..." />
  </Dimmer>
)

export default LoadingSpinner
