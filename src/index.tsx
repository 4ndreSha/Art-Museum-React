import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Favorites from "@/pages/Favorites";
import Artwork from "@/pages/Artwork";
import { SessionStorageProvider } from "@/utils/SessionStorage";

import "./styles/styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <SessionStorageProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites/" element={<Favorites />} />
          <Route path="/artwork/:id" element={<Artwork />} />
        </Routes>
      </HashRouter>
    </SessionStorageProvider>
  </React.StrictMode>,
);
