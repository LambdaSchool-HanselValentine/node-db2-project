const Cars = require("./cars-model");

const checkCarId = (req, res, next) => {
	const { id } = req.params;

	Cars.getById(id)
		.then((car) => {
			if (!car) {
				res.status(404).json({ message: `car with id ${id} is not found` });
			} else {
				req.car = car;
			}
		})
		.catch(next);
};

const checkCarPayload = (req, res, next) => {
	const body = req.body;

	if (!body || Object.keys(body).length === 0) {
		res.status(400).json({ message: "missing field texts are required" });
	} else if (!body.vin || !body.make || !body.model || !body.mileage) {
		res.status(400).json({ message: "missing required field" });
	} else {
		req.body.vin = body.vin.trim();
		req.body.make = body.make.trim();
		req.body.model = body.model.trim();
		next();
	}
};

const checkVinNumberValid = (req, res, next) => {
	const vin = req.body.vin;

	if (!vin) {
		res.status(400).json({ message: "vin required" });
	} else if (typeof vin !== "number") {
		res.status(400).json({ message: `vin ${vin} must be a number` });
	} else {
		next();
	}
};

const checkVinNumberUnique = (req, res, next) => {
	const vinValue = req.body.vin;

	Cars.getByVin(vinValue)
		.then((vinReturn) => {
			if (vinReturn) {
				//means vin was found in db
				res.status(404).json({ message: "vin already exist in the database" });
			} else {
				next();
			}
		})
		.catch(next);
};

module.exports = {
	checkCarId,
	checkCarPayload,
	checkVinNumberValid,
	checkVinNumberUnique,
};
