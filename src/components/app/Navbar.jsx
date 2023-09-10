import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/auth";

export default function Navbar() {
	const router = useRouter();
	const clearUser = useAuthStore((state) => state.clearUser);

	const onClickLogout = () => {
		clearUser();
		sessionStorage.clear();
		router.push("/");
	};

	return (
		<div className="w-full h-[60px] flex [&>a]:mr-[16px]">
			<Link href="/">로그인</Link>
			<Link href="/courses">강의 목록</Link>
			<button type="button" onClick={onClickLogout}>
				로그아웃
			</button>
		</div>
	);
}
