import { create } from "zustand";

export type ScreenType = "home" | "search" | "settings";

export interface FrontendState {
  currentScreen: ScreenType;
  sidebarOpen: boolean;
  modalOpen: boolean;
}

interface FrontendStore extends FrontendState {
  setCurrentScreen: (screen: ScreenType) => void;
  toggleSidebar: () => void;
  toggleModal: () => void;
}

const initialState: FrontendState = {
  currentScreen: "home",
  sidebarOpen: false,
  modalOpen: false,
};

export const useFrontendStore = create<FrontendStore>((set) => ({
  ...initialState,
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleModal: () => set((state) => ({ modalOpen: !state.modalOpen })),
}));
