import React from 'react';
import AudiobookPlayer from './AudiobookPlayer';
import { useAudiobooksContext } from '../hooks/useAudiobooksContext';
import DeleteAudiobookButton from './DeleteAudiobookButton';
import GenerateAudioButton from './GenerateAudioButton';

const Audiobook = ({ audiobook_id }) => {
    const { audiobooks } = useAudiobooksContext();
    const audiobook = audiobooks.find((audiobook) => audiobook._id === audiobook_id);

    return (
        <div className="relative p-8">
            <DeleteAudiobookButton audiobook_id={audiobook_id} />
            <h3 className="block mt-1 text-lg leading-tight font-medium text-black">{audiobook.name}</h3>
            <p className="mt-2 text-gray-500 line-clamp-2">{audiobook.audioText}</p>
            {!audiobook.audioFilePath && (
                <GenerateAudioButton audiobook={audiobook} />
            )}
            <AudiobookPlayer audiobook_id={audiobook_id} />
        </div>
    );
};

export default Audiobook;