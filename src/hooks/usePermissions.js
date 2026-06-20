/* ============================================================
   VERSIÓN MOCK — deshabilitada
   Da el permiso de cámara por concedido siempre, para no
   depender del permiso real del dispositivo durante demos.

import { useEffect, useState } from "react";

export function useCameraPermission() {
  const [granted, setGranted] = useState(true);

  useEffect(() => {
    setGranted(true);
  }, []);

  return { granted };
}

   ============================================================ */

import { Camera } from "expo-camera";
import { useEffect, useState } from "react";

export function useCameraPermission() {
    const [granted, setGranted] = useState(null);

    useEffect(() => {
        Camera.requestCameraPermissionsAsync().then(({ status }) =>
            setGranted(status === "granted")
        );
    }, []);

    return { granted };
}
