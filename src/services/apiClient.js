/*
  ====================================================================
  MODO MOCK ACTIVO
  ====================================================================
  Este archivo expone `apiClient` resolviendo todas las peticiones en
  memoria a través de src/lib/mockData.js, sin pegarle a ningún backend
  real. Es así para poder desarrollar y demostrar la app sin depender
  de un servidor levantado.

  Para volver a usar el backend real:
    1. Borrar/comentar el bloque "IMPLEMENTACIÓN MOCK" de más abajo.
    2. Descomentar el bloque "IMPLEMENTACIÓN REAL (fetch)" que está
       deshabilitado debajo de este comentario.
    3. Configurar EXPO_PUBLIC_API_URL en el .env apuntando al backend.

  Las dos implementaciones exponen exactamente la misma forma:
    export class ApiError
    export const setOnUnauthorized
    export const apiClient = { get, post, put, patch, delete }
  así que el resto de la app (services de cada feature) no necesita
  cambiar nada al alternar entre una y otra.
  ====================================================================
*/

/* ============================================================
   IMPLEMENTACIÓN REAL (fetch) — actualmente DESHABILITADA
   ============================================================

import { secureStorage, TOKEN_KEY } from "../lib/secureStorage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";

export class ApiError extends Error {
  constructor({ status, title, detail, problem }) {
    super(detail || title || `Error ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.title = title;
    this.detail = detail;
    this.problem = problem;
  }
}

let onUnauthorized = null;
export const setOnUnauthorized = (fn) => {
  onUnauthorized = fn;
};

const buildQuery = (params) => {
  if (!params) return "";
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") qs.append(k, String(v));
  });
  const s = qs.toString();
  return s ? `?${s}` : "";
};

async function request(path, { method = "GET", body, params, auth = true } = {}) {
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const token = await secureStorage.get(TOKEN_KEY);
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}${buildQuery(params)}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError({
      status: 0,
      title: "Sin conexión",
      detail: "No se pudo contactar al servidor. Verificá que el backend esté activo.",
    });
  }

  if (res.status === 401 && auth && token) {
    onUnauthorized?.();
  }

  if (!res.ok) {
    let problem = null;
    try {
      problem = await res.json();
    } catch {
      // sin cuerpo
    }
    throw new ApiError({
      status: res.status,
      title: problem?.title || res.statusText,
      detail: problem?.detail || problem?.title,
      problem,
    });
  }

  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const apiClient = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) => request(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};

   ============================================================ */

/* ============================================================
   IMPLEMENTACIÓN MOCK — actualmente ACTIVA
   ============================================================ */

import {
    buildCustodia,
    buildEntradaDetalle,
    buildFuncionarioHome,
    buildGeneralHome,
    buildProfile,
    createCompra,
    createTransferencia,
    generateQrForEntrada,
    getAllCompras,
    getAllTransferencias,
    getAllValidaciones,
    getCompraById,
    getDispositivosMios,
    getEntradaById,
    getPartidoById,
    getPartidosBase,
    getPartidosDisponibles,
    getReporteSimple,
    getSessionToken,
    getSessionUser,
    getEntradasDeUsuario,
    registerDevice,
    scanQr,
    setMockSession,
    setTransferenciaEstado,
    updateCompraEstado,
    verifyEntradaManual,
} from "../lib/mockData";

export class ApiError extends Error {
    constructor({ status, title, detail, problem }) {
        super(detail || title || `Error ${status}`);
        this.name = "ApiError";
        this.status = status;
        this.title = title;
        this.detail = detail;
        this.problem = problem;
    }
}

let onUnauthorized = null;
export const setOnUnauthorized = (fn) => {
    onUnauthorized = fn;
};

const clone = (value) => {
    if (value === null || value === undefined) return value;
    return JSON.parse(JSON.stringify(value));
};
const wait = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));
const getPathBase = (path) => String(path || "").split("?")[0];

const makeToken = (user) => `mock-token-${String(user?.email || "guest").replace(/[^a-z0-9]/gi, "-")}`;

// Las rutas "protegidas" del mock necesitan sesión activa, igual que pasaría
// con un backend real ante un token ausente o vencido.
const requireSession = () => {
    const session = getSessionUser();
    if (!session) {
        throw new ApiError({ status: 401, title: "No autenticado", detail: "Sesión no encontrada." });
    }
    return session;
};

const buildAuthResponse = (email, nombre, roles) => {
    const user = { email, nombre, roles };
    const token = makeToken(user);
    setMockSession({ token, user });
    return { token, email, nombre, roles, user: clone(user) };
};

