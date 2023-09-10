import prisma from "lib/prisma";

export default async function handle(req, res) {
	if (req.method === "GET") {
		const result = await prisma.course.findMany();
		res.json(result);
	}
}
