import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { RequestsContextProvider } from './context/RequestContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RequestsContextProvider>
      <App />
    </RequestsContextProvider>
  </React.StrictMode>
);
