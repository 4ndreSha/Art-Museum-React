import React from "react";
import Card from "@components/Card";
import Pagination from "@components/Pagination";
import { getArtworksAxios } from "@/api";
import { useState, useEffect, useCallback } from "react";
import { ArtworkCollection, ArtworkData } from "@/types";
import { SkeletonLoaderCard, SkeletonLoaderMiniCard } from "../SkeletonLoader";
import ErrorComponent from "../ErrorComponent";

import "@components/CardList/styles.scss";

const CardList = () => {
  const [loading, setLoading] = useState(true);
  const [artworkCollection, setArtworkCollection] = useState<ArtworkCollection>();
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const skeletonCount = 3;

  const fetchArtworks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getArtworksAxios(currentPage, 3);
      setArtworkCollection(data);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to fetch artworks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchArtworks();
  }, [currentPage]);

  const onClickHandler = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="list-wrapper">
      {error && <ErrorComponent error={error} />}

      <SkeletonLoaderMiniCard key={1} />
      {loading ? (
        <>
          <div className="list">
            {Array.from({ length: skeletonCount }, (_, index) => (
              <SkeletonLoaderCard key={index} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="list">
            {artworkCollection?.collection.map((art: ArtworkData) => <Card key={art.id} {...art} />)}
          </div>
        </>
      )}
      <Pagination
        currentPage={currentPage}
        onClickHandler={onClickHandler}
        totalPages={artworkCollection?.totalPages || 10000}
      />
    </div>
  );
};

export default CardList;
