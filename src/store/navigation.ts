import { create } from 'zustand';

export type NavItem = 'chats' | 'contacts' | 'communities' | 'calls' | 'settings';

interface NavigationState {
  activeItem: NavItem;
  setActiveItem: (item: NavItem) => void;
  isMobileDrawerOpen: boolean;
  setIsMobileDrawerOpen: (open: boolean) => void;
  toggleMobileDrawer: () => void;
}

export const useNavigation = create<NavigationState>((set) => ({
  activeItem: 'chats',
  setActiveItem: (item) => set({ activeItem: item }),
  isMobileDrawerOpen: false,
  setIsMobileDrawerOpen: (open) => set({ isMobileDrawerOpen: open }),
  toggleMobileDrawer: () => set((state) => ({ isMobileDrawerOpen: !state.isMobileDrawerOpen })),
}));
