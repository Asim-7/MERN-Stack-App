import exppress from "express";
import { PORT } from "./config.js";
import { MangoDBURL } from "./test.js";
import mongoose from "mongoose";

const app = exppress();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to first response");
});

app.get("/favicon.ico", (request, response) => {
  console.log(request);
  return response.status(204);
});

mongoose
  .connect(MangoDBURL)
  .then(() => {
    console.log("App connected to database");

    // Server only runs when database connection is successful
    app.listen(PORT, () => {
      console.log(`App is listening to: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
