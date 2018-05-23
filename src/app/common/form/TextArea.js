import React from "react"
import { Form, Label } from "semantic-ui-react"

const TextArea = ({
  input,
  rows,
  type,
  placeholder,
  meta: { touched, error }
}) => (
  <Form.Field error={touched && !!error}>
    <textarea {...input} type={type} placeholder={placeholder} rows={rows} />
    {touched &&
      error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
  </Form.Field>
)

export default TextArea
