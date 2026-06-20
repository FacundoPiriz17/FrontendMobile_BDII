/**
 * Combina clases condicionales sin depender de librerías externas (clsx).
 * Acepta strings, arrays anidados, y objetos { clase: condicion }.
 */
export function cn(...inputs) {
    const classes = [];

    const push = (input) => {
        if (!input) return;
        if (typeof input === "string" || typeof input === "number") {
            classes.push(String(input));
            return;
        }
        if (Array.isArray(input)) {
            input.forEach(push);
            return;
        }
        if (typeof input === "object") {
            for (const key in input) {
                if (input[key]) classes.push(key);
            }
        }
    };

    inputs.forEach(push);
    return classes.join(" ");
}
