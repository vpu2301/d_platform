import React from 'react';
import ReactDOM from 'react-dom/client';
import { OperatorApp } from './views/OperatorApp';
import './index.css';

// Get unit ID from URL params or localStorage
const urlParams = new URLSearchParams(window.location.search);
const unitId = urlParams.get('unitId') || localStorage.getItem('operatorUnitId') || 'UA-101';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OperatorApp unitId={unitId} />
  </React.StrictMode>,
);
