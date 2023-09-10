"use client";

import { useState } from "react";

export default function SignInForm() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");

	const onChangeId = (e) => setId(e.target.value);
	const onChangePassword = (e) => setPassword(e.target.value);

	return (
		<form className="flex flex-col">
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
