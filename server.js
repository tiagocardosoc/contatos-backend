require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { default: routes } = require("./src/routes/routes");

const app = express();

app.use(express.json());
app.use(
  cors({
    'Access-Control-Allow-Credentials':true,
    origin: '*',
    exposedHeaders: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"], // to works well with web app, OPTIONS is required
  })
);
app.use(routes);

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const mongoURL = `mongodb+srv://${dbUser}:${dbPassword}@agenda-contatos.c5loz6a.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3002);
    console.log("Conectado ao banco!");
  })
  .catch((erro) => {
    console.log(erro);
  });
