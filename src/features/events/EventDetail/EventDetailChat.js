import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Segment, Header, Comment } from "semantic-ui-react"
import distanceInWords from "date-fns/distance_in_words"

import EventDetailChatForm from "./EventDetailChatForm"

class EventDetailChat extends Component {
  state = { showReplyForm: false, selectedCommentId: null }

  handleOpenReplyForm = id => () => {
    this.setState({ showReplyForm: true, selectedCommentId: id })
  }

  handleCloseReplyForm = () => {
    this.setState({
      showReplyForm: false,
      selectedCommentId: null
    })
  }

  renderComment = (
    comment,
    showReplyForm,
    selectedCommentId,
    addEventComment,
    eventId
  ) => (
    <Comment.Content>
      <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
        {comment.displayName}
      </Comment.Author>
      <Comment.Metadata>
        <div>{distanceInWords(comment.date, Date.now())}</div>
      </Comment.Metadata>
      <Comment.Text>{comment.text}</Comment.Text>
      <Comment.Actions>
        <Comment.Action onClick={this.handleOpenReplyForm(comment.id)}>
          Reply
        </Comment.Action>
        {showReplyForm &&
          selectedCommentId === comment.id && (
            <EventDetailChatForm
              parentId={comment.parentId !== 0 ? comment.parentId : comment.id}
              addEventComment={addEventComment}
              eventId={eventId}
              form={`reply_${comment.id}`}
              closeForm={this.handleCloseReplyForm}
            />
          )}
      </Comment.Actions>
    </Comment.Content>
  )

  render() {
    const { eventChat, addEventComment, eventId } = this.props
    const state = [this.state.showReplyForm, this.state.selectedCommentId]
    const props = [addEventComment, eventId]

    return (
      <div>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{ border: "none" }}
        >
          <Header>Chat about this event</Header>
        </Segment>

        <Segment attached>
          <Comment.Group>
            {eventChat &&
              eventChat.map(comment => (
                <Comment key={comment.id}>
                  <Comment.Avatar
                    src={comment.photoURL || "/assets/user.png"}
                  />
                  {this.renderComment(comment, ...state, ...props)}

                  {comment.childNodes &&
                    comment.childNodes.map(child => (
                      <Comment.Group key={child.id}>
                        <Comment>
                          <Comment.Avatar
                            src={child.photoURL || "/assets/user.png"}
                          />
                          {this.renderComment(child, ...state, ...props)}
                        </Comment>
                      </Comment.Group>
                    ))}
                </Comment>
              ))}
          </Comment.Group>
          <EventDetailChatForm
            parentId={0}
            addEventComment={addEventComment}
            eventId={eventId}
            form={"newComment"}
          />
        </Segment>
      </div>
    )
  }
}

export default EventDetailChat
