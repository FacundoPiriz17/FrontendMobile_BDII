/*
  Genera y persiste un ID de dispositivo estable usando
  expo-secure-store. No depende de expo-device/expo-crypto
  (no están en las libs del proyecto): el ID se arma localmente
  combinando plataforma + nombre de dispositivo + un sufijo
  aleatorio, y se guarda la primera vez que se genera.
*/

import { Platform } from "react-native";
import { secureStorage } from "./secureStorage";

const DEVICE_ID_KEY = "ucu_mundial_device_id";
let cachedId = null;

const randomSegment = () => Math.random().toString(36).slice(2, 10);

const generarId = () => {
    const base = `${Platform.OS}-mock-device`;
    const sufijo = `${Date.now().toString(36)}-${randomSegment()}-${randomSegment()}`;
    return `${base}-${sufijo}`.replace(/\s/g, "_");
};

export const getDeviceId = async () => {
    if (cachedId) return cachedId;

    const stored = await secureStorage.get(DEVICE_ID_KEY);
    if (stored) {
        cachedId = stored;
        return stored;
    }

    const newId = generarId();
    await secureStorage.set(DEVICE_ID_KEY, newId);
    cachedId = newId;
    return newId;
};
