const express = require("express");

const server = express();

// DO YOUR MAGIC
const CarsRouter = require("./cars/cars-router");

server.use(express.json());

server.use("/api/cars", CarsRouter);

server.get("/", (req, res) => {
	res.status(200).json({ message: "API is Live!" });
});

module.exports = server;
