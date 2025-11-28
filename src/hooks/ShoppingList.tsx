// ShoppingList.tsx
import DeleteButton from "../components/DeleteShoppingItem.tsx";
import React from "react";
import styled, { keyframes } from "styled-components";
import { ShoppingListItem } from "../api/ShoppingListController.ts";

interface ShoppingListProps {
    items: ShoppingListItem[];
    setItems: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>;
    loading: boolean;
}

// tokens – adjust the accent to what you like
const cardBg = "#1b1b1b";
const keyline = "rgba(255,255,255,0.06)";
const shadow = "rgba(0,0,0,0.35)";
const text = "rgba(255,255,255,0.9)";
const sub  = "rgba(255,255,255,0.6)";
const accent = "#42d4c8"; // <- pick your brand cyan/teal here

const tap = keyframes`
    from { transform: scale(0.98); }
    to   { transform: scale(1); }
`;


const StyledUl = styled.ul`
    width: 100%;
    max-width: 760px;
    list-style: none;
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (max-width: 768px) {
        padding: 0 12px;
    }
`;

const StyledListItem = styled.li`
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;

    border: none;
    border-radius: 14px;
    background: ${cardBg};
    outline: 1px solid ${keyline};
    box-shadow: 0 6px 18px ${shadow};
    padding: 12px 14px;
    padding-right: 48px;

    color: ${text};

    /* 🔧 ensure pseudo-element is clipped to the rounded corners */
    overflow: hidden;

    /* left accent – now clipped correctly and inherits the radius */
    &::before {
        content: "";
        position: absolute;
        inset: 0 auto 0 0;     /* top:0 right:auto bottom:0 left:0 */
        width: 5px;
        border-radius: inherit; /* <- keep corners perfect */
        /* monochrome base with a whisper of accent */
        background: linear-gradient(
                180deg,
                rgba(255,255,255,0.06),
                rgba(255,255,255,0.18)
        ), linear-gradient(180deg, ${accent}, ${accent});
        background-blend-mode: soft-light, normal;
        opacity: 0.9;
    }

    &:active { transform: scale(0.985); }
`;


const StyledItemName = styled.h5`
    font-family: "Academy Engraved LET", sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    flex: 1 1 auto;
    margin: 0;
    color: ${text};
    letter-spacing: 0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    /* tiny accent underline to tie into your header line */
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: ${accent}22; /* very faint */
    text-decoration-thickness: 1px;

    @media (max-width: 768px) { font-size: 1.05rem; }
`;

const StyledQuantitySection = styled.div`
    width: 56px;
    height: 32px;
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
    outline: 1px solid ${keyline};
    color: ${text};
    font-weight: 800;
    letter-spacing: 0.02em;

    /* a hair of accent to make the “0/4” pop */
    box-shadow: inset 0 0 0 1px ${accent}1a;
`;

const StyledDeleteSlot = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(255, 255, 255, 0.06);
  outline: 1px solid ${keyline};
  border-radius: 10px;
  padding: 2px;
`;

const LoadingWrap = styled.p`
  padding: 12px;
  text-align: center;
  color: ${text};
  opacity: 0.8;
`;


const ShoppingList: React.FC<ShoppingListProps> = ({ items, setItems, loading }) => {
    if (loading) return <LoadingWrap>Loading shopping list…</LoadingWrap>;

    return (
        <div>
            <StyledUl>
                {items.map((item) => (
                    <StyledListItem key={item.id}>
                        <StyledItemName>{item.name}</StyledItemName>
                        <StyledQuantitySection>{item.quantity ?? 4}</StyledQuantitySection>

                        <StyledDeleteSlot>
                            <DeleteButton
                                id={item.id}
                                onDeleteSuccess={() =>
                                    setItems((prev) => prev.filter((i) => i.id !== item.id))
                                }
                            />
                        </StyledDeleteSlot>
                    </StyledListItem>
                ))}
            </StyledUl>
        </div>
    );
};

export default ShoppingList;
