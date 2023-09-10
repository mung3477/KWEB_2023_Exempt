import Link from "next/link";
import prisma from "lib/prisma";

export default function CoursePage({ posts }) {
	console.log(posts);

	return (
		<>
			<h1>게시물</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<Link href={`/courses/posts/${post.id}`}>
							{post.title}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}

export const getServerSideProps = async ({ params }) => {
	const result = await prisma.post.findMany({
		where: {
			courseName: params.name,
		},
	});
	const posts = result.map((post) => ({
		...post,
		createdAt: post.createdAt.toString(),
		updatedAt: post.updatedAt.toString(),
	}));
	return {
		props: {
			posts,
		},
	};
};
