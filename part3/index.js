require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

app.use(express.json());
app.use(express.static("build"));
app.use(cors());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :body"
	)
);

app.get("/", (request, response) => {
	response.send("Hello world");
});

app.get("/api/persons", (request, response) => {
	Person.find({})
		.then(persons => {
			response.json(persons);
		})
		.catch(error => console.log(error));
});

// route for getting count of documents in the collection
app.get("/info", (request, response) => {
	Person.count({}, (error, count) => {
		response.send(
			`Phonebook has info for ${count} people <br/> ${new Date()}`
		);
	}).catch(error => console.log(error));
});

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then(returnedPerson => response.json(returnedPerson))
		.catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end();
		})
		.catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	const { name, number } = request.body;

	Person.findByIdAndUpdate(
		request.params.id,
		{ name, number },
		{ new: true, runValidators: true, context: "query" }
	)
		.then(returnedPerson => response.json(returnedPerson))
		.catch(error => next(error));
});

app.post("/api/persons", (request, response, next) => {
	const body = request.body;

	if (!body.name && !body.number) {
		return response.status(400).json({
			error: "name and number is not specified in the request body",
		});
	}
	if (!body.name) {
		return response.status(400).json({
			error: "name field is not speficied",
		});
	}
	if (!body.number) {
		return response.status(400).json({
			error: "number field is not specified",
		});
	}

	const newPerson = new Person({
		name: body.name,
		number: body.number,
	});

	newPerson
		.save()
		.then(savedPerson => response.json(savedPerson))
		.catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
	console.log(error);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running at port ${PORT}`);
});
