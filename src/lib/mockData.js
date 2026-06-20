/* Datos mockeados para la versión sin backend.
   Esta capa reemplaza respuestas reales por datos hardcodeados
   y mantiene un pequeño estado en memoria para simular acciones. */

import { ROLES, MAX_TRANSFERENCIAS, QR_REFRESH_SEGUNDOS } from "./constants";
import { getDeviceId } from "./deviceId";

const clone = (value) => {
    if (value === null || value === undefined) return value;
    return JSON.parse(JSON.stringify(value));
};

export const MOCK_PNG_BASE64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

export const mockUsers = {
    general: {
        email: "lucio@correo.ucu.edu.uy",
        nombre: "Lucio Martínez",
        roles: [ROLES.GENERAL],
    },
    funcionario: {
        email: "funcionario@correo.ucu.edu.uy",
        nombre: "María Fernández",
        roles: [ROLES.FUNCIONARIO],
    },
    admin: {
        email: "admin@ucu.edu.uy",
        nombre: "Administrador UCU",
        roles: [ROLES.ADMIN],
    },
};

export const getMockUserByEmail = (email = "") => {
    const lower = String(email).toLowerCase();
    if (lower.includes("admin")) return clone(mockUsers.admin);
    if (lower.includes("func")) return clone(mockUsers.funcionario);
    return clone(mockUsers.general);
};

const partido1 = {
    idPartido: 101,
    equipoLocal: "Uruguay",
    equipoVisitante: "México",
    fecha: "2026-06-14",
    hora: "18:00:00",
    estadio: { nombre: "Estadio Centenario", ciudad: "Montevideo", pais: "Uruguay" },
    fase: "Fase de grupos",
    estado: "no empezado",
    sectoresHabilitados: [
        { nombreSector: "A", costo: 185, entradasDisponibles: 20 },
        { nombreSector: "B", costo: 155, entradasDisponibles: 12 },
        { nombreSector: "C", costo: 120, entradasDisponibles: 8 },
    ],
};

const partido2 = {
    idPartido: 102,
    equipoLocal: "Argentina",
    equipoVisitante: "Canadá",
    fecha: "2026-06-17",
    hora: "21:00:00",
    estadio: { nombre: "Hard Rock Stadium", ciudad: "Miami", pais: "EE.UU." },
    fase: "Fase de grupos",
    estado: "empezado",
    sectoresHabilitados: [
        { nombreSector: "A", costo: 210, entradasDisponibles: 4 },
        { nombreSector: "D", costo: 95, entradasDisponibles: 2 },
    ],
};

const partido3 = {
    idPartido: 103,
    equipoLocal: "Brasil",
    equipoVisitante: "Estados Unidos",
    fecha: "2026-06-21",
    hora: "16:30:00",
    estadio: { nombre: "BC Place", ciudad: "Vancouver", pais: "Canadá" },
    fase: "Fase de grupos",
    estado: "no empezado",
    sectoresHabilitados: [
        { nombreSector: "A", costo: 200, entradasDisponibles: 9 },
        { nombreSector: "B", costo: 165, entradasDisponibles: 7 },
    ],
};

const partido4 = {
    idPartido: 104,
    equipoLocal: "Francia",
    equipoVisitante: "España",
    fecha: "2026-06-25",
    hora: "20:00:00",
    estadio: { nombre: "Estadio Azteca", ciudad: "Ciudad de México", pais: "México" },
    fase: "Octavos de final",
    estado: "terminado",
    sectoresHabilitados: [
        { nombreSector: "A", costo: 240, entradasDisponibles: 0 },
        { nombreSector: "C", costo: 180, entradasDisponibles: 0 },
    ],
};

const partidosBase = [partido1, partido2, partido3, partido4];

