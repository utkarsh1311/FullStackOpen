const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
	let sum = parts.reduce((sum, part) => (sum = sum + part.exercises), 0);

	return <strong>total of {sum} exercises</strong>;
};

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) => (
	<>
		{parts.map((part) => (
			<Part key={part.id} part={part} />
		))}
	</>
);

const Course = ({ course }) => {
	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	);
};

export default Course;
