import { createReducer } from "../../app/common/utils/reducerUtil"
import { MODAL_OPEN, MODAL_CLOSE } from "./modalConstants"

const initialModal = null

const openModal = (state, { modalType, modalProps }) => ({
  modalType,
  modalProps
})

const closeModal = (state, payload) => null

export default createReducer(initialModal, {
  [MODAL_OPEN]: openModal,
  [MODAL_CLOSE]: closeModal
})
