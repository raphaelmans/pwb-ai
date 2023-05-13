import useSWRMutation from "swr/mutation";
import {
  APIRoutes,
  evaluateMutation, 
} from "../services";

export const useEvaluate = () => {
  const { trigger: evaluateImg, isMutating } = useSWRMutation(
    APIRoutes.evaluatePWB,
    evaluateMutation,
    {
      revalidate: true,
    }
  );

  return {
    evaluateImg,
    isMutating,
  };
};

