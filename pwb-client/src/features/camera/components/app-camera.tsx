import { Button, Stack, NativeSelect, Skeleton } from "@mantine/core";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { BASE_DIMENSIONS, videoConstraints } from "../constants";
import { useEvaluate } from "../../../shared/hooks";
import { useCameraBatchIdStore } from "../store";
import CameraResult from "./camera-result";
import { ClassificationResult } from "../../../types";
import CameraFinishButton from "./camera-finish-button";
import { useResultStore } from "../../results/store";

const AppCamera = () => {
  const cameraBatchId = useCameraBatchIdStore((state) => state.batchId);
  const [results, setResults] = useState<ClassificationResult[] | undefined>(
    undefined
  );
  const [base64Imgs, setBase64Imgs] = useState<string[]>([]);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const [cameraId, setCameraId] = useState<string | null>(null);
  const incrementResult = useResultStore((state) => state.increment);

  const { evaluateImg, isMutating } = useEvaluate();

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  const onCapture = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot({
        width: BASE_DIMENSIONS.width,
        height: BASE_DIMENSIONS.height,
      });

      if (imageSrc) {
        const res = await evaluateImg({
          data: {
            datauri: imageSrc,
            batch_id: cameraBatchId,
          },
        });
        setBase64Imgs((imgs) => [...imgs, imageSrc]);
        if (res?.data) {
          incrementResult(res.data.class_name);
          setResults((state) => {
            if (state) {
              return [...state, res.data];
            } else {
              return [res.data];
            }
          });
        }
      }
    }
  }, [webcamRef, evaluateImg, setResults, cameraBatchId, incrementResult]);
  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  if (!cameraBatchId) return null;
  return (
    <Stack w="100%" pb="lg">
      {(!cameraId || cameraId === "null") && <Skeleton height={400} w={700} />}
      {cameraId && cameraId !== "null" && (
        <Webcam
          audio={false}
          height={400}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={{
            ...videoConstraints,
            deviceId: cameraId,
          }}
        />
      )}
      <NativeSelect
        label="Use Camera"
        data={[
          {
            value: "null",
            label: "Select Camera",
          },
          ...devices.map((item) => ({
            value: item.deviceId,
            label: item.label,
          })),
        ]}
        onChange={(event) => setCameraId(event.currentTarget.value)}
      />

      {cameraId && cameraId !== "null" && (
        <Button onClick={onCapture} loading={isMutating}>
          Capture photo
        </Button>
      )}
      <CameraFinishButton
        callback={() => {
          setResults(undefined);
          setBase64Imgs([]);
          setCameraId(null);
        }}
      />

      {results?.map((result, i) => (
        <CameraResult
          itemNumber={i + 1}
          image={base64Imgs[i]}
          result={result}
        />
      ))}
    </Stack>
  );
};

export default AppCamera;
