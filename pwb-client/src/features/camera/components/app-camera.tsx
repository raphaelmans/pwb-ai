import { Button, Image, Stack } from "@mantine/core";
import React, { useCallback } from "react";
import Webcam from "react-webcam";
import { BASE_DIMENSIONS, videoConstraints } from "../constants";
import { useEvaluate } from "../../../shared/hooks";


const AppCamera = () => {
  const [base64Img, setBase64Img] = React.useState<string | null>(null);
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const webcamRef = React.useRef<Webcam>(null);

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
          datauri: imageSrc,
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
      {devices.map((device, key) => (
        <Webcam
          audio={false}
          height={400}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={{
            ...videoConstraints,
            deviceId: device.deviceId,
          }}
          key={key}
        />
      ))}
      {base64Img && <Image src={base64Img} />}
      <Button onClick={onCapture} loading={isMutating}>
        Capture photo
      </Button>
    </Stack>
  );
};

export default AppCamera;
