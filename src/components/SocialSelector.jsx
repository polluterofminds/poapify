import React from "react";

const socialOptions = [
  {
    name: "Farcaster",
    value: "farcaster",
  },
  {
    name: "Lens", 
    value: "lens",   
  }
];

const SocialSelector = (props) => {
  const handleSelectedSocials = (e) => {
    const value = e.target.value;
    if(props.selectedSocials.includes(value)) {
      props.setSelectedSocials(props.selectedSocials.filter(s => s !== value));
    } else {
      const clonedSelections = JSON.parse(JSON.stringify(props.selectedSocials));
      clonedSelections.push(value);
      props.setSelectedSocials(clonedSelections);
    }
  }

  return (
    <div className="social">
      <h3>Connect Social Profiles</h3>
      {socialOptions.map((s) => {
        return (
          <div key={s.value}>
          <label>
            <input
              value={s.value}
              type="checkbox"
              checked={props.selectedSocials.includes(s.value)}
              onChange={handleSelectedSocials}
            />
            {s.name}
          </label>
          </div>
        );
      })}
    </div>
  );
};

export default SocialSelector;
