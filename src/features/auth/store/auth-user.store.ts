import { create } from "zustand";
import { TUserDTO } from "@/features/user/schema/user.schema";

type TUseAuthUserStore = {
  user: TUserDTO | null;
  setUser: (user: TUserDTO) => void;
  resetUser: () => void;
  setEmail: (email: string) => void;
  email: string | null;
  hasPermission: (permission: string) => boolean;
};

export const useAuthUserStore = create<TUseAuthUserStore>()((set, get) => ({
  user: null,
  setUser: (user: TUserDTO) => set({ user }),
  resetUser: () => {
    set({ user: null, email: null });
  },
  setEmail: (email: string) => set({ email }),
  email: null,
  hasPermission: (permission: string) => {
    return get().user?.permissions?.includes(permission) ?? false;
  },
}));
