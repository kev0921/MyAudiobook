import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AudiobooksContextProvider } from './context/AudiobooksContext';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AudiobooksContextProvider>
      <App />
    </AudiobooksContextProvider>
  </React.StrictMode>
);

reportWebVitals();