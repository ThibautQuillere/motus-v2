import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css';
import Motusapp from './components/motusapp/motusapp';

const el = document.getElementById('root')
if (el === null) throw new Error('Root container missing in index.html')

const root = ReactDOM.createRoot(el)
root.render(
    <Motusapp />
)
