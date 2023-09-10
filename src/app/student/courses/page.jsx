import { GETCourses } from "@/app/api/courses/route";

export default async function CoursesPage() {
	const res = await GETCourses();
	const { courses } = await res.json();
	console.log(courses);
	return (
		<ul>
			{courses.map((course) => (
				<li key={course.id}>{course.name}</li>
			))}
		</ul>
	);
}
