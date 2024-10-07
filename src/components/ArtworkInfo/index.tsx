import React from "react";
import BookmarkButton from "@components/BookmarkButton";

import "@components/ArtworkInfo/styles.scss";

const ArtworkInfo = () => {
  return (
    <section className="artwork">
      {/* {isLoading ? (<p className={styles.loading}> Loading... </p>) : ()} */}
      <div className="artwork__image">
        <img />
        <BookmarkButton />
      </div>
      <div className="artwork__textContainer">
        <div className="artwork__info">
          <h2 className="artwork__info-name">title</h2>
          <div className="artwork__info-author orange">author</div>
          <div className="artwork__info-date">date</div>
        </div>
        <div className="artwork__overview">
          <h3 className="artwork__overview-title">Overview</h3>
          <div className="artwork__overview-nationality">
            <span className="orange">Artist nationality: </span>info
          </div>
          <div className="artwork__overview-dimensions">
            <span className="orange">Sheet Dimensions: </span>dimensions
          </div>
          <div className="artwork__overview-creditLine">
            <span className="orange">Credit Line: </span>credit line
          </div>
          <div className="artwork__overview-repository">
            <span className="orange">Repository: </span>repository
          </div>
          <h6 className="artwork__overview-access">Private</h6>
        </div>
      </div>
    </section>
  );
};

export default ArtworkInfo;
