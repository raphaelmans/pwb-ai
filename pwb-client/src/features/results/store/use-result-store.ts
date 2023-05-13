import { create } from "zustand";
import { PWBLabel } from "../../../types";

type Store = {
  good: number;
  noGood: number;
  totalCount: number;
  increment: (label: PWBLabel) => void;
  reset: () => void;
};

export const useResultStore = create<Store>((set) => ({
  good: 0,
  noGood: 0,
  totalCount: 0,
  reset: () => set({ good: 0, noGood: 0, totalCount: 0 }),
  increment: (label) => {
    set((state) => {
      if (label === "GOOD") {
        return {
          good: state.good + 1,
          totalCount: state.totalCount + 1,
        };
      } else {
        return {
          noGood: state.noGood + 1,
          totalCount: state.totalCount + 1,
        };
      }
    });
  },
}));
