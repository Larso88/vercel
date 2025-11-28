export type SWCallbacks = {
    onUpdate?: () => void;
    onSuccess?: (scope: string) => void;
    onError?: (err: unknown) => void;
};

export const registerSW = ({ onUpdate, onSuccess, onError }: SWCallbacks = {}) => {
    if (!("serviceWorker" in navigator)) return;

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

            const onVisible = () => {
                if (document.visibilityState === "visible") {
                    reg.update().catch(() => {/* ignore */});
                }
            };
            document.addEventListener("visibilitychange", onVisible);

            window.addEventListener("unload", () => {
                document.removeEventListener("visibilitychange", onVisible);
            });
        } catch (e) {
            onError?.(e);
        }
    };

    window.addEventListener("load", register);
};
