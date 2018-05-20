import React from "react"
import { NavLink } from "react-router-dom"
import { Grid, Menu, Header } from "semantic-ui-react"

const SettingsNav = () => (
  <Grid.Column width={4}>
    <Menu vertical>
      <Header icon="user" attached inverted color="grey" content="Profile" />
      <Menu.Item as={NavLink} to="/settings/basic">
        Basics
      </Menu.Item>
      <Menu.Item as={NavLink} to="/settings/about">
        About Me
      </Menu.Item>
      <Menu.Item as={NavLink} to="/settings/photos">
        My Photos
      </Menu.Item>
    </Menu>
    <Grid.Row />
    <Menu vertical>
      <Header
        icon="settings"
        attached
        inverted
        color="grey"
        content="Account"
      />
      <Menu.Item as={NavLink} to="/settings/account">
        My Account
      </Menu.Item>
    </Menu>
  </Grid.Column>
)

export default SettingsNav
