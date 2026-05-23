"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const properties_1 = __importDefault(require("./routes/properties"));
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://localhost:5174"]
}));
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.json({ status: "ok" });
});
app.use("/api/properties", properties_1.default);
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
