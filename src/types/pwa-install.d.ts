// src/types/pwa-install.d.ts
export {};

declare global {
    // Chromium-only event
    interface BeforeInstallPromptEvent extends Event {
        readonly platforms?: string[];
        prompt: () => Promise<void>;
        userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
    }

    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
        appinstalled: Event;
    }

    // iOS Safari exposes a non-standard flag
    interface Navigator {
        standalone?: boolean;
    }
}
