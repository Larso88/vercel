import { useEffect, useMemo, useRef, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const isStandalone = (): boolean => {
    // iOS Safari
    // @ts-ignore
    if (typeof navigator !== "undefined" && "standalone" in navigator && (navigator as any).standalone) {
        return true;
    }
    return typeof window !== "undefined" &&
        window.matchMedia?.("(display-mode: standalone)")?.matches === true;
};

const isIOS = (): boolean =>
    typeof navigator !== "undefined" &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1)) &&
    !/Android/.test(navigator.userAgent);

const isSafari = (): boolean =>
    typeof navigator !== "undefined" &&
    /Safari/.test(navigator.userAgent) &&
    !/Chrome|CriOS|Edg|OPR/.test(navigator.userAgent);

export type InstallState =
    | { canInstall: true; platform: "android-like"; prompt: () => Promise<"accepted" | "dismissed"> }
    | { canInstall: true; platform: "ios"; prompt: () => Promise<"shown-instructions"> }
    | { canInstall: false; platform: "standalone" | "unsupported" };

export function usePWAInstall(): InstallState {
    const [installed, setInstalled] = useState(isStandalone());
    const deferredRef = useRef<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const onBIP = (e: Event) => {
            e.preventDefault?.();
            deferredRef.current = e as BeforeInstallPromptEvent;
        };

        const onInstalled = () => setInstalled(true);

        window.addEventListener("beforeinstallprompt", onBIP as any);
        window.addEventListener("appinstalled", onInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", onBIP as any);
            window.removeEventListener("appinstalled", onInstalled);
        };
    }, []);

    return useMemo<InstallState>(() => {
        if (installed || isStandalone()) return { canInstall: false, platform: "standalone" };

        if (deferredRef.current) {
            return {
                canInstall: true,
                platform: "android-like",
                prompt: async () => {
                    const dp = deferredRef.current!;
                    await dp.prompt();
                    const { outcome } = await dp.userChoice;
                    return outcome === "accepted" ? "accepted" : "dismissed";
                },
            };
        }

        if (isIOS() && isSafari()) {
            return { canInstall: true, platform: "ios", prompt: async () => "shown-instructions" };
        }

        return { canInstall: false, platform: "unsupported" };
    }, [installed]);
}
