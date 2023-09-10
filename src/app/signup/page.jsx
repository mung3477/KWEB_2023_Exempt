export default function Signup() {
	return (
		<div className="m-auto">
			<form className="flex flex-col">
				<input type="text" aria-label="Id" placeholder="ID" />
				<input
					type="password"
					aria-label="password"
					placeholder="password"
				/>
				<button type="submit">Sign up</button>
			</form>
		</div>
	);
}
