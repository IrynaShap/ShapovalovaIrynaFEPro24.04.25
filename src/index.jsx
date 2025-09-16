import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import ColorModeProvider from './theme/ColorModeProvider';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history, store } from './store';

const rootEl = document.getElementById('root');
createRoot(rootEl).render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={history}>
        <ColorModeProvider>
          <App />
        </ColorModeProvider>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);

