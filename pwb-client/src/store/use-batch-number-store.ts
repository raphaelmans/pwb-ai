import { create } from "zustand";

type Store = {
  batchId: string | undefined;
  setBatchId: (batchId: string) => void;
  resetBatchId: () => void;
};

export const useBatchStore = create<Store>((set) => ({
  batchId: undefined,
  setBatchId: (id) => set({ batchId: id }),
  resetBatchId: () => set({ batchId: undefined }),
}));
