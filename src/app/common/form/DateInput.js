import React from "react"
import { Form } from "semantic-ui-react"
import DatePicker from "react-datepicker"
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css"

import renderError from "../utils/renderError"

const DateInput = ({
  input: { value, onChange, onBlur, ...restInput },
  width,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  if (value) {
    value = moment(value, "X")
  }

  return (
    <Form.Field error={touched && !!error} width={width}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected={value ? moment(value) : null}
        onChange={onChange}
        onBlur={() => onBlur()}
        {...restInput}
      />
      {touched && renderError(error)}
    </Form.Field>
  )
}

export default DateInput
