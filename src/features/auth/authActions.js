import { LOGIN_USER, SIGNOUT_USER } from "./authConstants"

export const loginUser = credentials => ({
  type: LOGIN_USER,
  payload: credentials
})

export const singOutUser = () => ({ type: SIGNOUT_USER })
