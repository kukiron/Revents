import { LOGIN_USER, SIGNOUT_USER } from "./authConstants"
import { closeModal} from '../modals/modalActions';

export const loginUser = credentials => dispatch => {
  dispatch({
    type: LOGIN_USER,
    payload: credentials
  })
  dispatch(closeModal())
}

export const singOutUser = () => ({ type: SIGNOUT_USER })
