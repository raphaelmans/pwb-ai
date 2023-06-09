import { Button } from "@mantine/core";
import { useBatchStore } from "../../../store";
import { useResultStore } from "../../results/store";

type Props = {
  callback?: () => void;
};
const UploadFinishButton = ({ callback }: Props) => {
  const resetBatchId = useBatchStore((state) => state.resetBatchId);
  const resetResults = useResultStore((state) => state.reset);

  const handleFinish = () => {
    resetBatchId();
    resetResults();

    if (callback) {
      callback();
    }
  };
  return (
    <Button variant="subtle" onClick={handleFinish} w="fit-content" ml="auto">
      End Session
    </Button>
  );
};

export default UploadFinishButton;
