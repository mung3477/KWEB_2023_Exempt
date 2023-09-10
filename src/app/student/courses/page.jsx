import { server } from "config/server";

export default async function CoursesPage() {
	const res = await fetch(`${server}/student/courses`);
	const { courses } = await res.json();

	return (
		<ul>
			{courses.map((course) => (
				<li key={course.id}>{course.name}</li>
			))}
		</ul>
	);
}
