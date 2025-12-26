import React, { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Plus } from "lucide-react";
import colors from "../assets/colors";
import {
    addShoppingListItem,
    ShoppingListItem,
} from "../api/ShoppingListController";

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

const RowBottom = styled.div`
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 10px;
    margin-top: 10px;

    @media (max-width: 420px) {
        grid-template-columns: 110px 1fr;
    }
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

const QtyWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 64px;
  gap: 8px;
`;

const QtyInput = styled(BaseInput)`
  width: 89%;
  padding: 0 12px;
  text-align: left;
`;

const Stepper = styled.div`
    width: 2rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 8px;

  button {
    border-radius: 12px;
    border: 1px solid rgba(255, 215, 0, 0.14);
    background: rgba(255, 215, 0, 0.08);
    color: rgba(255, 215, 0, 0.92);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:active {
      transform: scale(0.98);
    }
  }
`;

const Select = styled.select`
  height: 48px;
  border-radius: 14px;
  border: 1px solid rgba(255, 215, 0, 0.10);
  background: rgba(255, 255, 255, 0.04);
  color: ${colors.light};
  padding: 0 12px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: rgba(255, 215, 0, 0.35);
    box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.10);
    background: rgba(255, 255, 255, 0.06);
  }

  option {
    color: #111;
  }
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

interface ShoppingListAddProps {
    onItemAdded?: (item: ShoppingListItem) => void;
}

const ShoppingListAdd: React.FC<ShoppingListAddProps> = ({ onItemAdded }) => {
    const [name, setName] = useState("");
    const [qty, setQty] = useState<string>("1");
    const [unit, setUnit] = useState<string>("pcs");
    const [saving, setSaving] = useState(false);
    const [flashing, setFlashing] = useState(false);

    const parsedQty = useMemo(() => {
        if (qty.trim() === "") return undefined;
        const n = Number(qty.replace(",", "."));
        if (Number.isNaN(n)) return undefined;
        if (n <= 0) return undefined;
        return n;
    }, [qty]);

    const canSubmit = useMemo(() => {
        return name.trim().length > 0 && !saving;
    }, [name, saving]);

    const handleFlash = () => {
        setFlashing(true);
        setTimeout(() => setFlashing(false), 180);
    };

    const bumpQty = (delta: number) => {
        const current = parsedQty ?? 1;
        const next = Math.max(1, Math.round((current + delta) * 100) / 100);
        setQty(String(next));
    };

    const handleAdd = async () => {
        if (!name.trim()) return;

        handleFlash();
        setSaving(true);

        try {
            const payload: Partial<ShoppingListItem> = {
                name: name.trim(),
                quantity: parsedQty ?? 1,
                unit: unit,
            };

            const addedItem = await addShoppingListItem(payload as ShoppingListItem);

            setName("");
            setQty("1");
            setUnit("pcs");
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
                        placeholder="Legg til listen..."
                        autoComplete="off"
                        enterKeyHint="done"
                        disabled={saving}
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

                <RowBottom>
                    <QtyWrap>
                        <QtyInput
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            inputMode="decimal"
                            placeholder="Qty"
                            disabled={saving}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleAdd();
                            }}
                        />
                        <Stepper>
                            <button type="button" onClick={() => bumpQty(+1)} disabled={saving}>
                                +
                            </button>
                            <button type="button" onClick={() => bumpQty(-1)} disabled={saving}>
                                –
                            </button>
                        </Stepper>
                    </QtyWrap>

                    <Select value={unit} onChange={(e) => setUnit(e.target.value)} disabled={saving}>
                        <option value="pcs">pcs</option>
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="l">l</option>
                        <option value="ml">ml</option>
                        <option value="packs">packs</option>
                    </Select>
                </RowBottom>
            </Card>
        </Wrapper>
    );
};

export default ShoppingListAdd;
