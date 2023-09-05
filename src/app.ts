import "dotenv/config";
import express, { Express, Response, Request } from "express";
import cors from "cors";
import authRouter from "./routers/auth.router";
import { connectDatabase } from "./database/config.database";
import inventoryRouter from "./routers/inventory.router";

const app: Express = express();
const PORT = process.env.PORT || 3000;

connectDatabase();
app.use(cors());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Api rest auth security initialized " });
});
app.use(authRouter);
app.use(inventoryRouter);

app.listen(PORT, () => {
  console.log("Initialized Server!!!");
});
