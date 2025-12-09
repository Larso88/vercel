import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import { Trash2 } from "lucide-react";

/* same tokens you used */
const cardBg = "#1b1b1b";
const keyline = "rgba(255,255,255,0.06)";
const shadow = "rgba(0,0,0,0.35)";
const text = "rgba(255,255,255,0.9)";
const accent = "#42d4c8";

/* --- layout --- */

const Shell = styled.li`
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 56px; /* keeps rows consistent; adjust if you like */
  border-radius: 14px;
  overflow: hidden; /* clip corners (fixes the left accent) */
  outline: 1px solid ${keyline};
  box-shadow: 0 6px 18px ${shadow};
  background: transparent;
`;

const Actions = styled.div<{ width: number }>`
  position: absolute;
  inset: 0 0 0 auto;
  width: ${({ width }) => width}px;
  display: grid;
  place-items: center;
  background: #b02020; /* destructive area */
  color: white;
  font-weight: 700;
  user-select: none;
`;

const DeleteHint = styled.div`
  display: flex; align-items: center; gap: 8px;
  font-size: 0.95rem;
`;

const Card = styled.div<{ x: number }>`
  position: absolute; inset: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  padding-right: 48px; /* space for your X button, if you still keep it */

  border-radius: 14px;
  background: ${cardBg};
  color: ${text};

  transform: translateX(${({ x }) => x}px);
  transition: transform .12s ease; /* only used when we “settle” after swipe */

  /* left accent */
  &::before {
    content: "";
    position: absolute; inset: 0 auto 0 0; width: 5px;
    border-radius: inherit;
    background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.18)),
                linear-gradient(180deg, ${accent}, ${accent});
    background-blend-mode: soft-light, normal;
    opacity: .9;
  }
`;

type Props = {
    deleteWidth?: number;
    onDelete: () => void;
    children: React.ReactNode;
};

export default function SwipeableListItem({ deleteWidth = 88, onDelete, children }: Props) {
    const [x, setX] = useState(0);
    const openRef = useRef(false);
    const draggingRef = useRef(false);

    const clamp = (n: number) => Math.max(-deleteWidth, Math.min(0, n));

    const handlers = useSwipeable({
        onSwiping: (e) => {
            draggingRef.current = true;
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                setX(clamp(-e.deltaX));
            }
        },
        onSwipedLeft: (e) => {
            draggingRef.current = false;
            const shouldOpen = Math.abs(e.deltaX) > deleteWidth * 0.5;
            openRef.current = shouldOpen;
            setX(shouldOpen ? -deleteWidth : 0);
        },
        onSwipedRight: () => {
            draggingRef.current = false;
            openRef.current = false;
            setX(0);
        },
        trackMouse: false,
        preventScrollOnSwipe: true,
    });

    const handleActionClick = () => onDelete();

    const onCardClick = () => {
        if (openRef.current && !draggingRef.current) {
            openRef.current = false;
            setX(0);
            return;
        }
    };

    const cardStyle = useMemo(
        () => ({ transition: draggingRef.current ? "none" as const : undefined }),
        []
    );

    return (
        <Shell {...handlers}>
            <Actions width={deleteWidth} onClick={handleActionClick} aria-label="Delete item">
                <DeleteHint><Trash2 size={18} /> Delete</DeleteHint>
            </Actions>
            <Card x={x} style={cardStyle} onClick={onCardClick}>
                {children}
            </Card>
        </Shell>
    );
}
