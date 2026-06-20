import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatMoney } from "../../../lib/formatters";
import { MAX_ENTRADAS_POR_COMPRA } from "../../../lib/constants";

export function SelectorSector({ sectores, cantidades, totalSeleccionado, onSumar, onRestar }) {
    return (
        <View className="gap-2">
            {sectores.map((s) => {
                const cantidad = cantidades[s.nombreSector] ?? 0;
                const puedeSumar =
                    totalSeleccionado < MAX_ENTRADAS_POR_COMPRA &&
                    (s.entradasDisponibles === undefined || cantidad < s.entradasDisponibles);

                return (
                    <View
                        key={s.nombreSector}
                        className="flex-row items-center justify-between rounded-2xl border border-container-high bg-white px-4 py-3"
                        style={{
                            shadowColor: "#141c28",
                            shadowOpacity: 0.04,
                            shadowRadius: 4,
                            elevation: 1,
                        }}
                    >
                        <View className="flex-row items-center gap-3">
                            <View className="size-10 items-center justify-center rounded-xl bg-navy-950">
                                <Text className="text-sm font-extrabold text-energy-500">{s.nombreSector}</Text>
                            </View>
                            <View>
                                <Text className="text-sm font-bold text-ink">Sector {s.nombreSector}</Text>
                                <Text className="text-xs text-ink-faint">
                                    {formatMoney(s.costo)} c/u
                                    {s.entradasDisponibles !== undefined ? ` · ${s.entradasDisponibles} disp.` : ""}
                                </Text>
                            </View>
                        </View>

                        {/* Stepper */}
                        <View className="flex-row items-center gap-2">
                            <Pressable
                                onPress={() => onRestar(s.nombreSector)}
                                disabled={cantidad === 0}
                                hitSlop={6}
                                className={`size-8 items-center justify-center rounded-full border ${
                                    cantidad === 0 ? "border-container-high bg-container" : "border-navy-700 bg-navy-900"
                                }`}
                            >
                                <Ionicons name="remove" size={16} color={cantidad === 0 ? "#c4c6d1" : "#fff"} />
                            </Pressable>

                            <Text className="w-6 text-center text-base font-bold text-ink">{cantidad}</Text>

                            <Pressable
                                onPress={() => onSumar(s)}
                                disabled={!puedeSumar}
                                hitSlop={6}
                                className={`size-8 items-center justify-center rounded-full border ${
                                    !puedeSumar ? "border-container-high bg-container" : "border-navy-700 bg-navy-900"
                                }`}
                            >
                                <Ionicons name="add" size={16} color={!puedeSumar ? "#c4c6d1" : "#fff"} />
                            </Pressable>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}
