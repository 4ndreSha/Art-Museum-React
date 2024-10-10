import React from "react";
import "@components/GallerySuggestor/styles.scss";
import MiniCard from "@components/MiniCard";
import { getArtworksAxios, getNumberOfPages } from "@/api";
import { useState, useEffect, useCallback } from "react";
import { ArtworkCollection, ArtworkData } from "@/types";
import { SkeletonLoaderMiniCard, SkeletonLoaderCard } from "../SkeletonLoader";
import ErrorComponent from "@components/ErrorComponent";
import { ErrorBoundaryStyled } from "@components/ErrorBoundary";

const GallerySuggestor = () => {
  const [loading, setLoading] = useState(true);
  const [artworkCollection, setArtworkCollection] = useState<ArtworkCollection>();
  const [error, setError] = useState("");

  const skeletonCount = 9;

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
        <div className="suggestor__list">
          {Array.from({ length: skeletonCount }, (_, index) => (
            <SkeletonLoaderMiniCard key={index} />
          ))}
        </div>
      ) : (
        <>
          {error && <ErrorComponent error={error} />}
          <ErrorBoundaryStyled>
            <div className="suggestor__list">
              {artworkCollection?.collection.map((art: ArtworkData) => <MiniCard key={art.id} {...art} />)}
            </div>
          </ErrorBoundaryStyled>
        </>
      )}
    </section>
  );
};

export default GallerySuggestor;
