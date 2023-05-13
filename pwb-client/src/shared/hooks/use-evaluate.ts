import useSWRMutation from "swr/mutation";
import { ResultImageRoutes, evaluateMutation } from "../services";

export const useEvaluate = () => {
  const { trigger: evaluateImg, isMutating } = useSWRMutation(
    ResultImageRoutes.evaluatePWB,
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
