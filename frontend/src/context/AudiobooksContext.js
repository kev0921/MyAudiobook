import React, { createContext, useReducer } from 'react';

export const AudiobooksContext = createContext(null);

const audiobooksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUDIOBOOKS':
      return { audiobooks: action.payload };
    case 'CREATE_AUDIOBOOK':
      return { audiobooks: [action.payload, ...state.audiobooks] };
    case 'DELETE_AUDIOBOOK':
      return { audiobooks: state.audiobooks.filter(audiobook => audiobook._id !== action.payload) };
    case 'UPDATE_AUDIOBOOK':
      return {
        audiobooks: state.audiobooks.map(audiobook =>
          audiobook._id === action.payload._id ? action.payload : audiobook
        ),
      };
    default:
      return state;
  }
};

export const AudiobooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(audiobooksReducer, { audiobooks: [] });

  return (
    <AudiobooksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AudiobooksContext.Provider>
  );
};