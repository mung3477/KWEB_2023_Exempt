import { useState } from "react";

export default function SignUpForm() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [infoId, setInfoId] = useState("");
	const [role, setRole] = useState("student");

	const onChangeId = (e) => setId(e.target.value);
	const onChangePassword = (e) => setPassword(e.target.value);
	const onChangeName = (e) => setName(e.target.value);
	const onChangeInfoId = (e) => setInfoId(e.target.value);
	const onChangeRole = (e) => setRole(e.target.value);
	const onSubmit = async (e) => {
		e.preventDefault();
		const data = {
			id,
			password,
			name,
			infoId: parseInt(infoId),
			role,
		};

		fetch(`/api/auth/signup?isStudent=${role === "student"}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
			.then((res) => {
				if (res.status === 200) {
					alert("created user");
					return null;
				}
				return res.json();
			})
			.then((err) => {
				if (err) alert(err.message);
			});
	};
	return (
		<form className="flex flex-col" onSubmit={onSubmit}>
			<label htmlFor="signup-id">ID</label>
			<input
				type="text"
				id="signup-id"
				placeholder="ID"
				value={id}
				onChange={onChangeId}
				required
			/>
			<label htmlFor="signup-password">비밀번호</label>
			<input
				type="password"
				id="signup-password"
				placeholder="password"
				value={password}
				onChange={onChangePassword}
				required
			/>
			<label htmlFor="signup-name">이름</label>
			<input
				type="text"
				id="signup-name"
				placeholder="이름"
				value={name}
				onChange={onChangeName}
				required
			/>
			<label htmlFor="signup-student-id">학번</label>
			<input
				type="text"
				id="signup-student-id"
				placeholder="학번"
				value={infoId}
				onChange={onChangeInfoId}
				required
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
