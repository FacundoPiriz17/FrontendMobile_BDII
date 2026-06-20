import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { EstadoEntradaBadge } from "./EstadoEntradaBadge";
import { formatFecha, formatHora } from "../../../lib/formatters";
import { MAX_TRANSFERENCIAS } from "../../../lib/constants";

export function EntradaCard({ entrada, onPress }) {
    const router = useRouter();
    const handlePress = onPress ?? (() => router.push(`/(general)/entradas/${entrada.idEntrada}`));

    const restantes = entrada.transferenciasRestantes ?? MAX_TRANSFERENCIAS;

    return (
        <Pressable
            onPress={handlePress}
            className="overflow-hidden rounded-2xl border border-container-high bg-white active:bg-container-low"
            style={{
                shadowColor: "#141c28",
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 1,
            }}
        >
            {/* Top stripe */}
            <View className="flex-row items-center justify-between bg-navy-950 px-4 py-2">
                <Text className="text-[10px] font-bold uppercase tracking-widest text-navy-300">
                    Entrada #{entrada.idEntrada}
                </Text>
                <EstadoEntradaBadge estado={entrada.estado} />
            </View>

            <View className="px-4 py-3">
                <Text className="text-base font-bold text-ink" numberOfLines={1}>
                    {entrada.partido?.equipoLocal} vs {entrada.partido?.equipoVisitante}
                </Text>

                <View className="mt-2 flex-row flex-wrap gap-x-4 gap-y-1">
                    <View className="flex-row items-center gap-1">
                        <Ionicons name="calendar-outline" size={12} color="#747781" />
                        <Text className="text-xs text-ink-faint">{formatFecha(entrada.partido?.fecha)}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <Ionicons name="time-outline" size={12} color="#747781" />
                        <Text className="text-xs text-ink-faint">{formatHora(entrada.partido?.hora)}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <Ionicons name="grid-outline" size={12} color="#747781" />
                        <Text className="text-xs text-ink-faint">Sector {entrada.nombreSector}</Text>
                    </View>
                </View>

                {/* Barra de transferencias */}
                {entrada.estado === "activa" && (
                    <View className="mt-3 flex-row items-center gap-2">
                        <Text className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                            Trans.
                        </Text>
                        <View className="flex-row gap-1">
                            {Array.from({ length: MAX_TRANSFERENCIAS }).map((_, i) => (
                                <View
                                    key={i}
                                    className={`h-1.5 w-6 rounded-full ${
                                        i < restantes ? "bg-ok-500" : "bg-container-high"
                                    }`}
                                />
                            ))}
                        </View>
                        <Text className="text-[10px] text-ink-faint">{restantes} restantes</Text>
                    </View>
                )}
            </View>
        </Pressable>
    );
}
