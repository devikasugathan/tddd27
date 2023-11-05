// Import React and necessary libraries from the react-dom package
import React from 'react';
import { createRoot } from 'react-dom/client'; // Importing createRoot method
import App from './App'; // Importing the main App component

// Selecting the root HTML element and creating a React root
const root = createRoot(document.getElementById('root'));

// Rendering the main App component within the root element
root.render(<App />);
