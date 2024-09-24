import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store, persistor } from './store/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider } from '@mui/material/styles';
import GlobalTheme from './style';
import IconButton from '@mui/material/IconButton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>      // For Debug
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={GlobalTheme}>
                    <App />
                    <IconButton edge="edge" className='special'>Hello</IconButton>
                </ThemeProvider>
            </PersistGate>
            <ToastContainer />
        </Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
