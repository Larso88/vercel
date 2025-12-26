import React, { useEffect } from "react";
import styled from "styled-components";
import { X, Menu, LogIn, LogOut, User, Shield } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { InstallPWAButton } from "./InstallPWAButton";
import colors from "../assets/colors";

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(255, 215, 0, 0.12);
  background: rgba(18, 18, 18, 0.65);
  color: ${colors.light};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  opacity: ${(p) => (p.$open ? 1 : 0)};
  pointer-events: ${(p) => (p.$open ? "auto" : "none")};
  transition: opacity 180ms ease;
  z-index: 999;
`;

const Drawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: min(360px, 92vw);
  background: linear-gradient(
    to bottom,
    rgba(18, 18, 18, 0.98),
    rgba(22, 22, 22, 0.98)
  );
  border-left: 1px solid rgba(255, 215, 0, 0.10);
  transform: translateX(${(p) => (p.$open ? "0" : "100%")});
  transition: transform 220ms ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 10px 16px;
`;

const DrawerTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    color: ${colors.light};
    font-size: 14px;
    letter-spacing: 0.2px;
  }

  span {
    color: rgba(238, 238, 238, 0.65);
    font-size: 12px;
  }
`;

const DrawerBody = styled.div`
  padding: 12px 16px 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Section = styled.div`
  border: 1px solid rgba(255, 215, 0, 0.08);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 12px;
`;

const Row = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  color: ${colors.light};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 8px;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &:active {
    transform: scale(0.99);
  }
`;

const RowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    width: 18px;
    height: 18px;
    opacity: 0.9;
  }
`;

const Badge = styled.span`
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255, 215, 0, 0.22);
  color: rgba(255, 215, 0, 0.9);
  background: rgba(255, 215, 0, 0.06);
`;

export const AppMenuDrawer: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const { initialized, authenticated, username, login, logout, hasRole } = useAuth();

    const close = () => setOpen(false);
    const toggle = () => setOpen((v) => !v);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    return (
        <>
            <IconButton onClick={toggle} aria-label="Open menu">
                <Menu />
            </IconButton>

            <Backdrop $open={open} onClick={close} />

            <Drawer $open={open} role="dialog" aria-modal="true" aria-label="Menu">
                <DrawerHeader>
                    <DrawerTitle>
                        <strong>Menu</strong>
                        <span>{initialized ? "Ready" : "Starting auth…"}</span>
                    </DrawerTitle>
                    <IconButton onClick={close} aria-label="Close menu">
                        <X />
                    </IconButton>
                </DrawerHeader>

                <DrawerBody>
                    <Section>
                        <Row as="div" style={{ cursor: "default" }}>
                            <RowLeft>
                                <User />
                                <div>
                                    <div style={{ fontSize: 13, lineHeight: 1.2 }}>
                                        {authenticated ? (username ?? "Logged in") : "Not logged in"}
                                    </div>
                                    <div style={{ fontSize: 12, opacity: 0.65, marginTop: 2 }}>
                                        Account
                                    </div>
                                </div>
                            </RowLeft>

                            {authenticated && hasRole("admin") && (
                                <RowLeft>
                                    <Shield />
                                    <Badge>Admin</Badge>
                                </RowLeft>
                            )}
                        </Row>

                        <div style={{ height: 10 }} />

                        {!authenticated ? (
                            <Row
                                onClick={() => {
                                    close();
                                    login();
                                }}
                            >
                                <RowLeft>
                                    <LogIn />
                                    <span>Login</span>
                                </RowLeft>
                                <span style={{ opacity: 0.6 }}>→</span>
                            </Row>
                        ) : (
                            <Row
                                onClick={() => {
                                    close();
                                    logout();
                                }}
                            >
                                <RowLeft>
                                    <LogOut />
                                    <span>Logout</span>
                                </RowLeft>
                                <span style={{ opacity: 0.6 }}>→</span>
                            </Row>
                        )}
                    </Section>

                    <Section>
                        <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 8 }}>
                            App
                        </div>

                        <div>
                            <InstallPWAButton />
                        </div>
                    </Section>
                </DrawerBody>
            </Drawer>
        </>
    );
};

export default AppMenuDrawer;
