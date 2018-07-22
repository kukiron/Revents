import React from "react"
import { Form } from "semantic-ui-react"

import renderError from "../utils/renderError"

const TextForm = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => (
  <Form.Field error={touched && !!error} width={width}>
    <input {...input} placeholder={placeholder} type={type} />
    {touched && renderError(error)}
  </Form.Field>
)

export default TextForm
