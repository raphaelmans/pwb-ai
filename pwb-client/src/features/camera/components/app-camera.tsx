import { Button, Image, Stack, NativeSelect, Skeleton } from "@mantine/core";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { BASE_DIMENSIONS, videoConstraints } from "../constants";
import { useEvaluate } from "../../../shared/hooks";

const AppCamera = () => {
  const [base64Img, setBase64Img] = useState<string | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const [cameraId, setCameraId] = useState<string | null>(null);

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
        await evaluateImg({
          data: {
            datauri: imageSrc,
          },
        });
        setBase64Img(imageSrc);
      }
    }
  }, [webcamRef, evaluateImg, setBase64Img]);
  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);
  return (
    <Stack w="100%">
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

      {base64Img && <Image src={base64Img} />}
      {cameraId && cameraId !== "null" && (
        <Button onClick={onCapture} loading={isMutating}>
          Capture photo
        </Button>
      )}
    </Stack>
  );
};

export default AppCamera;
