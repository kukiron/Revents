import { MODAL_OPEN, MODAL_CLOSE } from "./modalConstants"

export const openModal = (modalType, modalProps) => ({
  type: MODAL_OPEN,
  payload: { modalType, modalProps }
})

export const closeModal = () => ({
  type: MODAL_CLOSE
})
