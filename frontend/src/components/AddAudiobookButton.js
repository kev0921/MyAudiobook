import React, { useState } from 'react';
import { useAudiobooksContext } from '../hooks/useAudiobooksContext';
import AddAudiobookDialog from './AddAudiobookDialogue';
import addAudiobook from '../services/addAudiobook';
import { FaPlus } from 'react-icons/fa';

const AddAudiobookButton = () => {
    const { dispatch } = useAudiobooksContext();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddClick = () => {
        setIsDialogOpen(true);
    };

    const handleCancelAdd = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <button
                onClick={handleAddClick}
                className="fixed bottom-8 right-8 w-16 h-16 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center text-4xl transition-transform transform hover:scale-110"
            >
                <FaPlus className="text-2xl" />
            </button>
            {isDialogOpen && (
                <AddAudiobookDialog
                    onCancel={handleCancelAdd}
                />
            )}
        </>
    );
};

export default AddAudiobookButton;