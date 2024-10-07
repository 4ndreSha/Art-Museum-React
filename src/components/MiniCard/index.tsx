import React from "react";
import { NavLink } from "react-router-dom";
import BookmarkButton from "@components/BookmarkButton";

import "@components/MiniCard/styles.scss";

const MiniCard = () => {
  return (
    <NavLink to={`/artwork/`} className="link">
      <div className="miniCard">
        <div className="miniCard__image">
          <img />
          картинка
        </div>
        <div className="miniCard__info">
          <div className="miniCard__info-name">Название оочень длинноеааааааа</div>
          <div className="miniCard__info-author orange">Автор</div>
          <div className="miniCard__info-access">Public</div>
        </div>
        <BookmarkButton />
      </div>
    </NavLink>
  );
};

export default MiniCard;
