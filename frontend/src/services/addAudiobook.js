import { v4 as uuidv4 } from 'uuid';

const saveAudiobook = async (newAudiobook) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/audiobooks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAudiobook),
        });

        if (!response.ok) {
            throw new Error('Failed to save audiobook');
        }

        const savedAudiobook = await response.json();
        console.log('Audiobook successfully saved!');
        return savedAudiobook;
    } catch (error) {
        console.error('Error saving audiobook:', error);
        throw error;
    }
};

const addAudiobook = async (audioText, audiobookName, dispatch) => {
    console.log('New audiobook text:', audioText);

    const newAudiobook = {
        _id: uuidv4(),
        name: audiobookName,
        audioText: audioText,
        audioFilePath: '',
        createdAt: new Date(),
    };

    try {
        const savedAudiobook = await saveAudiobook(newAudiobook);
        dispatch({ type: 'CREATE_AUDIOBOOK', payload: savedAudiobook });
    } catch (error) {
        console.error('Error in handleSave:', error);
    }
};

export default addAudiobook;