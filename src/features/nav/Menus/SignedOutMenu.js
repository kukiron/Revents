import React from "react"
import { Menu, Button } from "semantic-ui-react"

const SignedOutMenu = ({ signIn, register }) => (
  <Menu.Item position="right">
    <Button basic inverted content="Login" onClick={signIn} />
    <Button
      basic
      inverted
      content="Register"
      onClick={register}
      style={{ marginLeft: "0.5em" }}
    />
  </Menu.Item>
)

export default SignedOutMenu
