import { create } from "zustand";

type Store = {
  batchNumber: number | undefined;
  setBatchNumber: (batchNumber: number) => void;
  resetBatchNumber: () => void;
};

export const useBatchNumberStore = create<Store>((set) => ({
  batchNumber: undefined,
  setBatchNumber: (batchNumber) => set({ batchNumber }),
  resetBatchNumber: () => set({ batchNumber: undefined }),
}));
