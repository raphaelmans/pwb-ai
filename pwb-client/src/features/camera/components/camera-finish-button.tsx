import { Button } from "@mantine/core";
import { useResultStore } from "../../results/store";
import { useCameraBatchIdStore } from "../store";

type Props = {
  callback?: () => void;
};
const CameraFinishButton = ({ callback }: Props) => {
  const resetBatchId = useCameraBatchIdStore((state) => state.resetBatchId);
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

export default CameraFinishButton;
