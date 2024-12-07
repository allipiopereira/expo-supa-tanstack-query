import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Profile } from "@/types/auth/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

type StateProps = {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
};

export const useProfileStore = create(
  persist<StateProps>(
    (set, get) => ({
      profile: null,
      setProfile: (profile: Profile | null) => set({ profile }),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
