import React from "react";
import graph from "../assets/graph.png";

const TableView = (props) => {
  const renderPopulated = () => {
    return (
      <div>
        <button  style={{marginBottom: 12, marginLeft: 10}} onClick={props.searchAttendees} className="btn">Reload table</button>
        <table>          
          <thead>
            <tr>
              <th scope="col">User address</th>
              <th scope="col" rowspan="2">
                Social Usernames
              </th>
            </tr>
          </thead>
          <tbody>
            {props.results.map((r) => {
              return (
                <tr key={r.owner.indentity}>
                  <td>
                    {r.owner.identity}
                  </td>
                  <td>{r.owner.socials && r.owner.socials.map(s => {
                    return (
                      <><span title={s.profileName}>{s.profileName.split(0, 20)}</span><br/></>)
                  })}</td>                  
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
        <h1>Enter an Event ID and see attendees now</h1>
        <button disabled={!props.eventId} onClick={props.searchAttendees}>
          View now
        </button>
      </div>
    );
  };

  return (
    <div className="table">
      {props.results.length ? <>{renderPopulated()}</> : <>{renderEmpty()}</>}
    </div>
  );
};

export default TableView;
