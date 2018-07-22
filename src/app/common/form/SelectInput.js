import React from "react"
import { Form, Select } from "semantic-ui-react"

import renderError from "../utils/renderError"

const SelectInput = ({
  input,
  type,
  placeholder,
  multiple,
  options,
  meta: { touched, error }
}) => (
  <Form.Field error={touched && !!error}>
    <Select
      value={input.value || null}
      onChange={(e, data) => input.onChange(data.value)}
      placeholder={placeholder}
      options={options}
      multiple={multiple}
    />
    {touched && renderError(error)}
  </Form.Field>
)

export default SelectInput
