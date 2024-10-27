const deleteAudiobook = async (dispatch, audiobook_id) => {
    try {
        const response = await fetch(`http://localhost:5001/api/audiobooks/${audiobook_id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete audiobook');
        }
        if (response.ok) {
            dispatch({ type: 'DELETE_AUDIOBOOK', payload: audiobook_id });
          } else {
            console.error('Server returned an error:', response.status);
          }

        console.log('Audiobook deleted');
    } catch (error) {
        console.error('Error deleting audiobook:', error);
    }
};

export default deleteAudiobook;