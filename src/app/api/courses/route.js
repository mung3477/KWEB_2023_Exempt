import prisma from "../../../../lib/prisma";

export async function GET() {
	const courses = await prisma.course.findMany();
	return Response.json({ courses });
}
