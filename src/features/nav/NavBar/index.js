import React, { Component } from "react"
import { connect } from "react-redux"
import { NavLink, Link, withRouter } from "react-router-dom"
import { withFirebase } from "react-redux-firebase"
import { Menu, Container, Button } from "semantic-ui-react"

import LoggedInMenu from "../Menus/LoggedInMenu"
import SignedOutMenu from "../Menus/SignedOutMenu"
import { openModal } from "../../modals/modalActions"

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal("LoginModal")
  }

  handleRegister = () => {
    this.props.openModal("RegisterModal")
  }

  handleSignOut = () => {
    this.props.firebase.logout()
    this.props.history.push("/")
  }

  render() {
    const { auth, profile } = this.props
    const authenticated = auth.isLoaded && !auth.isEmpty

    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="assets/logo.png" alt="logo" />
            Revents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          {authenticated ? (
            [
              <Menu.Item key={1} as={NavLink} to="/people" name="People" />,
              <Menu.Item key={2}>
                <Button
                  as={Link}
                  to="/createEvent"
                  floated="right"
                  positive
                  inverted
                  content="Create Event"
                />
              </Menu.Item>,
              <LoggedInMenu
                key={3}
                auth={auth}
                profile={profile}
                signOut={this.handleSignOut}
              />
            ]
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    )
  }
}

const mapStateToProps = ({ firebase: { auth, profile } }) => ({
  auth,
  profile
})

export default withRouter(
  withFirebase(
    connect(
      mapStateToProps,
      { openModal }
    )(NavBar)
  )
)
