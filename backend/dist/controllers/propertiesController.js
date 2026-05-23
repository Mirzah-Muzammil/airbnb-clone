"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertyById = exports.getProperties = void 0;
const database_1 = __importDefault(require("../db/database"));
const mapRow = (row) => ({
    ...row,
    images: JSON.parse(row.images)
});
const getProperties = (req, res) => {
    const { search, minPrice, maxPrice, rating } = req.query;
    const conditions = [];
    const params = {};
    if (search) {
        conditions.push("(title LIKE @search COLLATE NOCASE OR location LIKE @search COLLATE NOCASE)");
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
    const rows = database_1.default
        .prepare(`SELECT * FROM properties ${whereClause} ORDER BY id ASC`)
        .all(params);
    res.json(rows.map(mapRow));
};
exports.getProperties = getProperties;
const getPropertyById = (req, res) => {
    const id = Number(req.params.id);
    if (!id) {
        res.status(404).json({ error: "Property not found" });
        return;
    }
    const row = database_1.default
        .prepare("SELECT * FROM properties WHERE id = ?")
        .get(id);
    if (!row) {
        res.status(404).json({ error: "Property not found" });
        return;
    }
    res.json(mapRow(row));
};
exports.getPropertyById = getPropertyById;
