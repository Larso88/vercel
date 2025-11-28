// src/components/InstallPWAButton.tsx
import React, { useState } from "react";
import styled from "styled-components";
import {usePWAInstall} from "../pwa/usePWAInstall.ts";

const Button = styled.button`
  padding: 0.6rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(0,0,0,.12);
  background: #111;
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(0,0,0,.08);
  cursor: pointer;
  transition: transform .06s ease, box-shadow .12s ease;

  &:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,.12); }
  &:active { transform: translateY(0); box-shadow: 0 2px 10px rgba(0,0,0,.08); }
`;

const Backdrop = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,.4);
  display: flex; align-items: end; justify-content: center;
  @media (min-width: 640px) { align-items: center; }
`;

const Sheet = styled.div`
  width: 100%;
  max-width: 28rem;
  background: #fff;
  color: #111;
  border-radius: 1rem;
  padding: 1rem;
  margin: .75rem;
  box-shadow: 0 20px 40px rgba(0,0,0,.25);
`;

const Title = styled.h2`
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 .5rem;
`;

const Steps = styled.ol`
  margin: .25rem 0 0;
  padding-left: 1.25rem;
  li { margin: .3rem 0; line-height: 1.5; }
`;

const Row = styled.div`
  display: flex; gap: .5rem; margin-top: .85rem; justify-content: flex-end;
`;

const Secondary = styled.button`
  padding: .45rem .8rem;
  border-radius: .6rem;
  border: 1px solid rgba(0,0,0,.15);
  background: #f7f7f7;
  cursor: pointer;
`;

export const InstallPWAButton: React.FC = () => {
    const install = usePWAInstall();
    const [showIOS, setShowIOS] = useState(false);

    if (!install.canInstall) return null;

    const onClick = async () => {
        const res = await install.prompt();
        if (res === "shown-instructions") setShowIOS(true);
    };

    return (
        <>
            <Button onClick={onClick} aria-label="Install app">Install app</Button>

            {install.platform === "ios" && showIOS && (
                <Backdrop role="dialog" aria-modal="true" onClick={() => setShowIOS(false)}>
                    <Sheet onClick={(e) => e.stopPropagation()}>
                        <Title>Add to Home Screen</Title>
                        <Steps>
                            <li>Tap the <strong>Share</strong> button in Safari.</li>
                            <li>Choose <strong>Add to Home Screen</strong>.</li>
                            <li>Confirm the name and tap <strong>Add</strong>.</li>
                        </Steps>
                        <Row>
                            <Secondary onClick={() => setShowIOS(false)}>Got it</Secondary>
                        </Row>
                    </Sheet>
                </Backdrop>
            )}
        </>
    );
};
