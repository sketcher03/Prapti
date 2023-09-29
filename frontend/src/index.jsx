import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { RequestsContextProvider } from './context/RequestContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <RequestsContextProvider>
        <App />
      </RequestsContextProvider>
    </AuthContextProvider>
);
