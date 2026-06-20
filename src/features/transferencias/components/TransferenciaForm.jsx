import { useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppInput } from "../../../components/ui/AppInput";
import { AppButton } from "../../../components/ui/AppButton";

export function TransferenciaForm({ onSubmit, loading = false, error }) {
    const [email, setEmail] = useState("");

    return (
        <View className="gap-4">
            <AppInput
                label="Email del destinatario"
                iconName="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="destino@correo.ucu.edu.uy"
                value={email}
                onChangeText={setEmail}
                error={error}
                hint="El destinatario debe tener una cuenta UCU activa."
                returnKeyType="done"
                onSubmitEditing={() => onSubmit(email.trim())}
            />

            {/* Info box */}
            <View className="flex-row items-start gap-2 rounded-xl border border-info-100 bg-info-100 px-3 py-3">
                <Ionicons name="information-circle" size={16} color="#1d4ed8" />
                <Text className="flex-1 text-xs text-info-600">
                    El destinatario recibirá una solicitud de transferencia que deberá aceptar. Hasta ese
                    momento la entrada sigue siendo tuya.
                </Text>
            </View>

            <AppButton
                variant="primary"
                size="lg"
                loading={loading}
                disabled={!email.trim()}
                onPress={() => onSubmit(email.trim())}
            >
                Enviar transferencia
            </AppButton>
        </View>
    );
}
