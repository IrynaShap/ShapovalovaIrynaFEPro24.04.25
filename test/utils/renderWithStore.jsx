import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../../src/store/tasksSlice';
import { render } from '@testing-library/react';

export function renderWithStore(ui, { preloadedState } = {}) {
  const store = configureStore({
    reducer: { tasks: tasksReducer },
    preloadedState,
  });
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return { ...render(ui, { wrapper: Wrapper }), store };
}


