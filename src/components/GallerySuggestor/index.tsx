import React from "react";
import MiniCard from "@components/MiniCard";
import "@components/GallerySuggestor/styles.scss";

const GallerySuggestor = () => {
  return (
    <section className="suggestor">
      <h4 className="suggestor__subtitle orange">Here some more</h4>
      <h2 className="suggestor__title">Other works for you</h2>
      {/* {isLoading ? <p className={styles.loading}> Loading... </p> : <></>} */}
      <div className="suggestor__list">
        {/* {result.map((card: ArtWork) => ())} */}
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
      </div>
    </section>
  );
};

export default GallerySuggestor;
