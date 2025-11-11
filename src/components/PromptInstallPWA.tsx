import { FC } from "react";
import { useInstallPrompt } from "./useInstallPrompt";

export const PromptInstallPWA: FC = () => {
    const { isVisible, isIOS, promptToInstall } = useInstallPrompt();

    if (isIOS && !isVisible) {
        return (
            <small style={{ marginLeft: 12 }}>
                On iOS: tap <strong>Share</strong> → <strong>Add to Home Screen</strong>
            </small>
        );
    }

    if (!isVisible) return null;

    return (
        <button onClick={promptToInstall} aria-label="Install app">
            Install App
        </button>
    );
};

export default PromptInstallPWA;
