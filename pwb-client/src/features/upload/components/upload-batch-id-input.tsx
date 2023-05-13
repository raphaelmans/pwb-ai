import { useState } from "react";
import {
  TextInput,
  Box,
  createStyles,
  rem,
  Stack,
  Button,
} from "@mantine/core";
import { useBatchStore } from "../../../store";

function UploadBatchIdInput() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const { classes } = useStyles({
    floating: value.trim().length !== 0 || focused,
  });

  const { setbatchId, batchId } = useBatchStore((state) => {
    return {
      setbatchId: state.setBatchId,
      batchId: state.batchId,
    };
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      "🚀 ~ file: upload-batch-id-input.tsx:31 ~ handleSubmit ~ value:",
      value
    );
    setbatchId(value);
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack w={500}>
        <TextInput
          label="Batch ID"
          placeholder="Enter an identifier for this batch"
          required
          classNames={classes}
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          name="batchId"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          mt="md"
          autoComplete="nope"
          disabled={batchId !== undefined}
        />
        {!batchId && <Button type="submit">Set</Button>}
      </Stack>
    </Box>
  );
}

const useStyles = createStyles(
  (theme, { floating }: { floating: boolean }) => ({
    root: {
      position: "relative",
    },

    label: {
      position: "absolute",
      zIndex: 2,
      top: rem(7),
      left: theme.spacing.sm,
      pointerEvents: "none",
      color: floating
        ? theme.colorScheme === "dark"
          ? theme.white
          : theme.black
        : theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
      transition:
        "transform 150ms ease, color 150ms ease, font-size 150ms ease",
      transform: floating
        ? `translate(-${theme.spacing.sm}, ${rem(-28)})`
        : "none",
      fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
      fontWeight: floating ? 500 : 400,
    },

    required: {
      transition: "opacity 150ms ease",
      opacity: floating ? 1 : 0,
    },

    input: {
      "&::placeholder": {
        transition: "color 150ms ease",
        color: !floating ? "transparent" : undefined,
      },
    },
  })
);

export default UploadBatchIdInput;
