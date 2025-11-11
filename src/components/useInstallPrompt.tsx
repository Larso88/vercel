import { useEffect, useMemo, useRef, useState } from "react";

type HookState = {
    isVisible: boolean;
    isIOS: boolean;
    promptToInstall: () => Promise<void>;
};

const isStandalone = (): boolean =>
    (typeof window !== "undefined" &&
        (window.matchMedia?.("(display-mode: standalone)").matches === true ||
            navigator.standalone === true)) ||
    false;

export const useInstallPrompt = (): HookState => {
    const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null);
    const [visible, setVisible] = useState(false);

    const iOS = useMemo<boolean>(() => {
        if (typeof navigator === "undefined") return false;
        const ua = navigator.userAgent;
        const isiOS =
            /iPad|iPhone|iPod/.test(ua) ||
            (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
        return isiOS;
    }, []);

    useEffect(() => {
        if (isStandalone()) return; // already installed → never show

        const onBeforeInstallPrompt = (e: BeforeInstallPromptEvent): void => {
            e.preventDefault(); // stop mini-infobar
            deferredPromptRef.current = e;
            setVisible(true);
        };

        const onAppInstalled = (): void => {
            deferredPromptRef.current = null;
            setVisible(false);
        };

        window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
        window.addEventListener("appinstalled", onAppInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
            window.removeEventListener("appinstalled", onAppInstalled);
        };
    }, []);

    const promptToInstall = async (): Promise<void> => {
        const evt = deferredPromptRef.current;
        if (!evt) return;

        await evt.prompt(); // must be called from a user gesture
        await evt.userChoice; // { outcome, platform }
        deferredPromptRef.current = null; // one-shot
        setVisible(false);
    };

    return { isVisible: visible, isIOS: iOS, promptToInstall };
};
