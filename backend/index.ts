import cors from "cors";
import express, { Request, Response } from "express";
import propertiesRouter from "./routes/properties";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"]
  })
);
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/api/properties", propertiesRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
