import axios from 'axios';

export interface ShoppingListItem {
    id: number;
    name: string;
    quantity: number;
    purchased: boolean;
}

export type ShoppingListResponse = ShoppingListItem[];

const BASE_URL = import.meta.env.VITE_REACT_APP_SHOPPING_LIST_API_URL as string || 'http://localhost:8080/api/shoppinglist';


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const fetchShoppingList = async () : Promise<ShoppingListResponse> => {
    try {
        const response = await axiosInstance.get<ShoppingListResponse>('');
        return response.data as ShoppingListResponse;
    } catch (error) {
        console.error('Error fetching shopping list:', error);
        throw error;
    }
};

export const addShoppingListItem = async (item: Omit<ShoppingListItem, 'id'>) : Promise<ShoppingListItem> => {
    try {
        const response = await axiosInstance.post('', item);
        return response.data;
    } catch (error) {
        console.error('Error adding item:', error);
        throw error;
    }
};

export const deleteShoppingListItem = async (itemId: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/${itemId}`);
    } catch (error : any) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to delete item');
        } else if (error.request) {
            console.error('No response from server:', error.request);
            throw new Error('No response from server');
        } else {
            console.error('Error:', error.message);
            throw new Error(error.message);
        }
    }
};
