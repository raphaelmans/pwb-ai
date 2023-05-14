import UploadBatchIdInput from "../features/upload/components/upload-batch-id-input";
import UploadDropzone from "../features/upload/components/upload-dropzone";
import { Box, Center, Stack, Text } from "@mantine/core";

const UploadPage = () => {
  return (
    <Box h="100vh">
      <Center>
        <Stack pb="lg">
          <Text size="xxl" component="h1">
            Upload
          </Text>
          <UploadBatchIdInput />
          <UploadDropzone />
        </Stack>
      </Center>
    </Box>
  );
};

export default UploadPage;
