
import { create } from "zustand";

export const useLinksStore = create((set) => ({
  links: [],
  setLinks: (links) => set({ links }),
  addLink: (link) => set((state) => ({ links: [...state.links, link] })),
  updateLink: (id, updates) =>
    set((state) => ({
      links: state.links.map((link) => (link._id === id ? { ...link, ...updates } : link)),
    })),
  removeLink: (id) =>
    set((state) => ({ links: state.links.filter((link) => link._id !== id) })),
  reorderLinks: (newOrder) => set({ links: newOrder }),
}));
