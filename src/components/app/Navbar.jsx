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
		<div className="w-full flex [&>a]:mr-[16px] mb-[20px]">
			<Link href="/courses">강의 목록</Link>
			<button type="button" onClick={onClickLogout}>
				로그아웃
			</button>
		</div>
	);
}
