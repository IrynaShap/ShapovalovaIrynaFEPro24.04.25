import React from 'react';
import { jest } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';
import { renderWithStore } from '../test/utils/renderWithStore.jsx';
import { loadTasksSuccess, loadTasksFailure } from './store/tasksSlice';
import { act } from 'react';

describe('App', () => {
  test('renders page title', () => {
    renderWithStore(<App />, {
      preloadedState: { tasks: { items: [], loading: false, error: '' } },
    });
    expect(
      screen.getByRole('heading', { level: 1, name: /Список завдань/i })
    ).toBeInTheDocument();
  });

  test('renders items from store (when not loading)', () => {
    renderWithStore(<App />, {
      preloadedState: { tasks: { items: [], loading: true, error: '' } },
    });
    expect(screen.getByText('Завантаження...')).toBeInTheDocument();
  });

  test('shows error banner when error present', () => {
    const { store } = renderWithStore(<App />, {
      preloadedState: { tasks: { items: [], loading: false, error: '' } },
    });
    act(() => {
      store.dispatch(loadTasksFailure('Oops'));
    });
    expect(screen.getByText('Oops')).toBeInTheDocument();
  });

  test('opens modal on View and displays task content', async () => {
    const { store } = renderWithStore(<App />, {
      preloadedState: { tasks: { items: [], loading: true, error: '' } },
    });
    const items = [
      { id: 1, title: 'Look at me', description: 'Details here', completed: false },
    ];
    act(() => {
      store.dispatch(loadTasksSuccess(items));
    });
    await userEvent.click(await screen.findByRole('button', { name: /View/i }));
    expect(await screen.findByText('Details here')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Look at me' })).toBeInTheDocument();
  });

  test('enter edit mode prefills form and shows cancel', async () => {
    const { store } = renderWithStore(<App />, {
      preloadedState: { tasks: { items: [], loading: true, error: '' } },
    });
    const items = [
      { id: 2, title: 'Editable', description: 'To edit', completed: false },
    ];
    act(() => {
      store.dispatch(loadTasksSuccess(items));
    });
    await userEvent.click(await screen.findByRole('button', { name: /Edit/i }));
    expect(screen.getByRole('heading', { level: 2, name: 'Редагувати завдання' })).toBeInTheDocument();
    expect(screen.getByLabelText('Назва')).toHaveValue('Editable');
    expect(screen.getByLabelText('Опис')).toHaveValue('To edit');
    expect(screen.getByRole('button', { name: 'Скасувати' })).toBeInTheDocument();
  });

  test('Clear Completed sets loading state', async () => {
    const { store } = renderWithStore(<App />, {
      preloadedState: { tasks: { items: [], loading: true, error: '' } },
    });
    const items = [
      { id: 3, title: 'Done', description: 'ok', completed: true },
      { id: 4, title: 'Not done', description: 'no', completed: false },
    ];
    act(() => {
      store.dispatch(loadTasksSuccess(items));
    });
    await userEvent.click(await screen.findByRole('button', { name: 'Очистити виконані' }));
    expect(await screen.findByText('Завантаження...')).toBeInTheDocument();
  });
});


