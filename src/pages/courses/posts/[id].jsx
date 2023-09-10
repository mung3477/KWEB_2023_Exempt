import prisma from "lib/prisma";
import { useRouter } from "next/router";

export default function CoursePage({ post }) {
	console.log(post);
	const router = useRouter();

	return (
		<>
			<h1>{post.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: post.content }} />
			<button
				type="button"
				onClick={router.back}
				className="mt-[20px] w-fit border"
			>
				돌아가기
			</button>
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
