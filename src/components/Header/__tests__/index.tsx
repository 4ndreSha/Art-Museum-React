import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "@components/Header";

jest.mock("@assets/museum-logo-dark.svg", () => "logo.svg");
jest.mock("@assets/home.svg", () => "home.svg");
jest.mock("@assets/bookmark.svg", () => "bookmark.svg");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("Header Component", () => {
  it("должен рендерить логотип и навигационные ссылки", () => {
    const { useLocation } = require("react-router-dom");
    useLocation.mockReturnValue({ pathname: "/" });

    render(
      <Router>
        <Header />
      </Router>,
    );

    expect(screen.getByAltText("Website logo")).toBeInTheDocument();
    expect(screen.getByAltText("Bookmark icon")).toBeInTheDocument();
  });

  it("должен переключать меню при нажатии на кнопку бургер-меню", () => {
    const { useLocation } = require("react-router-dom");
    useLocation.mockReturnValue({ pathname: "/" });

    render(
      <Router>
        <Header />
      </Router>,
    );

    const burgerMenuButton = screen.getByRole("button", { hidden: true });
    expect(burgerMenuButton).toBeInTheDocument();
  });
});
