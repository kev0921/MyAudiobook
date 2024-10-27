import React, { useState } from 'react';
import { useAudiobooksContext } from '../hooks/useAudiobooksContext';
import deleteAudiobook from '../services/deleteAudiobook';
import { FaTrash } from 'react-icons/fa';
import ConfirmDialog from './ConfirmDialogue';

const DeleteAudiobookButton = ({ audiobook_id }) => {
    const { dispatch } = useAudiobooksContext();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteAudiobook(dispatch, audiobook_id);
        setIsDialogOpen(false);
    };

    const handleCancelDelete = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <button
                onClick={handleDeleteClick}
                className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
            >
                <FaTrash className="text-xl" />
            </button>
            {isDialogOpen && (
                <ConfirmDialog
                    message="Are you sure you want to delete this audiobook?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </>
    );
};

export default DeleteAudiobookButton;