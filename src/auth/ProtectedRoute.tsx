import { useEffect, type ReactElement } from "react";
import { useAuth } from "./AuthProvider";

type Props = {
    children: ReactElement;
    role?: string;
    rolesAny?: string[];
};

export const ProtectedRoute = ({ children, role, rolesAny }: Props) => {
    const { initialized, authenticated, login, hasRole } = useAuth();

    useEffect(() => {
        if (!initialized) return;
        if (!authenticated) login();
    }, [initialized, authenticated, login]);

    if (!initialized) return null;
    if (!authenticated) return null;

    const needsRole = role || (rolesAny && rolesAny.length > 0);
    if (needsRole) {
        const ok =
            (role ? hasRole(role) : false) ||
            (rolesAny ? rolesAny.some((r) => hasRole(r)) : false);

        if (!ok) {
            return (
                <div style={{ padding: 16 }}>
                    <h3>Ingen tilgang</h3>
                    <p>Du mangler nødvendig rolle for å åpne denne siden.</p>
                </div>
            );
        }
    }

    return children;
};
