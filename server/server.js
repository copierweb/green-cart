import './loadENV.js'

import mongoose from "mongoose";
import app from "./app.js";
import connectCloudinary from './config/cloudinary.js';
// const { default: app } = await import("./app.js");

// --------------------------------------------------------------------
// connecting mongoDB
const mongoDB_URI = 
	process.env.MONGO_URI
		.replace("<USER>",process.env.MONGO_USER)
		.replace("<PASSWORD>", encodeURIComponent(process.env.MONGO_PASS))
		.replace("<CLUSTER>", process.env.MONGO_CLUSTER)
		.replace("<DB>", process.env.MONGO_DB);

const connectDB = async () => {
	try {
		await mongoose.connect(mongoDB_URI);
		console.log(
			`App Successfully Connected to DATABASE: ${mongoose.connection.name}`,
		);
	} catch (err) {
		console.error("Connection error", err);
		process.exit(1);
	}
};

connectDB();

// --------------------------------------------------------------------
// connecting cloudinary
await connectCloudinary()


// -----------------------------------------------------------------------
// creating the server

const port = process.env.PORT || 5001;
app.listen(port, () => {
	console.log(`Server Running on http://localhost:${port}`);
});