const entrada1 = {
    idEntrada: 5001,
    idCompra: 3001,
    idPartido: 101,
    nombreSector: "A",
    estado: "activa",
    costoTotal: 185,
    fechaHora: "2026-06-10T14:20:00",
    emailPropietarioActual: mockUsers.general.email,
    nombrePropietarioActual: mockUsers.general.nombre,
    transferenciasRestantes: MAX_TRANSFERENCIAS,
    partido: clone(partido1),
    qrPngBase64: MOCK_PNG_BASE64,
};

const entrada2 = {
    idEntrada: 5002,
    idCompra: 3001,
    idPartido: 101,
    nombreSector: "B",
    estado: "activa",
    costoTotal: 155,
    fechaHora: "2026-06-10T14:20:00",
    emailPropietarioActual: mockUsers.general.email,
    nombrePropietarioActual: mockUsers.general.nombre,
    transferenciasRestantes: 2,
    partido: clone(partido1),
    qrPngBase64: MOCK_PNG_BASE64,
};

const entrada3 = {
    idEntrada: 5003,
    idCompra: 3002,
    idPartido: 102,
    nombreSector: "A",
    estado: "consumida",
    costoTotal: 210,
    fechaHora: "2026-06-15T19:00:00",
    emailPropietarioActual: mockUsers.general.email,
    nombrePropietarioActual: mockUsers.general.nombre,
    transferenciasRestantes: 0,
    partido: clone(partido2),
    qrPngBase64: MOCK_PNG_BASE64,
};

const entrada4 = {
    idEntrada: 5004,
    idCompra: 3003,
    idPartido: 103,
    nombreSector: "B",
    estado: "activa",
    costoTotal: 165,
    fechaHora: "2026-06-18T10:00:00",
    emailPropietarioActual: mockUsers.general.email,
    nombrePropietarioActual: mockUsers.general.nombre,
    transferenciasRestantes: 1,
    partido: clone(partido3),
    qrPngBase64: MOCK_PNG_BASE64,
};

const comprasBase = [
    {
        idCompra: 3001,
        estado: "paga",
        fechaHora: "2026-06-10T14:20:00",
        montoTotal: 340,
        entradas: [clone(entrada1), clone(entrada2)],
    },
    {
        idCompra: 3002,
        estado: "confirmada",
        fechaHora: "2026-06-15T19:00:00",
        montoTotal: 210,
        entradas: [clone(entrada3)],
    },
    {
        idCompra: 3003,
        estado: "cancelada",
        fechaHora: "2026-06-18T10:00:00",
        montoTotal: 165,
        entradas: [clone(entrada4)],
    },
];

const transferenciasBase = [
    {
        idTransferencia: 7001,
        idEntrada: 5002,
        estado: "pendiente",
        tipo: "recibida",
        emailOrigen: "amigo@correo.ucu.edu.uy",
        emailDestino: "lucio@correo.ucu.edu.uy",
        fechaHora: "2026-06-16T13:10:00",
    },
    {
        idTransferencia: 7002,
        idEntrada: 5004,
        estado: "aceptada",
        tipo: "enviada",
        emailOrigen: "lucio@correo.ucu.edu.uy",
        emailDestino: "mateo@correo.ucu.edu.uy",
        fechaHora: "2026-06-18T11:35:00",
    },
];

const validacionesBase = [
    {
        idValidacion: 9001,
        idEntrada: 5003,
        nombreSector: "A",
        nombrePropietario: mockUsers.general.nombre,
        fechaHora: "2026-06-15T21:03:10",
        resultado: "válida",
    },
    {
        idValidacion: 9002,
        idEntrada: 5003,
        nombreSector: "A",
        nombrePropietario: mockUsers.general.nombre,
        fechaHora: "2026-06-15T21:10:05",
        resultado: "válida",
    },
];

const dispositivosBase = [
    {
        idDispositivo: "android-mock-device",
        fechaHoraVinculacion: "2026-06-09T12:00:00",
        emailFuncionario: mockUsers.funcionario.email,
    },
];

