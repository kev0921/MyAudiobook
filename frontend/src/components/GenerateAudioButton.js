import React from "react";
import { useAudiobooksContext } from "../hooks/useAudiobooksContext";
import generateAudio from "../services/generateAudio";

const GenerateAudioButton = ({ audiobook }) => {
    const { dispatch } = useAudiobooksContext();

    const handleClick = async () => {
        try {
            await generateAudio(audiobook, dispatch);
        } catch (error) {
            console.error("Error generating audio:", error);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
            Generate
        </button>
    );
}

export default GenerateAudioButton;