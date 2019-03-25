import express from "express";
import expressGraphQL from "express-graphql";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import fetch from "node-fetch";
import * as faceapi from "face-api.js";
import path from "path";

import schema from "./graphql";

const app = express();
const PORT = process.env.PORT || "4000";
const db = "mongodb://ProblemChild:bzz4uu8eDU@ds052978.mlab.com:52978/humandb";

mongoose
  .connect(db, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

faceapi.env.monkeyPatch({ fetch: fetch });
app.use(
  "/graphql",
  cors(),
  express.static(path.join(__dirname, "/client/public")),
  bodyParser.json(),
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

app.listen(PORT, () => console.log("Server running in port 4000"));
