import React from "react"
import { connect } from "react-redux"

import LoginModal from "../LoginModal"
import RegisterModal from "../RegisterModal"
import UnauthModal from "../UnauthModal"

const modalLookup = {
  LoginModal,
  RegisterModal,
  UnauthModal
}

const ModalManager = ({ currentModals }) => {
  let renderModal

  if (currentModals) {
    const { modalType, modalProps } = currentModals
    const ModalComponent = modalLookup[modalType]

    renderModal = <ModalComponent {...modalProps} />
  }

  return <span>{renderModal}</span>
}

const mapStateToProps = ({ modals }) => ({ currentModals: modals })

export default connect(mapStateToProps)(ModalManager)
