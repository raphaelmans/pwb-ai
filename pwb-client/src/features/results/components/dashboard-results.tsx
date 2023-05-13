import { useFetchResults } from "../../../shared/hooks";
import { Stack, LoadingOverlay } from "@mantine/core";
import DashboardResultItem from "./dashboard-result-item";
const DashboardResults = () => {
  const { results, isLoading } = useFetchResults();

  const resultsData = results?.data;
  return (
    <Stack>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      {resultsData?.map((item) => (
        <DashboardResultItem data={item} />
      ))}
    </Stack>
  );
};

export default DashboardResults;
