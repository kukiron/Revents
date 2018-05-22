import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"

import App from "./app/layout/App"
import ScrollToTop from "./app/common/utils/scrollToTop"
import { configureStore } from "./app/store/configureStore"
import registerServiceWorker from "./registerServiceWorker"
import "./index.css"

const store = configureStore()
const rootElem = document.getElementById("root")

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    rootElem
  )
}

// Implement Hot Module Replacement
if (module.hot) {
  module.hot.accept("./app/layout/App", () => {
    setTimeout(renderApp)
  })
}

renderApp()
registerServiceWorker()
