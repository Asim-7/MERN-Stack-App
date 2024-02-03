import exppress from "express";
import { PORT } from "./config.js";

const app = exppress();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to first response");
});

app.get("/favicon.ico", (request, response) => {
  console.log(request);
  return response.status(204);
});

app.listen(PORT, () => {
  console.log(`App is listening to: ${PORT}`);
});
