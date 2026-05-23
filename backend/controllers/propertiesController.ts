import { Request, Response } from "express";
import db from "../db/database";

type PropertyRow = {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  images: string;
  description: string;
};

type Property = Omit<PropertyRow, "images"> & { images: string[] };

const mapRow = (row: PropertyRow): Property => ({
  ...row,
  images: JSON.parse(row.images)
});

export const getProperties = (req: Request, res: Response) => {
  const { search, minPrice, maxPrice, rating } = req.query as Record<
    string,
    string | undefined
  >;

  const conditions: string[] = [];
  const params: Record<string, string | number> = {};

  if (search) {
    conditions.push(
      "(title LIKE @search COLLATE NOCASE OR location LIKE @search COLLATE NOCASE)"
    );
    params.search = `%${search}%`;
  }

  if (minPrice) {
    conditions.push("price >= @minPrice");
    params.minPrice = Number(minPrice);
  }

  if (maxPrice) {
    conditions.push("price <= @maxPrice");
    params.maxPrice = Number(maxPrice);
  }

  if (rating) {
    conditions.push("rating >= @rating");
    params.rating = Number(rating);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const rows = db
    .prepare(`SELECT * FROM properties ${whereClause} ORDER BY id ASC`)
    .all(params) as PropertyRow[];

  res.json(rows.map(mapRow));
};

export const getPropertyById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  const row = db
    .prepare("SELECT * FROM properties WHERE id = ?")
    .get(id) as PropertyRow | undefined;

  if (!row) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  res.json(mapRow(row));
};
