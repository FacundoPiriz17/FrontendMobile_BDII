import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppBadge } from "../../../components/ui/AppBadge";
import { formatFecha, formatHora } from "../../../lib/formatters";

export function PartidoCard({ partido, onPress }) {
    const router = useRouter();
    const id = partido.idPartido ?? partido.id;

    const handlePress = onPress ?? (() => router.push(`/(general)/partidos/${id}`));

    return (
        <Pressable
            onPress={handlePress}
            className="overflow-hidden rounded-2xl border border-container-high bg-white active:bg-container-low"
            style={{
                shadowColor: "#141c28",
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
            }}
        >
            {/* Top stripe */}
            <View className="flex-row items-center justify-between bg-navy-950 px-4 py-2">
                <Text className="text-[10px] font-bold uppercase tracking-widest text-navy-300">
                    {partido.fase ?? "Mundial 2026"}
                </Text>
                {partido.estado && <AppBadge estado={partido.estado}>{partido.estado}</AppBadge>}
            </View>

            <View className="px-4 py-4">
                {/* Equipos */}
                <View className="flex-row items-center justify-center gap-4">
                    <Text className="flex-1 text-right text-base font-bold text-ink" numberOfLines={2}>
                        {partido.equipoLocal}
                    </Text>
                    <View className="rounded-lg bg-container px-2.5 py-1">
                        <Text className="text-xs font-extrabold text-navy-900">VS</Text>
                    </View>
                    <Text className="flex-1 text-left text-base font-bold text-ink" numberOfLines={2}>
                        {partido.equipoVisitante}
                    </Text>
                </View>

                {/* Info */}
                <View className="mt-3 flex-row flex-wrap items-center justify-center gap-4">
                    <View className="flex-row items-center gap-1">
                        <Ionicons name="calendar-outline" size={12} color="#747781" />
                        <Text className="text-xs text-ink-faint">{formatFecha(partido.fecha)}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <Ionicons name="time-outline" size={12} color="#747781" />
                        <Text className="text-xs text-ink-faint">{formatHora(partido.hora)}</Text>
                    </View>
                    {partido.estadio?.nombre && (
                        <View className="flex-row items-center gap-1">
                            <Ionicons name="location-outline" size={12} color="#747781" />
                            <Text className="text-xs text-ink-faint" numberOfLines={1}>
                                {partido.estadio.nombre}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </Pressable>
    );
}
