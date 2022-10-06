const jwt = require("jsonwebtoken");
const User = require("../models/user");

const logger = require("./logger");

const requestLogger = (req, res, next) => {
	logger.info("Method: ", req.method);
	logger.info("Path: ", req.path);
	logger.info("Body: ", req.body);
	logger.info("----");
	next();
};

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
	logger.error(error.message);

	if (error.name === "CastError") {
		return res.status(400).send({ error: "Malformatted id" });
	} else if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message });
	} else if (error.name === "JsonWebTokenError") {
		return res.status(401).json({
			error: "invalid token",
		});
	} else if (error.name === "TokenExpiredError") {
		return res.status(401).json({
			error: "token expired",
		});
	}
	next(error);
};

const tokenExtractor = (req, res, next) => {
	const auth = req.get("authorization");
	if (auth && auth.toLowerCase().startsWith("bearer")) {
		req["token"] = auth.substring(7);
	}
	next();
};

const userExtractor = async (req, res, next) => {
	const token = req.token;
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!decodedToken.id) {
		return res.status(401).json({
			error: "token missing or invalid",
		});
	}

	const user = await User.findById(decodedToken.id);
	req["user"] = user;
	next();
};

module.exports = {
	requestLogger,
	errorHandler,
	unknownEndpoint,
	tokenExtractor,
	userExtractor,
};
