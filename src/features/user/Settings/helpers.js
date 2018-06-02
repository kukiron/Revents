import React from "react"
import { Header, Button, Icon } from "semantic-ui-react"

export const renderFacebook = providerId =>
  providerId &&
  providerId === "facebook.com" && (
    <div>
      <Header color="teal" sub content="Facebook Account" />
      <p>Please visit Facebook to update your account settings</p>
      <Button type="button" color="facebook">
        <Icon name="facebook" />
        Go to Facebook
      </Button>
    </div>
  )

export const renderGoogle = providerId =>
  providerId &&
  providerId === "google.com" && (
    <div>
      <Header color="teal" sub content="Google Account" />
      <p>Please visit Google to update your account settings</p>
      <Button type="button" color="google plus">
        <Icon name="google plus" />
        Go to Google
      </Button>
    </div>
  )
