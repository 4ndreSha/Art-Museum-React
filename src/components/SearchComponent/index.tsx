import React, { useState, useEffect, useCallback } from "react";
import MiniCard from "@components/MiniCard";
import Pagination from "@components/Pagination";
import { getArtworksSearch } from "@/api";
import { ArtworkCollection, ArtworkData } from "@/types";

import "@components/SearchComponent/styles.scss";

const SearchComponent = () => {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [artworkCollection, setArtworkCollection] = useState<ArtworkCollection>();
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with search input:", searchInput);
    //sendForm(); // Вызов функции поиска или обработки формы
  };

  const onClickHandler = (page: number) => {
    setCurrentPage(page);
  };

  const handleInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      //sendForm(); // Здесь также можно вызывать функцию поиска, если это необходимо
    }
  };

  const fetchArtworks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getArtworksSearch(searchInput, currentPage, 12);
      setArtworkCollection(data);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to fetch artworks. Please try again.");
    } finally {
      setLoading(false);
      console.log(artworkCollection);
    }
  }, [searchInput, currentPage]);

  useEffect(() => {
    fetchArtworks();
  }, [searchInput, currentPage]);

  return (
    <section className="search">
      <h1 className="search__title">
        Let&apos;s find some <span className="orange">art</span> here!
      </h1>
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__form-input"
          type="text"
          placeholder="Search art, artist, work..."
          value={searchInput}
          onChange={(event) => handleInputChange(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className="search__form-submit" />
      </form>

      <div className="search__list-wrapper">
        {searchInput.length === 0 ? (
          <h2 className="search__list-empty">Dive into your imagination — type the first thing that comes to mind!</h2>
        ) : (
          <>
            {loading ? (
              <div>loading</div>
            ) : (
              <div className="search__list">
                {artworkCollection?.collection.map((art: ArtworkData) => <MiniCard key={art.id} {...art} />)}
              </div>
            )}
            <Pagination currentPage={currentPage} onClickHandler={onClickHandler} />
          </>
        )}
      </div>
    </section>
  );
};

export default SearchComponent;
