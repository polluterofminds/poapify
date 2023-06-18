import React from "react";

const CommunitySelector = (props) => {
  return (
    <div className="communities">
      <h3>Connect Your Communities</h3>
      <input
        type="text"
        value={props.communityAddresses}
        onChange={(e) => props.setCommunityAddresses(e.target.value)}
        placeholder="Enter NFT token addresses separated by a comma"
      />
    </div>
  );
};

export default CommunitySelector;
