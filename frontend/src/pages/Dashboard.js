import React, { useState, useEffect } from 'react';
import AudiobooksList from '../components/AudiobooksList';
import { useAudiobooksContext } from '../hooks/useAudiobooksContext';
import fetchAudiobooks from '../services/fetchAudiobooks';
import AddAudiobookButton from '../components/AddAudiobookButton';

const Dashboard = () => {
    const { dispatch } = useAudiobooksContext();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        fetchAudiobooks(dispatch);
    }, [dispatch]);

    return (
        <div className="relative min-h-screen">
            <AudiobooksList />
            <AddAudiobookButton />
        </div>
    );
};

export default Dashboard;