import { useCallback, useEffect, useState } from "react";
import { getDeviceId } from "../../../lib/deviceId";
import { validacionService } from "../services/validacionService";
import { dispositivoService } from "../../dispositivo/services/dispositivoService";

export function useScanner() {
    const [deviceId, setDeviceId] = useState(null);
    const [deviceRegistrado, setDeviceRegistrado] = useState(false);
    const [loadingDevice, setLoadingDevice] = useState(true);
    const [estado, setEstado] = useState("idle");
    const [resultado, setResultado] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    // Obtener el device ID y verificar si está registrado
    useEffect(() => {
        (async () => {
            setLoadingDevice(true);
            try {
                const id = await getDeviceId();
                setDeviceId(id);

                const dispositivos = await dispositivoService.mios();
                const registrado = dispositivos.some((d) => d.idDispositivo === id);
                setDeviceRegistrado(registrado);
            } catch {
                setDeviceRegistrado(false);
            } finally {
                setLoadingDevice(false);
            }
        })();
    }, []);

    const procesarQr = useCallback(
        async (codigoEscaneado) => {
            if (!deviceId) {
                setEstado("error");
                setErrorMsg("No se pudo identificar el dispositivo.");
                return;
            }
            if (!deviceRegistrado) {
                setEstado("error");
                setErrorMsg("Este dispositivo no está registrado. Contactá a un administrador.");
                return;
            }

            setEstado("scanning");
            setErrorMsg(null);
            setResultado(null);

            try {
                const res = await validacionService.escanear(deviceId, codigoEscaneado);
                setResultado({
                    idEntrada: res?.idEntrada,
                    nombrePropietario: res?.nombrePropietario,
                    partido: res?.partido
                        ? `${res.partido.equipoLocal} vs ${res.partido.equipoVisitante}`
                        : undefined,
                    sector: res?.nombreSector,
                    mensaje: res?.mensaje ?? "Entrada válida",
                });
                setEstado("success");
            } catch (err) {
                setEstado("error");
                setErrorMsg(err?.detail ?? err?.message ?? "QR inválido o entrada ya consumida.");
            }
        },
        [deviceId, deviceRegistrado]
    );

    const reset = useCallback(() => {
        setEstado("idle");
        setResultado(null);
        setErrorMsg(null);
    }, []);

    return {
        deviceId,
        deviceRegistrado,
        loadingDevice,
        estado,
        resultado,
        errorMsg,
        procesarQr,
        reset,
    };
}
