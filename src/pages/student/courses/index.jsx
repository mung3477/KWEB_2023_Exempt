import prisma from "lib/prisma";

export default function CoursesPage({ courses }) {
	console.log(courses);

	return (
		<ul>
			{courses.map((course) => (
				<li key={course.id}>{course.name}</li>
			))}
		</ul>
	);
}

export const getServerSideProps = async () => {
	const result = await prisma.course.findMany();
	const courses = result.map((course) => ({
		...course,
		createdAt: course.createdAt.toString(),
	}));
	return {
		props: {
			courses,
		},
	};
};
