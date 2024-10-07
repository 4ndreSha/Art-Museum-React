import React from "react";
import { NavLink } from "react-router-dom";

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
          <div className="miniCard__info-name">название</div>
          <div className="miniCard__info-author">автор</div>
          <div className="miniCard__info-access">Public</div>
        </div>
        <button className="miniCard__favButton" />
      </div>
    </NavLink>
  );
};

export default MiniCard;
