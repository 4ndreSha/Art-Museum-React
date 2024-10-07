import React from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import SearchComponent from "@components/SearchComponent";
import Gallery from "@components/Gallery";
import GallerySuggestor from "@components/GallerySuggestor";

function Home() {
  return (
    <>
      <Header />
      <SearchComponent />
      <Gallery />
      <GallerySuggestor />
      <Footer />
    </>
  );
}

export default Home;
