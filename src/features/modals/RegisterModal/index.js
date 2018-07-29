import React from "react"
import { Modal } from "semantic-ui-react"
import { connect } from "react-redux"

import RegisterForm from "../../auth/RegisterForm"
import { closeModal } from "../modalActions"

const RegisterModal = ({ closeModal }) => (
  <Modal size="mini" open={true} onClose={closeModal}>
    <Modal.Header>Sign Up to Revents!</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <RegisterForm />
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default connect(
  null,
  { closeModal }
)(RegisterModal)
