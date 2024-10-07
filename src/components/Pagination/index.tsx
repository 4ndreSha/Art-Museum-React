import React from "react";

import "@components/Pagination/styles.scss";

const Pagination = () => {
  return (
    <div className="pagination">
      <button className="pagination__button-1 active">1</button>
      <button className="pagination__button-2">2</button>
      <button className="pagination__button-3">3</button>
      <button className="pagination__button-4">4</button>
      <button className="pagination__button-next">&gt;</button>
    </div>
  );
};

export default Pagination;
