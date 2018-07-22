import React, { Component } from "react"
import { Form } from "semantic-ui-react"
import Script from "react-load-script"
import PlacesAutocomplete from "react-places-autocomplete"

import { googleApiKey } from "../../config/keys"
import renderError from "../utils/renderError"

const styles = {
  autocompleteContainer: {
    zIndex: 1000
  }
}

class PlaceInput extends Component {
  state = { scriptLoaded: false }

  handleScriptLoad = () => this.setState({ scriptLoaded: true })

  render() {
    const {
      input,
      width,
      onSelect,
      placeholder,
      options,
      meta: { touched, error }
    } = this.props

    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        {this.state.scriptLoaded && (
          <PlacesAutocomplete
            inputProps={{ ...input, placeholder }}
            options={options}
            onSelect={onSelect}
            styles={styles}
          />
        )}
        {touched && renderError(error)}
      </Form.Field>
    )
  }
}

export default PlaceInput
