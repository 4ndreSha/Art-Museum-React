import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Favorites from "@/pages/Favorites";
import Artwork from "@/pages/Artwork";

import "./styles/styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites/" element={<Favorites />} />
        <Route path="/artwork/:id" element={<Artwork />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
