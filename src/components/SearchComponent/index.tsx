import React, { useState, useEffect, useCallback } from "react";
import MiniCard from "@components/MiniCard";
import Pagination from "@components/Pagination";
import SortButton from "@components/SortButton";
import { getArtworksSearch } from "@/api";
import { ArtworkCollection, ArtworkData, SearchForm } from "@/types";
import { useDebounce } from "@/utils";
import * as yup from "yup";
import { validationSchema } from "@/utils";
import { SkeletonLoaderMiniCard } from "../SkeletonLoader";

import "@components/SearchComponent/styles.scss";

const SearchComponent = () => {
  const [loading, setLoading] = useState(true);
  const [artworkCollection, setArtworkCollection] = useState<ArtworkCollection>();
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchForm, setSearchForm] = useState<SearchForm>({
    searchInput: "",
    sortParameter: "date_start",
    order: "desc",
  });

  const skeletonCount = 12;

  const debouncedValue = useDebounce(searchForm);

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
    setSearchForm({ ...searchForm, searchInput: searchInput });
    if (value.length === 0) {
      setArtworkCollection({ collection: [], totalPages: 0 });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      //sendForm(); // Здесь также можно вызывать функцию поиска, если это необходимо
    }
  };

  const onSortButtonClick = (sortParameter: string, order: boolean) => {
    setSearchForm({ ...searchForm, sortParameter: sortParameter, order: order ? "asc" : "desc" });
  };

  const fetchArtworks = useCallback(async () => {
    try {
      await validationSchema.validate(debouncedValue.searchInput);
      setLoading(true);
      const data = await getArtworksSearch(debouncedValue, currentPage, 12);
      setArtworkCollection(data);
      setValidationError("");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setValidationError(error.message);
        console.error("Validation error:", error.message);
      } else {
        console.error("Search error:", error);
        setError("Failed to fetch artworks. Please try again.");
      }
      setArtworkCollection({ collection: [], totalPages: 0 });
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedValue]);

  useEffect(() => {
    fetchArtworks();
  }, [currentPage, debouncedValue]);

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
      <div className="search__validation-message">{searchInput.length !== 0 ? validationError : ""}</div>

      <div className="search__list-wrapper">
        {(artworkCollection?.collection.length === 0 && !loading) || searchInput.length === 0 ? (
          <h2 className="search__list-empty">
            {artworkCollection?.collection.length === 0 && searchInput.length !== 0
              ? "Try something else..."
              : "Dive into your imagination — type the first thing that comes to mind!"}
          </h2>
        ) : (
          <>
            <div className="search__sort">
              <SortButton
                value="date_start"
                isActive={searchForm.sortParameter === "date_start" ? true : false}
                onClickHandler={onSortButtonClick}
              >
                Date
              </SortButton>
              <SortButton
                value="is_public_domain"
                isActive={searchForm.sortParameter === "is_public_domain" ? true : false}
                onClickHandler={onSortButtonClick}
              >
                Publicity
              </SortButton>
            </div>
            {loading ? (
              <div className="search__list">
                {Array.from({ length: skeletonCount }, (_, index) => (
                  <SkeletonLoaderMiniCard key={index} />
                ))}
              </div>
            ) : (
              <>
                <div className="search__list">
                  {artworkCollection?.collection.map((art: ArtworkData) => <MiniCard key={art.id} {...art} />)}
                </div>
              </>
            )}
            <Pagination
              currentPage={currentPage}
              onClickHandler={onClickHandler}
              totalPages={artworkCollection?.totalPages || 10000}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default SearchComponent;
