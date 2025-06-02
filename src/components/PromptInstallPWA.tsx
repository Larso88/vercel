import { useInstallPrompt } from "../components/useInstallPrompt.tsx";



export const PromptInstallPWA = () => {

    const { isVisible, promptToInstall } = useInstallPrompt();

    if (!isVisible) return null;
    return (
        <button onClick={promptToInstall}>
            Install App
        </button>
    );
}

export default PromptInstallPWA
