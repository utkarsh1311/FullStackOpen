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

module.exports = { requestLogger, errorHandler, unknownEndpoint };
