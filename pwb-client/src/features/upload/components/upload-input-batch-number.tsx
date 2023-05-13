import { useRef, useState } from "react";
import {
  createStyles,
  NumberInput,
  NumberInputHandlers,
  ActionIcon,
  rem,
  Input,
  Stack,
  Button,
} from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { useBatchNumberStore } from "../../../store";
import z from "zod";

interface UploadBatchNumberInputProps {
  min?: number;
  max?: number;
}

function UploadBatchNumberInput({ min = 1 }: UploadBatchNumberInputProps) {
  const { classes } = useStyles();

  const { setBatchNumber, batchNumber } = useBatchNumberStore((state) => {
    return {
      setBatchNumber: state.setBatchNumber,
      batchNumber: state.batchNumber,
    };
  });
  const handlers = useRef<NumberInputHandlers>(null);
  const [value, setValue] = useState<number | "">(1);

  return (
    <Stack w={500}>
      <Input.Wrapper label="Batch Number">
        <div className={classes.wrapper}>
          <ActionIcon<"button">
            size={28}
            variant="transparent"
            onClick={() => handlers.current?.decrement()}
            disabled={value === min || batchNumber !== undefined}
            className={classes.control}
            onMouseDown={(event) => event.preventDefault()}
          >
            <IconMinus size="1rem" stroke={1.5} />
          </ActionIcon>

          <NumberInput
            variant="unstyled"
            min={min}
            handlersRef={handlers}
            value={value}
            onChange={setValue}
            classNames={{ input: classes.input }}
            placeholder="1"
            readOnly={batchNumber !== undefined}
          />

          <ActionIcon<"button">
            size={28}
            variant="transparent"
            disabled={batchNumber !== undefined}
            onClick={() => handlers.current?.increment()}
            className={classes.control}
            onMouseDown={(event) => event.preventDefault()}
          >
            <IconPlus size="1rem" stroke={1.5} />
          </ActionIcon>
        </div>
      </Input.Wrapper>
      {!batchNumber && (
        <Button
          onClick={() =>
            z.number().parse(value) ? setBatchNumber(Number(value)) : null
          }
        >
          Set
        </Button>
      )}
    </Stack>
  );
}
const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${rem(6)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    }`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,

    "&:focus-within": {
      borderColor: theme.colors[theme.primaryColor][6],
    },
  },

  control: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    }`,

    "&:disabled": {
      borderColor:
        theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3],
      opacity: 0.8,
      backgroundColor: "transparent",
    },
  },

  input: {
    textAlign: "center",
    paddingRight: `${theme.spacing.sm} !important`,
    paddingLeft: `${theme.spacing.sm} !important`,
    height: rem(28),
    flex: 1,
  },
}));
export default UploadBatchNumberInput;