import React, { Component } from "react"
import { Form, Button } from "semantic-ui-react"
import { Field, reduxForm } from "redux-form"
import TextArea from "../../../app/common/form/TextArea"

class EventDetailChatForm extends Component {
  handleChatFormSubmit = values => {
    const { parentId, addEventComment, reset, eventId, closeForm } = this.props
    addEventComment(eventId, values, parentId)
    reset()
    parentId !== 0 && closeForm()
  }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleChatFormSubmit)}>
        <Field name="comment" type="text" component={TextArea} rows={2} />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    )
  }
}

export default reduxForm({ Fields: "comment" })(EventDetailChatForm)
