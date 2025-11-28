export type SWCallbacks = {
    onUpdate?: () => void;
    onSuccess?: (scope: string) => void;
    onError?: (err: unknown) => void;
};

export const registerSW = ({ onUpdate, onSuccess, onError }: SWCallbacks = {}) => {
    if (!("serviceWorker" in navigator)) return;

    if (import.meta.env.DEV) return;

    const register = async () => {
        try {
            const reg = await navigator.serviceWorker.register("/sw.js");
            onSuccess?.(reg.scope);

            if (reg.waiting) onUpdate?.();
            reg.addEventListener("updatefound", () => {
                const installing = reg.installing;
                if (!installing) return;
                installing.addEventListener("statechange", () => {
                    if (installing.state === "installed" && navigator.serviceWorker.controller) {
                        onUpdate?.();
                    }
                });
            });
        } catch (e) {
            onError?.(e);
        }
    };

    window.addEventListener("load", register);
};

