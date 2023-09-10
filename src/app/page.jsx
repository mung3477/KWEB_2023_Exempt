import Link from "next/link";
import { SignInForm } from "@/components/app";

export default function landing() {
	return (
		<main className="w-fit flex flex-col m-auto">
			<SignInForm />
			<Link href={"/signup"}>Sign up</Link>
		</main>
	);
}
