import { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "../../src/features/auth/store/useAuthStore";
import { useFetch } from "../../src/hooks/useFetch";
import { apiClient } from "../../src/services/apiClient";
import { endpoints } from "../../src/services/endpoints";
import { AppCard, CardBody, CardHeader } from "../../src/components/ui/AppCard";
import { AppBadge } from "../../src/components/ui/AppBadge";
import { ConfirmDialog } from "../../src/components/feedback/ConfirmDialog";
import { LoadingScreen } from "../../src/components/ui/LoadingScreen";
import { formatFecha } from "../../src/lib/formatters";

function NavRow({ icon, label, value, onPress, danger = false }) {
    return (
        <Pressable
            onPress={onPress}
            disabled={!onPress}
            className="flex-row items-center gap-3 px-4 py-3.5 active:bg-container-low"
        >
            <View
                className={`size-9 items-center justify-center rounded-xl ${
                    danger ? "bg-danger-100" : "bg-container"
                }`}
            >
                <Ionicons name={icon} size={18} color={danger ? "#ba1a1a" : "#002b61"} />
            </View>
            <View className="flex-1">
                <Text className={`text-sm font-semibold ${danger ? "text-danger-700" : "text-ink"}`}>
                    {label}
                </Text>
                {value && (
                    <Text className="mt-0.5 text-xs text-ink-faint" numberOfLines={1}>
                        {value}
                    </Text>
                )}
            </View>
            {onPress && !danger && <Ionicons name="chevron-forward" size={16} color="#c4c6d1" />}
        </Pressable>
    );
}

export default function PerfilScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { user, logout, isAdmin, isFuncionario, isGeneral } = useAuthStore();
    const [showLogout, setShowLogout] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const { data: perfil, loading } = useFetch(
        useCallback(() => apiClient.get(endpoints.usuarios.miPerfil), [])
    );

    const handleLogout = async () => {
        setLoggingOut(true);
        await logout();
        router.replace("/(auth)/login");
    };

    const iniciales = (user?.nombre || user?.email || "?")
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    if (loading) return <LoadingScreen label="Cargando perfil…" />;

    const p = perfil;

    return (
        <View className="flex-1 bg-surface">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero */}
                <View className="items-center bg-navy-950 pb-8 px-4" style={{ paddingTop: insets.top + 20 }}>
                    {/* Avatar */}
                    <View className="mb-4 size-20 items-center justify-center rounded-3xl bg-energy-500">
                        <Text className="text-3xl font-extrabold text-navy-950">{iniciales}</Text>
                    </View>
                    <Text className="text-xl font-extrabold text-white">{user?.nombre || "Usuario"}</Text>
                    <Text className="mt-1 text-sm text-navy-300">{user?.email}</Text>

                    {/* Roles */}
                    <View className="mt-3 flex-row gap-2">
                        {isGeneral && <AppBadge variant="navy">General</AppBadge>}
                        {isFuncionario && <AppBadge variant="info">Funcionario</AppBadge>}
                        {isAdmin && <AppBadge variant="warn">Admin</AppBadge>}
                    </View>
                </View>

                <View className="px-4 pt-4 gap-4">
                    {/* Datos personales */}
                    <AppCard>
                        <CardHeader title="Datos personales" />
                        <CardBody className="gap-4">
                            {[
                                { label: "Nombre", value: p?.nombre || user?.nombre },
                                { label: "Email", value: p?.email || user?.email },
                                {
                                    label: "Documento",
                                    value: p?.documento
                                        ? `${p.documento.tipo} ${p.documento.numero} (${p.documento.pais})`
                                        : undefined,
                                },
                                { label: "Teléfono(s)", value: p?.telefonos?.join(", ") },
                                { label: "Registrado", value: p?.fechaRegistro ? formatFecha(p.fechaRegistro) : undefined },
                                { label: "Verificación ID", value: p?.estadoVerificacion },
                            ]
                                .filter((row) => row.value)
                                .map(({ label, value }) => (
                                    <View key={label}>
                                        <Text className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">
                                            {label}
                                        </Text>
                                        <Text className="mt-0.5 text-sm font-semibold text-ink">{value}</Text>
                                    </View>
                                ))}
                        </CardBody>
                    </AppCard>

                    {/* Dirección */}
                    {p?.direccion && (
                        <AppCard>
                            <CardHeader title="Dirección" />
                            <CardBody>
                                <Text className="text-sm font-semibold text-ink">
                                    {[p.direccion.calle, p.direccion.numero, p.direccion.localidad, p.direccion.pais]
                                        .filter(Boolean)
                                        .join(", ")}
                                </Text>
                                {p.direccion.codigoPostal && (
                                    <Text className="mt-1 text-xs text-ink-faint">CP {p.direccion.codigoPostal}</Text>
                                )}
                            </CardBody>
                        </AppCard>
                    )}

                    {/* Navegación rápida */}
                    <AppCard>
                        <CardHeader title="Mis actividades" />
                        <View className="divide-y divide-container-high">
                            <NavRow
                                icon="ticket-outline"
                                label="Mis entradas"
                                onPress={() => router.push("/(general)/entradas/index")}
                            />
                            <NavRow
                                icon="bag-outline"
                                label="Historial de compras"
                                onPress={() => router.push("/(general)/compras/historial")}
                            />
                            <NavRow
                                icon="swap-horizontal-outline"
                                label="Transferencias"
                                onPress={() => router.push("/(general)/transferencias/index")}
                            />
                            {isFuncionario && (
                                <NavRow
                                    icon="scan-outline"
                                    label="Modo funcionario"
                                    onPress={() => router.push("/(funcionario)/home")}
                                />
                            )}
                        </View>
                    </AppCard>

                    {/* Cerrar sesión */}
                    <AppCard>
                        <View>
                            <NavRow icon="log-out-outline" label="Cerrar sesión" danger onPress={() => setShowLogout(true)} />
                        </View>
                    </AppCard>
                </View>
            </ScrollView>

            <ConfirmDialog
                visible={showLogout}
                title="Cerrar sesión"
                message="¿Seguro que querés cerrar sesión? Tendrás que volver a ingresar tus credenciales."
                confirmLabel="Cerrar sesión"
                cancelLabel="Cancelar"
                destructive
                onConfirm={handleLogout}
                onCancel={() => setShowLogout(false)}
            />
        </View>
    );
}
