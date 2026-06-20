import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppCard, CardBody } from "../../../components/ui/AppCard";
import { AppBadge } from "../../../components/ui/AppBadge";
import { AppButton } from "../../../components/ui/AppButton";
import { formatFechaHora } from "../../../lib/formatters";

export function TransferenciaCard({
                                      transferencia,
                                      esRecibida,
                                      onAceptar,
                                      onRechazar,
                                      onCancelar,
                                  }) {
    const esPendiente = transferencia.estado === "pendiente";

    return (
        <AppCard>
            <CardBody>
                <View className="flex-row items-start gap-3">
                    {/* Ícono dirección */}
                    <View
                        className={`size-10 items-center justify-center rounded-xl ${
                            esRecibida ? "bg-ok-100" : "bg-info-100"
                        }`}
                    >
                        <Ionicons
                            name={esRecibida ? "arrow-down" : "arrow-up"}
                            size={18}
                            color={esRecibida ? "#047857" : "#1d4ed8"}
                        />
                    </View>

                    <View className="flex-1">
                        <Text className="text-sm font-bold text-ink">
                            Entrada #{transferencia.idEntrada}
                        </Text>
                        <Text className="text-xs text-ink-faint" numberOfLines={1}>
                            {esRecibida
                                ? `De: ${transferencia.emailOrigen}`
                                : `Para: ${transferencia.emailDestino}`}
                        </Text>
                        {transferencia.fechaHora && (
                            <Text className="text-xs text-ink-faint">
                                {formatFechaHora(transferencia.fechaHora)}
                            </Text>
                        )}
                    </View>

                    <AppBadge estado={transferencia.estado}>{transferencia.estado}</AppBadge>
                </View>

                {/* Acciones */}
                {esPendiente && (
                    <View className="mt-3 flex-row gap-2">
                        {esRecibida ? (
                            <>
                                {onAceptar && (
                                    <AppButton variant="primary" size="sm" className="flex-1" onPress={onAceptar}>
                                        Aceptar
                                    </AppButton>
                                )}
                                {onRechazar && (
                                    <AppButton variant="outline" size="sm" className="flex-1" onPress={onRechazar}>
                                        Rechazar
                                    </AppButton>
                                )}
                            </>
                        ) : (
                            onCancelar && (
                                <AppButton variant="outline" size="sm" className="flex-1" onPress={onCancelar}>
                                    Cancelar
                                </AppButton>
                            )
                        )}
                    </View>
                )}
            </CardBody>
        </AppCard>
    );
}
