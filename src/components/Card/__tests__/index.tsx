import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Card from "@components/Card";
import BookmarkButton from "@components/BookmarkButton";
import { ArtworkData } from "@/types";
import "@testing-library/jest-dom/";

jest.mock("@assets/img-placeholder.svg", () => "img-placeholder.svg");

jest.mock("@components/BookmarkButton", () => {
  return function MockBookmarkButton(props: { id: string }) {
    return <button data-testid={`bookmark-button-${props.id}`}>Bookmark</button>;
  };
});

describe("Card Component", () => {
  const mockArtworkData: ArtworkData = {
    id: 1,
    image_id: "image1",
    title: "Sample Artwork",
    artist_title: "Sample Artist",
    is_public_domain: true,
    artist_display: "",
    date_display: 1,
  };

  beforeEach(() => {
    process.env.IMG_URL_BASE = "https://example.com/images/";
  });

  it("должен рендерить с правильными данными", () => {
    render(
      <MemoryRouter>
        <Card {...mockArtworkData} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Sample Artwork")).toBeInTheDocument();
    expect(screen.getByText("Sample Artist")).toBeInTheDocument();
    expect(screen.getByText("Public")).toBeInTheDocument();

    const img = screen.getByAltText("Sample Artwork");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/images/image1/full/600,/0/default.jpg");

    expect(screen.getByTestId("bookmark-button-1")).toBeInTheDocument();
  });

  it("должен рендерить изображение-заполнитель, когда image_id не предоставлено", () => {
    const mockArtworkDataWithoutImage = {
      ...mockArtworkData,
      image_id: null,
    };

    render(
      <MemoryRouter>
        <Card {...mockArtworkDataWithoutImage} />
      </MemoryRouter>,
    );

    const img = screen.getByAltText("Sample Artwork");
    expect(img).toHaveAttribute("src", expect.stringContaining("img-placeholder.svg"));
  });

  it("должен отображать 'Untitled', когда заголовок не предоставлен", () => {
    const mockArtworkDataWithoutTitle = {
      ...mockArtworkData,
      title: "",
    };

    render(
      <MemoryRouter>
        <Card {...mockArtworkDataWithoutTitle} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Untitled")).toBeInTheDocument();
  });

  it("должен отображать 'Author unknown', когда artist_title не предоставлен", () => {
    const mockArtworkDataWithoutArtist = {
      ...mockArtworkData,
      artist_title: "",
    };

    render(
      <MemoryRouter>
        <Card {...mockArtworkDataWithoutArtist} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Author unknown")).toBeInTheDocument();
  });
});
