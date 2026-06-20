import { Text, View } from "react-native";
import { AppCard, CardBody, CardHeader } from "../../../components/ui/AppCard";
import { formatMoney } from "../../../lib/formatters";
import { COMISION_ESTIMADA } from "../../../lib/constants";

export function ResumenCompra({ items, cantidadTotal }) {
    const subtotal = items.reduce((a, i) => a + i.precioUnitario * i.cantidad, 0);
    const comision = subtotal * (COMISION_ESTIMADA / 100);
    const total = subtotal + comision;

    return (
        <AppCard>
            <CardHeader
                title="Resumen"
                subtitle={`${cantidadTotal} entrada${cantidadTotal !== 1 ? "s" : ""}`}
            />
            <CardBody className="gap-2">
                {/* Líneas de items */}
                {items.map((item, i) => (
                    <View key={i} className="flex-row items-start justify-between gap-2">
                        <View className="flex-1">
                            <Text className="text-sm font-semibold text-ink" numberOfLines={1}>
                                {item.nombrePartido ?? `Partido #${item.idPartido}`}
                            </Text>
                            <Text className="text-xs text-ink-faint">
                                Sector {item.nombreSector} × {item.cantidad}
                            </Text>
                        </View>
                        <Text className="text-sm font-semibold text-ink">
                            {formatMoney(item.precioUnitario * item.cantidad)}
                        </Text>
                    </View>
                ))}

                {/* Totales */}
                <View className="mt-3 gap-1.5 border-t border-container-high pt-3">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-sm text-ink-soft">Subtotal</Text>
                        <Text className="text-sm font-semibold text-ink">{formatMoney(subtotal)}</Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="text-sm text-ink-soft">Comisión (~{COMISION_ESTIMADA}%)</Text>
                        <Text className="text-sm font-semibold text-ink">{formatMoney(comision)}</Text>
                    </View>
                    <View className="mt-1 flex-row items-center justify-between rounded-xl bg-container-low px-3 py-2">
                        <Text className="text-base font-bold text-ink">Total estimado</Text>
                        <Text className="text-base font-extrabold text-navy-900">{formatMoney(total)}</Text>
                    </View>
                    <Text className="text-[10px] text-ink-faint">
                        * El total final lo confirma el servidor al procesar la compra.
                    </Text>
                </View>
            </CardBody>
        </AppCard>
    );
}
