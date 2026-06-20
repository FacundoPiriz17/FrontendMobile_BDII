import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "./toastConfig";

/**
 * AppProviders
 * Envuelve la app con todos los providers necesarios:
 * - GestureHandlerRootView (react-native-gesture-handler)
 * - SafeAreaProvider (react-native-safe-area-context)
 * - Toast (react-native-toast-message)
 *
 * Uso: en app/_layout.jsx ya está integrado directamente,
 * pero este componente existe para ser reutilizable si se
 * necesita wrappear una sub-árbol (e.g. tests, Storybook).
 */
export function AppProviders({ children }) {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                {children}
                <Toast config={toastConfig} />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
