import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { getArtworksAxios, getNumberOfPages } from "@/api";
import GallerySuggestor from "@components/GallerySuggestor";
import "@testing-library/jest-dom/";

jest.mock("@assets/img-placeholder.svg", () => "img-placeholder.svg");

jest.mock("@/api", () => ({
  getArtworksAxios: jest.fn(() => Promise.resolve({ collection: [] })),
  getNumberOfPages: jest.fn(() => Promise.resolve(1)),
}));

jest.mock("@components/SkeletonLoader", () => ({
  SkeletonLoaderMiniCard: () => <div data-testid="skeleton-loader">Loading...</div>,
}));

describe("GallerySuggestor Component", () => {
  let consoleError: jest.SpyInstance;

  beforeAll(() => {
    consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleError.mockRestore();
  });

  it("должен отображать набор skeleton-loader-ов, пока данные загружаются", () => {
    render(<GallerySuggestor />);
    expect(screen.getAllByTestId("skeleton-loader")).toHaveLength(9);
  });

  it("должен отображать ошибку, если запрос завершился неудачей", async () => {
    (getNumberOfPages as jest.Mock).mockResolvedValue(1);
    (getArtworksAxios as jest.Mock).mockRejectedValue(new Error("Fetch error"));

    await act(async () => {
      render(<GallerySuggestor />);
    });

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch artworks. Please try again.")).toBeInTheDocument();
    });
  });
});
