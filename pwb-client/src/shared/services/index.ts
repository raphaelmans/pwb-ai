import { AxiosResponse, AxiosRequestConfig } from "axios";
import { MutationFetcher } from "swr/mutation";
import { ClassificationResult } from "../../types";
import baseFetcher from "../api";

type ResultImage = {
  datauri: string;
  batch_id?: string;
};

const APIRoutes = {
  saveImage: "/save_image",
  evaluatePWB: "/evaluate_pwb",
  classificationResults: "/classification_result",
  stats: "/classification_counts",
};

export type Stats = {
  totalGood: number;
  totalNoGood: number;
  totalCount: number;
};
const APIService = {
  getStats: (config?: AxiosRequestConfig) => {
    return baseFetcher.get<Stats>(APIRoutes.stats, config);
  },
  getResults: (config?: AxiosRequestConfig) => {
    return baseFetcher.get<ClassificationResult[]>(
      APIRoutes.classificationResults,
      {
        params: {
          limit: 5,
        },
        ...config,
      }
    );
  },

  saveImage: (base64Img: string) => {
    return baseFetcher.post<ResultImage, any>(APIRoutes.saveImage, {
      datauri: base64Img,
    });
  },
  evaluate_pwb: (data: ResultImage) => {
    return baseFetcher.post<ResultImage, any>(APIRoutes.evaluatePWB, {
      datauri: data.datauri,
      batch_id: data.batch_id,
    });
  },
};

const saveImageMutation: MutationFetcher<
  AxiosResponse<any>,
  ResultImage,
  string
> = (_, { arg }) => {
  return APIService.saveImage(arg.datauri);
};

const evaluateMutation: MutationFetcher<
  AxiosResponse<ClassificationResult>,
  {
    data: ResultImage;
  },
  string
> = (_, { arg }) => {
  return APIService.evaluate_pwb(arg.data);
};
export type EvaluationResult = {
  result: ClassificationResult;
};

export {
  saveImageMutation,
  evaluateMutation,
  APIService,
  APIRoutes,
};
