import { ModeType } from "@/components/ui/gluestack-ui-provider";
import { create } from "zustand";

export type ThemeMode = ModeType;

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}));
