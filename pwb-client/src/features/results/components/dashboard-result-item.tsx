import {
  IconCalendarTime,
  IconCircleCheck,
  IconPackage,
} from "@tabler/icons-react";
import {
  Card,
  Text,
  Group,
  Center,
  createStyles,
  getStylesRef,
  rem,
} from "@mantine/core";

import { format } from "date-fns";
import { ClassificationResult } from "../../../types";

interface DashboardResultItemProps {
  data: ClassificationResult;
}

export function DashboardResultItem({ data }: DashboardResultItemProps) {
  const { classes, theme } = useStyles();

  return (
    <Card p="lg" shadow="lg" className={classes.card} radius="md" component="a">
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(data:image/jpeg;base64,${data.image_data})`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Group position="apart" spacing="xs">
            <Center>
              <IconCircleCheck
                size="1rem"
                stroke={1.5}
                color={theme.colors.green[5]}
              />
              <Text ml="xs" size="sm" color="green.2">
                Good
              </Text>
            </Center>

            <Group spacing="lg">
              <Center>
                <IconPackage
                  size="1rem"
                  stroke={1.5}
                  color={theme.colors.dark[2]}
                />
                <Text size="sm" className={classes.bodyText}>
                  {data.batch_id}
                </Text>
              </Center>
              <Center>
                <IconCalendarTime
                  size="1rem"
                  stroke={1.5}
                  color={theme.colors.dark[2]}
                />
                <Text size="sm" className={classes.bodyText}>
                  {format(new Date("2023-05-14T04:44:41"), "PPpp")}
                </Text>
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    height: rem(280),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    [`&:hover .${getStylesRef("image")}`]: {
      transform: "scale(1.03)",
    },
  },

  image: {
    ...theme.fn.cover(),
    ref: getStylesRef("image"),
    backgroundSize: "contain",
    transition: "transform 500ms ease",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  overlay: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
  },

  content: {
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 1,
  },

  title: {
    color: theme.white,
    marginBottom: rem(5),
  },

  bodyText: {
    color: theme.colors.dark[2],
    marginLeft: rem(7),
  },
}));
export default DashboardResultItem;
