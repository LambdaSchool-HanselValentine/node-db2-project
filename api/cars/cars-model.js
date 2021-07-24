const db = require("../../data/db-config");

const getAll = async () => {
	const cars = await db("cars");
	console.log(cars);
	return cars;
};

const getById = async (id) => {
	const car = db.first("*").from("cars").where({ car_id: id });
	return car;
};

const create = async (car) => {
	const newCar = await db("cars").insert(car);
	return newCar;
};

// getbyvin for the middleware
const getByVin = (vin) => {
	return db.first("*").from("cars").where({ vin });
};

module.exports = {
	getAll,
	getById,
	create,
	getByVin,
};
