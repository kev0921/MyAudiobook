import React, { useEffect, useRef, useState } from 'react';
import { useAudiobooksContext } from '../hooks/useAudiobooksContext';

const AudiobookPlayer = ({ audiobook_id }) => {
    const { audiobooks } = useAudiobooksContext();
    const audiobook = audiobooks.find((audiobook) => audiobook._id == audiobook_id);
    const audioRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState('');

    useEffect(() => {
        if (audioRef.current && audiobook.audioFilePath) {
            fetch(audiobook.audioFilePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    console.log('Setting audio source to:', url);
                    setAudioUrl(url);
                    audioRef.current.src = url;
                    audioRef.current.load();
                })
                .catch(error => {
                    console.error('Error fetching audio file:', error);
                });
        }
    }, [audiobook.audioFilePath]);

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4 p-6">
            <audio ref={audioRef} controls className="w-full">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudiobookPlayer;