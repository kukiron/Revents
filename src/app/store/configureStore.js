import { createStore, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import rootReducer from "../reducers"

export const configureStore = preloadedState => {
  const middlewares = [reduxThunk]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const composedEnhancer = composeWithDevTools(middlewareEnhancer)

  const store = createStore(rootReducer, preloadedState, composedEnhancer)

  // Enable hot module replacement
  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("../reducers", () => {
        const newRootReducer = require("../reducers").default
        store.replaceReducer(newRootReducer)
      })
    }
  }

  return store
}
