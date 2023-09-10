"use client";

import { useState } from "react";

export default function SignUpForm() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [studentId, setStudentId] = useState("");
	const [role, setRole] = useState("student");

	const onChangeId = (e) => setId(e.target.value);
	const onChangePassword = (e) => setPassword(e.target.value);
	const onChangeName = (e) => setName(e.target.value);
	const onChangeStudentId = (e) => setStudentId(e.target.value);
	const onChangeRole = (e) => setRole(e.target.value);

	return (
		<form className="flex flex-col">
			<label htmlFor="signup-id">ID</label>
			<input
				type="text"
				id="signup-id"
				placeholder="ID"
				value={id}
				onChange={onChangeId}
			/>
			<label htmlFor="signup-password">비밀번호</label>
			<input
				type="password"
				id="signup-password"
				placeholder="password"
				value={password}
				onChange={onChangePassword}
			/>
			<label htmlFor="signup-name">이름</label>
			<input
				type="text"
				id="signup-name"
				placeholder="이름"
				value={name}
				onChange={onChangeName}
			/>
			<label htmlFor="signup-student-id">학번</label>
			<input
				type="text"
				id="signup-student-id"
				placeholder="학번"
				value={studentId}
				onChange={onChangeStudentId}
			/>
			<h3>신분</h3>
			<ul>
				<li>
					<label>
						<input
							type="radio"
							name="role"
							value="student"
							checked={role === "student"}
							onChange={onChangeRole}
						/>
						학생
					</label>
				</li>
				<li>
					<label>
						<input
							type="radio"
							name="role"
							value="professor"
							checked={role === "professor"}
							onChange={onChangeRole}
						/>
						교수
					</label>
				</li>
			</ul>
			<button type="submit">회원 가입</button>
		</form>
	);
}
