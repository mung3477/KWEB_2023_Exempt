import prisma from "lib/prisma";

export default async function handle(req, res) {
	const { title, content, courseName, authorId } = req.body;

	try {
		const post = await prisma.post.create({
			data: {
				title,
				content,
				courseName,
				authorId,
			},
		});
		res.json(post);
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "글 작성 도중 에러가 발생헀어요." });
	}
}
