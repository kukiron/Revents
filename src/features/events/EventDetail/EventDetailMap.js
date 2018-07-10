import React from "react"
import { Segment, Icon } from "semantic-ui-react"
import GoogleMapReact from "google-map-react"

import { googleApiKey } from "../../../app/config/keys"

const Marker = () => <Icon name="marker" size="big" color="red" />

const EventDetailMap = ({ lat, lng }) => {
  const center = [lat, lng]
  const zoom = 11

  return (
    <Segment attahced="bottom" style={{ padding: 0 }}>
      <div style={{ height: 400, width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleApiKey }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  )
}

export default EventDetailMap
