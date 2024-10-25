import React, { useEffect, useRef } from 'react';
import { useAudiobooksContext } from '../hooks/useAudiobooksContext';

const AudiobookPlayer = ({ audiobook_id }) => {
    const { audiobooks } = useAudiobooksContext();
    const audiobook = audiobooks.find((audiobook) => audiobook._id == audiobook_id);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current && audiobook.audioFilePath) {
            audioRef.current.src = audiobook.audioFilePath;
            audioRef.current.load();
        }
    }, [audiobook.audioFilePath]);

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4 p-6">
            <audio ref={audioRef} controls className="w-full">
                <source src={audiobook.audioFilePath} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudiobookPlayer;