import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Favorites from "@/pages/Favorites";
import Artwork from "@/pages/Artwork";
import { SessionStorageProvider } from "@/utils/SessionStorage";
import { ErrorBoundaryStyled } from "./components/ErrorBoundary";

import "./styles/styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ErrorBoundaryStyled>
      <SessionStorageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites/" element={<Favorites />} />
            <Route path="/artwork/:id" element={<Artwork />} />
          </Routes>
        </BrowserRouter>
      </SessionStorageProvider>
    </ErrorBoundaryStyled>
  </React.StrictMode>,
);
