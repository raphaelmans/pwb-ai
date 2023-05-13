import { Button } from "@mantine/core";
import { useBatchNumberStore } from "../../../store";

const UploadFinishButton = () => {
  const resetBatchNumber = useBatchNumberStore(
    (state) => state.resetBatchNumber
  );
  return <Button variant="light" onClick={resetBatchNumber}>Finish</Button>;
};

export default UploadFinishButton;
