import React, { useState, useEffect } from 'react';
import AudiobookPlayer from './AudiobookPlayer';
import { useAudiobooksContext } from '../hooks/useAudiobooksContext';

const Audiobook = ({ audiobook_id }) => {
    const { audiobooks, dispatch } = useAudiobooksContext();
    const audiobook = audiobooks.find((audiobook) => audiobook._id == audiobook_id)

    const generateAudio = async () => {
        try {
            if (audiobook.audioFilePath) {
                console.log('Audio already loaded');
            } else {
                console.log('Fetching audio...');
                const response = await fetch(`http://localhost:5001/api/audiobooks/${audiobook._id}/speech`);

                if (!response.ok) {
                    throw new Error('Failed to fetch audio');
                }
                const audioBlob = await response.blob();
                const url = URL.createObjectURL(audioBlob);
                console.log('Setting audio URL from fetch:', url);

                dispatch({
                    type: 'UPDATE_AUDIOBOOK',
                    payload: {
                        ...audiobook,
                        audioFilePath: url,
                    },
                });
            }
        } catch (error) {
            console.error('Error generating audio:', error);
        }
    };

    console.log('audiobook:', audiobook);
    return (
        <div className="p-8">
            <h3 className="block mt-1 text-lg leading-tight font-medium text-black">{audiobook.name}</h3>
            <p className="mt-2 text-gray-500">{audiobook.audioText}</p>
            {!audiobook.audioFilePath && (
                <button
                    onClick={generateAudio}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Generate
                </button>
            )}
            <AudiobookPlayer audiobook_id={audiobook_id} />
        </div>
    );
};

export default Audiobook;