import { useCallback, useRef, useState } from "react";
import { Text, Group, Button, createStyles, rem } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import { useEvaluate } from "../../../shared/hooks";
import UploadResult from "./upload-result";
import { ClassificationResult } from "../../../types";
import { useBatchStore } from "../../../store";
import UploadFinishButton from "./upload-finish-button";
import { useResultStore } from "../../results/store";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: rem(0),
    width: rem(500),
  },

  dropzone: {
    borderWidth: rem(1),
    paddingBottom: rem(75),
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: "absolute",
    width: rem(250),
    left: `calc(50% - ${rem(125)})`,
    bottom: theme.spacing.lg,
  },
}));

function UploadDropzone() {
  const { classes, theme } = useStyles();
  const batchId = useBatchStore((state) => state.batchId);
  const incrementResult = useResultStore((state) => state.increment);

  const { evaluateImg, isMutating } = useEvaluate();
  const [results, setResults] = useState<ClassificationResult[] | undefined>();
  const [images, setImages] = useState<string[]>([]);

  const openRef = useRef<() => void>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          console.log(
            "🚀 ~ file: upload-dropzone.tsx:64 ~ UploadDropzone ~ batchId:",
            batchId
          );

          const dataURI = reader.result;
          evaluateImg({
            data: {
              datauri: dataURI as string,
              batch_id: batchId,
            },
          })
            .then((data) => {
              if (data?.data.class_name) {
                incrementResult(data?.data.class_name);
                setResults((r) => {
                  if (r) {
                    return [...r, data.data];
                  } else {
                    return [data.data];
                  }
                });
              }
            })
            .finally(() => {
              setImages((imgs) => [...imgs, dataURI as string]);
            });
        };
      }
    },
    [evaluateImg, batchId, incrementResult]
  );
  if (!batchId) {
    return null;
  }
  return (
    <>
      <div className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={onDrop}
          className={classes.dropzone}
          radius="md"
          accept={[MIME_TYPES.jpeg, MIME_TYPES.png, "image/bmp"]}
          maxSize={30 * 1024 ** 2}
          maxFiles={1}
          loading={isMutating}
        >
          <div style={{ pointerEvents: "none" }}>
            <Group position="center">
              <Dropzone.Accept>
                <IconDownload
                  size={rem(50)}
                  color={theme.colors[theme.primaryColor][6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size={rem(50)}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  size={rem(50)}
                  color={
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black
                  }
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>Drop files here</Dropzone.Accept>
              <Dropzone.Reject>Image file less than 1mb</Dropzone.Reject>
              <Dropzone.Idle>Upload Image</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Drag&apos;n&apos;drop image here to upload.
            </Text>
          </div>
        </Dropzone>

        <Button
          className={classes.control}
          size="md"
          radius="xl"
          onClick={() => openRef.current?.()}
          loading={isMutating}
        >
          Select Image
        </Button>
      </div>
      <UploadFinishButton
        callback={() => {
          setResults([]);
          setImages([]);
        }}
      />

      {results?.map((result, index) => (
        <UploadResult
          title="Evaluation Result"
          result={result}
          image={images[index]}
          imageNumber={index + 1}
          key={index}
        />
      ))}
    </>
  );
}

export default UploadDropzone;
