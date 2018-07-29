import React from "react"
import { Modal } from "semantic-ui-react"
import { connect } from "react-redux"

import LoginForm from "../../auth/LoginForm"
import { closeModal } from "../modalActions"

const LoginModal = ({ closeModal }) => (
  <Modal size="mini" open={true} onClose={closeModal}>
    <Modal.Header>Login to Revents</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <LoginForm />
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default connect(
  null,
  { closeModal }
)(LoginModal)
