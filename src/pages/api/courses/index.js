import prisma from "lib/prisma";

export default async function handle(req, res) {
	if (req.method === "GET") {
		const { professorId } = req.query;
		const result = await prisma.course.findMany({
			where: {
				professorId,
			},
		});
		res.json(result);
	}
	if (req.method === "POST") {
		const { name, professorId } = req.body;
		const result = await prisma.course.create({
			data: {
				name,
				professorId,
			},
		});
		res.json(result);
	}
}
