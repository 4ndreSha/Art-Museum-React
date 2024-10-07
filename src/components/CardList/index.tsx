import React from "react";
import Card from "@components/Card";
import Pagination from "@components/Pagination";

import "@components/CardList/styles.scss";

const CardList = () => {
  return (
    <div className="list-wrapper">
      <div className="list">
        <Card />
        <Card />
        <Card />
      </div>
      <Pagination />
    </div>
  );
};

export default CardList;
