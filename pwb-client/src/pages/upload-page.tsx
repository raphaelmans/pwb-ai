import UploadDropzone from "../features/upload/components/upload-dropzone";
import { Box, Center, Stack, Text } from "@mantine/core";
import UploadInputBatchId from "../features/upload/components/upload-input-batch-number";

const UploadPage = () => {
  return (
    <Box h="100vh">
      <Center>
        <Stack>
          <Text size="xxl" component="h1">
            Upload
          </Text>
          <UploadInputBatchId />
          <UploadDropzone />
        </Stack>
      </Center>
    </Box>
  );
};

export default UploadPage;
