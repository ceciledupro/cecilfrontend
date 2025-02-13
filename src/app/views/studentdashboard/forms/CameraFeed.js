import React, { useEffect, useRef } from "react";

const CameraFeed = () => {
  const videoRef = useRef();

  useEffect(() => {
    const constraints = { video: true };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: "300px", height: "200px" }}
      />
    </div>
  );
};

export default CameraFeed;
