import { useState, useEffect } from "react";
import NavBar from './components/NavBar'
import SocialSelector from "./components/SocialSelector";
import CommunitySelector from "./components/CommunitySelector";
import TableView from "./components/TableView";
import { init, useLazyQueryWithPagination } from "@airstack/airstack-react";

init("YOUR API KEY HERE");


function App() {
  const [selectedSocials, setSelectedSocials] = useState([]);
  const [communityAddresses, setCommunityAddresses] = useState("");
  const [query, setQuery] = useState(``);
  const [filteredData, setFilteredData] = useState([]);

  const [fetch, { data, loading, pagination, error }] = useLazyQueryWithPagination(query, {});
  const { hasNextPage, hasPrevPage, getNextPage, getPrevPage } = pagination;

  useEffect(() => {
    const nftAddresses = communityAddresses.split(",");
    const queryWithCommunities = `
    query HoldersAndUsernames {
  TokenNfts(
    input: {filter: {address: {_in: ${JSON.stringify(nftAddresses)} }}, blockchain: ethereum, limit: 100}
  ) {
    TokenNft {
      tokenBalances {
        owner {
          socials {
            profileName
            userAddress
            userId
            dappName
          }, 
          addresses
        }
      }
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
}
    `
    const socialOnlyQuery = `query SocialOnly {
      Socials(
        input: {filter: {dappName: {_in: [${selectedSocials}]}}, blockchain: ethereum, limit: 100}
      ) {
        Social {
          userId
          dappName
          profileName      
          userAddress
        }
      }
    }`    

    setQuery(communityAddresses ? queryWithCommunities : socialOnlyQuery);
  }, [selectedSocials, communityAddresses])

  useEffect(() => {    
    if(data && data?.TokenNfts) {
      const dataToFilter = data?.TokenNfts?.TokenNft;

      const dataToReturn = []
      for(const d of dataToFilter) {
        if(d.tokenBalances) {
          let newD = {
            addresses: d?.tokenBalances.flatMap(b => b.owner.addresses)
          }
          const socials = d.tokenBalances.flatMap(b => b.owner.socials);
          if(selectedSocials.length > 0) {
            socials.forEach(s => {
              console.log(s)
              if(s !== null && selectedSocials.includes(s.dappName)) {
                newD = {
                  ...newD, 
                  ...s
                }              
              }
            })
          }  
          dataToReturn.push(newD);
        }       
      }
      setFilteredData(dataToReturn)
    } else {
      setFilteredData(data?.Socials?.Social);
    }
  }, [data]);

  return (
    <>
     <NavBar />
     <div className="main-view">
        <div className="selectors">
          <SocialSelector selectedSocials={selectedSocials} setSelectedSocials={setSelectedSocials} />
          <CommunitySelector communityAddresses={communityAddresses} setCommunityAddresses={setCommunityAddresses} />
        </div>
        <div>
          <TableView graphResults={filteredData} buildGraph={() => fetch()} selectionsMade={selectedSocials.length > 0 || communityAddresses} />
        </div>
      </div>
    </>
  )
}

export default App
