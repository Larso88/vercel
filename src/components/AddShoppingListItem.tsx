import React, { useState } from 'react';
import {addShoppingListItem, ShoppingListItem} from '../api/ShoppingListController.ts';
import styled, {keyframes} from "styled-components";
import colors from '../assets/colors.ts';



const StyledInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const StyledItemListInput = styled.input`
  background-color: ${colors.platinum};
  color: ${colors.oxfordBlue};
  width: 400px;
  height: 40px;
  border-radius: 8px 0 0 8px;
  text-align: center;
  font-size: 1.5rem;
  border: 0;

  &:focus {
    outline: none;
    border: 0;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    background-color: ${colors.white};
  }
  
  @media(max-width: 768px) {
    width: 50%;
    height: 25px;
    font-size: 0.8rem;
  }

`;
const flash = keyframes`
  0% {
    background-color: ${colors.platinum};
  }
  50% {
    background-color: ${colors.oxfordBlue};
    color: ${colors.white};
  }
  100% {
    background-color: ${colors.platinum};
  }
`;

const StyledAddItemButton = styled.button<{ isFlashing: boolean }>`
  background-color: ${colors.platinum};
  color: ${colors.oxfordBlue};
  display: flex;
  font-size: 1.8rem;
  justify-content: center;
  border: 0;
  border-radius: 0 8px 8px 0;
  height:42px;
  width: 60px;
  margin: 0;
  padding: 0px;
  align-items: center;
  
  &:hover {
    background-color: white;
  }
  
  animation: ${({ isFlashing }) => (isFlashing ? flash : 'none')} 0.3s ease-in-out;
  
  @media(max-width: 768px) {
    font-size: 0.8rem;
    width: 30px;
    height: 27px;
  }
`;

interface ShoppingListAddProps {
    onItemAdded?: (item: ShoppingListItem) => void;
}

const ShoppingListAdd: React.FC<ShoppingListAddProps> = ({ onItemAdded }) => {
    const [newItem, setNewItem] = useState<string>('');
    const [isFlashing, setIsFlashing] = useState(false);

    const handleFlash = () => {
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 300);
    };

    const handleAddItem = async () => {
        handleFlash()
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
            <StyledAddItemButton onClick={handleAddItem} isFlashing={isFlashing}>+</StyledAddItemButton>
        </StyledInputWrapper>
    );
};

export default ShoppingListAdd;
