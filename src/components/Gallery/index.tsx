import React from "react";
import Pagination from "@components/Pagination";
import CardList from "@components/CardList";

import "@components/Gallery/styles.scss";

const Gallery = () => {
  return (
    <section className="gallery">
      <h4 className="gallery__subtitle orange">Topics for you</h4>
      <h2 className="gallery__title">Our special gallery</h2>
      <CardList />
      <Pagination />
    </section>
  );
};

export default Gallery;
