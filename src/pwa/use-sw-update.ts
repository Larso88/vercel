import { useEffect, useState } from "react";
import { registerSW } from "./register-sw";

export const useSwUpdateBanner = () => {
    const [updateReady, setUpdateReady] = useState(false);

    useEffect(() => {
        registerSW({
            onSuccess: (scope) => console.log("SW registered:", scope),
            onUpdate: () => setUpdateReady(true),
            onError: (e) => console.error("SW error:", e),
        });
    }, []);

    const reloadToUpdate = () => {
        navigator.serviceWorker.getRegistration().then((reg) => {
            if (!reg) return;

            reg.waiting?.postMessage({ type: "SKIP_WAITING" });

            const onChange = () => {
                navigator.serviceWorker.removeEventListener("controllerchange", onChange);
                window.location.reload();
            };
            navigator.serviceWorker.addEventListener("controllerchange", onChange);
        });
    };

    return { updateReady, reloadToUpdate };
};
