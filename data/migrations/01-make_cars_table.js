exports.up = function (knex) {
	// DO YOUR MAGIC
	return knex.schema.createTable("cars", (table) => {
		table.increments("car_id");
		table.text("vin", 128).unique().notNullable();
		table.text("make", 128).notNullable();
		table.text("model", 128).notNullable();
		table.decimal("mileage").notNullable();
		table.text("title", 128);
		table.text("transmission", 128);
	});
};

exports.down = function (knex) {
	// DO YOUR MAGIC
	return knex.schema.dropTableIfExists("cars");
};
