import Link from "next/link";
import { useRouter } from "next/router";
import { SignInForm } from "@/components/app";
import { useAuthStore } from "@/stores/auth";

export default function Landing() {
	const router = useRouter();
	const { id } = useAuthStore((state) => state);

	console.log(id);
	if (id) router.push("/courses");

	return (
		<main className="w-fit flex flex-col m-auto">
			<SignInForm />
			<Link href={"/signup"} className="mt-[16px] text-center border">
				회원가입
			</Link>
		</main>
	);
}
