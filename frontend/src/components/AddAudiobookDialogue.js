import React, { useState } from 'react';
import { useAudiobooksContext } from '../hooks/useAudiobooksContext';
import addAudiobook from '../services/addAudiobook';

const AddAudiobookDialog = ({ onCancel }) => {
    const { audiobooks, dispatch } = useAudiobooksContext();
    const [audiobookName, setAudiobookName] = useState('');
    const [audioText, setAudioText] = useState('');
    const [error, setError] = useState('');

    const save = () => {
        const existingAudiobook = audiobooks.find(
            (audiobook) => audiobook.name === audiobookName || audiobook.audioText === audioText
        );

        if (existingAudiobook) {
            setError('An audiobook with the same name or text already exists.');
            return;
        }

        addAudiobook(audioText, audiobookName, dispatch);
        onCancel();
    };

    const isSaveDisabled = !audiobookName || !audioText;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[38rem]">
                <h2 className="text-xl font-bold mb-4">Add Audiobook</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    type="text"
                    placeholder="Enter audiobook name"
                    value={audiobookName}
                    onChange={(e) => setAudiobookName(e.target.value)}
                />
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    rows="8"
                    placeholder="Enter audiobook text"
                    value={audioText}
                    onChange={(e) => setAudioText(e.target.value)}
                ></textarea>
                <div className="flex justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 transition-transform transform hover:scale-105 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={save}
                        disabled={isSaveDisabled}
                        className={`px-4 py-2 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
                            isSaveDisabled
                                ? 'bg-blue-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400'
                        }`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAudiobookDialog;