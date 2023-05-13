import useSWR from "swr";
import {
    APIRoutes,
    APIService,
  } from "../services";
export const useFetchResults = () => {
  const {
    data: results,
    error,
    isLoading,
    isValidating,
  } = useSWR(APIRoutes.classificationResults, () =>
    APIService.getResults()
  );
  return {
    results,
    error,
    isLoading,
    isValidating,
  };
};
