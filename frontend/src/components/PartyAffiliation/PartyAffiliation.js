import React from "react";
import "./PartyAffiliation.scss";

const PartyAffiliation = (props) => {
  const { party } = props;

  const colorDecider = (party) => {
    let partyColorClass;
    switch (party.charAt(0).toLowerCase()) {
      case "d":
        partyColorClass = "PartyAffiliation__democrat";
        break;
      case "r":
        partyColorClass = "PartyAffiliation__republican";
        break;
      case "l":
        partyColorClass = "PartyAffiliation__libertarian";
        break;
      default:
        partyColorClass = "PartyAffiliation__independent";
    }

    return partyColorClass;
  };
  return (
    <div className={`PartyAffiliation ${party && colorDecider(party)}`}>
      {party && party.charAt(0).toUpperCase()}
    </div>
  );
};

export default PartyAffiliation;
