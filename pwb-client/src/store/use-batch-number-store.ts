import { create } from "zustand";

type Store = {
  batchId: number | undefined;
  setBatchId: (batchId: number) => void;
  resetBatchId: () => void;
};

export const useBatchStore = create<Store>((set) => ({
  batchId: undefined,
  setBatchId: (id) => set({ batchId: id }),
  resetBatchId: () => set({ batchId: undefined }),
}));
