import React from "react";
import Card from "@components/Card";

import "@components/CardList/styles.scss";

const CardList = () => {
  return (
    <div className="list">
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default CardList;
