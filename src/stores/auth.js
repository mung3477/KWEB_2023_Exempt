import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
	persist(
		(set) => ({
			id: null,
			infoId: null,
			name: null,
			role: null,
			setUser: (user) => set({ ...user }),
			clearUser: () =>
				set({ id: null, infoId: null, name: null, role: null }),
		}),
		{
			name: "auth-kweb-storage",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
