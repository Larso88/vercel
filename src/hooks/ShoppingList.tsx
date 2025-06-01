import DeleteButton from "../components/DeleteShoppingItem.tsx";
import React from "react";
import styled from "styled-components";
import {ShoppingListItem} from "../api/ShoppingListController.ts";


interface ShoppingListProps {
    items: ShoppingListItem[];
    setItems: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>;
    loading: boolean;
}

const StyledUl = styled.ul`
  width: 600px ;
  list-style: none;
  
  @media(max-width: 768px) {
    width: 80%;
  }
`

const StyledListItem = styled.li`
  display: flex;
  gap: 2rem 1rem;
`

const StyledItemName = styled.h5`
  font-family: "Academy Engraved LET",sans-serif;
  font-size: 1.8rem;
  flex: 6;
  margin: 0.6rem 0;
  padding: 0;

  @media(max-width: 768px) {
    font-size: 1rem;
  }
`

const StyledQuantitySection = styled.div`
  width: 80px;
  display: flex;
  flex: 1;
  align-items: center;
  
`

const ShoppingList = ({ items, setItems, loading } : ShoppingListProps) => {
    if (loading) return <p>Loading shopping list...</p>;

    return (
        <div>
            <StyledUl>
                {items.map((item) => (
                    <StyledListItem key={item.id}>
                        <StyledItemName>{item.name}</StyledItemName>
                        <StyledQuantitySection>4</StyledQuantitySection>
                        <DeleteButton
                            id={item.id}
                            onDeleteSuccess={() => setItems(items.filter(i => i.id !== item.id))}
                        />
                    </StyledListItem>
                ))}
            </StyledUl>
        </div>
    );
}

export default ShoppingList;
