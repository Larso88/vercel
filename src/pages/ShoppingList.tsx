import FetchShoppingListComponent from "../hooks/ShoppingList.tsx";
import {fetchShoppingList, ShoppingListItem} from "../api/ShoppingListController.ts";
import AddShoppingListItem from "../components/AddShoppingListItem.tsx";
import React, {JSX, useEffect, useState} from "react";
import styled from "styled-components";
import colors from "../assets/colors.ts";


const StyledShoppingListWrapper = styled.div`
  display: flex;
  justify-self: center;
  flex-direction: column;
  align-items: center;
  width: 85%;
  max-width: 1000px;
`
const ListHeader = styled.div`
  width: 700px;
  height: 40px;
  display: flex;
  justify-content: center;
  gap: 350px;
  border-bottom: 1px solid ${colors.offset};
  
  @media(max-width: 768px) {
    width: 70%;
    gap: 40%;
  }
`
const ListItemHeader = styled.h4`
    font-family: "Academy Engraved LET";
    font-size: 1.3rem;
    margin: 0;
    padding: 1rem;
  
`
const ListQuantityHeader = styled.h4`
  font-family: "Academy Engraved LET";
  font-size: 1.3rem;
  margin: 0;
  padding: 1rem;
`


export const ShoppingList : React.FC = () : JSX.Element => {
    const [items, setItems] = useState<ShoppingListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)
        fetchShoppingList().then(data => setItems(data));
        setLoading(false)
    }, []);

    const handleItemAdded = (addedItem: ShoppingListItem) => {
        setItems(prevItems => [...prevItems, addedItem]);
    };

    return    (
        <StyledShoppingListWrapper>
            <AddShoppingListItem onItemAdded={handleItemAdded} />
            <ListHeader>
                <ListItemHeader>Item</ListItemHeader>
                <ListQuantityHeader>quantity</ListQuantityHeader>
            </ListHeader>
            <FetchShoppingListComponent setItems={setItems} items={items} loading={loading} />
        </StyledShoppingListWrapper>)
}
export default ShoppingList;