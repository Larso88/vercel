import axios from "axios";
import keycloak from "../auth/keycloak";

export interface ShoppingList {
    id: number;
    ownerUserId: string;
    name: string;
    createdAt: string;
}

export interface ShoppingListItem {
    id: number;
    shoppingListId: number;
    name: string;
    quantity: number;
    createdAt: string;
}

export type ShoppingListsResponse = ShoppingList[];
export type ShoppingListItemsResponse = ShoppingListItem[];


const API_ORIGIN =
    (import.meta.env.VITE_REACT_APP_SHOPPING_LIST_API_URL as string) ||
    "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: API_ORIGIN,
    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.request.use(async (config) => {
    if (keycloak.authenticated) {
        try {
            await keycloak.updateToken(30);
        } catch (err) {
            console.warn("Keycloak token refresh failed:", err);
        }

        if (keycloak.token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${keycloak.token}`;
        }
    }

    return config;
});


export const fetchLists = async (): Promise<ShoppingListsResponse> => {
    try {
        const response = await axiosInstance.get<ShoppingListsResponse>("/api/lists");
        return response.data;
    } catch (error) {
        console.error("Error fetching lists:", error);
        throw error;
    }
};

export const createList = async (name: string): Promise<ShoppingList> => {
    try {
        const payload = { name: name.trim() };
        const response = await axiosInstance.post<ShoppingList>("/api/lists", payload);
        return response.data;
    } catch (error) {
        console.error("Error creating list:", error);
        throw error;
    }
};

export const deleteList = async (listId: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/api/lists/${listId}`);
    } catch (error: any) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            throw new Error(error.response.data?.message || "Failed to delete list");
        } else if (error.request) {
            console.error("No response from server:", error.request);
            throw new Error("No response from server");
        } else {
            console.error("Error:", error.message);
            throw new Error(error.message);
        }
    }
};


export const fetchItems = async (listId: number): Promise<ShoppingListItemsResponse> => {
    try {
        const response = await axiosInstance.get<ShoppingListItemsResponse>(
            `/api/lists/${listId}/items`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
};

export const addShoppingListItem = async (
    listId: number,
    item: Pick<ShoppingListItem, "name" | "quantity">
): Promise<ShoppingListItem> => {
    try {
        const payload = {
            name: item.name.trim(),
            quantity: item.quantity,
        };

        const response = await axiosInstance.post<ShoppingListItem>(
            `/api/lists/${listId}/items`,
            payload
        );
        return response.data;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};

export const deleteShoppingListItem = async (listId: number, itemId: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/api/lists/${listId}/items/${itemId}`);
    } catch (error: any) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            throw new Error(error.response.data?.message || "Failed to delete item");
        } else if (error.request) {
            console.error("No response from server:", error.request);
            throw new Error("No response from server");
        } else {
            console.error("Error:", error.message);
            throw new Error(error.message);
        }
    }
};
