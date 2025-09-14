import React from 'react';
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from './TaskList.jsx';

describe('TaskList', () => {
  const items = [
    { id: 1, title: 'Task A', description: 'A', completed: false },
    { id: 2, title: 'Task B', description: 'B', completed: true },
  ];

  test('renders list items', () => {
    render(
      <TaskList items={items} onView={() => {}} onEdit={() => {}} onDelete={() => {}} onToggle={() => {}} />
    );
    expect(screen.getByText('Task A')).toBeInTheDocument();
    expect(screen.getByText('Task B')).toBeInTheDocument();
  });

  test('invokes handlers on actions', async () => {
    const onView = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    render(
      <TaskList items={items} onView={onView} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
    );

    await userEvent.click(screen.getAllByRole('button', { name: /View/i })[0]);
    await userEvent.click(screen.getAllByRole('button', { name: /Edit/i })[0]);
    await userEvent.click(screen.getAllByRole('button', { name: /Delete/i })[0]);

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);

    expect(onView).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  test('applies line-through class to completed items', () => {
    render(
      <TaskList items={items} onView={() => {}} onEdit={() => {}} onDelete={() => {}} onToggle={() => {}} />
    );
    const completed = screen.getByText('Task B');
    expect(completed.className).toMatch(/line-through/);
  });
});


