import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";

export default function QuillEditor() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [value, setValue] = useState("");
	const editorRef = useRef(null);

	const { courseName, prof } = router.query;

	const onChangeTitle = (e) => setTitle(e.target.value);

	const onSave = () => {
		const data = {
			title,
			content: editorRef.current.getEditor().root.innerHTML,
			courseName,
			authorId: prof,
		};
		if (data.title !== "" && data.content !== "") {
			fetch(`/api/courses/posts`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.title && data.content) {
						router.push(`/courses/posts/${data.id}`);
					} else {
						alert(data.message);
					}
				});
		}
	};

	return (
		<>
			<label htmlFor="post-title">제목</label>
			<input
				type="text"
				id="post-title"
				placeholder="제목"
				value={title}
				onChange={onChangeTitle}
				required
			/>
			<ReactQuill
				theme="snow"
				value={value}
				onChange={setValue}
				ref={editorRef}
			/>
			<button type="button" onClick={onSave}>
				저장
			</button>
		</>
	);
}
