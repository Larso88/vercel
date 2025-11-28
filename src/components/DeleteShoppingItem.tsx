import React, { useState } from "react";
import { deleteShoppingListItem } from "../api/ShoppingListController";
import styled from "styled-components";
import {X} from "lucide-react";

interface DeleteButtonProps {
    id: number;
    onDeleteSuccess: () => void;
}

const StyledDeleteButton = styled.button`
    position: absolute;
    top: -9px;
    right: -9px;
    border: none;
    border-right: 1px solid grey;
    border-top: 1px solid grey;
    background-color: transparent;
    border-radius: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background: #f7f7f7;
    }
`;

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
                {loading ? "Deleting" : <X size={14} strokeWidth={2} /> }
            </StyledDeleteButton>
            {error && <span style={{ color: "red", marginLeft: 8 }}>{error}</span>}
        </>
    );
};

export default DeleteButton;
