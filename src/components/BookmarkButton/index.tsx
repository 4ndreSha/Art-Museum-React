import React from "react";
import { useState, useEffect, useContext } from "react";
import { SessionStorageContext, useSessionStorageContext } from "@/utils/SessionStorage";

import "@components/BookmarkButton/styles.scss";

interface BookmarkButtonProps {
  id: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ id }) => {
  const sessionStorageContext = useSessionStorageContext();
  const [isSaved, setIsSaved] = useState(sessionStorageContext.includes(id));

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsSaved(!isSaved);
    if (isSaved) {
      sessionStorageContext.remove(id);
    } else {
      sessionStorageContext.add(id);
    }
  };

  return <button className={`bookmark__button${isSaved ? "-saved" : ""}`} onClick={handleClick} />;
};

export default BookmarkButton;
