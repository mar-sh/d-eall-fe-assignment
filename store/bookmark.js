import create from "zustand";
import { persist } from "zustand/middleware";
const useBookmarkStore = create(
  persist(
    (set, get) => ({
      bookmarks: [],
      addToBookmark: (params) => {
        set((state) => ({
          bookmarks: [...state.bookmarks, params],
        }));
      },
    }),
    { name: "bookmark" }
  )
);
export default useBookmarkStore;
