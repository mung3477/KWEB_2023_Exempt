import prisma from "lib/prisma";

export default async function handle(req, res) {
	if (req.method === "GET") {
		const { id } = req.query;
		const result = await prisma.course.findMany({
			where: {
				students: {
					some: {
						id,
					},
				},
			},
		});
		res.json(result);
	}
}
