import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { Grid } from "semantic-ui-react"

import BasicPage from "./BasicPage"
import AboutPage from "./AboutPage"
import AccountPage from "./AccountPage"
import PhotosPage from "./PhotosPage"
import SettingsNav from "./SettingsNav"

const Settings = () => (
  <Grid>
    <Grid.Column width={12}>
      <Switch>
        <Redirect exact from="/settings" to="/settings/basic" />
        <Route path="/settings/basic" component={BasicPage} />
        <Route path="/settings/about" component={AboutPage} />
        <Route path="/settings/account" component={AccountPage} />
        <Route path="/settings/photos" component={PhotosPage} />
      </Switch>
    </Grid.Column>
    <Grid.Column width={4}>
      <SettingsNav />
    </Grid.Column>
  </Grid>
)

export default Settings
