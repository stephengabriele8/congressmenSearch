import React from "react";
import "./Card.scss";
import PartyAffiliation from "./../PartyAffiliation/PartyAffiliation";

const Card = () => {
  return (
    <div className="Card">
      <img
        className="Card__image"
        src="https://theunitedstates.io/images/congress/450x550/C000127.jpg"
        alt="Profile image"
      />
      <div className="Card__Name Card__row-item">Name</div>
      <div className="Card__heading Card__row-item">
        <div className="Card__title">Congressman</div>
        <PartyAffiliation />
      </div>
      <div className="Card__state Card__row-item">State</div>
    </div>
  );
};

export default Card;
