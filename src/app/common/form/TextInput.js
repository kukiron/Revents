import React from "react"
import { Form, Label } from "semantic-ui-react"

const TextForm = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => (
  <Form.Field error={touched && !!error} width={width}>
    <input {...input} placeholder={placeholder} type={type} />
    {touched &&
      error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
  </Form.Field>
)

export default TextForm
