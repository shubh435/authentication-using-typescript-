import express from "express";
import connectToMongo from "./DB/db";
const app = express();
connectToMongo()
const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.send("Hello node js ,I am doing coding ... ");
  });
  

app.listen(PORT, () => {
    console.log("----connected with express server on PORT " + PORT);
  });