import React from 'react';

const Audiobook = ({ audiobook }) => {
    const playAudio = async () => {
        try {
            const response = await fetch(`/api/audiobooks/${audiobook._id}/speech`);

            if (!response.ok) {
                throw new Error('Failed to fetch audio');
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            // Instead of using a JavaScript Audio object, try using the HTML audio element:
            const audioElement = document.createElement('audio');
            audioElement.src = audioUrl;
            audioElement.controls = true;
            document.body.appendChild(audioElement); // Add to the DOM for testing
            audioElement.play();
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    return (
        <div>
            <h3>{audiobook.name}</h3>
            <p>{audiobook.audioText}</p>
            <button onClick={playAudio}>Listen</button>
        </div>
    );
};

export default Audiobook;