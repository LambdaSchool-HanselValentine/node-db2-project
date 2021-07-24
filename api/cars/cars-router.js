const express = require("express");
const Cars = require("./cars-model");
const Middleware = require("./cars-middleware");

const router = express.Router();

// [GET] /api/cars returns an array of cars sorted by id (or an empty array if there aren't any).
router.get("/", (req, res, next) => {
	Cars.getAll()
		.then((cars) => {
			res.status(200).json(cars);
		})
		.catch(next);
});

// [GET] /api/cars/:id returns a car by the given id.
router.get("/:id", Middleware.checkCarId, (req, res, next) => {
	if (!req.car) {
		next();
	} else {
		res.status(200).json(req.car);
	}
});

// [POST] /api/cars returns the created car.
router.post(
	"/",
	Middleware.checkCarPayload,
	Middleware.checkVinNumberValid,
	Middleware.checkVinNumberUnique,
	(req, res, next) => {
		const body = req.body;
		Cars.create(body)
			.then((newCar) => {
				res.status(201).json(newCar);
			})
			.catch(next);
	},
);

module.exports = router;
