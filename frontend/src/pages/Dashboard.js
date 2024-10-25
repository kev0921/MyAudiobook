import React, { useEffect } from 'react';
import AudiobooksList from '../components/AudiobooksList';
import { useAudiobooksContext } from '../hooks/useAudiobooksContext';

const Dashboard = () => {
    const { audiobooks, dispatch } = useAudiobooksContext();

    useEffect(() => {
        const fetchAudiobooks = async () => {
            try {
                const response = await fetch('/api/audiobooks');

                // Log the full response object
                console.log("Full response:", response);

                // Check content-type
                const contentType = response.headers.get('content-type');
                console.log("Content-Type:", contentType);

                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Received non-JSON response');
                }

                // Log the response text if content-type check fails
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

        fetchAudiobooks();
    }, [dispatch]);

    return (
        <div>
            <AudiobooksList />
        </div>
    );
};

export default Dashboard;