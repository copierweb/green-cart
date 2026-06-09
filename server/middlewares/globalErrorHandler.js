import AppError from "../error/appError.js";

//--- HELPER functions --- //

//  production error helper functions for handling DB errors
const handleCasteErrorDB = (err) => {
	const message = `Invalid ${err.path} : ${err.value}`;

	return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
	const error = Object.values(err.errors).map(el => el.message)
	const message = `Invalid Input data : ${error.join('. ')}`

	return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err) => {
	const value = err.errmsg.match(/([""])(\\?.)*?\1/)[0]
	const message = `Duplicate field value: ${value}.Use another value.`
	return new AppError(message, 400)	
}

const handleJWTExpiredError = () => {
	return new AppError('Your Token has Expired!, please login again', 401)
}

const handleJWTError = () => {
	return new AppError('Invalid Token!, please login again', 401)
}

// ------------------------------------------------------------------- //
// send error to production mode
const sendErrProd = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		console.log("error", err);

		res.status(500).json({
			status: "error",
			message: "there is a problem in the program",
		});
	}
};
// ---------------------------------------------------------------------- //
// send error to developer mode
const sendErrDev = (err, res) => {
	res.status(err.statusCode).json({

		status: err.status ,
		message: err.message,
		error: err,
		stack: err.stack,
	});
};

// =============================================================== //
//--- middleware function ---//

const globalErrorHandler = (err, req, res, next) => {
	
	err.statusCode  = err.statusCode || 500
	err.status = err.status || 'error'
	err.message = err.message || 'Something went wrong'
	
	const development = process.env.NODE_ENV === "development";
	
	if (development) {
		sendErrDev(err, res);
	} else {
		let error = err;

		if (err.name === "casteError") {
			error = handleCasteErrorDB(err);
		}

		if (err.name === "ValidationError") {
			error = handleValidationErrorDB(err);
		}

		if(err.code === 11000) error = handleDuplicateFieldsDB(error)

		if (err.name === 'JsonWebTokenError') error = handleJWTError()

		if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()			

		sendErrProd(error, res);
	}
};

export default globalErrorHandler;
