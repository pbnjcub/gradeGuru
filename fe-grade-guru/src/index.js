// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'purecss/build/pure.css';
import { UserProvider } from "./contexts/UserContext"
import { AdminProvider } from './contexts/AdminContext';
import { StudentsProvider } from './contexts/StudentsForTeacherContext';
import { UnitsProvider } from './contexts/UnitsForTeacherContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <AdminProvider>
        <StudentsProvider>
          <UnitsProvider>
            <App />
          </UnitsProvider>
        </StudentsProvider>
      </AdminProvider>
    </UserProvider>
  </React.StrictMode>
);
