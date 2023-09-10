import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/auth";

export default function ProfCoursesPage() {
	const router = useRouter();
	const { id, role } = useAuthStore((state) => state);
	const [courses, setCourses] = useState([]);
	const [newCourseName, setNewCourseName] = useState("");

	useEffect(() => {
		if (role === "STUDENT") router.push("/student/courses");
	}, [router, role]);

	useEffect(() => {
		if (id) {
			fetch(`/api/courses?professorId=${id}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			})
				.then((res) => res.json())
				.then((data) => {
					if (data) setCourses(data);
				});
		}
	}, [id]);

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
		<>
			<h1>내 강의 목록</h1>
			<ul>
				{courses.map((course) => (
					<li key={course.id}>{course.name}</li>
				))}
			</ul>
			<form onSubmit={onClickCreateCourse}>
				<label htmlFor="new-course-name">강의명</label>
				<input
					type="text"
					id="new-course-name"
					value={newCourseName}
					onChange={onChangeNewCourseName}
				/>
				<button type="submit">새 강의 개설</button>
			</form>
		</>
	);
}
