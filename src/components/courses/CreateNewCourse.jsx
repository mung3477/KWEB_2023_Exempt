import { useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/auth";

export default function CreateNewCourse() {
	const router = useRouter();
	const { id } = useAuthStore((state) => state);
	const [newCourseName, setNewCourseName] = useState("");

	const onChangeNewCourseName = (e) => setNewCourseName(e.target.value);

	const onClickCreateCourse = (e) => {
		e.preventDefault();
		if (newCourseName) {
			fetch(`/api/courses`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ professorId: id, name: newCourseName }),
			}).then((res) => {
				if (res.status === 200) router.reload();
				else alert("강의 개설에 실패했습니다.");
			});
		}
	};

	return (
		<form
			onSubmit={onClickCreateCourse}
			className="mt-[20px] border-t w-fit"
		>
			<label htmlFor="new-course-name" className="mr-[10px]">
				강의명
			</label>
			<input
				type="text"
				id="new-course-name"
				value={newCourseName}
				onChange={onChangeNewCourseName}
			/>
			<button
				type="submit"
				className="bg-slate-100 p-3 border rounded-sm"
			>
				새 강의 개설
			</button>
		</form>
	);
}
