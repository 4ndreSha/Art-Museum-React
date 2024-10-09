import React from "react";
import BookmarkButton from "@components/BookmarkButton";
import { getArtworkById } from "@/api";
import { useState, useEffect, useCallback } from "react";
import { ArtworkData } from "@/types";
import { useParams } from "react-router-dom";
import imgPlaceholder from "@assets/img-placeholder.svg";

import "@components/ArtworkInfo/styles.scss";

const ArtworkInfo = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [artworkData, setArtworkData] = useState<ArtworkData>();

  const IMG_URL_BASE = process.env.IMG_URL_BASE;
  const IMG_URL_PROPS = "/full/600,/0/default.jpg";
  const imageUrl = artworkData?.image_id ? IMG_URL_BASE + artworkData.image_id + IMG_URL_PROPS : imgPlaceholder;

  const fetchArtworkData = async (id: string) => {
    setLoading(true);
    try {
      const data = await getArtworkById(id);
      setArtworkData(data);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to fetch artworks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchArtworkData(id);
      console.log(artworkData);
      console.log(id);
    }
  }, [id]);

  return (
    <section className="artwork">
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <div className="artwork__image">
            <img src={imageUrl} alt={artworkData?.title} />
            <BookmarkButton />
          </div>
          <div className="artwork__textContainer">
            <div className="artwork__info">
              <h2 className="artwork__info-name">{artworkData?.title ? artworkData.title : "Untitled"}</h2>
              <div className="artwork__info-author orange">
                {artworkData?.artist_title ? artworkData.artist_title : "Author unknown"}
              </div>
              <div className="artwork__info-date">
                {artworkData?.date_display ? artworkData.date_display : "No date"}
              </div>
            </div>
            <div className="artwork__overview">
              <h3 className="artwork__overview-title">Overview</h3>
              <div className="artwork__overview-nationality">
                <span className="orange">Artist nationality: </span>
                {artworkData?.date_display ? artworkData.artist_display : "No date"}
              </div>
              <div className="artwork__overview-dimensions">
                <span className="orange">Sheet Dimensions: </span>
                {artworkData?.dimensions ? artworkData.dimensions : "Unknown"}
              </div>
              <div className="artwork__overview-creditLine">
                <span className="orange">Credit Line: </span>
                {artworkData?.credit_line ? artworkData.credit_line : "No description"}
              </div>
              <div className="artwork__overview-repository">
                <span className="orange">Repository: </span>
                {artworkData?.department_title ? artworkData.department_title : "Private collection"}
              </div>
              <h6 className="artwork__overview-access">{artworkData?.is_public_domain ? "Public" : "Private"}</h6>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ArtworkInfo;
