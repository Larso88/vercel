import React, { useState } from 'react';
import {addShoppingListItem, ShoppingListItem} from '../api/ShoppingListController.ts';
import styled from "styled-components";

const StyledInputWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledItemListInput = styled.input`
  width: 400px;
  height: 40px;
  text-align: center;
  font-size: 1.5rem;
`;
const StyledAddItemButton = styled.button`
  font-size: 1rem;
  background-color: transparent;
  border: 0;
  height: 50px;
  margin: 0px;
  padding: 0px;
  
  &:hover {
    border-radius: 8px;
    background-color: darkslategrey;
  }
`;

interface ShoppingListAddProps {
    onItemAdded?: (item: ShoppingListItem) => void;
}

const ShoppingListAdd: React.FC<ShoppingListAddProps> = ({ onItemAdded }) => {
    const [newItem, setNewItem] = useState<string>('');

    const handleAddItem = async () => {
        if (!newItem.trim()) return;
        try {
            const addedItem = await addShoppingListItem({ name: newItem  } as ShoppingListItem);
            setNewItem('');
            if (onItemAdded) onItemAdded(addedItem);
        } catch (error: unknown) {
            if(error instanceof Error) {
            console.error('Error adding item:', error);
            } else {
                console.error('Uknown error:', error)
            }
        }
    };

    return (
        <StyledInputWrapper>
            <StyledItemListInput
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add a new item"
            />
            <StyledAddItemButton onClick={handleAddItem}>Add Item</StyledAddItemButton>
        </StyledInputWrapper>
    );
};

export default ShoppingListAdd;
