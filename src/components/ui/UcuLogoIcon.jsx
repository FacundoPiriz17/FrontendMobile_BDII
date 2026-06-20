import { Image, View } from "react-native";
import { cn } from "../../lib/cn";

const ucuLogo = require("../../../assets/images/ucu-logo-white.png");

/**
 * Logo institucional de la UCU.
 * Replica el patrón visual del frontend web (UcuLogoIcon.jsx):
 * un contenedor con fondo navy y el isotipo blanco adentro.
 *
 * Uso típico: <UcuLogoIcon className="size-9" /> dentro de un
 * header/hero con fondo oscuro (navy-950, navy-800, etc.)
 */
export function UcuLogoIcon({ className, imgClassName, size, style }) {
    return (
        <View
            className={cn("items-center justify-center rounded-lg bg-navy-950 p-1.5", className)}
            style={[size ? { width: size, height: size } : null, style]}
        >
            <Image
                source={ucuLogo}
                className={cn("h-full w-full", imgClassName)}
                resizeMode="contain"
            />
        </View>
    );
}
