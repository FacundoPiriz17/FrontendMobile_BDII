import { useCallback, useEffect, useState } from "react";
import { getDeviceId } from "../../../lib/deviceId";
import { dispositivoService } from "../services/dispositivoService";

export function useDispositivo() {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registrando, setRegistrando] = useState(false);
    const [error, setError] = useState(null);

    const cargar = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const id = await getDeviceId();
            const dispositivos = await dispositivoService.mios();
            const encontrado = dispositivos.find((d) => d.idDispositivo === id);
            setInfo({
                idDispositivo: id,
                registrado: !!encontrado,
                fechaHoraVinculacion: encontrado?.fechaHoraVinculacion,
                emailFuncionario: encontrado?.emailFuncionario,
            });
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        cargar();
    }, [cargar]);

    const registrar = useCallback(async () => {
        const id = await getDeviceId();
        setRegistrando(true);
        try {
            await dispositivoService.crear({ idDispositivo: id });
            await cargar();
        } finally {
            setRegistrando(false);
        }
    }, [cargar]);

    return { info, loading, registrando, error, refetch: cargar, registrar };
}
