import { APP_ROUTES, PWB_LABELS } from "../shared/constants";

export type PWBLabel = (typeof PWB_LABELS)[number];
export type AppRoute = (typeof APP_ROUTES)[number];

export type ClassificationResult = {
  id: number;
  class_name: PWBLabel;
  batch_id: string;
  created_at: string;
  probability: number;
  image_data: string | null;
}
