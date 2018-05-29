import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import ReduxToastr from "react-redux-toastr"
import { BrowserRouter } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"

import App from "./app/layout/App"
import ScrollToTop from "./app/common/utils/ScrollToTop"
import { configureStore } from "./app/store/configureStore"
import registerServiceWorker from "./registerServiceWorker"
import "react-redux-toastr/lib/css/react-redux-toastr.min.css"
import "./index.css"

const store = configureStore()

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToastr
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  )
}

// Implement Hot Module Replacement
if (module.hot) {
  module.hot.accept("./app/layout/App", () => {
    setTimeout(renderApp)
  })
}

// Render App after authentication is ready & loaded by Firebase
store.firebaseAuthIsReady.then(() => {
  renderApp()
})

registerServiceWorker()
