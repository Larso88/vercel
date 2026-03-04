import React, { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Plus } from "lucide-react";
import colors from "../assets/colors";
import { addShoppingListItem, type ShoppingListItem } from "../api/ShoppingListController";

const Wrapper = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    padding: 0 14px;
`;

const Card = styled.div`
    width: 100%;
    max-width: 560px;
    padding: 10px;

    border-radius: 18px;
    background: linear-gradient(
            to bottom,
            rgba(18, 18, 18, 0.72),
            rgba(22, 22, 22, 0.72)
    );
    border: 1px solid rgba(255, 215, 0, 0.10);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
`;

const RowTop = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
`;

const BaseInput = styled.input`
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

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const NameInput = styled(BaseInput)`
    width: 89%;
`;

const flash = keyframes`
    0%   { transform: scale(1); }
    50%  { transform: scale(0.97); }
    100% { transform: scale(1); }
`;

const AddButton = styled.button<{ $flash?: boolean }>`
    height: 48px;
    min-width: 52px;
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

    svg {
        width: 20px;
        height: 20px;
    }

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
    font-size: 14px;
    font-weight: 600;

    @media (max-width: 520px) {
        display: none;
    }
`;

interface Props {
    listId?: number;
    onItemAdded?: (item: ShoppingListItem) => void;
}

const AddShoppingListItem: React.FC<Props> = ({ listId, onItemAdded }) => {
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [flashing, setFlashing] = useState(false);

    const canSubmit = useMemo(() => {
        return !!listId && name.trim().length > 0 && !saving;
    }, [listId, name, saving]);

    const handleFlash = () => {
        setFlashing(true);
        setTimeout(() => setFlashing(false), 180);
    };

    const handleAdd = async () => {
        const trimmed = name.trim();
        if (!trimmed) return;
        if (!listId) return;

        handleFlash();
        setSaving(true);

        try {
            const addedItem = await addShoppingListItem(listId, {
                name: trimmed,
                quantity: 1,
            });

            setName("");
            onItemAdded?.(addedItem);
        } catch (error: unknown) {
            if (error instanceof Error) console.error("Error adding item:", error);
            else console.error("Unknown error:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Wrapper>
            <Card className="Card">
                <RowTop>
                    <NameInput
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={listId ? "Legg til element" : "Opprett/velg en liste først"}
                        autoComplete="off"
                        enterKeyHint="done"
                        disabled={saving || !listId}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleAdd();
                        }}
                    />

                    <AddButton
                        onClick={handleAdd}
                        disabled={!canSubmit}
                        $flash={flashing}
                        aria-label="Add item"
                        title="Add item"
                    >
                        <Plus />
                        <ButtonText>{saving ? "Adding" : "Add"}</ButtonText>
                    </AddButton>
                </RowTop>
            </Card>
        </Wrapper>
    );
};

export default AddShoppingListItem;
