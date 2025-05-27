import FetchShoppingListComponent from "../hooks/ShoppingList.tsx";
import { fetchShoppingList } from "../api/ShoppingListController.ts";
import AddShoppingListItem from "../components/AddShoppingListItem.tsx";
import { useEffect, useState } from "react";
import styled from "styled-components";


const StyledShoppingListWrapper = styled.div`
  display: flex;
  justify-self: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 1000px;
`
const ListHeader = styled.div`
  width: 700px;
  display: flex;
  justify-content: center;
  gap: 350px;
  border-bottom: 1px solid white;
`
const ListItemHeader = styled.h5`
  
`
const ListQuantityHeader = styled.h5`
  
`


export const ShoppingList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetchShoppingList().then(data => setItems(data));
        setLoading(false)
    }, []);

    const handleItemAdded = (addedItem) => {
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