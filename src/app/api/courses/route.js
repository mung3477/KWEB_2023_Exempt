import prisma from "lib/prisma";

export async function GETCourses() {
	const courses = await prisma.course.findMany();
	return Response.json({ courses });
}
