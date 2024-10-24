import React from 'react';
import Audiobook from './Audiobook';
const AudiobooksList = ({ audiobooks }) => {
    return (
        <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Audiobooks</h2>
            <ul>
                {audiobooks.map((audiobook) => (
                    <li key={audiobook._id} className="p-4 mb-4 bg-white rounded-lg shadow-sm">
                        <Audiobook audiobook={audiobook} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AudiobooksList;