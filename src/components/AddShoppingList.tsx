import React, {useEffect, useMemo, useState} from "react";
import styled, {keyframes} from "styled-components";
import {Plus, X} from "lucide-react";
import colors from "../assets/colors";
import {createList, type ShoppingList} from "../api/ShoppingListController";

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  padding: 0 14px;
  margin: 1rem 0;
`;

const Bar = styled.div`
  width: 100%;
  max-width: 560px;
  display: flex;
  justify-content: center;
`;

const flash = keyframes`
  0%   { transform: scale(1); }
  50%  { transform: scale(0.97); }
  100% { transform: scale(1); }
`;

const Button = styled.button<{ $flash?: boolean }>`
  height: 44px;
  padding: 0 14px;
  border-radius: 14px;

  border: 1px solid rgba(255, 215, 0, 0.18);
  background: rgba(255, 215, 0, 0.10);
  color: rgba(255, 215, 0, 0.92);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: rgba(255, 215, 0, 0.14);
    border-color: rgba(255, 215, 0, 0.25);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  animation: ${(p) => (p.$flash ? flash : "none")} 180ms ease;
`;

const ButtonText = styled.span`
  font-size: 13px;
  font-weight: 700;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.62);
  backdrop-filter: blur(6px);
  display: grid;
  place-items: center;
  z-index: 9999;
  padding: 18px;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 520px;
  border-radius: 18px;
  background: linear-gradient(
    to bottom,
    rgba(18, 18, 18, 0.92),
    rgba(12, 12, 12, 0.92)
  );
  border: 1px solid rgba(255, 215, 0, 0.10);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 14px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const Title = styled.div`
  color: rgba(255, 255, 255, 0.88);
  font-weight: 800;
  letter-spacing: 0.02em;
`;

const CloseBtn = styled.button`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;

  &:active {
    transform: scale(0.98);
  }
`;

const ModalBody = styled.div`
  padding: 14px;
  display: grid;
  gap: 10px;
`;

const Input = styled.input`
  height: 48px;
  border-radius: 14px;
  border: 1px solid rgba(255, 215, 0, 0.10);
  background: rgba(255, 255, 255, 0.04);
  color: ${colors.light};

  padding: 0 14px;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: rgba(238, 238, 238, 0.55);
    font-style: italic;
  }

  &:focus {
    border-color: rgba(255, 215, 0, 0.35);
    box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.10);
    background: rgba(255, 255, 255, 0.06);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 0 14px 14px;
`;

const Secondary = styled.button`
  height: 44px;
  padding: 0 14px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.88);
  cursor: pointer;

  &:active {
    transform: scale(0.98);
  }
`;

const Primary = styled.button`
  height: 44px;
  padding: 0 14px;
  border-radius: 14px;

  border: 1px solid rgba(255, 215, 0, 0.18);
  background: rgba(255, 215, 0, 0.10);
  color: rgba(255, 215, 0, 0.92);

  cursor: pointer;
  font-weight: 800;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.98);
  }
`;

type Props = {
    onListCreated?: (list: ShoppingList) => void;
};

const AddShoppingList: React.FC<Props> = ({ onListCreated}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [flashing, setFlashing] = useState(false);

    const canCreate = useMemo(() => name.trim().length > 0 && !saving, [name, saving]);

    const close = () => {
        if (saving) return;
        setOpen(false);
        setName("");
    };

    const handleFlash = () => {
        setFlashing(true);
        setTimeout(() => setFlashing(false), 180);
    };

    const handleCreate = async () => {
        const trimmed = name.trim();
        if (!trimmed) return;

        setSaving(true);
        try {
            const created = await createList(trimmed);
            onListCreated?.(created);
            close();
        } catch (e) {
            console.error("Error creating list:", e);
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "Enter") handleCreate();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, name, saving]);

    return (
        <Wrapper>

            <Bar>
                <Button
                    onClick={() => {
                        handleFlash();
                        setOpen(true);
                    }}
                    $flash={flashing}
                    aria-label="Create list"
                    title="Create list"
                >
                    <ButtonText>Ny liste</ButtonText>
                    <Plus size={18} />
                </Button>
            </Bar>

            {open && (
                <Overlay
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) close();
                    }}
                >
                    <Modal onMouseDown={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <Title>Ny liste</Title>
                            <CloseBtn onClick={close} aria-label="Close">
                                <X size={18} />
                            </CloseBtn>
                        </ModalHeader>

                        <ModalBody>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Navn på liste…"
                                autoFocus
                                disabled={saving}
                            />
                        </ModalBody>

                        <Actions>
                            <Secondary onClick={close} disabled={saving}>
                                Avbryt
                            </Secondary>
                            <Primary onClick={handleCreate} disabled={!canCreate}>
                                {saving ? "Lagrer…" : "Opprett"}
                            </Primary>
                        </Actions>
                    </Modal>
                </Overlay>
            )}
        </Wrapper>
    );
};

export default AddShoppingList;
