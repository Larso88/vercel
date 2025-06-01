import { useInstallPrompt } from "../components/useInstallPrompt.tsx";



export const PromptInstallPWA = () => {

    const { isPromptVisible, promptToInstall } = useInstallPrompt();

    if (!isPromptVisible) return null;
    return (
        <button onClick={promptToInstall}>
            Install this app
        </button>
    );
}

export default PromptInstallPWA
