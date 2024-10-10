import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@components/Pagination";
import "@testing-library/jest-dom/";

describe("Pagination Component", () => {
  const onClickHandler = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("должен рендерить текущую страницу и кнопки", () => {
    render(<Pagination currentPage={1} onClickHandler={onClickHandler} totalPages={5} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText(">").closest("button")).toBeInTheDocument();
  });

  it("должен вызывать onClickHandler с правильной страницей при клике на кнопку", () => {
    render(<Pagination currentPage={1} onClickHandler={onClickHandler} totalPages={5} />);

    fireEvent.click(screen.getByText("2"));
    expect(onClickHandler).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText(">"));
    expect(onClickHandler).toHaveBeenCalledWith(2);
  });

  it("должен скрывать кнопку назад, если текущая страница 1", () => {
    render(<Pagination currentPage={1} onClickHandler={onClickHandler} totalPages={5} />);

    expect(screen.getByText("<")).toHaveClass("hidden");
  });

  it("должен корректно изменять startPage при переходе на следующую страницу", () => {
    const { rerender } = render(<Pagination currentPage={1} onClickHandler={onClickHandler} totalPages={5} />);

    // 2
    fireEvent.click(screen.getByText("2"));
    expect(onClickHandler).toHaveBeenCalledWith(2);

    // 3
    rerender(<Pagination currentPage={2} onClickHandler={onClickHandler} totalPages={5} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("должен дизейблить кнопки, если нет доступных страниц", () => {
    render(<Pagination currentPage={1} onClickHandler={onClickHandler} totalPages={3} />);

    expect(screen.getByText("4").closest("button")).toBeDisabled();
    expect(screen.getByText("3").closest("button")).toBeEnabled();
    expect(screen.getByText("2").closest("button")).toBeEnabled();
    expect(screen.getByText("1").closest("button")).toBeEnabled();
  });
});
