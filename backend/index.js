import exppress from "express";
import { PORT } from "./config.js";
import { MangoDBURL } from "./test.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = exppress();

// middleware for parsing request body
app.use(exppress.json());

// middleware for handeling CORS Policy
// Option 1:
app.use(cors());
// Option 2:
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to first response");
});

app.get("/favicon.ico", (request, response) => {
  console.log(request);
  return response.status(204);
});

app.use("/books", booksRoute);

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
