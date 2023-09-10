import Link from "next/link";
import prisma from "lib/prisma";

export default function CoursePage({ post }) {
	console.log(post);

	return (
		<>
			<h1>게시물</h1>
			<div dangerouslySetInnerHTML={{ __html: post.content }} />
		</>
	);
}

export const getServerSideProps = async ({ params }) => {
	const result = await prisma.post.findUnique({
		where: {
			id: params.id,
		},
	});
	const post = {
		...result,
		createdAt: result.createdAt.toString(),
		updatedAt: result.updatedAt.toString(),
	};
	return {
		props: {
			post,
		},
	};
};
