import exppress from "express";
import { PORT } from "./config.js";
import { MangoDBURL } from "./test.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = exppress();

// middleware for parsing request body
app.use(exppress.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to first response");
});

// Route to save a new book
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get all books from database
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting one book from database based on id
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Updating book
app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(400).json({
        message: "Book not found",
      });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
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
