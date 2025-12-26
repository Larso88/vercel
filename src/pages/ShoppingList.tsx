import {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {deleteShoppingListItem, fetchShoppingList, type ShoppingListItem} from "../api/ShoppingListController";
import AddShoppingListItem from "../components/AddShoppingListItem";
import {Loader2} from "lucide-react";
import SidePager from "../components/SidePager";
import SwipeableListItem from "../components/SwipeableListItem";
import colors from "../assets/colors.ts";

const keyline = "rgba(255,255,255,0.06)";
const shadow = "rgba(0,0,0,0.35)";
const text = "rgba(255,255,255,0.9)";

const Page = styled.div`
    width: 100%;
    max-width: 760px;
    margin: 0 auto;
`;

const Panel = styled.div`
    width: 100%;
    border-radius: 18px;
    background: radial-gradient(1200px 240px at 20% -30%, rgba(255, 255, 255, 0.06), transparent 60%),
        linear-gradient(180deg, rgba(18, 18, 18, 0.92), rgba(12, 12, 12, 0.92));
    outline: 1px solid ${keyline};
    box-shadow: 0 12px 34px ${shadow};
    
`;

const HeaderRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 64px;
    align-items: center;
    padding: 6px 10px 10px;
    color: rgba(255, 255, 255, 0.72);
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-bottom: 1px solid ${keyline};
`;

const HeaderCell = styled.div<{ align?: "left" | "right" }>`
    text-align: ${({ align }) => align ?? "left"};
`;

const StyledUl = styled.ul`
    justify-content: center;
    width: 100%;
    list-style: none;
    padding: 12px 0 0 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    
`;

const Name = styled.div`
    font-family: "Academy Engraved LET", system-ui, sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    flex: 1 1 auto;
    margin: 0;
    color: ${text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const QtyPill = styled.div`
    width: 64px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.06);
    outline: 1px solid ${keyline};
    color: ${colors.offset};
    font-weight: 800;
    letter-spacing: 0.02em;
`;

const RowContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 0 10px;
`;

const Spinner = styled(Loader2)`
    color: ${colors.offset};
    animation: ${spin} 1s linear infinite;
    opacity: 0.8;
`;

export default function ShoppingList() {
    const [items, setItems] = useState<ShoppingListItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const data = await fetchShoppingList();
                if (!cancelled) setItems(data as ShoppingListItem[]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const handleItemAdded = (addedItem: ShoppingListItem) => setItems((prev) => [...prev, addedItem]);

    const handleDelete = async (id: number) => {
        await deleteShoppingListItem(id);
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    return (
        <Page>
            <AddShoppingListItem onItemAdded={handleItemAdded} />

            <SidePager
                label="Liste"
                onPrev={() => console.log("prev list")}
                onNext={() => console.log("next list")}
                prevDisabled
                nextDisabled
            >
                <Panel className="test2">
                    <HeaderRow>
                        <HeaderCell>Vare</HeaderCell>
                        <HeaderCell align="right">Ant.</HeaderCell>
                    </HeaderRow>

                    {loading ? (
                        <LoaderWrapper>
                            <Spinner size={28} strokeWidth={2} />
                        </LoaderWrapper>
                    ) : (
                        <StyledUl className="test1">
                            {items.map((item) => (
                                <SwipeableListItem key={item.id} onDelete={() => handleDelete(item.id)}>
                                    <RowContent>
                                        <Name>{item.name}</Name>
                                        <QtyPill>{item.quantity ?? 1}</QtyPill>
                                    </RowContent>
                                </SwipeableListItem>
                            ))}
                        </StyledUl>
                    )}
                </Panel>
            </SidePager>
        </Page>
    );
}