const respond = async (value, delay = 50) => {
    await wait(delay);
    return clone(value);
};

async function mockRequest(path, { method = "GET", body, params } = {}) {
    const base = getPathBase(path);

    // auth
    if (base === "/api/auth/login" && method === "POST") {
        const email = String(body?.email || "").trim() || "lucio@correo.ucu.edu.uy";
        const nombre = email.toLowerCase().includes("func")
            ? "María Fernández"
            : email.toLowerCase().includes("admin")
                ? "Administrador UCU"
                : "Lucio Martínez";
        const roles = email.toLowerCase().includes("admin")
            ? ["Admin"]
            : email.toLowerCase().includes("func")
                ? ["Funcionario"]
                : ["General"];
        return respond(buildAuthResponse(email, nombre, roles));
    }

    if (base === "/api/auth/register" && method === "POST") {
        const email = String(body?.email || "nuevo@correo.ucu.edu.uy").trim();
        const nombre = String(body?.nombre || "Nuevo usuario").trim();
        return respond({ ok: true, user: { email, nombre, roles: ["General"] } });
    }

    if (base === "/api/auth/me" && method === "GET") {
        const session = getSessionUser();
        if (!session) {
            throw new ApiError({ status: 401, title: "No autenticado", detail: "Sesión no encontrada." });
        }
        return respond({
            email: session.email,
            nombre: session.nombre,
            roles: session.roles,
            ...buildProfile(session),
        });
    }

    if (base === "/api/auth/refresh" && method === "POST") {
        const session = getSessionUser();
        if (!session) {
            throw new ApiError({ status: 401, title: "No autenticado", detail: "Sesión no encontrada." });
        }
        return respond({ token: getSessionToken() || makeToken(session), user: clone(session) });
    }

    // home
    if (base === "/api/home/general" && method === "GET") {
        requireSession();
        return respond(buildGeneralHome());
    }
    if (base === "/api/home/funcionario" && method === "GET") {
        requireSession();
        return respond(await buildFuncionarioHome());
    }

    // usuarios
    if (base === "/api/usuarios/me" && method === "GET") {
        requireSession();
        return respond(buildProfile());
    }

    // eventos / partidos
    if (base === "/api/eventos" && method === "GET") {
        return respond(getPartidosBase());
    }
    if (base.startsWith("/api/eventos/") && method === "GET") {
        const match = base.match(/^\/api\/eventos\/(\d+)$/);
        if (match) {
            const partido = getPartidoById(Number(match[1]));
            if (!partido) throw new ApiError({ status: 404, title: "No encontrado", detail: "Partido no encontrado" });
            return respond(partido);
        }
    }

    // compras
    if (base === "/api/compras" && method === "GET") {
        return respond(getAllCompras());
    }
    if (base === "/api/compras" && method === "POST") {
        requireSession();
        return respond(createCompra(body || {}));
    }
    if (base === "/api/compras/mis-entradas" && method === "GET") {
        const userEmail = requireSession().email;
        return respond(getEntradasDeUsuario(userEmail, params || {}));
    }
    if (base === "/api/compras/partidos-disponibles" && method === "GET") {
        return respond(getPartidosDisponibles());
    }
    if (base.startsWith("/api/compras/entradas/") && method === "POST") {
        const qrMatch = base.match(/^\/api\/compras\/entradas\/(\d+)\/qr$/);
        if (qrMatch) {
            return respond(generateQrForEntrada(Number(qrMatch[1])));
        }
    }
    if (base.startsWith("/api/compras/") && method === "GET") {
        const match = base.match(/^\/api\/compras\/(\d+)$/);
        if (match) {
            const compra = getCompraById(Number(match[1]));
            if (!compra) throw new ApiError({ status: 404, title: "No encontrado", detail: "Compra no encontrada" });
            return respond(compra);
        }
    }
    if (base.startsWith("/api/compras/") && method === "POST") {
        const actionMatch = base.match(/^\/api\/compras\/(\d+)\/(confirmar|pagar|cancelar)$/);
        if (actionMatch) {
            const updated = updateCompraEstado(
                Number(actionMatch[1]),
                actionMatch[2] === "cancelar" ? "cancelada" : actionMatch[2] === "pagar" ? "paga" : "confirmada"
            );
            if (!updated) throw new ApiError({ status: 404, title: "No encontrado", detail: "Compra no encontrada" });
            return respond(updated);
        }
    }

    // entradas
    if (base.startsWith("/api/entradas/") && method === "GET") {
        const detalleMatch = base.match(/^\/api\/entradas\/(\d+)$/);
        if (detalleMatch) {
            const entrada = buildEntradaDetalle(Number(detalleMatch[1]));
            if (!entrada) throw new ApiError({ status: 404, title: "No encontrado", detail: "Entrada no encontrada" });
            return respond(entrada);
        }
        const vistaMatch = base.match(/^\/api\/entradas\/(\d+)\/vista$/);
        if (vistaMatch) return respond(generateQrForEntrada(Number(vistaMatch[1])));
        const custodiaMatch = base.match(/^\/api\/entradas\/(\d+)\/custodia$/);
        if (custodiaMatch) return respond(buildCustodia(Number(custodiaMatch[1])));
    }

    if (base === "/api/compras/entradas" && method === "GET") {
        return respond([]);
    }

    // transferencias
    if (base === "/api/transferencias" && method === "GET") {
        return respond(getAllTransferencias());
    }
    if (base === "/api/transferencias" && method === "POST") {
        return respond(createTransferencia(body?.idEntrada, body?.emailDestino));
    }
    if (base.startsWith("/api/transferencias/") && method === "POST") {
        const actionMatch = base.match(/^\/api\/transferencias\/(\d+)\/(aceptar|rechazar|cancelar)$/);
        if (actionMatch) {
            const updated = setTransferenciaEstado(
                Number(actionMatch[1]),
                actionMatch[2] === "aceptar" ? "aceptada" : actionMatch[2] === "rechazar" ? "rechazada" : "cancelada"
            );
            if (!updated) throw new ApiError({ status: 404, title: "No encontrado", detail: "Transferencia no encontrada" });
            return respond(updated);
        }
        const idMatch = base.match(/^\/api\/transferencias\/(\d+)$/);
        if (idMatch) {
            const transfer = getAllTransferencias().find(
                (t) => Number(t.idTransferencia ?? t.id) === Number(idMatch[1])
            );
            if (!transfer) throw new ApiError({ status: 404, title: "No encontrado", detail: "Transferencia no encontrada" });
            return respond(transfer);
        }
    }

    // validaciones
    if (base === "/api/validaciones" && method === "GET") {
        return respond(getAllValidaciones());
    }
    if (base === "/api/validaciones/escanear" && method === "POST") {
        return respond(scanQr(body?.idDispositivo, body?.codigoEscaneado));
    }
    if (base === "/api/validaciones/manual/verificar" && method === "POST") {
        return respond(verifyEntradaManual(body?.idEntrada, body?.numeroDocumento));
    }
    if (base === "/api/validaciones/invalidar" && method === "POST") {
        return respond({ ok: true });
    }

    // infraestructura / dispositivos
    if (base === "/api/infraestructura/dispositivos/mios" && method === "GET") {
        return respond(await getDispositivosMios());
    }
    if (base === "/api/infraestructura/dispositivos" && method === "GET") {
        return respond(await getDispositivosMios());
    }
    if (base === "/api/infraestructura/dispositivos" && method === "POST") {
        return respond(await registerDevice(body || {}));
    }
    if (base.startsWith("/api/infraestructura/dispositivos/") && method === "GET") {
        const match = base.match(/^\/api\/infraestructura\/dispositivos\/([^/]+)$/);
        if (match) {
            const dispositivos = await getDispositivosMios();
            const found = dispositivos.find((d) => String(d.idDispositivo) === String(match[1]));
            if (!found) throw new ApiError({ status: 404, title: "No encontrado", detail: "Dispositivo no encontrado" });
            return respond(found);
        }
    }

    // reportes
    if (base === "/api/reportes/eventos-mas-vendidos") {
        return respond(getReporteSimple("eventosMasVendidos"));
    }
    if (base === "/api/reportes/mayores-compradores") {
        return respond(getReporteSimple("mayoresCompradores"));
    }

    throw new ApiError({
        status: 404,
        title: "Mock sin ruta",
        detail: `No hay respuesta mock para ${method} ${base}`,
    });
}

export const apiClient = {
    get: (path, opts) => mockRequest(path, { ...(opts || {}), method: "GET" }),
    post: (path, body, opts) => mockRequest(path, { ...(opts || {}), method: "POST", body }),
    put: (path, body, opts) => mockRequest(path, { ...(opts || {}), method: "PUT", body }),
    patch: (path, body, opts) => mockRequest(path, { ...(opts || {}), method: "PATCH", body }),
    delete: (path, opts) => mockRequest(path, { ...(opts || {}), method: "DELETE" }),
};

/* ============================================================
   FIN IMPLEMENTACIÓN MOCK
   ============================================================ */
