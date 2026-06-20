import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatMoney } from "../../../lib/formatters";
import { EmptyState } from "../../../components/ui/EmptyState";

export function CarritoEntradas({ items, onRemove, onUpdateCantidad }) {
    if (items.length === 0) {
        return (
            <EmptyState
                iconName="bag-outline"
                title="Carrito vacío"
                description="Seleccioná un partido y elegí los sectores para agregar entradas."
            />
        );
    }

    return (
        <View className="gap-2">
            {items.map((item) => (
                <View
                    key={`${item.idPartido}-${item.nombreSector}`}
                    className="flex-row items-center gap-3 rounded-2xl border border-container-high bg-white px-4 py-3"
                >
                    {/* Sector badge */}
                    <View className="size-10 items-center justify-center rounded-xl bg-navy-950">
                        <Text className="text-sm font-extrabold text-energy-500">{item.nombreSector}</Text>
                    </View>

                    {/* Info */}
                    <View className="flex-1">
                        <Text className="text-sm font-bold text-ink" numberOfLines={1}>
                            {item.nombrePartido ?? `Partido #${item.idPartido}`}
                        </Text>
                        <Text className="text-xs text-ink-faint">
                            {formatMoney(item.precioUnitario)} × {item.cantidad} ={" "}
                            {formatMoney(item.precioUnitario * item.cantidad)}
                        </Text>
                    </View>

                    {/* Stepper pequeño */}
                    <View className="flex-row items-center gap-1.5">
                        <Pressable
                            onPress={() => onUpdateCantidad(item.idPartido, item.nombreSector, item.cantidad - 1)}
                            hitSlop={6}
                            className="size-7 items-center justify-center rounded-lg bg-container"
                        >
                            <Ionicons name="remove" size={14} color="#002b61" />
                        </Pressable>
                        <Text className="w-5 text-center text-sm font-bold text-ink">{item.cantidad}</Text>
                        <Pressable
                            onPress={() => onUpdateCantidad(item.idPartido, item.nombreSector, item.cantidad + 1)}
                            hitSlop={6}
                            className="size-7 items-center justify-center rounded-lg bg-container"
                        >
                            <Ionicons name="add" size={14} color="#002b61" />
                        </Pressable>
                    </View>

                    {/* Eliminar */}
                    <Pressable
                        onPress={() => onRemove(item.idPartido, item.nombreSector)}
                        hitSlop={6}
                        className="ml-1 size-7 items-center justify-center rounded-lg bg-danger-100"
                    >
                        <Ionicons name="trash-outline" size={14} color="#ba1a1a" />
                    </Pressable>
                </View>
            ))}
        </View>
    );
}
