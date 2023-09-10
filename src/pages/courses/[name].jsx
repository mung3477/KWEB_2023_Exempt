import Link from "next/link";
import prisma from "lib/prisma";
import { useAuthStore } from "@/stores/auth";

export default function CoursePage({ posts, courseName }) {
	const { id, role } = useAuthStore((state) => state);
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
			{role === "PROFESSOR" && (
				<Link
					href={`/courses/posts/new?courseName=${courseName}&prof=${id}`}
				>
					새 게시물 작성
				</Link>
			)}
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
			courseName: params.name,
		},
	};
};
