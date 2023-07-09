import { useState, useEffect } from "react";
import NavBar from './components/NavBar'
import EventSelector from "./components/EventSelector";
import TableView from "./components/TableView";
import { init, useLazyQueryWithPagination } from "@airstack/airstack-react";

const KEY = import.meta.env.VITE_AIRSTACK_KEY

init(KEY);


function App() {  
  const [variables, setVariables] = useState({
    eventId: ""
  })

  const query = `
  query POAPEventAttendeesAndSocialProfiles($eventId: String!) {
    Poaps(input: {filter: {eventId: {_eq: $eventId}}, blockchain: ALL, limit: 200}) {
      Poap {
        owner {
          identity
          socials {
            profileName
            userHomeURL
            profileTokenUri
          }
        }
      }
    }
  }
  `

  const [fetch, { data, loading, pagination, error }] = useLazyQueryWithPagination(query, variables, {});
  const { hasNextPage, hasPrevPage, getNextPage, getPrevPage } = pagination;

  return (
    <>
     <NavBar />
     <div className="main-view">
        <div className="event-input">         
          <EventSelector eventId={variables.eventId} setEventId={setVariables} />
        </div>
        <div>
          <TableView eventId={variables.eventId} results={data?.Poaps?.Poap || []} searchAttendees={() => fetch()} />
        </div>
      </div>
    </>
  )
}

export default App
