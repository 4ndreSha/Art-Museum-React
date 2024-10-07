import React from "react";
import MiniCard from "@components/MiniCard";
import Pagination from "@components/Pagination";

import "@components/SearchComponent/styles.scss";

const SearchComponent = () => {
  const handleSubmit = () => {};
  return (
    <section className="search">
      <h1 className="search__title">
        Let&apos;s find some <span className="orange">art</span> here!
      </h1>
      <form className="search__form">
        <input
          className="search__form-input"
          type="text"
          name="search"
          placeholder="Search art, artist, work..."
          value={123}
        />

        <button type="submit" className="search__form-submit" />
      </form>

      <div className="search__list-wrapper">
        <div className="search__list">
          {/* {result.map()} */}
          <MiniCard />
          <MiniCard />
          <MiniCard />
          <MiniCard />
        </div>
        <Pagination />
      </div>
    </section>
  );
};

export default SearchComponent;
