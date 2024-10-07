import React from "react";
import MiniCard from "@components/MiniCard";
import "@components/FavoritesComponent/styles.scss";
import bookmark from "@assets/bookmark.svg";

const FavoritesComponent = () => {
  return (
    <section className="favorites">
      <h2 className="favorites__subtitle">Here Are Your </h2>
      <h1 className="favorites__title orange">Favorites</h1>
      <h4 className="favorites__list-subtitle orange">Saved by you</h4>
      <h3 className="favorites__list-title">Your favorites list</h3>
      {/* {isLoading ? <p className={styles.loading}> Loading... </p> : <></>} */}
      <h2 className="favorites__list-empty">You haven&apos;t saved any favorites yet... Why not explore some?</h2>
      <div className="favorites__list">
        {/* {result.map((card: ArtWork) => ())} */}
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
      </div>
    </section>
  );
};

export default FavoritesComponent;
