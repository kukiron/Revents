import React from "react"
import EventListItem from "./EventListItem"
import InfiniteScroll from "react-infinite-scroller"

const renderEvents = events =>
  events && events.map(event => <EventListItem key={event.id} event={event} />)

const EventList = ({ events, loading, getNextEvents, moreEvents }) => (
  <div>
    {events &&
      events.length > 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}
        >
          {renderEvents(events)}
        </InfiniteScroll>
      )}
  </div>
)

export default EventList
