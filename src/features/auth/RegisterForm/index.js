import React from "react"
import { connect } from "react-redux"
import { combineValidators, isRequired } from "revalidate"
import { Form, Segment, Button, Divider } from "semantic-ui-react"
import { reduxForm, Field } from "redux-form"

import TextInput from "../../../app/common/form/TextInput"
import SocialLogin from "../SocialLogin"
import { registerUser } from "../authActions"
import renderError from "../../../app/common/utils/renderError"

const validate = combineValidators({
  displayName: isRequired("User Display Name"),
  email: isRequired("Email"),
  password: isRequired("Password")
})

const RegisterForm = ({
  registerUser,
  handleSubmit,
  error,
  invalid,
  submitting
}) => (
  <div>
    <Form size="large" onSubmit={handleSubmit(registerUser)}>
      <Segment>
        <Field
          name="displayName"
          type="text"
          component={TextInput}
          placeholder="Known As"
        />
        <Field
          name="email"
          type="text"
          component={TextInput}
          placeholder="Email"
        />
        <Field
          name="password"
          type="password"
          component={TextInput}
          placeholder="Password"
        />
        {renderError(error)}
        <Button
          disabled={invalid || submitting}
          fluid
          size="large"
          color="teal"
        >
          Register
        </Button>
        <Divider horizontal>OR</Divider>
        <SocialLogin />
      </Segment>
    </Form>
  </div>
)

export default connect(
  null,
  { registerUser }
)(reduxForm({ form: "registerForm", validate })(RegisterForm))
