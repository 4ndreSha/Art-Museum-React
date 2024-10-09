import React from "react";
import "@components/GallerySuggestor/styles.scss";
import MiniCard from "@components/MiniCard";
import { getArtworksAxios, getNumberOfPages } from "@/api";
import { useState, useEffect, useCallback } from "react";
import { ArtworkCollection, ArtworkData } from "@/types";

const GallerySuggestor = () => {
  const [loading, setLoading] = useState(true);
  const [artworkCollection, setArtworkCollection] = useState<ArtworkCollection>();
  const [error, setError] = useState("");

  const getRandomPage = (maxPages: number) => {
    return Math.floor(Math.random() * maxPages);
  };

  const fetchArtworks = useCallback(async () => {
    try {
      setLoading(true);
      const numberOfPages = await getNumberOfPages(1, 9);
      const randomPageNumber = getRandomPage(numberOfPages);
      const data = await getArtworksAxios(randomPageNumber, 9);
      setArtworkCollection(data);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to fetch artworks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  return (
    <section className="suggestor">
      <h4 className="suggestor__subtitle orange">Here some more</h4>
      <h2 className="suggestor__title">Other works for you</h2>
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          {error && <div className="error-message">{error}</div>}
          <div className="suggestor__list">
            {artworkCollection?.collection.map((art: ArtworkData) => <MiniCard key={art.id} {...art} />)}
          </div>
        </>
      )}
    </section>
  );
};

export default GallerySuggestor;
