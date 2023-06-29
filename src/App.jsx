import { useState, useEffect } from "react";
import NavBar from './components/NavBar'
import EventSelector from "./components/EventSelector";
import TableView from "./components/TableView";
import { init, useLazyQueryWithPagination } from "@airstack/airstack-react";

init("YOUR API KEY HERE");


function App() {  
  const [eventId, setEventId] = useState("");
  const [query, setQuery] = useState(``);
  const [filteredData, setFilteredData] = useState([]);

  const [fetch, { data, loading, pagination, error }] = useLazyQueryWithPagination(query, {});
  const { hasNextPage, hasPrevPage, getNextPage, getPrevPage } = pagination;

  useEffect(() => {
    const newQuery = `
    query POAPEventAttendeesAndSocialProfiles {
      Poaps(input: {filter: {eventId: {_eq: "${eventId}"}}, blockchain: ALL, limit: 200}) {
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
    setQuery(newQuery);
  }, [eventId])

  return (
    <>
     <NavBar />
     <div className="main-view">
        <div className="event-input">         
          <EventSelector eventId={eventId} setEventId={setEventId} />
        </div>
        <div>
          <TableView eventId={eventId} results={data?.Poaps?.Poap || []} searchAttendees={() => fetch()} />
        </div>
      </div>
    </>
  )
}

export default App
