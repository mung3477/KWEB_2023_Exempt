import { useState } from "react";

export default function SignInForm() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");

	const onChangeId = (e) => setId(e.target.value);
	const onChangePassword = (e) => setPassword(e.target.value);
	const onSubmit = async (e) => {
		e.preventDefault();
		const data = {
			id,
			password,
		};

		fetch(`/api/auth/signin`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
			.then((res) => {
				if (res.status === 200) {
					alert("로그인 성공!");
				}
				return res.json();
			})
			.then((data) => {
				if (data.message) alert(data.message);
				else console.log(data);
			});
	};
	return (
		<form className="flex flex-col" onSubmit={onSubmit}>
			<input
				type="text"
				aria-label="Id"
				placeholder="ID"
				value={id}
				onChange={onChangeId}
			/>
			<input
				type="password"
				aria-label="password"
				placeholder="password"
				value={password}
				onChange={onChangePassword}
			/>
			<button type="submit">Login</button>
		</form>
	);
}
