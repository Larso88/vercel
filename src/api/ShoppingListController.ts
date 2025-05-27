import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/shoppinglist';

export const fetchShoppingList = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching shopping list:', error);
        throw error;
    }
};

export const addShoppingListItem = async (item) => {
    try {
        const response = await axios.post(BASE_URL, item, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding item:', error);
        throw error;
    }
};

export const deleteShoppingListItem = async (itemId) => {
    try {
        await axios.delete(`${BASE_URL}/${itemId}`);
    } catch (error) {
        // Log more details about the error
        if (error.response) {
            // Server responded with a non-2xx status code
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to delete item');
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response from server:', error.request);
            throw new Error('No response from server');
        } else {
            // Something else happened
            console.error('Error:', error.message);
            throw new Error(error.message);
        }
    }
};
