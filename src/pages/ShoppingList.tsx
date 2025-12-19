import { useEffect, useState, type ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import colors from "../assets/colors";
import {
    fetchShoppingList,
    deleteShoppingListItem,
    type ShoppingListItem,
} from "../api/ShoppingListController";
import AddShoppingListItem from "../components/AddShoppingListItem";
import { useSwipeable } from "react-swipeable";
import {Loader2} from "lucide-react";


const StyledShoppingListWrapper = styled.div`
    display: flex;
    justify-self: center;
    flex-direction: column;
    align-items: center;
    width: 85%;
    max-width: 1000px;
`;

const ListHeader = styled.div`
    width: 700px;
    height: 40px;
    display: flex;
    justify-content: center;
    gap: 350px;
    border-bottom: 1px solid ${colors.offset};

    @media (max-width: 768px) {
        width: 70%;
        gap: 40%;
    }
`;

const ListItemHeader = styled.h4`
    font-family: "Academy Engraved LET";
    font-size: 1.3rem;
    margin: 0;
    padding: 1rem;
`;

const ListQuantityHeader = styled.h4`
    font-family: "Academy Engraved LET";
    font-size: 1.3rem;
    margin: 0;
    padding: 1rem;
`;


const cardBg = "#1b1b1b";
const keyline = "rgba(255,255,255,0.06)";
const shadow = "rgba(0,0,0,0.35)";
const text = "rgba(255,255,255,0.9)";
const accent = "#42d4c8";

const StyledUl = styled.ul`
    width: 100%;
    max-width: 760px;
    list-style: none;
    padding: 0;
    margin: 10px auto 0;
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (max-width: 768px) {
        padding: 0 12px;
    }
`;

const tap = keyframes`
    from { transform: scale(0.98); }
    to   { transform: scale(1); }
`;

const RowShell = styled.li`
    position: relative;
    height: 56px;
    border-radius: 14px;
    overflow: hidden;
    outline: 1px solid ${keyline};
    box-shadow: 0 6px 18px ${shadow};
`;

const Actions = styled.div<{ width: number }>`
    position: absolute;
    inset: 0 0 0 auto;
    width: ${({ width }) => width}px;
    display: grid;
    place-items: center;
    background: #b02020;
    color: white;
    font-weight: 700;
    user-select: none;
`;

const Card = styled.div<{ x: number; dragging: boolean }>`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    padding-right: 14px;

    background: ${cardBg};
    color: ${text};
    transform: translateX(${({ x }) => x}px);
    transition: ${({ dragging }) => (dragging ? "none" : "transform .12s ease")};
    animation: ${tap} 0.12s ease;

    &::before {
        content: "";
        position: absolute;
        inset: 0 auto 0 0;
        width: 5px;
        border-radius: inherit;
        background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0.06),
                rgba(255, 255, 255, 0.18)
        ),
        linear-gradient(180deg, ${accent}, ${accent});
        background-blend-mode: soft-light, normal;
        opacity: 0.9;
    }

    &:active {
        transform: translateX(${({ x }) => x}px) scale(0.985);
    }
`;

const Name = styled.h5`
    font-family: "Academy Engraved LET", sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    flex: 1 1 auto;
    margin: 0;
    color: ${text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
        font-size: 1.05rem;
    }
`;

const QtyPill = styled.div`
    width: 56px;
    height: 32px;
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.06);
    outline: 1px solid ${keyline};
    color: ${text};
    font-weight: 800;
    letter-spacing: 0.02em;
    box-shadow: inset 0 0 0 1px ${accent}1a;
`;
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const Spinner = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
  opacity: 0.8;
`;


type SwipeableRowProps = {
    children: ReactNode;
    onDelete: () => void;
    deleteWidth?: number;
};

function SwipeableRow({ children, onDelete, deleteWidth = 88 }: SwipeableRowProps) {
    const [x, setX] = useState<number>(0);
    const [dragging, setDragging] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

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
            setOpen(shouldOpen);
            setX(shouldOpen ? -deleteWidth : 0);
        },
        onSwipedRight: () => {
            setDragging(false);
            setOpen(false);
            setX(0);
        },
        preventScrollOnSwipe: true,
        trackMouse: false,
    });

    const handleActionClick = () => onDelete();

    const handleCardClick = () => {
        if (open && !dragging) {
            setOpen(false);
            setX(0);
        }
    };

    return (
        <RowShell {...handlers}>
            <Actions width={deleteWidth} onClick={handleActionClick}>
                Delete
            </Actions>
            <Card x={x} dragging={dragging} onClick={handleCardClick}>
                {children}
            </Card>
        </RowShell>
    );
}


export default function ShoppingList() {
    const [items, setItems] = useState<ShoppingListItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const data = await fetchShoppingList();
                if (!cancelled) {
                    setItems(data as ShoppingListItem[]);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const handleItemAdded = (addedItem: ShoppingListItem) => {
        setItems((prev) => [...prev, addedItem]);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteShoppingListItem(id);
            setItems((prev) => prev.filter((i) => i.id !== id));
        } catch (e) {
            console.error("Delete failed", e);
        }
    };

    return (
        <StyledShoppingListWrapper>
            <AddShoppingListItem onItemAdded={handleItemAdded} />

            <ListHeader>
                <ListItemHeader>Item</ListItemHeader>
                <ListQuantityHeader>quantity</ListQuantityHeader>
            </ListHeader>

            {loading ? (
                <LoaderWrapper>
                    <Spinner size={32} strokeWidth={2} />
                </LoaderWrapper>
            ) : (
                <StyledUl>
                    {items.map((item) => (
                        <SwipeableRow key={item.id} onDelete={() => handleDelete(item.id)}>
                            <Name>{item.name}</Name>
                            <QtyPill>{item.quantity ?? 0}</QtyPill>
                        </SwipeableRow>
                    ))}
                </StyledUl>
            )}
        </StyledShoppingListWrapper>
    );
}
