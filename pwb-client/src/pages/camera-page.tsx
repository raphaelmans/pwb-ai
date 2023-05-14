import { Box, Center, Stack, Text } from "@mantine/core";
import AppCamera from "../features/camera/components/app-camera";
import CameraBatchIdInput from "../features/camera/components/camera-batch-id-input";

const CameraPage = () => {
  return (
    <Box h="100vh">
      <Center>
        <Stack align="left">
          <Text size="xxl" component="h1">
            Real Time
          </Text>
          <Stack align="center">
            <CameraBatchIdInput />
            <AppCamera />
          </Stack>
        </Stack>
      </Center>
    </Box>
  );
};

export default CameraPage;
