import React, { useState } from "react";

import "@components/SortButton/styles.scss";

interface SortButtonProps {
  value?: string;
  isActive?: boolean;
  onClickHandler: (sortParameter: string, order: boolean) => void;
  children: React.ReactNode;
}

const SortButton: React.FC<SortButtonProps> = ({ value = "", isActive, onClickHandler, children }) => {
  const [order, setOrder] = useState(true);

  const onClick = () => {
    const newOrder = isActive ? !order : true;
    setOrder(newOrder);
    onClickHandler(value, newOrder);
  };

  return (
    <button
      type="button"
      value={value}
      className={`sort-button ${isActive ? "active-btn" : ""} ${isActive ? (order ? "up-btn" : "down-btn") : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SortButton;
