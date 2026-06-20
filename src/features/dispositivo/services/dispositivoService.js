import { apiClient } from "../../../services/apiClient";
import { endpoints } from "../../../services/endpoints";

export const dispositivoService = {
    mios: () => apiClient.get(endpoints.infraestructura.dispositivosMios),
    obtener: (id) => apiClient.get(endpoints.infraestructura.dispositivoPorId(id)),
    crear: (datos) => apiClient.post(endpoints.infraestructura.dispositivos, datos),
};
