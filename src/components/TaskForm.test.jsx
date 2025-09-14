import React from 'react';
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from './TaskForm.jsx';

describe('TaskForm', () => {
  test('title and description accept letters and numbers', async () => {
    render(<TaskForm onSubmit={jest.fn()} />);
    const title = screen.getByLabelText('Назва');
    const description = screen.getByLabelText('Опис');

    await userEvent.type(title, 'abc123');
    await userEvent.type(description, 'desc456');

    expect(title).toHaveValue('abc123');
    expect(description).toHaveValue('desc456');
  });

  test('submit disabled when inputs invalid or empty', () => {
    render(<TaskForm onSubmit={jest.fn()} />);
    const submit = screen.getByRole('button', { name: /Зберегти/i });
    expect(submit).toBeDisabled();
  });

  test('shows validation error when too short and blurred', async () => {
    render(<TaskForm onSubmit={jest.fn()} />);
    const title = screen.getByLabelText('Назва');
    await userEvent.type(title, 'abc');
    await userEvent.tab();
    expect(await screen.findByText(/Мінімум 5 символів/)).toBeInTheDocument();
  });

  test('submits values and resets form', async () => {
    const onSubmit = jest.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText('Назва'), 'Valid title');
    await userEvent.type(screen.getByLabelText('Опис'), 'Valid description');

    const submit = screen.getByRole('button', { name: /Зберегти/i });
    expect(submit).toBeEnabled();

    await userEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledWith({ title: 'Valid title', description: 'Valid description' });
  });

  test('edit mode shows Update and Cancel and keeps values', () => {
    const initialTask = { id: 10, title: 'Old', description: 'OldDesc' };
    render(<TaskForm onSubmit={jest.fn()} initialTask={initialTask} onCancel={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Оновити' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Скасувати' })).toBeInTheDocument();
    expect(screen.getByLabelText('Назва')).toHaveValue('Old');
    expect(screen.getByLabelText('Опис')).toHaveValue('OldDesc');
  });
});


