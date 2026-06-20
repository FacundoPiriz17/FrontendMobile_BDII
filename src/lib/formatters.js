import dayjs from "dayjs";
import "dayjs/locale/es";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.locale("es");

const toDay = (value) => {
    if (!value) return null;
    const d = dayjs(value);
    return d.isValid() ? d : null;
};

/** US$ 185 */
export const formatMoney = (value) => {
    if (value === null || value === undefined) return "—";
    return `US$ ${Number(value).toLocaleString("es-UY")}`;
};

/** "2026-06-14" → "dom 14 jun 2026" */
export const formatFecha = (value) => {
    const d = toDay(value);
    return d ? d.format("ddd D MMM YYYY") : "—";
};

/** "2026-06-14" → "domingo 14 de junio" */
export const formatFechaLarga = (value) => {
    const d = toDay(value);
    return d ? d.format("dddd D [de] MMMM") : "—";
};

/** "18:00:00" → "18:00" */
export const formatHora = (value) => {
    if (!value) return "—";
    return String(value).slice(0, 5);
};

/** ISO timestamp → "14/06/2026 18:00" */
export const formatFechaHora = (value) => {
    const d = toDay(value);
    return d ? d.format("DD/MM/YYYY HH:mm") : "—";
};

/** ISO timestamp → "18:02:45" */
export const formatHoraExacta = (value) => {
    const d = toDay(value);
    return d ? d.format("HH:mm:ss") : "—";
};

/** "Uruguay vs USA" */
export const formatPartido = (p) =>
    p ? `${p.equipoLocal ?? "?"} vs ${p.equipoVisitante ?? "?"}` : "—";

/** Tiempo relativo: "en 2 h", "hace 5 min" */
export const formatRelativo = (value) => {
    const d = toDay(value);
    if (!d) return "—";
    return d.fromNow();
};