const estado = {
    session: {
        token: null,
        user: null,
    },
    counters: {
        compra: 3004,
        entrada: 5005,
        transferencia: 7003,
        validacion: 9003,
    },
    partidos: partidosBase.map(clone),
    compras: comprasBase.map(clone),
    entradas: [clone(entrada1), clone(entrada2), clone(entrada3), clone(entrada4)],
    transferencias: transferenciasBase.map(clone),
    validaciones: validacionesBase.map(clone),
    dispositivos: dispositivosBase.map(clone),
};

export const mockState = estado;

// Devuelve el usuario de la sesión mock actual, o null si no hay sesión activa.
// Importante: NO cae a un usuario por defecto. Si algo pide la sesión sin
// que haya una activa, el problema debe ser visible (igual que pasaría con
// un backend real al usar un token vencido o ausente), no quedar oculto
// mostrando datos de otro usuario.
export const getSessionUser = () => (estado.session.user ? clone(estado.session.user) : null);
export const getSessionToken = () => estado.session.token;

export const setMockSession = ({ token, user }) => {
    estado.session.token = token || null;
    estado.session.user = user ? clone(user) : null;
};

export const clearMockSession = () => {
    estado.session.token = null;
    estado.session.user = null;
};

export const getPartidosBase = () => estado.partidos.map(clone);
export const getPartidoById = (id) => estado.partidos.find((p) => Number(p.idPartido) === Number(id));
export const getCompraById = (id) => estado.compras.find((c) => Number(c.idCompra) === Number(id));
export const getEntradaById = (id) => estado.entradas.find((e) => Number(e.idEntrada) === Number(id));
export const getTransferenciaById = (id) =>
    estado.transferencias.find((t) => Number(t.idTransferencia ?? t.id) === Number(id));
export const getValidacionById = (id) =>
    estado.validaciones.find((v) => Number(v.idValidacion ?? v.id) === Number(id));

export const buildProfile = (user = getSessionUser()) => {
    const roleText = Array.isArray(user.roles) ? user.roles.join(" ").toLowerCase() : "";
    const esFuncionario = roleText.includes("func") || String(user.email || "").toLowerCase().includes("func");
    return {
        nombre: user.nombre,
        email: user.email,
        roles: clone(user.roles),
        documento: {
            tipo: "CI",
            numero: esFuncionario ? "4.567.890-1" : "3.210.987-6",
            pais: "Uruguay",
        },
        telefonos: esFuncionario ? ["099 123 456"] : ["098 765 432"],
        fechaRegistro: "2026-05-02",
        estadoVerificacion: "Verificado",
        direccion: {
            calle: esFuncionario ? "Av. Italia" : "18 de Julio",
            numero: esFuncionario ? "1234" : "890",
            localidad: "Montevideo",
            pais: "Uruguay",
            codigoPostal: "11200",
        },
    };
};

export const buildGeneralHome = () => {
    const user = getSessionUser();
    const userEmail = user.email.toLowerCase();
    const entradasPropias = estado.entradas.filter(
        (e) => e.emailPropietarioActual.toLowerCase() === userEmail
    );
    const transferenciasRecibidas = estado.transferencias.filter(
        (t) => t.emailDestino?.toLowerCase() === userEmail
    );
    const transferenciasEnviadas = estado.transferencias.filter(
        (t) => t.emailOrigen?.toLowerCase() === userEmail
    );

    return {
        entradasActivas: entradasPropias.filter((e) => e.estado === "activa").length,
        comprasPagas: estado.compras.filter((c) => c.estado === "paga").length,
        transferenciasPendientesRecibidas: transferenciasRecibidas.filter((t) => t.estado === "pendiente").length,
        transferenciasPendientesEnviadas: transferenciasEnviadas.filter((t) => t.estado === "pendiente").length,
        proximasEntradas: entradasPropias
            .filter((e) => e.estado === "activa")
            .slice(0, 3)
            .map((e) => ({
                idEntrada: e.idEntrada,
                nombreSector: e.nombreSector,
                estado: e.estado,
                partido: {
                    equipoLocal: e.partido.equipoLocal,
                    equipoVisitante: e.partido.equipoVisitante,
                    fecha: e.partido.fecha,
                    hora: e.partido.hora,
                },
            })),
        transferenciasPendientes: transferenciasRecibidas
            .filter((t) => t.estado === "pendiente")
            .map((t) => ({
                idTransferencia: t.idTransferencia,
                idEntrada: t.idEntrada,
                emailOrigen: t.emailOrigen,
                fechaHora: t.fechaHora,
            })),
    };
};

