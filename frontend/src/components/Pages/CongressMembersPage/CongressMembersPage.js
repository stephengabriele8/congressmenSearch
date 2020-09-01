import React, { useState, useEffect } from "react";
import "./CongressMembersPage.scss";
import Card from "./../../Card/Card";
import axios from "axios";

const CongressMembersPage = () => {
  const [data, setData] = useState();
  const items = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3001/getCongressData");
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="CongressMembersPage">
      <header className="CongressMembersPage__header">
        Search and filter placeholder
      </header>
      <div className="CongressMembersPage__cards">
        {data &&
          data.map((person, index) => (
            <div key={index} className="CongressMembersPage__card">
              <Card congressPerson={person} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CongressMembersPage;
