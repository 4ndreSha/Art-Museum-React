import React from "react";
import { NavLink } from "react-router-dom";
import BookmarkButton from "../BookmarkButton";
import { ArtworkData } from "@/types";
import imgPlaceholder from "@assets/img-placeholder.svg";

import "@components/Card/styles.scss";

const Card: React.FC<ArtworkData> = ({ id, image_id, title, artist_title, is_public_domain }) => {
  const IMG_URL_BASE = process.env.IMG_URL_BASE;
  const IMG_URL_PROPS = "/full/600,/0/default.jpg";
  const imageUrl = image_id ? IMG_URL_BASE + image_id + IMG_URL_PROPS : imgPlaceholder;

  return (
    <NavLink to={`/artwork/${id}`} className="link">
      <div className="card">
        <div className="card__image">
          <img src={imageUrl} alt={title} />
        </div>
        <div className="card__info-container">
          <div className="card__info">
            <div className="card__info-name">{title ? title : "Untitled"}</div>
            <div className="card__info-author orange">{artist_title ? artist_title : "Author unknown"}</div>
            <div className="card__info-access">{is_public_domain ? "Public" : "Private"}</div>
          </div>
          <BookmarkButton />
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
