import React, { useState } from "react";
import { deleteShoppingListItem } from "../api/ShoppingListController";
import styled from "styled-components";

interface DeleteButtonProps {
    id: number;
    onDeleteSuccess: () => void;
}

const StyledDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  
`

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDeleteSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            await deleteShoppingListItem(id);
            onDeleteSuccess();
        } catch (err: unknown) {
            setError((err as Error).message  || "Failed to delete");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <StyledDeleteButton onClick={handleDelete} disabled={loading}>
                {loading ? "Deleting" : "x"}
            </StyledDeleteButton>
            {error && <span style={{ color: "red", marginLeft: 8 }}>{error}</span>}
        </>
    );
};

export default DeleteButton;
