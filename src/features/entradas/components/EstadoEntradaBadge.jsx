import { AppBadge } from "../../../components/ui/AppBadge";

export function EstadoEntradaBadge({ estado }) {
    return <AppBadge estado={estado}>{estado}</AppBadge>;
}
