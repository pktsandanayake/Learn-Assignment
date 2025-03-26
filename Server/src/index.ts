import express from "express";
import mongoose from "mongoose";
import router from "./Route";
import cors from "cors";

const app = express();
app.use(express.json());

const MOGO_URL =
  "mongodb+srv://sajani:Pktsanda730920@learn-assignment.ipd5a.mongodb.net/?appName=Learn-Assignment";

mongoose
  .connect(MOGO_URL, { dbName: "Tasks" })
  .then(() => console.log("Database connected........"))
  .catch((error) => console.log(error));

app.use("/", router);
app.use(cors);

app.listen(4000, () =>
  console.log("Server is running on http://localhost:4000")
);
