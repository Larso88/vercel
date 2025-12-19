// src/auth/AuthProvider.tsx
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
    type FC,
} from "react";
import keycloak from "./keycloak";

export type AuthContextType = {
    initialized: boolean;
    authenticated: boolean;
    token?: string;

    username?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;

    login: () => void;
    logout: () => void;
    hasRole: (role: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let keycloakInitPromise: Promise<boolean> | null = null;

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [initialized, setInitialized] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [firstName, setFirstName] = useState<string | undefined>();
    const [lastName, setLastName] = useState<string | undefined>();
    const [fullName, setFullName] = useState<string | undefined>();
    const [username, setUsername] = useState<string | undefined>();


    const syncFromKeycloak = () => {
        const auth = !!keycloak.authenticated;
        setAuthenticated(auth);
        setToken(keycloak.token);

        if (!auth) {
            setUsername(undefined);
            setFirstName(undefined);
            setLastName(undefined);
            setFullName(undefined);
            return;
        }

        const id = keycloak.idTokenParsed as any;

        const firstName = id?.given_name as string | undefined;
        const lastName = id?.family_name as string | undefined;
        const fullName = id?.name as string | undefined;
        const username = id?.preferred_username as string | undefined;

        setFirstName(firstName);
        setLastName(lastName);
        setFullName(fullName);
        setUsername(username);
    };



    useEffect(() => {
        if (!keycloakInitPromise) {
            keycloakInitPromise = keycloak.init({
                onLoad: "check-sso",
                checkLoginIframe: false,
                pkceMethod: "S256",
            });
        }

        keycloakInitPromise
            .then(() => {
                syncFromKeycloak();
                setInitialized(true);
            })
            .catch((err) => {
                console.error("Keycloak init failed:", err);
                setInitialized(true);
            });

        keycloak.onAuthSuccess = () => syncFromKeycloak();
        keycloak.onAuthLogout = () => syncFromKeycloak();
        keycloak.onAuthRefreshSuccess = () => syncFromKeycloak();
        keycloak.onAuthError = () => syncFromKeycloak();

        keycloak.onTokenExpired = async () => {
            try {
                await keycloak.updateToken(30);
                syncFromKeycloak();
            } catch {
                syncFromKeycloak();
            }
        };

        return () => {
            keycloak.onAuthSuccess = undefined;
            keycloak.onAuthLogout = undefined;
            keycloak.onAuthRefreshSuccess = undefined;
            keycloak.onAuthError = undefined;
            keycloak.onTokenExpired = undefined;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = () =>
        keycloak.login({
            redirectUri: window.location.origin + window.location.pathname,
        });

    const logout = () =>
        keycloak.logout({
            redirectUri: window.location.origin + window.location.pathname,
        });

    const hasRole = (role: string): boolean =>
        keycloak.realmAccess?.roles?.includes(role) ?? false;

    const value: AuthContextType = {
        initialized,
        authenticated,
        token,
        username,
        firstName,
        lastName,
        fullName,
        login,
        logout,
        hasRole,
    };

    if (!initialized) {
        return <div style={{ padding: 16 }}>Loading authentication…</div>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
