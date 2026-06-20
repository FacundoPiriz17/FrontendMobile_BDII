import { apiClient } from "../../../services/apiClient";
import { endpoints } from "../../../services/endpoints";

export const validacionService = {
    listar: (filtros) => apiClient.get(endpoints.validaciones.base, { params: filtros }),
    escanear: (idDispositivo, codigoEscaneado) =>
        apiClient.post(endpoints.validaciones.escanear, { idDispositivo, codigoEscaneado }),
    verificarManual: (idEntrada, numeroDocumento) =>
        apiClient.post(endpoints.validaciones.manualVerificar, { idEntrada, numeroDocumento }),
};
