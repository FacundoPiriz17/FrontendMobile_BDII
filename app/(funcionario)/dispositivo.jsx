import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useDispositivo } from "../../src/features/dispositivo/hooks/useDispositivo";
import { DispositivoInfoCard } from "../../src/features/dispositivo/components/DispositivoInfoCard";
import { LoadingScreen } from "../../src/components/ui/LoadingScreen";
import { ErrorMessage } from "../../src/components/feedback/ErrorMessage";
import { AppCard, CardBody, CardHeader } from "../../src/components/ui/AppCard";

export default function DispositivoScreen() {
    const insets = useSafeAreaInsets();
    const { info, loading, registrando, error, refetch, registrar } = useDispositivo();

    const handleRegistrar = async () => {
        try {
            await registrar();
            Toast.show({
                type: "info",
                text1: "Solicitud enviada. Esperá que un admin apruebe el dispositivo.",
            });
        } catch (err) {
            Toast.show({ type: "error", text1: err?.detail ?? "No se pudo solicitar el registro." });
        }
    };

    if (loading) return <LoadingScreen label="Leyendo dispositivo…" />;
    if (error) return <ErrorMessage error={error} onRetry={refetch} />;
    if (!info) return null;

    return (
        <View className="flex-1 bg-surface">
            <View className="bg-navy-800 px-4 pb-4" style={{ paddingTop: insets.top + 12 }}>
                <Text className="text-xl font-extrabold text-white">Mi dispositivo</Text>
                <Text className="mt-0.5 text-xs text-navy-300">
                    Información del dispositivo vinculado a tu cuenta
                </Text>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <DispositivoInfoCard
                    info={info}
                    onRegistrar={!info.registrado ? handleRegistrar : undefined}
                    registrando={registrando}
                />

                {/* Info adicional */}
                <AppCard className="mt-4">
                    <CardHeader title="¿Qué es el ID de dispositivo?" />
                    <CardBody className="gap-3">
                        {[
                            {
                                icon: "shield-checkmark-outline",
                                text: "El ID identifica de forma única este teléfono en el sistema de validación.",
                            },
                            {
                                icon: "scan-outline",
                                text: "Solo los dispositivos registrados y vinculados a un funcionario pueden escanear entradas.",
                            },
                            {
                                icon: "person-outline",
                                text: "El administrador debe aprobar el dispositivo antes de que puedas usarlo.",
                            },
                        ].map(({ icon, text }, i) => (
                            <View key={i} className="flex-row items-start gap-3">
                                <View className="size-8 items-center justify-center rounded-lg bg-container">
                                    <Ionicons name={icon} size={16} color="#002b61" />
                                </View>
                                <Text className="flex-1 text-sm text-ink-soft">{text}</Text>
                            </View>
                        ))}
                    </CardBody>
                </AppCard>
            </ScrollView>
        </View>
    );
}
