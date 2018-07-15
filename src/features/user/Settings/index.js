import React from "react"
import { connect } from "react-redux"
import { Switch, Route, Redirect } from "react-router-dom"
import { Grid } from "semantic-ui-react"

import BasicPage from "./BasicPage"
import AboutPage from "./AboutPage"
import AccountPage from "./AccountPage"
import PhotosPage from "./PhotosPage"
import SettingsNav from "./SettingsNav"
import { updatePassword } from "../../auth/authActions"
import { updateProfile } from "../userActions"

const Settings = ({ updatePassword, updateProfile, providerId, user }) => (
  <Grid>
    <Grid.Column width={12}>
      <Switch>
        <Redirect exact from="/settings" to="/settings/basic" />
        <Route path="/settings/photos" component={PhotosPage} />
        <Route
          path="/settings/about"
          render={() => (
            <AboutPage initialValues={user} updateProfile={updateProfile} />
          )}
        />
        <Route
          path="/settings/basic"
          render={() => (
            <BasicPage initialValues={user} updateProfile={updateProfile} />
          )}
        />
        <Route
          path="/settings/account"
          render={() => (
            <AccountPage
              updatePassword={updatePassword}
              providerId={providerId}
            />
          )}
        />
      </Switch>
    </Grid.Column>
    <Grid.Column width={4}>
      <SettingsNav />
    </Grid.Column>
  </Grid>
)

const mapStateToProps = ({ firebase }) => ({
  providerId: firebase.auth.providerData[0].providerId,
  user: firebase.profile
})

export default connect(
  mapStateToProps,
  { updatePassword, updateProfile }
)(Settings)
