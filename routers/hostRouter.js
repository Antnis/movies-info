//External Module
const express = require("express");

//Core Module
const fs = require("fs");
const path = require("path");
const hostRouter = express.Router();
const movieReqRouter = express.Router();
//Local Module
const rootDir = require("../utils/pathUtils");

hostRouter.get("/", (req, res, next) => {
  res.render("mainpage");
});

movieReqRouter.post("/submit", (req, res, next) => {
  let body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  req.on("end", () => {
    const buffer = Buffer.concat(body).toString();
    const params = new URLSearchParams(buffer);
    const movieName = params.get("moviename");
    const urlapi = `http://www.omdbapi.com/?t=${encodeURIComponent(
      movieName
    )}&plot=full&apikey=1d5c68d3`;
    fetch(urlapi)
      .then((response) => response.json())
      .then((data) => {
        const filePath = path.join(rootDir, "data", "index.json");
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Failed to save movie");
          }
          // res.send("Movie data saved successfully!");
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) return res.status(500).send("Error reading JSON");
            const movie = JSON.parse(data);
            res.render("moviepage", { movie });
          });
        });
      });
  });
});

exports.hostRouter = hostRouter;
exports.movieReqRouter = movieReqRouter;