export const buildFuncionarioHome = async () => {
    const user = getSessionUser();
    const dispositivos = await getDispositivosMios();
    const dispositivo = dispositivos[0] || null;
    return {
        validacionesHoy: estado.validaciones.filter((v) => {
            const d = new Date(v.fechaHora);
            const now = new Date();
            return (
                d.getFullYear() === now.getFullYear() &&
                d.getMonth() === now.getMonth() &&
                d.getDate() === now.getDate()
            );
        }).length,
        sectoresAsignados: 2,
        dispositivo: dispositivo
            ? {
                idDispositivo: dispositivo.idDispositivo,
                fechaHoraVinculacion: dispositivo.fechaHoraVinculacion,
            }
            : null,
        ultimasValidaciones: estado.validaciones.slice(-5).reverse().map(clone),
        mensaje: `Mock activo para ${user.nombre}. Podés simular validaciones y transferencias sin backend.`,
    };
};

export const getPartidosDisponibles = () =>
    estado.partidos
        .filter((p) => p.estado === "no empezado")
        .map((p) => clone(p));

export const getEntradasDeUsuario = (email, filtros = {}) => {
    const userEmail = String(email).toLowerCase();
    let lista = estado.entradas.filter((e) => e.emailPropietarioActual.toLowerCase() === userEmail);
    if (filtros.estado) {
        lista = lista.filter((e) => e.estado === filtros.estado);
    }
    return lista.map(clone);
};

export const getAllCompras = () => estado.compras.map(clone);

export const getAllTransferencias = () => estado.transferencias.map(clone);

export const getAllValidaciones = () => estado.validaciones.map(clone);

export const getDispositivosMios = async () => {
    // Devuelve el estado real de dispositivos registrados.
    // No se auto-registra el dispositivo actual: eso solo debe
    // ocurrir explícitamente a través de registerDevice().
    return estado.dispositivos.map(clone);
};

export const registerDevice = async ({ idDispositivo }) => {
    const user = getSessionUser();
    if (!user) throw new Error("No hay sesión activa para registrar el dispositivo.");
    const registro = {
        idDispositivo: idDispositivo || (await getDeviceId()),
        fechaHoraVinculacion: new Date().toISOString(),
        emailFuncionario: user.email,
    };
    estado.dispositivos = [clone(registro)];
    return clone(registro);
};

export const buildEntradaDetalle = (id) => {
    const entrada = getEntradaById(id);
    if (!entrada) return null;
    return clone(entrada);
};

export const buildCustodia = (id) => {
    const entrada = getEntradaById(id);
    if (!entrada) return [];
    return [
        { tipo: "emitida", fechaHora: entrada.fechaHora, email: entrada.emailPropietarioActual },
        ...estado.transferencias
            .filter((t) => Number(t.idEntrada) === Number(id))
            .sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora))
            .map((t) => ({
                tipo: t.estado === "aceptada" ? "transferencia aceptada" : `transferencia ${t.estado}`,
                fechaHora: t.fechaHora,
                email: `${t.emailOrigen} → ${t.emailDestino}`,
            })),
        ...estado.validaciones
            .filter((v) => Number(v.idEntrada) === Number(id))
            .map((v) => ({
                tipo: "validada",
                fechaHora: v.fechaHora,
                email: v.nombrePropietario,
            })),
    ];
};

