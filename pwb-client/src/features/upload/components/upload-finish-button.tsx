import { Button } from "@mantine/core";
import { useBatchNumberStore } from "../../../store";

const UploadFinishButton = () => {
  const resetBatchNumber = useBatchNumberStore(
    (state) => state.resetBatchNumber
  );
  return (
    <Button
      variant="subtle"
      onClick={resetBatchNumber}
      w="fit-content"
      ml="auto"
    >
      Finish
    </Button>
  );
};

export default UploadFinishButton;
