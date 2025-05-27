import { useState } from 'react';
import { addShoppingListItem } from '../api/ShoppingListController.ts';
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


const ShoppingListAdd = ({ onItemAdded }) => {
    const [newItem, setNewItem] = useState('');

    const handleAddItem = async () => {
        if (!newItem.trim()) return;
        try {
            const addedItem = await addShoppingListItem({ name: newItem });
            setNewItem('');
            if (onItemAdded) onItemAdded(addedItem);
        } catch (error) {
            console.error('Error adding item:', error);
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
