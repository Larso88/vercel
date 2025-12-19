import { useEffect, type ReactElement } from "react";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
    const { authenticated, login } = useAuth();

    useEffect(() => {
        if (!authenticated) {
            login();
        }
    }, [authenticated, login]);

    if (!authenticated) return null;

    return children;
};
