import { APP_ROUTES, PWB_LABELS } from "../shared/constants";

export type PWBLabel = (typeof PWB_LABELS)[number];
export type AppRoute = (typeof APP_ROUTES)[number];
export type ClassificationResult = {
  class_name: string;
  batch_id: number;
  probability: number;
  id: number;
  created_at: string;
};
