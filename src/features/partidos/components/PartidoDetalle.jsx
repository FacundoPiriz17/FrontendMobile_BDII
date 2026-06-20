import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppBadge } from "../../../components/ui/AppBadge";
import { AppCard, CardBody, CardHeader } from "../../../components/ui/AppCard";
import { formatFecha, formatHora, formatMoney } from "../../../lib/formatters";

export function PartidoDetalle({ partido }) {
    return (
        <View className="gap-4">
            {/* Cabecera del partido */}
            <View className="rounded-2xl bg-navy-950 px-4 py-5">
                {partido.fase && (
                    <Text className="mb-2 text-[10px] font-bold uppercase tracking-widest text-navy-300">
                        {partido.fase}
                    </Text>
                )}
                <View className="flex-row items-center justify-center gap-4">
                    <Text className="flex-1 text-right text-lg font-extrabold text-white" numberOfLines={2}>
                        {partido.equipoLocal}
                    </Text>
                    <View className="rounded-xl bg-white/10 px-3 py-1.5">
                        <Text className="text-sm font-extrabold text-energy-400">VS</Text>
                    </View>
                    <Text className="flex-1 text-left text-lg font-extrabold text-white" numberOfLines={2}>
                        {partido.equipoVisitante}
                    </Text>
                </View>
                <View className="mt-3 flex-row flex-wrap items-center justify-center gap-4">
                    <View className="flex-row items-center gap-1.5">
                        <Ionicons name="calendar-outline" size={14} color="#acc7ff" />
                        <Text className="text-sm text-navy-100">{formatFecha(partido.fecha)}</Text>
                    </View>
                    <View className="flex-row items-center gap-1.5">
                        <Ionicons name="time-outline" size={14} color="#acc7ff" />
                        <Text className="text-sm text-navy-100">{formatHora(partido.hora)}</Text>
                    </View>
                    {partido.estado && <AppBadge estado={partido.estado}>{partido.estado}</AppBadge>}
                </View>
            </View>

            {/* Estadio */}
            {partido.estadio && (
                <AppCard>
                    <CardHeader title="Estadio" />
                    <CardBody>
                        <Text className="text-base font-bold text-ink">{partido.estadio.nombre}</Text>
                        {(partido.estadio.ciudad || partido.estadio.pais) && (
                            <Text className="mt-1 text-sm text-ink-faint">
                                {[partido.estadio.ciudad, partido.estadio.pais].filter(Boolean).join(", ")}
                            </Text>
                        )}
                    </CardBody>
                </AppCard>
            )}

            {/* Sectores */}
            {(partido.sectoresHabilitados?.length ?? 0) > 0 && (
                <AppCard>
                    <CardHeader title="Sectores disponibles" subtitle="Precio por entrada" />
                    <CardBody className="gap-2">
                        {partido.sectoresHabilitados.map((s) => (
                            <View
                                key={s.nombreSector}
                                className="flex-row items-center justify-between rounded-xl border border-container-high bg-container-low px-3 py-2.5"
                            >
                                <View className="flex-row items-center gap-2">
                                    <View className="size-7 items-center justify-center rounded-lg bg-navy-900">
                                        <Text className="text-xs font-extrabold text-white">{s.nombreSector}</Text>
                                    </View>
                                    <View>
                                        <Text className="text-sm font-semibold text-ink">
                                            Sector {s.nombreSector}
                                        </Text>
                                        {s.entradasDisponibles !== undefined && (
                                            <Text className="text-xs text-ink-faint">
                                                {s.entradasDisponibles} disponibles
                                            </Text>
                                        )}
                                    </View>
                                </View>
                                <Text className="text-sm font-bold text-navy-900">{formatMoney(s.costo)}</Text>
                            </View>
                        ))}
                    </CardBody>
                </AppCard>
            )}
        </View>
    );
}
