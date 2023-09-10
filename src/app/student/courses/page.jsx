import { server } from "config";

export default async function CoursesPage() {
	const res = await fetch(`${server}/api/courses`);
	const data = await res.json();
	const courses = data.result;
	console.log(courses);
	return (
		<ul>
			{courses.map((course) => (
				<li key={course.id}>{course.name}</li>
			))}
		</ul>
	);
}
