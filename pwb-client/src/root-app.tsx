import { MantineProvider, Group, Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { NavbarSimpleColored } from "./shared/components/nav-bar";
import BaseLayout from "./shared/layout/base-layout";
function RootApp() {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Group w="100%" spacing={0}>
          <NavbarSimpleColored />
          <Box
            sx={{
              flex: 1,
              overflow: "auto",

            }}
            w="100%"
            mah="100vh"
          >
            <BaseLayout>
              <Outlet />
            </BaseLayout>
          </Box>
        </Group>
      </MantineProvider>
    </>
  );
}

export default RootApp;
