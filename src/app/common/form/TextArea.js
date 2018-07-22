import React from "react"
import { Form } from "semantic-ui-react"

import renderError from "../utils/renderError"

const TextArea = ({
  input,
  rows,
  type,
  placeholder,
  meta: { touched, error }
}) => (
  <Form.Field error={touched && !!error}>
    <textarea {...input} type={type} placeholder={placeholder} rows={rows} />
    {touched && renderError(error)}
  </Form.Field>
)

export default TextArea
