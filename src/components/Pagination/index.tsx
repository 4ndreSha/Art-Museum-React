import React from "react";
import "@components/Pagination/styles.scss";
import { useState } from "react";

interface PaginationProps {
  currentPage: number;
  onClickHandler: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onClickHandler, totalPages = 10000 }) => {
  const [startPage, setStartPage] = useState(1);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const pageValue = Number(event.currentTarget.value);
    if (pageValue > startPage + 1) {
      setStartPage(pageValue - 1);
    }
    if (startPage !== 1 && pageValue === startPage) {
      setStartPage(pageValue - 1);
    }
    onClickHandler(pageValue);
  };

  const handleClickArrow = (event: React.MouseEvent<HTMLButtonElement>) => {
    const effect = event.currentTarget.value;
    if (effect === "-") {
      if (currentPage !== 1) {
        setStartPage(currentPage - 2);
      }
      onClickHandler(currentPage - 1);
    } else if (effect === "+") {
      if (currentPage !== 1) {
        setStartPage(currentPage);
      }
      onClickHandler(currentPage + 1);
    } else {
      throw new Error("Unexpected pagination value!");
    }
  };

  return (
    <div className="pagination">
      <button
        value="-"
        className={`pagination__button-prev ${startPage === 1 ? "hidden" : ""}`}
        onClick={handleClickArrow}
      >
        &lt;
      </button>
      <button
        value={startPage}
        className={`pagination__button ${currentPage === startPage ? "active" : ""}`}
        onClick={handleClick}
      >
        {startPage}
      </button>
      <button
        disabled={totalPages < startPage + 1 ? true : false}
        value={startPage + 1}
        className={`pagination__button ${currentPage === startPage + 1 ? "active" : ""}`}
        onClick={handleClick}
      >
        {startPage + 1}
      </button>
      <button
        disabled={totalPages < startPage + 2 ? true : false}
        value={startPage + 2}
        className={`pagination__button ${currentPage === startPage + 2 ? "active" : ""}`}
        onClick={handleClick}
      >
        {startPage + 2}
      </button>
      <button
        disabled={totalPages < startPage + 3 ? true : false}
        value={startPage + 3}
        className={`pagination__button ${currentPage === startPage + 3 ? "active" : ""}`}
        onClick={handleClick}
      >
        {startPage + 3}
      </button>
      <button
        disabled={totalPages === currentPage ? true : false}
        value="+"
        className={`pagination__button-next`}
        onClick={handleClickArrow}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
