import Animated, { FadeInDown } from "react-native-reanimated";

/**
 * Wrapper de animación de entrada para cards en listas.
 * Replica el patrón del frontend web: fade + slide-up sutil (~12px, 0.25s).
 *
 * `index` permite escalonar un delay corto entre ítems consecutivos
 * de una lista (igual que el `delay` en AnimatedList.jsx del web),
 * sin que listas largas se sientan lentas (el delay se cappea).
 */
export function FadeInCard({ children, index = 0, style }) {
    const delay = Math.min(index, 8) * 40;
    return (
        <Animated.View
            entering={FadeInDown.duration(250).delay(delay).springify().damping(20)}
            style={style}
        >
            {children}
        </Animated.View>
    );
}
