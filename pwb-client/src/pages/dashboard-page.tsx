import { Box, Center, Stack, Text } from "@mantine/core";
import DashboardResults from "../features/results/components/dashboard-results";
import DashboardStats from "../features/results/components/dashboard-stats";

const DashboardPage = () => {
  return (
    <Box h="100vh" pos="relative">
      <Center>
        <Stack align="left" w="100%">
          <Text size="xxl" component="h1">
            Dashboard
          </Text>
          <DashboardStats />
          <DashboardResults />
        </Stack>
      </Center>
    </Box>
  );
};

export default DashboardPage;
