import React from "react";
import MiniCard from "@components/MiniCard";
import bookmark from "@assets/bookmark.svg";
import { useEffect, useState } from "react";
import { useSessionStorageContext } from "@/utils/SessionStorage";
import { getArtworkById } from "@/api";
import { ArtworkData } from "@/types";

import "@components/FavoritesComponent/styles.scss";

const FavoritesComponent = () => {
  const [artworkCollection, setArtworkCollection] = useState<ArtworkData[]>([]);
  const [loading, setLoading] = useState(true);

  const sessionStorageContext = useSessionStorageContext();
  const ids = sessionStorageContext.getAll();

  const fetchResults = async () => {
    try {
      setLoading(true);

      const res = await Promise.all(
        ids.map(async (id) => {
          const data = await getArtworkById(id.toString());
          return data;
        }),
      );
      setArtworkCollection(res);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <section className="favorites">
      <h2 className="favorites__subtitle">Here Are Your </h2>
      <h1 className="favorites__title orange">Favorites</h1>
      <h4 className="favorites__list-subtitle orange">Saved by you</h4>
      <h3 className="favorites__list-title">Your favorites list</h3>
      {loading ? (
        <div className="loading-gif" />
      ) : (
        <>
          {artworkCollection.length > 0 ? (
            <div className="favorites__list">
              {artworkCollection.map((card: ArtworkData) => (
                <MiniCard key={card.id} {...card} />
              ))}
            </div>
          ) : (
            <h2 className="favorites__list-empty">You haven&apos;t saved any favorites yet... Why not explore some?</h2>
          )}
        </>
      )}
    </section>
  );
};

export default FavoritesComponent;
