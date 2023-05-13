import { Button } from "@mantine/core";
import { useBatchNumberStore } from "../../../store";
import { useResultStore } from "../../results/store";

const UploadFinishButton = () => {
  const resetBatchNumber = useBatchNumberStore(
    (state) => state.resetBatchNumber
  );
  const resetResults = useResultStore((state) => state.reset);

  const handleFinish = () => {
    resetBatchNumber();
    resetResults();
  };
  return (
    <Button variant="subtle" onClick={handleFinish} w="fit-content" ml="auto">
      Finish
    </Button>
  );
};

export default UploadFinishButton;
