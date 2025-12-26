import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import { Trash2 } from "lucide-react";
import colors from "../assets/colors.ts";

const cardBg = "#1b1b1b";
const keyline = "rgba(255,255,255,0.06)";
const shadow = "rgba(0,0,0,0.35)";
const text = "rgba(255,255,255,0.9)";

const Shell = styled.li`
    width: 80%;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    height: 42px;
    border-radius: 14px;
    overflow: hidden;
    outline: 1px solid ${keyline};
    box-shadow: 0 6px 18px ${shadow};
    touch-action: pan-y; 
`;

const Actions = styled.button<{ width: number }>`
    position: absolute;
    inset: 0 0 0 auto;
    width: ${({ width }) => width}px;
    display: grid;
    place-items: center;
    background: linear-gradient(180deg, ${colors.lightPrimary}, ${colors.offset});
    color: white;
    font-weight: 700;
    border: 0;
    cursor: pointer;
`;

const DeleteHint = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.95rem;
`;

const Card = styled.div<{ x: number; dragging: boolean }>`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;

    background: ${cardBg};
    color: ${text};

    transform: translateX(${({ x }) => x}px);
    transition: ${({ dragging }) => (dragging ? "none" : "transform .12s ease")};

    background-image: radial-gradient(
            1200px 220px at 30% -40%,
            rgba(255, 255, 255, 0.06),
            transparent 55%
    );

    &::before {
        content: "";
        position: absolute;
        inset: 0 auto 0 0;
        width: 5px;
        border-radius: inherit;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.18)),
        linear-gradient(180deg, ${colors.offset}, ${colors.secondary});
        background-blend-mode: soft-light, normal;
        opacity: 0.9;
    }
`;

type Props = {
    deleteWidth?: number;
    onDelete: () => void;
    children: React.ReactNode;
};

export default function SwipeableListItem({ deleteWidth = 92, onDelete, children }: Props) {
    const [x, setX] = useState(0);
    const [dragging, setDragging] = useState(false);
    const openRef = useRef(false);

    const clamp = (n: number) => Math.max(-deleteWidth, Math.min(0, n));

    const handlers = useSwipeable({
        onSwiping: (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                setDragging(true);
                setX(clamp(-e.deltaX));
            }
        },
        onSwipedLeft: (e) => {
            setDragging(false);
            const shouldOpen = Math.abs(e.deltaX) > deleteWidth * 0.5;
            openRef.current = shouldOpen;
            setX(shouldOpen ? -deleteWidth : 0);
        },
        onSwipedRight: () => {
            setDragging(false);
            openRef.current = false;
            setX(0);
        },
        preventScrollOnSwipe: true,
        trackMouse: false,
    });

    const onCardClick = () => {
        if (openRef.current && !dragging) {
            openRef.current = false;
            setX(0);
        }
    };

    return (
        <Shell {...handlers}>
            <Actions width={deleteWidth} onClick={onDelete} aria-label="Delete item">
                <DeleteHint>
                    <Trash2 size={18} /> Slett
                </DeleteHint>
            </Actions>
            <Card x={x} dragging={dragging} onClick={onCardClick}>
                {children}
            </Card>
        </Shell>
    );
}
