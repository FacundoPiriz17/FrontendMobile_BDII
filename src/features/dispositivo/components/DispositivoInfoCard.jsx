import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppCard, CardBody, CardHeader } from "../../../components/ui/AppCard";
import { AppBadge } from "../../../components/ui/AppBadge";
import { AppButton } from "../../../components/ui/AppButton";
import { formatFechaHora } from "../../../lib/formatters";

export function DispositivoInfoCard({ info, onRegistrar, registrando = false }) {
    return (
        <AppCard>
            <CardHeader
                title="Mi dispositivo"
                right={
                    <AppBadge variant={info.registrado ? "ok" : "danger"}>
                        {info.registrado ? "Registrado" : "No registrado"}
                    </AppBadge>
                }
            />
            <CardBody className="gap-4">
                {/* ID del dispositivo */}
                <View>
                    <Text className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">
                        ID de dispositivo
                    </Text>
                    <Text className="mt-1 font-mono text-xs text-ink" numberOfLines={3} selectable>
                        {info.idDispositivo}
                    </Text>
                </View>

                {info.registrado ? (
                    <>
                        {info.fechaHoraVinculacion && (
                            <View>
                                <Text className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">
                                    Vinculado el
                                </Text>
                                <Text className="mt-0.5 text-sm font-semibold text-ink">
                                    {formatFechaHora(info.fechaHoraVinculacion)}
                                </Text>
                            </View>
                        )}
                        {info.emailFuncionario && (
                            <View>
                                <Text className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">
                                    Funcionario asignado
                                </Text>
                                <Text className="mt-0.5 text-sm font-semibold text-ink">
                                    {info.emailFuncionario}
                                </Text>
                            </View>
                        )}
                        <View className="flex-row items-start gap-2 rounded-xl bg-ok-100 px-3 py-3">
                            <Ionicons name="shield-checkmark" size={16} color="#047857" />
                            <Text className="flex-1 text-xs text-ok-600">
                                Este dispositivo está autorizado para escanear y validar entradas.
                            </Text>
                        </View>
                    </>
                ) : (
                    <>
                        <View className="flex-row items-start gap-2 rounded-xl bg-danger-100 px-3 py-3">
                            <Ionicons name="alert-circle" size={16} color="#ba1a1a" />
                            <Text className="flex-1 text-xs text-danger-700">
                                Este dispositivo no está registrado. No podrás escanear entradas hasta que un
                                administrador lo habilite.
                            </Text>
                        </View>
                        {onRegistrar && (
                            <AppButton variant="outline" size="sm" loading={registrando} onPress={onRegistrar}>
                                Solicitar registro
                            </AppButton>
                        )}
                    </>
                )}
            </CardBody>
        </AppCard>
    );
}
