import sha256 from "sha256";
import prisma from "lib/prisma";

export default async function handle(req, res) {
	const { id, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});
		if (user === null) {
			return res
				.status(401)
				.json({ message: "아이디가 존재하지 않습니다." });
		}
		if (user.password !== sha256(password)) {
			return res
				.status(401)
				.json({ message: "비밀번호가 일치하지 않습니다." });
		}
		res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "로그인에 실패했습니다." });
	}
}
