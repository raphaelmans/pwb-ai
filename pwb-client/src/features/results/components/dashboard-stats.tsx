import {
  createStyles,
  Progress,
  Box,
  Text,
  Group,
  Paper,
  SimpleGrid,
  rem,
} from "@mantine/core";
import { IconArrowUpRight, IconDeviceAnalytics } from "@tabler/icons-react";
import useSWR from "swr";
import { APIRoutes, APIService } from "../../../shared/services";

type StatItem = {
  label: string;
  count: string;
  part: number;
  color: string;
};
export function DashboardStats() {
  const { classes } = useStyles();
  const { data } = useSWR(APIRoutes.stats, () => APIService.getStats());

  const stats = data?.data;
  if (!stats) {
    return null;
  }
  const statsUI: StatItem[] = [
    {
      label: "Good",
      count: stats.totalGood.toString(),
      part: (stats.totalGood / stats.totalCount) * 100,
      color: "green.5",
    },
    {
      label: "No Good",
      count: stats.totalNoGood.toString(),
      part: (stats.totalNoGood / stats.totalCount) * 100,
      color: "red.5",
    },
  ];

  const segments = statsUI.map((segment) => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part}%` : undefined,
  }));

  const descriptions = statsUI.map((stat) => (
    <Box
      key={stat.label}
      sx={{ borderBottomColor: stat.color }}
      className={classes.stat}
    >
      <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
        {stat.label}
      </Text>

      <Group position="apart" align="flex-end" spacing={0}>
        <Text fw={700}>{stat.count}</Text>
        <Text c={stat.color} fw={700} size="sm" className={classes.statCount}>
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ));

  return (
    <Paper withBorder p="md" radius="md">
      <Group position="apart">
        <Group align="flex-end" spacing="xs">
          <Text fz="xl" fw={700}>
            {stats.totalCount}
          </Text>
        </Group>
        <IconDeviceAnalytics
          size="1.4rem"
          className={classes.icon}
          stroke={1.5}
        />
      </Group>

      <Text c="dimmed" fz="sm">
        Overall Results
      </Text>

      <Progress
        sections={segments}
        size={34}
        classNames={{ label: classes.progressLabel }}
        mt={40}
      />
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "xs", cols: 1 }]} mt="xl">
        {descriptions}
      </SimpleGrid>
    </Paper>
  );
}

const useStyles = createStyles((theme) => ({
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  stat: {
    borderBottom: `${rem(3)} solid`,
    paddingBottom: rem(5),
  },

  statCount: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.3,
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
}));

export default DashboardStats;
