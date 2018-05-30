/* global google */
import React, { Component } from "react"
import { connect } from "react-redux"
import { reduxForm, Field } from "redux-form"
import { Grid, Header, Segment, Form, Button } from "semantic-ui-react"
import { geocodeByAddress, getLatLng } from "react-places-autocomplete"
import Script from "react-load-script"
import moment from "moment"
import cuid from "cuid"

import TextInput from "../../../app/common/form/TextInput"
import TeaxtArea from "../../../app/common/form/TextArea"
import SelectInput from "../../../app/common/form/SelectInput"
import DateInput from "../../../app/common/form/DateInput"
import PlaceInput from "../../../app/common/form/PlaceInput"
import { category } from "../../../app/data/eventData"
import { createEvent, updateEvent } from "../eventActions"
import { validate } from "../../../app/common/form/formValidate"
import { googleApiKey } from "../../../app/config/keys"

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  handleScriptLoad = () => this.setState({ scriptLoaded: true })

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        })
      })
      .then(() => {
        this.props.change("city", selectedCity)
      })
  }

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        })
      })
      .then(() => {
        this.props.change("venue", selectedVenue)
      })
  }

  onFormSubmit = values => {
    const { initialValues, createEvent, updateEvent, history } = this.props
    values.date = moment(values.date).format()
    values.venueLatLng = this.state.venueLatLng

    if (initialValues.id) {
      updateEvent(values)
      history.goBack()
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob Lee Swagger"
      }
      createEvent(newEvent)
      history.push("/events")
    }
  }

  render() {
    const { invalid, submitting, pristine } = this.props
    return (
      <Grid>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                type="text"
                rows={3}
                component={TeaxtArea}
                placeholder="Tell us about your event"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ type: ["(cities)"] }}
                placeholder="Event City"
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded && (
                <Field
                  name="venue"
                  type="text"
                  component={PlaceInput}
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    type: ["establishments"]
                  }}
                  placeholder="Event Venue"
                  onSelect={this.handleVenueSelect}
                />
              )}
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="Event Date"
              />
              <Button
                positive
                type="submit"
                disabled={invalid || submitting || pristine}
              >
                Submit
              </Button>
              <Button type="button" onClick={this.props.history.goBack}>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ({ events }, ownProps) => {
  const eventId = ownProps.match.params.id
  let event = {}

  if (eventId && events.length) {
    event = events.filter(event => event.id === eventId)[0]
  }
  // "initialValues" provides the redux-form the initial data to populate with
  return { initialValues: event }
}

export default connect(mapStateToProps, { createEvent, updateEvent })(
  reduxForm({ form: "eventForm", enableReinitialize: true, validate })(
    EventForm
  )
)
