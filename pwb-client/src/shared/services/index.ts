import { AxiosResponse } from "axios";
import { MutationFetcher } from "swr/mutation";
import { ClassificationResult } from "../../types";
import baseFetcher from "../api";

type ResultImage = {
  datauri: string;
};

const ResultImageRoutes = {
  saveImage: "/save_image",
  evaluatePWB: "/evaluate_pwb",
};

const ResultImageService = {
  saveImage: (base64Img: string) => {
    return baseFetcher.post<ResultImage, any>(ResultImageRoutes.saveImage, {
      datauri: base64Img,
    });
  },
  evaluate_pwb: (base64Img: string) => {
    return baseFetcher.post<ResultImage, any>(ResultImageRoutes.evaluatePWB, {
      datauri: base64Img,
    });
  },
};

const saveImageMutation: MutationFetcher<
  AxiosResponse<any>,
  ResultImage,
  string
> = (_, { arg }) => {
  return ResultImageService.saveImage(arg.datauri);
};

const evaluateMutation: MutationFetcher<
  AxiosResponse<ClassificationResult>,
  ResultImage,
  string
> = (_, { arg }) => {
  return ResultImageService.evaluate_pwb(arg.datauri);
};
export type EvaluationResult = {
  result: ClassificationResult;
};

export {
  saveImageMutation,
  evaluateMutation,
  ResultImageService,
  ResultImageRoutes,
};
