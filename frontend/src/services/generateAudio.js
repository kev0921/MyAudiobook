const generateAudio = async (audiobook, dispatch) => {
    try {
        if (audiobook.audioFilePath) {
            console.log('Audio already loaded');
        } else {
            console.log('Fetching audio...');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/audiobooks/${audiobook._id}/speech`);

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

export default generateAudio;