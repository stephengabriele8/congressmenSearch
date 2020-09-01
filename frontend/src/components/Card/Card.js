import React from "react";
import "./Card.scss";
import PartyAffiliation from "./../PartyAffiliation/PartyAffiliation";
const states = require("us-state-converter");

const Card = (props) => {
  const {
    congressPerson: { image, name, title, politicalAffiliation, state },
  } = props;

  return (
    <div className="Card">
      <img
        className="Card__image"
        src={`data:image/webp;base64,${image}`}
        alt="Profile image"
      />
      <div className="Card__Name Card__row-item">{name}</div>
      <div className="Card__heading Card__row-item">
        <div className="Card__title">{title}</div>
        <PartyAffiliation party={politicalAffiliation} />
      </div>
      <div className="Card__state Card__row-item">{states.fullName(state)}</div>
    </div>
  );
};

export default Card;
