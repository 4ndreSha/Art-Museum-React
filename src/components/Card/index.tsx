import React from "react";
import { NavLink } from "react-router-dom";
import BookmarkButton from "../BookmarkButton";

import "@components/Card/styles.scss";

const Card = () => {
  return (
    <NavLink to={`/artwork/`} className="link">
      <div className="card">
        <div className="card__image">
          <img />
          картинка
        </div>
        <div className="card__info-container">
          <div className="card__info">
            <div className="card__info-name">Название оочень длинноеааааааа</div>
            <div className="card__info-author orange">Автор тоже оооочеень длиииинный</div>
            <div className="card__info-access">Public</div>
          </div>
          <BookmarkButton />
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
