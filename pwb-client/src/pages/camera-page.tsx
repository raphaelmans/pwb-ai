import { Box, Center, Stack, Text } from "@mantine/core";
import AppCamera from "../features/camera/components/app-camera";

const CameraPage = () => {
  return (
    <Box h="100vh">
      <Center>
        <Stack>
          <Text size="xxl" component="h1">
            Real Time
          </Text>
          <AppCamera />
        </Stack>
      </Center>
    </Box>
  );
};

export default CameraPage;
