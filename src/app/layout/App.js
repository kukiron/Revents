import React from "react"
import { Container } from "semantic-ui-react"
import { Switch, Route } from "react-router-dom"
import Loadable from "react-loadable"

import LoadingSpinner from "../../app/layout/LoadingSpinner"
import { AuthenticatedUser } from "../../features/auth/authWrapper"

const AsyncHomePage = Loadable({
  loader: () => import("../../features/home"),
  loading: LoadingSpinner
})

const AsyncEventDashboard = Loadable({
  loader: () => import("../../features/events/EventDashboard"),
  loading: LoadingSpinner
})
const AsyncNavBar = Loadable({
  loader: () => import("../../features/nav/NavBar"),
  loading: LoadingSpinner
})
const AsyncCreateEventForm = Loadable({
  loader: () => import("../../features/events/EventForm/CreateEventForm"),
  loading: LoadingSpinner
})
const AsyncManageEventForm = Loadable({
  loader: () => import("../../features/events/EventForm/ManageEventForm"),
  loading: LoadingSpinner
})
const AsyncSettingsDashboard = Loadable({
  loader: () => import("../../features/user/Settings"),
  loading: LoadingSpinner
})
const AsyncUserDetail = Loadable({
  loader: () => import("../../features/user/UserDetail"),
  loading: LoadingSpinner
})
const AsyncPeopleDashboard = Loadable({
  loader: () => import("../../features/user/PeopleDashboard"),
  loading: LoadingSpinner
})
const AsyncEventDetail = Loadable({
  loader: () => import("../../features/events/EventDetail"),
  loading: LoadingSpinner
})
const AsyncModalManager = Loadable({
  loader: () => import("../../features/modals/ModalManager"),
  loading: LoadingSpinner
})
const AsyncNotFound = Loadable({
  loader: () => import("./NotFound"),
  loading: LoadingSpinner
})

const App = () => (
  <div>
    <AsyncModalManager />
    <Switch>
      <Route exact path="/" component={AsyncHomePage} />
    </Switch>

    <Route
      path="/(.+)"
      render={() => (
        <div>
          <AsyncNavBar />
          <Container className="main">
            <Switch>
              <Route path="/events" component={AsyncEventDashboard} />
              <Route path="/event/:id" component={AsyncEventDetail} />
              <Route
                path="/manage/:id"
                component={AuthenticatedUser(AsyncManageEventForm)}
              />
              <Route
                path="/people"
                component={AuthenticatedUser(AsyncPeopleDashboard)}
              />
              <Route
                path="/profile/:id"
                component={AuthenticatedUser(AsyncUserDetail)}
              />
              <Route
                path="/settings"
                component={AuthenticatedUser(AsyncSettingsDashboard)}
              />
              <Route
                path="/createEvent"
                component={AuthenticatedUser(AsyncCreateEventForm)}
              />
              <Route component={AsyncNotFound} />
            </Switch>
          </Container>
        </div>
      )}
    />
  </div>
)

export default App
