const db = require("../../data/db-config");

module.exports = {
	getAll,
	getById,
	create,
};

const getAll = async () => {
	const cars = await db("cars");
	console.log(cars);
	return cars;
};

const getById = async (id) => {
	const car = await db("cars").where("id", id).first();
	return car;
};

const create = async (car) => {
	const [id] = await db("cars").insert(car);
	const newCar = await getById(id);
	return newCar;
};
