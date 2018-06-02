import React from "react"
import { Field, reduxForm } from "redux-form"
import {
  combineValidators,
  composeValidators,
  matchesField,
  isRequired
} from "revalidate"
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button
} from "semantic-ui-react"

import TextInput from "../../../app/common/form/TextInput"
import { renderFacebook, renderGoogle } from "./helpers"

const validate = combineValidators({
  newPassword1: isRequired({ message: "Please enter a password" }),
  newPassword2: composeValidators(
    isRequired({ message: "Please confirm your password" }),
    matchesField("newPassword1")({ message: "Passwords do not match" })
  )()
})

const AccountPage = ({
  error,
  handleSubmit,
  updatePassword,
  providerId,
  invalid,
  submitting
}) => (
  <Segment>
    <Header dividing size="large" content="Account" />
    {providerId &&
      providerId === "password" && (
        <div>
          <Header color="teal" sub content="Change password" />
          <p>Use this form to update your account settings</p>
          <Form onSubmit={handleSubmit(updatePassword)}>
            <Field
              width={8}
              name="newPassword1"
              type="password"
              pointing="left"
              inline={true}
              component={TextInput}
              basic={true}
              placeholder="New Password"
            />
            <Field
              width={8}
              name="newPassword2"
              type="password"
              inline={true}
              basic={true}
              pointing="left"
              component={TextInput}
              placeholder="Confirm Password"
            />
            {error && (
              <Label basic color="red">
                {error}
              </Label>
            )}
            <Divider />
            <Button
              disabled={invalid || submitting}
              size="large"
              positive
              content="Update Password"
            />
          </Form>
        </div>
      )}
    {renderFacebook(providerId)}
    {renderGoogle(providerId)}
  </Segment>
)

export default reduxForm({ form: "account", validate })(AccountPage)
