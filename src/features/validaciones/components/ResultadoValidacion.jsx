import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "../../../components/ui/AppButton";

export function ResultadoValidacion({ estado, resultado, errorMsg, onReset }) {
    if (estado === "idle" || estado === "scanning") return null;

    const esExito = estado === "success";

    return (
        <Animated.View
            entering={FadeInDown.duration(300).springify()}
            className={`mx-0 rounded-t-3xl px-6 pb-6 pt-5 ${
                esExito ? "bg-ok-100 border-t-2 border-ok-500" : "bg-danger-100 border-t-2 border-danger-600"
            }`}
        >
            {/* Ícono */}
            <View className="mb-4 items-center">
                <View
                    className={`size-16 items-center justify-center rounded-3xl ${
                        esExito ? "bg-ok-500" : "bg-danger-600"
                    }`}
                >
                    <Ionicons name={esExito ? "checkmark" : "close"} size={36} color="#fff" />
                </View>
                <Text className={`mt-3 text-xl font-extrabold ${esExito ? "text-ok-600" : "text-danger-700"}`}>
                    {esExito ? "Entrada válida" : "Entrada inválida"}
                </Text>
                {(errorMsg || resultado?.mensaje) && (
                    <Text
                        className={`mt-1 text-center text-sm ${esExito ? "text-ok-600" : "text-danger-700"}`}
                    >
                        {errorMsg ?? resultado?.mensaje}
                    </Text>
                )}
            </View>

            {/* Detalles del éxito */}
            {esExito && resultado && (
                <View className="mb-4 gap-3 rounded-2xl border border-ok-500/30 bg-white px-4 py-4">
                    {[
                        { label: "Entrada", value: resultado.idEntrada ? `#${resultado.idEntrada}` : undefined },
                        { label: "Propietario", value: resultado.nombrePropietario },
                        { label: "Partido", value: resultado.partido },
                        { label: "Sector", value: resultado.sector ? `Sector ${resultado.sector}` : undefined },
                    ]
                        .filter((r) => r.value)
                        .map(({ label, value }) => (
                            <View key={label}>
                                <Text className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">
                                    {label}
                                </Text>
                                <Text className="mt-0.5 text-sm font-semibold text-ink">{value}</Text>
                            </View>
                        ))}
                </View>
            )}

            <AppButton variant={esExito ? "primary" : "danger"} size="lg" onPress={onReset} className="w-full">
                {esExito ? "Escanear otra entrada" : "Intentar nuevamente"}
            </AppButton>
        </Animated.View>
    );
}
