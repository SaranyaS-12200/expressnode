import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
dotenv.config();
// const express = require('express')
console.log(process.env.MONGO_URL);
const app = express();
app.use(express.json());
// const PORT=4000;
const PORT = process.env.PORT;
// const MONGO_URL = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;


async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected 🥰🥰");
  return client;
}
const client = await createConnection();

app.get('/movies', async function (request, response) {
  const solution = await client
    .db("b30wd")
    .collection('movies')
    .find({})
    .toArray();
  response.send(solution);
  console.log(solution);
})

app.listen(PORT, () => console.log(`Server started in ${PORT}`));


app.get("/movies/:id", async function (request, response) {
  console.log(request.params);
  const { id } = request.params;
  // const movie=movies.find((mv)=>mv.id===id);
  const movie = await client
    .db("b30wd")
    .collection("movies")
    .findOne({ id: id });
  movie ? response.send(movie) : response.status(404).send({ message: "Not Found😮😥" });
});

app.get("/", function (request, response) {
  response.send("Hello World!!🌎🌎😊");
})

app.post('/movies', async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await client.db('b30wd').collection('movies').insertMany(data);
  response.send(result);
});

app.delete('/movies/:id', async function (request, response) {
  console.log(request.params);
  const { id } = request.params;
  const result = await client
    .db("b30wd")
    .collection('movies')
    .deleteOne({ id: id });
  response.send(result);
});
// app.get("/movies/:id", function (request, response) {console.log(request.params);// filter | findconst { id } = request.params;const movie = movies.find((mv) => mv.id === id);response.send(movie);});

app.put('/movies/:id', async function (request, response) {
  console.log(request.params);
  const { id } = request.params;
  const updateData = request.body;
  const result = await client
    .db("b30wd")
    .collection('movies')
    .updateOne({ id: id }, { $set: updateData });
  response.send(result);
});