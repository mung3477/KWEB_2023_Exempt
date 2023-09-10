import { useEffect, useState } from "react";
import Link from "next/link";
import { CreateNewCourse } from "@/components/courses";
import { useAuthStore } from "@/stores/auth";

let fetchedOnlyMine = false;

export default function ProfCoursesPage() {
	const { id, role } = useAuthStore((state) => state);
	const [fetchOnlyMine, setFetchOnlyMine] = useState(false);
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		fetchCourses();
	}, [id]);

	const fetchCourses = () => {
		if (id) {
			if (fetchOnlyMine) {
				fetch(`/api/courses/mine?id=${id}`, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				})
					.then((res) => res.json())
					.then((data) => {
						if (data) {
							setCourses(data);
							setFetchOnlyMine(false);
							fetchedOnlyMine = true;
						}
					});
			} else {
				fetch(
					`/api/courses?${
						role === "PROFESSOR" ? `professorId=${id}` : ``
					} `,
					{
						method: "GET",
						headers: { "Content-Type": "application/json" },
					}
				)
					.then((res) => res.json())
					.then((data) => {
						if (data) {
							setCourses(data);
							setFetchOnlyMine(role === "STUDENT");
							fetchedOnlyMine = false;
						}
					});
			}
		}
	};

	return (
		<>
			<h1>
				{role === "PROFESSOR" || fetchedOnlyMine ? "내 " : ""}강의 목록
			</h1>
			<ul>
				{courses.map((course) => (
					<li key={course.id}>
						<Link href={`/courses/${course.name}`}>
							{course.name}
						</Link>
					</li>
				))}
			</ul>
			{role === "STUDENT" && (
				<button type="button" onClick={fetchCourses}>
					{fetchOnlyMine ? "수강 중인 강의만 보기" : "모든 강의 보기"}
				</button>
			)}
			{role === "PROFESSOR" && <CreateNewCourse />}
		</>
	);
}
