// components/PromptInstallPWA.tsx
import { FC, useCallback, useState } from "react";
import styled from "styled-components";
import { useInstallPrompt } from "./useInstallPrompt";

const Banner = styled.div`
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .6rem .9rem;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: .75rem;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  font-size: .9rem;
`;

const InstallBtn = styled.button`
  padding: .5rem .8rem;
  border-radius: .6rem;
  border: 1px solid rgba(0,0,0,.15);
  background: #f7f7f7;
  cursor: pointer;
`;

export const PromptInstallPWA: FC = () => {
    const { isVisible, isIOS, promptToInstall } = useInstallPrompt();
    const [dismissed, setDismissed] = useState(false);

    const openShareSheet = useCallback(async () => {
        // Not guaranteed, but works on iOS Safari for basic title/url.
        if (navigator.share) {
            try {
                await navigator.share({ title: document.title, url: location.href });
            } catch {
                /* user canceled; ignore */
            }
        }
    }, []);

    if (dismissed) return null;

    if (isIOS && !isVisible) {
        return (
            <Banner role="status" aria-live="polite">
        <span>
          Install this app:&nbsp;
            <ol style={{ display: "inline", padding: 0, margin: 0 }}>
            <li style={{ display: "inline" }}>1) tap <strong>Share</strong> ⬆️</li>
            <li style={{ display: "inline" }}>&nbsp;2) choose <strong>Add to Home Screen</strong></li>
          </ol>
        </span>
                <InstallBtn onClick={openShareSheet} aria-label="Open Share menu">
                    Open Share
                </InstallBtn>
                <InstallBtn onClick={() => setDismissed(true)} aria-label="Dismiss">
                    Dismiss
                </InstallBtn>
            </Banner>
        );
    }

    if (isVisible) {
        return (
            <Banner>
                <span>Install this app for a better experience.</span>
                <InstallBtn onClick={promptToInstall} aria-label="Install app">Install</InstallBtn>
                <InstallBtn onClick={() => setDismissed(true)} aria-label="Dismiss">Later</InstallBtn>
            </Banner>
        );
    }

    return null;
};

export default PromptInstallPWA;
