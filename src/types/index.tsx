import React from "react";

export interface ArtworkData {
  id: number;
  title: string;
  artist_display: string;
  artist_title: string;
  image_id?: string | null;
  dimensions?: string;
  credit_line?: string;
  department_title?: string;
  is_public_domain: boolean;
  date_display: number;
  date_start?: number;
}

export interface ArtworkCollection {
  collection: ArtworkData[];
  totalPages: number;
}
