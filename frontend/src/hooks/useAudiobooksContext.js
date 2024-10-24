import { AudiobooksContext } from '../context/AudiobooksContext'
import { useContext } from 'react'

export const useAudiobooksContext = () => {
    const context = useContext(AudiobooksContext)

    if (!context) {
        throw Error('useAudiobooksContext must be used inside a AudiobooksContextProvider')
    }

    return context
}