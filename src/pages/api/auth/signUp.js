import sha256 from "sha256";
import prisma from "lib/prisma";

export default async function handle(req, res) {
	const { id, password, name, infoId } = req.body;
	const isStudent = req.query.isStudent === "true";

	try {
		const user = await prisma.user.create({
			data: {
				id,
				password: sha256(password),
				name,
				infoId,
				role: isStudent ? "STUDENT" : "PROFESSOR",
			},
		});
		res.json(user);
	} catch (err) {
		console.log(err);
		if (err.code === "P2002") {
			if (err.meta.target[0] === "id") {
				console.log("ID CONFLICT");
				return res
					.status(409)
					.json({ message: "이미 존재하는 아이디입니다." });
			}
			if (
				err.meta.target[0] === "info_id" &&
				err.meta.target[1] === "role"
			) {
				console.log("INFO ID CONFLICT");
				return res.status(409).json({
					message: `이미 존재하는 ${
						isStudent ? "학번" : "교수 번호"
					}입니다.`,
				});
			}
		}
		return res.status(500).json({ message: "회원가입에 실패했습니다." });
	}
}
