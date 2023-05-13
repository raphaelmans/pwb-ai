import {
  createStyles,
  Text,
  Card,
  RingProgress,
  Group,
  rem,
  Image,
} from "@mantine/core";
import { ClassificationResult } from "../../../types";

interface UploadResultProps {
  title: string;
  result: ClassificationResult;
  stats: {
    value: number;
    label: string;
  }[];
  image?: string;
}

function UploadResult({
  title,
  result: { class_name: condition, probability: confidence },
  stats,
  image,
}: UploadResultProps) {
  const { classes, theme } = useStyles();
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text className={classes.label}>{stat.value}</Text>
      <Text size="xs" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));
  const total = 1;

  return (
    <Card withBorder radius="md" className={classes.card}>
      {image && (
        <Card.Section mb="lg" bg="gray.1">
          <Image src={image} alt={title} height={180} fit="contain" />
        </Card.Section>
      )}
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            {title}
          </Text>
          <Group>
            <div>
              <Text className={classes.lead} mt={30}>
                1
              </Text>
              <Text fz="xs" color="dimmed">
                Item #
              </Text>
            </div>
            <div>
              <Text
                className={classes.lead}
                color={condition === "GOOD" ? "green" : "red"}
                mt={30}
              >
                {condition}
              </Text>
              <Text fz="xs" color="dimmed">
                Condition
              </Text>
            </div>
          </Group>

          <Group mt="lg">{items}</Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[
              {
                value: (confidence / total) * 100,
                color: condition === "GOOD" ? "green" : "red",
              },
            ]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  {((confidence / total) * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  confidence
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: rem(22),
    lineHeight: 1,
  },

  inner: {
    display: "flex",
    p: theme.spacing.lg,
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  ring: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",

    [theme.fn.smallerThan("xs")]: {
      justifyContent: "center",
      marginTop: theme.spacing.md,
    },
  },
}));

export default UploadResult;