export const generateQrForEntrada = (id) => {
    const entrada = getEntradaById(id);
    if (!entrada) return null;
    return {
        idEntrada: entrada.idEntrada,
        qrPngBase64: MOCK_PNG_BASE64,
        generadoEn: new Date().toISOString(),
        validoHasta: new Date(Date.now() + QR_REFRESH_SEGUNDOS * 1000).toISOString(),
    };
};
// Genera las entradas reales (con QR) para los items de una compra.
// Se llama recién cuando la compra pasa a estado "paga", nunca antes:
// mientras está pendiente/confirmada solo existen los items reservados
// (sector + cantidad + precio), sin entradas emitidas todavía — igual
// que el flujo real, donde el QR solo tiene sentido una vez pagada.
const emitirEntradas = (idCompra, items = []) => {
    const lineas = [];
    for (const item of items) {
        const partido = getPartidoById(item.idPartido);
        if (!partido) continue;
        const cantidad = Math.max(1, Number(item.cantidad) || 1);
        for (let i = 0; i < cantidad; i += 1) {
            const idEntrada = estado.counters.entrada++;
            const entrada = {
                idEntrada,
                idCompra,
                idPartido: partido.idPartido,
                nombreSector: item.nombreSector,
                estado: "activa",
                costoTotal: item.precioUnitario,
                fechaHora: new Date().toISOString(),
                emailPropietarioActual: getSessionUser()?.email,
                nombrePropietarioActual: getSessionUser()?.nombre,
                transferenciasRestantes: MAX_TRANSFERENCIAS,
                partido: clone(partido),
                qrPngBase64: MOCK_PNG_BASE64,
            };
            estado.entradas.push(clone(entrada));
            lineas.push(clone(entrada));
        }
    }
    return lineas;
};

// Arma los items de una compra a partir del payload recibido, resolviendo
// el precio unitario real desde el partido (no confía en lo que mande el
// cliente). No crea entradas: eso ocurre recién al pagar.
const armarItemsCompra = (payload = []) => {
    const items = [];
    for (const item of payload) {
        const partido = getPartidoById(item.idPartido);
        if (!partido) continue;
        const cantidad = Math.max(1, Number(item.cantidad) || 1);
        const sector = partido.sectoresHabilitados?.find((s) => s.nombreSector === item.nombreSector);
        items.push({
            idPartido: partido.idPartido,
            nombreSector: item.nombreSector,
            cantidad,
            precioUnitario: sector?.costo ?? 0,
            nombrePartido: `${partido.equipoLocal} vs ${partido.equipoVisitante}`,
        });
    }
    return items;
};

export const createCompra = ({ entradas = [] } = {}) => {
    const items = armarItemsCompra(entradas);
    const montoTotal = items.reduce((acc, i) => acc + i.precioUnitario * i.cantidad, 0);
    const compra = {
        idCompra: estado.counters.compra++,
        estado: "pendiente",
        fechaHora: new Date().toISOString(),
        montoTotal,
        items: items.map(clone),
        entradas: [],
    };
    estado.compras.unshift(clone(compra));
    return clone(compra);
};

export const updateCompraEstado = (id, estadoNuevo) => {
    const compra = estado.compras.find((c) => Number(c.idCompra) === Number(id));
    if (!compra) return null;
    compra.estado = estadoNuevo;

    // Recién al pagar se emiten las entradas reales con su QR.
    if (estadoNuevo === "paga" && (!compra.entradas || compra.entradas.length === 0)) {
        compra.entradas = emitirEntradas(compra.idCompra, compra.items ?? []);
    }

    // Si la compra se cancela, las entradas que ya hubiera emitido
    // (por ejemplo si se cancela después de pagar) también se cancelan.
    if (estadoNuevo === "cancelada") {
        const idsEntradas = new Set((compra.entradas ?? []).map((e) => e.idEntrada));
        estado.entradas.forEach((e) => {
            if (idsEntradas.has(e.idEntrada) && e.estado === "activa") {
                e.estado = "cancelada";
            }
        });
        compra.entradas = (compra.entradas ?? []).map((e) =>
            idsEntradas.has(e.idEntrada) ? { ...e, estado: "cancelada" } : e
        );
    }

    return clone(compra);
};



