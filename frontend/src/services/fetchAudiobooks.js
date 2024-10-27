const fetchAudiobooks = async (dispatch) => {
    try {
      const response = await fetch('/api/audiobooks');
      
      const contentType = response.headers.get('content-type');
      console.log("Content-Type:", contentType);
  
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response');
      }
  
      const json = await response.json();
      console.log("Response JSON:", json);
  
      if (response.ok) {
        dispatch({ type: 'SET_AUDIOBOOKS', payload: json });
      } else {
        console.error('Server returned an error:', response.status);
      }
    } catch (error) {
      console.error('Error fetching audiobooks:', error);
    }
  };
  
  export default fetchAudiobooks;