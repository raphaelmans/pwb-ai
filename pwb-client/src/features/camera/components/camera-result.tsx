import {
  createStyles,
  Text,
  Card,
  RingProgress,
  Group,
  rem,
  Image,
  Code,
} from "@mantine/core";
import { ClassificationResult } from "../../../types";
import { useResultStore } from "../../results/store";
import { shallow } from "zustand/shallow";
interface CameraResultProps {
  result: ClassificationResult;
  image?: string;
}

function CameraResult({
  result: { id, class_name: condition, probability: confidence },
  image,
}: CameraResultProps) {
  const { good, noGood, totalCount } = useResultStore((state) => {
    return {
      good: state.good,
      noGood: state.noGood,
      totalCount: state.totalCount,
    };
  }, shallow);
  const { classes } = useStyles();
  const total = 1;

  return (
    <Card withBorder radius="md" className={classes.card}>
      {image && (
        <Card.Section mb="lg" bg="gray.1">
          <Image
            src={image}
            alt={"image-" + id.toString()}
            height={180}
            fit="contain"
          />
        </Card.Section>
      )}
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            Camera Result
          </Text>
          <Group>
            <div>
              <Text className={classes.lead} mt={30}>
                {totalCount}
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

          <Group mt="lg">
            <div>
              <Text className={classes.label} size="sm">
                {good}
              </Text>
              <Code color="green">Good</Code>
            </div>

            <div>
              <Text className={classes.label} size="sm">
                {noGood}
              </Text>
              <Code color="red">No Good</Code>
            </div>
          </Group>
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

export default CameraResult;
