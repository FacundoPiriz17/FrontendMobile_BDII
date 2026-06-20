import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "../ui/AppButton";

export function ErrorMessage({ error, onRetry }) {
    const msg = error?.detail || error?.message || "Ocurrió un error inesperado.";

    return (
        <View className="mx-4 mt-6 rounded-2xl border border-danger-100 bg-danger-100 px-4 py-4">
            <View className="flex-row items-start gap-3">
                <Ionicons name="alert-circle" size={20} color="#ba1a1a" />
                <Text className="flex-1 text-sm font-medium text-danger-700">{msg}</Text>
            </View>
            {onRetry && (
                <AppButton variant="danger" size="sm" onPress={onRetry} className="mt-3 self-start">
                    Reintentar
                </AppButton>
            )}
        </View>
    );
}