export const createTransferencia = (idEntrada, emailDestino) => {
    const entrada = getEntradaById(idEntrada);
    if (!entrada) {
        throw new Error("Entrada no encontrada");
    }
    const transferenciasRestantes = Math.max(0, Number(entrada.transferenciasRestantes ?? MAX_TRANSFERENCIAS) - 1);
    entrada.transferenciasRestantes = transferenciasRestantes;
    const transferencia = {
        idTransferencia: estado.counters.transferencia++,
        idEntrada: entrada.idEntrada,
        estado: "pendiente",
        tipo: "recibida",
        emailOrigen: entrada.emailPropietarioActual,
        emailDestino,
        fechaHora: new Date().toISOString(),
    };
    estado.transferencias.unshift(clone(transferencia));
    return clone(transferencia);
};

export const setTransferenciaEstado = (id, nuevoEstado) => {
    const transferencia = estado.transferencias.find((t) => Number(t.idTransferencia ?? t.id) === Number(id));
    if (!transferencia) return null;
    transferencia.estado = nuevoEstado;
    if (nuevoEstado === "aceptada") {
        const entrada = getEntradaById(transferencia.idEntrada);
        if (entrada) {
            entrada.emailPropietarioActual = transferencia.emailDestino;
            entrada.nombrePropietarioActual = transferencia.emailDestino.split("@")[0];
            entrada.estado = "activa";
        }
    }
    return clone(transferencia);
};

export const scanQr = (idDispositivo, codigoEscaneado) => {
    const match = String(codigoEscaneado || "").match(/(\d{4,})/);
    const idEntrada = match ? Number(match[1]) : 5001;
    const entrada = getEntradaById(idEntrada) || estado.entradas.find((e) => e.estado === "activa");
    if (!entrada) {
        throw new Error("Entrada inválida");
    }

    const validacion = {
        idValidacion: estado.counters.validacion++,
        idEntrada: entrada.idEntrada,
        nombreSector: entrada.nombreSector,
        nombrePropietario: entrada.nombrePropietarioActual,
        fechaHora: new Date().toISOString(),
        resultado: "válida",
        idDispositivo,
    };
    estado.validaciones.unshift(clone(validacion));

    // Simular consumo después de una validación exitosa.
    entrada.estado = "consumida";

    return {
        idEntrada: entrada.idEntrada,
        nombrePropietario: entrada.nombrePropietarioActual,
        partido: {
            equipoLocal: entrada.partido.equipoLocal,
            equipoVisitante: entrada.partido.equipoVisitante,
        },
        nombreSector: entrada.nombreSector,
        mensaje: "Entrada válida",
    };
};

export const verifyEntradaManual = (idEntrada, numeroDocumento) => {
    const entrada = getEntradaById(idEntrada);
    if (!entrada) {
        throw new Error("Entrada inválida");
    }
    return {
        idEntrada: entrada.idEntrada,
        nombrePropietario: entrada.nombrePropietarioActual,
        numeroDocumento,
        partido: {
            equipoLocal: entrada.partido.equipoLocal,
            equipoVisitante: entrada.partido.equipoVisitante,
        },
        nombreSector: entrada.nombreSector,
        mensaje: "Verificación manual correcta",
    };
};

export const getReporteSimple = (kind) => {
    if (kind === "eventosMasVendidos") {
        return getPartidosBase()
            .map((p) => ({
                idPartido: p.idPartido,
                equipoLocal: p.equipoLocal,
                equipoVisitante: p.equipoVisitante,
                ventas: estado.entradas.filter((e) => Number(e.idPartido) === Number(p.idPartido)).length,
            }))
            .sort((a, b) => b.ventas - a.ventas);
    }
    if (kind === "mayoresCompradores") {
        return [
            {
                email: mockUsers.general.email,
                nombre: mockUsers.general.nombre,
                compras: estado.compras.length,
            },
        ];
    }
    return [];
};

export const getHomeData = async (path) => {
    if (path.includes("/funcionario")) return buildFuncionarioHome();
    return buildGeneralHome();
};
