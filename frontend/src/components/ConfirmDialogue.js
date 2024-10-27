import React from 'react';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 transition-transform transform hover:scale-105 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;