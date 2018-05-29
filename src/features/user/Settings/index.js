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

const Settings = ({ updatePassword, providerId }) => (
  <Grid>
    <Grid.Column width={12}>
      <Switch>
        <Redirect exact from="/settings" to="/settings/basic" />
        <Route path="/settings/basic" component={BasicPage} />
        <Route path="/settings/about" component={AboutPage} />
        <Route path="/settings/photos" component={PhotosPage} />
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
  providerId: firebase.auth.providerData[0].providerId
})

export default connect(mapStateToProps, { updatePassword })(Settings)
