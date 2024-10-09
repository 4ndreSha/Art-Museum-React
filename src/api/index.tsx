//import { ArtWorkCards, ArtWorkInfo, Data } from "@/types/types";
import { ArtworkData, ArtworkCollection } from "@/types";
import axios from "axios";

const API_URL = process.env.API_URL || "null";
const FIELDS = [
  "id",
  "title",
  "artist_display",
  "artist_title",
  "image_id",
  "dimensions",
  "credit_line",
  "department_title",
  "is_public_domain",
  "date_display",
  "date_start",
];

export async function getArtworksAxios(page: number = 1, limit: number = 12): Promise<ArtworkCollection> {
  return axios
    .get(API_URL, {
      params: {
        page: page || "1",
        limit: limit || "12",
        fields: FIELDS,
      },
    })
    .then((result) => ({
      collection: result.data.data,
      totalPages: result.data.pagination.total_pages,
    }))
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
}

export async function getNumberOfPages(page: number = 1, limit: number = 12): Promise<number> {
  return axios
    .get(API_URL, {
      params: {
        page: page || "1",
        limit: limit || "12",
        fields: "total_pages",
      },
    })
    .then((result) => {
      console.log(result);
      return result.data.pagination.total_pages;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
}

export async function getArtworksSearch(
  search: string = "",
  page: number = 1,
  limit: number = 12,
): Promise<ArtworkCollection> {
  const url = `${API_URL}/search?`;
  return axios
    .get(url, {
      params: {
        q: search || "cats",
        page: page || "1",
        limit: limit || "12",
        fields: FIELDS,
      },
    })
    .then((result) => ({
      collection: result.data.data,
      totalPages: result.data.pagination.total_pages,
    }))
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
}

export async function getArtworkById(id: string): Promise<ArtworkData> {
  const url = `${API_URL}/${id}`;
  return axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .then((result) => ({
      id: result.data.id,
      title: result.data.title,
      artist_display: result.data.artist_display,
      artist_title: result.data.artist_title,
      image_id: result.data.image_id,
      dimensions: result.data.dimensions,
      credit_line: result.data.credit_line,
      department_title: result.data.department_title,
      is_public_domain: result.data.is_public_domain,
      date_display: result.data.date_display,
      date_start: result.data.date_start,
    }))
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
}
