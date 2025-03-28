import express from "express";
import mongoose from "mongoose";
import router from "./Route";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const MOGO_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@learn-assignment.ipd5a.mongodb.net/?appName=${process.env.APPNAME}`;
console.log("Connection", MOGO_URL);
mongoose
  .connect(MOGO_URL, { dbName: process.env.dbName })
  .then(() => console.log("Database connected........"))
  .catch((error) => console.log(error));

app.use("/", router);
app.use(cors({ origin: "*" }));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.BASE_URL}:`, process.env.PORT)
);
