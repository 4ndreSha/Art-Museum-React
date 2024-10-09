import React from "react";
import { NavLink } from "react-router-dom";
import BookmarkButton from "@components/BookmarkButton";
import { ArtworkData } from "@/types";
import imgPlaceholder from "@assets/img-placeholder.svg";

import "@components/MiniCard/styles.scss";

const MiniCard: React.FC<ArtworkData> = ({ id, image_id, title, artist_title, is_public_domain }) => {
  const IMG_URL_BASE = process.env.IMG_URL_BASE;
  const IMG_URL_PROPS = "/full/200,/0/default.jpg";
  const imageUrl = image_id ? IMG_URL_BASE + image_id + IMG_URL_PROPS : imgPlaceholder;

  return (
    <NavLink to={`/artwork/${id}`} className="link">
      <div className="miniCard">
        <div className="miniCard__image">
          <img src={imageUrl} alt={title} />
        </div>
        <div className="miniCard__info">
          <div className="miniCard__info-name">{title ? title : "Untitled"}</div>
          <div className="miniCard__info-author orange">{artist_title ? artist_title : "Author unknown"}</div>
          <div className="miniCard__info-access">{is_public_domain ? "Public" : "Private"}</div>
        </div>
        <BookmarkButton />
      </div>
    </NavLink>
  );
};

export default MiniCard;
