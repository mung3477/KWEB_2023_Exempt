import dynamic from "next/dynamic";

const EditorComponent = dynamic(
	() => import("@/components/courses/QuillEditor"),
	{
		loading: () => <div>...loading</div>,
		ssr: false,
	}
);

export default function NewPostPage() {
	return (
		<>
			<h1>새 게시물</h1>
			<EditorComponent />
		</>
	);
}
