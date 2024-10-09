import React from "react";

import "@components/SkeletonLoader/styles.scss";

export const SkeletonLoaderCard = () => {
  return (
    <div className="skeleton__card">
      <div className="skeleton__card__image"></div>
      <div className="skeleton__card__info-container">
        <div className="skeleton__card__info">
          <div className="skeleton__card__info-name"></div>
          <div className="skeleton__card__info-author"></div>
          <div className="skeleton__card__info-access"></div>
        </div>
      </div>
      <div className="skeleton__card-bookmark__button"></div>
    </div>
  );
};

export const SkeletonLoaderMiniCard = () => {
  return (
    <div className="skeleton__miniCard">
      <div className="skeleton__miniCard__wrapper">
        <div className="skeleton__miniCard__image" />
        <div className="skeleton__miniCard__info">
          <div className="skeleton__miniCard__info-name"></div>
          <div className="skeleton__miniCard__info-author"></div>
          <div className="skeleton__miniCard__info-access"></div>
        </div>
      </div>
      <div className="skeleton__miniCard-bookmark__button"></div>
    </div>
  );
};
