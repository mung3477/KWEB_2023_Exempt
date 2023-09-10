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
	} else if (req.method === "POST") {
		const { courseName, professorId, studentId } = req.body;
		const student = await prisma.user.findUnique({
			where: {
				infoId_role: {
					infoId: studentId,
					role: "STUDENT",
				},
			},
		});

		const history = await prisma.user.findUnique({
			where: {
				infoId_role: {
					infoId: studentId,
					role: "STUDENT",
				},
				attended: {
					some: {
						name: courseName,
						professorId,
					},
				},
			},
		});
		console.log(history);
		if (history !== null)
			return res.status(409).json({ message: "이미 등록하셨습니다." });

		const result = await prisma.course.update({
			where: {
				name_professorId: {
					name: courseName,
					professorId,
				},
			},
			data: {
				students: {
					connect: student,
				},
			},
		});
		res.json(result);
	}
}
