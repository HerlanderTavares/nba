import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Sections/App';
import {viewPortHeight} from './Sections/helpers';

viewPortHeight();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
