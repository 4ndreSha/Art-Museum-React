import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ArtworkInfo from "@components/ArtworkInfo";
import { getArtworkById } from "@/api";
import "@testing-library/jest-dom/";

jest.mock("@assets/img-placeholder.svg", () => "img-placeholder.svg");

jest.mock("@/api", () => ({
  getArtworkById: jest.fn(),
}));

jest.mock("@components/ErrorComponent", () => () => <div>Error Component Mock</div>);
jest.mock("@components/BookmarkButton", () => () => <button>Bookmark</button>);

const mockArtworkData = {
  id: 1,
  title: "Test Artwork",
  artist_title: "Test Artist",
  date_display: "2021",
  image_id: "test_image_id",
  dimensions: "50x70 cm",
  credit_line: "Gift from Test",
  department_title: "Art Department",
  is_public_domain: true,
};

describe("ArtworkInfo Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("должен отображать информацию об экспонате", async () => {
    (getArtworkById as jest.Mock).mockResolvedValueOnce(mockArtworkData);

    render(
      <MemoryRouter initialEntries={["/artwork/1"]}>
        <Routes>
          <Route path="/artwork/:id" element={<ArtworkInfo />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Test Artwork")).toBeInTheDocument();
      expect(screen.getByText("Test Artist")).toBeInTheDocument();
      expect(screen.getByText("2021")).toBeInTheDocument();
      expect(screen.getByText("50x70 cm")).toBeInTheDocument();
      expect(screen.getByText("Gift from Test")).toBeInTheDocument();
      expect(screen.getByText("Art Department")).toBeInTheDocument();
      expect(screen.getByText("Public")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /bookmark/i })).toBeInTheDocument();
    });
  });

  it("должен отображать сообщение об ошибке, если загрузка не удалась", async () => {
    (getArtworkById as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <MemoryRouter initialEntries={["/artwork/1"]}>
        <Routes>
          <Route path="/artwork/:id" element={<ArtworkInfo />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Error Component Mock")).toBeInTheDocument();
      expect(screen.queryByText("Test Artwork")).not.toBeInTheDocument(); //Данных нет!
    });
  });
});
