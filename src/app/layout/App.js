import React from "react"
import { Container } from "semantic-ui-react"
import { Switch, Route } from "react-router-dom"

import Home from "../../features/home"
import EventDetail from "../../features/events/EventDetail"
import EventDashboard from "../../features/events/EventDashboard"
import PeopleDashboard from "../../features/user/PeopleDashboard"
import UserDetail from "../../features/user/UserDetail"
import Settings from "../../features/user/Settings"
import NavBar from "../../features/nav/NavBar"
import EventForm from "../../features/events/EventForm"
import ModalManager from "../../features/modals/ModalManager"
import NotFound from "./NotFound"

import TestComponent from "../../features/testArea/TestComponent"

const App = () => (
  <div>
    <ModalManager />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>

    <Route
      path="/(.+)"
      render={() => (
        <div>
          <NavBar />
          <Container className="main">
            <Switch>
              <Route path="/events" component={EventDashboard} />
              <Route path="/event/:id" component={EventDetail} />
              <Route path="/manage/:id" component={EventForm} />
              <Route path="/people" component={PeopleDashboard} />
              <Route path="/profile/:id" component={UserDetail} />
              <Route path="/settings" component={Settings} />
              <Route path="/createEvent" component={EventForm} />
              <Route path="/test" component={TestComponent} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </div>
      )}
    />
  </div>
)

export default App
