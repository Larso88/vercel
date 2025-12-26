import React from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import colors from "../assets/colors";

type SidePagerProps = {
    children: React.ReactNode;
    onPrev: () => void;
    onNext: () => void;
    prevDisabled?: boolean;
    nextDisabled?: boolean;
    withFades?: boolean;
    label?: string;
};

const Stage = styled.div`
  width: 100%;
  max-width: 820px;
  position: relative;
  margin: 8px auto 0;
`;

const Content = styled.div`
  padding: 0 58px; 

  @media (max-width: 768px) {
    padding: 0 2.5rem;
  }
`;

const Fade = styled.div<{ side: "left" | "right" }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ side }) => (side === "left" ? "left: 0;" : "right: 0;")}
  width: 58px;
  pointer-events: none;
  z-index: 1;

  background: ${({ side }) =>
    side === "left"
        ? "linear-gradient(to right, rgba(18,18,18,0.88), rgba(18,18,18,0))"
        : "linear-gradient(to left, rgba(18,18,18,0.88), rgba(18,18,18,0))"};
`;

const Button = styled.button<{ side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ side }) => (side === "left" ? "left: 8px;" : "right: 8px;")}
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  border-radius: 16px;

  display: grid;
  place-items: center;
  z-index: 5;

  background: rgba(20, 20, 20, 0.55);
  border: 1px solid rgba(255, 215, 0, 0.14);
  color: ${colors.light};

  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:active {
    transform: translateY(-50%) scale(0.98);
  }

  &:disabled {
    opacity: 0.25;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

export default function SidePager({
                                      children,
                                      onPrev,
                                      onNext,
                                      prevDisabled = false,
                                      nextDisabled = false,
                                      withFades = true,
                                      label = "List",
                                  }: SidePagerProps) {
    return (
        <Stage>
            {withFades && (
                <>
                    <Fade side="left" />
                    <Fade side="right" />
                </>
            )}

            <Button
                side="left"
                type="button"
                onClick={onPrev}
                disabled={prevDisabled}
                aria-label={`Previous ${label}`}
            >
                <ChevronLeft />
            </Button>

            <Button
                side="right"
                type="button"
                onClick={onNext}
                disabled={nextDisabled}
                aria-label={`Next ${label}`}
            >
                <ChevronRight />
            </Button>

            <Content>{children}</Content>
        </Stage>
    );
}
