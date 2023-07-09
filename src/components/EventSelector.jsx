import React from "react";

const EventSelector = (props) => {
  return (
    <div className="event-search">
      <h3>Search for an event</h3>
      <p><a style={{color: "#fff", textDecoration: "underline"}} href="https://app.airstack.xyz/explorer" target="_blank" rel="noopener noreferrer">Use Airstack AI to look up event IDs</a></p>
      <input
        type="text"
        value={props.eventId}
        onChange={(e) => props.setEventId({eventId: e.target.value})}
        placeholder="Enter event ID to search"
      />
    </div>
  );
};

export default EventSelector;
