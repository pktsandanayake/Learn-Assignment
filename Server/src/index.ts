import express from "express";
import mongoose from "mongoose";
import router from "./Route";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const MOGO_URL =
  "mongodb+srv://sajani:Pktsanda730920@learn-assignment.ipd5a.mongodb.net/?appName=Learn-Assignment";
console.log("URL", process.env.MOGO_URL);
mongoose
  .connect(MOGO_URL, { dbName: process.env.dbName })
  .then(() => console.log("Database connected........"))
  .catch((error) => console.log(error));

app.use("/", router);
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.listen(process.env.PORT, () =>
  console.log("Server is running on http://localhost:", process.env.PORT)
);
