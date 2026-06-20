import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../src/features/auth/store/useAuthStore";
import { LoadingScreen } from "../../src/components/ui/LoadingScreen";

const TABS = [
    { name: "home", title: "Inicio", icon: "home-outline", iconFocused: "home" },
    { name: "scanner", title: "Escanear", icon: "scan-outline", iconFocused: "scan" },
    {
        name: "validaciones",
        title: "Validaciones",
        icon: "checkmark-circle-outline",
        iconFocused: "checkmark-circle",
    },
    {
        name: "dispositivo",
        title: "Dispositivo",
        icon: "phone-portrait-outline",
        iconFocused: "phone-portrait",
    },
];

export default function FuncionarioLayout() {
    const { initializing, isAuthenticated, isFuncionario } = useAuthStore();

    if (initializing) return <LoadingScreen />;
    if (!isAuthenticated) return <Redirect href="/(auth)/login" />;
    if (!isFuncionario) return <Redirect href="/(general)/home" />;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#0b3c7e",
                    borderTopColor: "rgba(255,255,255,0.10)",
                    height: 64,
                    paddingBottom: 8,
                    paddingTop: 6,
                },
                tabBarActiveTintColor: "#00e3fd",
                tabBarInactiveTintColor: "#7694d0",
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: "600",
                    marginTop: 2,
                },
            }}
        >
            {TABS.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.title,
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons name={focused ? tab.iconFocused : tab.icon} size={22} color={color} />
                        ),
                    }}
                />
            ))}
        </Tabs>
    );
}
