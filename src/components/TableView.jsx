import React from "react";
import graph from "../assets/graph.png";

const TableView = (props) => {
  const renderPopulated = () => {
    return (
      <div>
        <button  style={{marginBottom: 12, marginLeft: 10}} onClick={props.buildGraph} className="btn">Reload table</button>
        <table>          
          <thead>
            <tr>
              <th scope="col">User address(es)</th>
              <th scope="col">Social App</th>
              <th scope="col" rowspan="2">
                Social Username
              </th>
              <th scope="col" rowspan="2">
                Social UserID
              </th>
              <th scope="col" rowspan="2">
                Linked Address
              </th>
            </tr>
          </thead>
          <tbody>
            {props.graphResults.map((r) => {
              return (
                <tr key={r.userAddress || r.addresses[0]}>
                  <td>
                    {r.userAddress
                      ? r.userAddress
                      : r.addresses.length > 0
                      ? r.addresses.join(", ")
                      : r.addresses[0]}
                  </td>
                  <td>{r.dappName}</td>
                  <td>{r.profileName}</td>
                  <td>{r.userId}</td>
                  <td>{r.userAddress}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderEmpty = () => {
    return (
      <div className="empty-state">
        <img src={graph} alt="Graph of knowledge" />
        <h1>Make your selections to build your graph</h1>
        <button disabled={!props.selectionsMade} onClick={props.buildGraph}>
          Build now
        </button>
      </div>
    );
  };

  return (
    <div className="table">
      {props.graphResults ? <>{renderPopulated()}</> : <>{renderEmpty()}</>}
    </div>
  );
};

export default TableView;
