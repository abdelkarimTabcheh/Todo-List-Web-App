import { describe, it, expect } from 'vitest';
import Todo from '../src/models/todo.js';

describe('Todo model', () => {
  it('toggles complete', () => {
    const t = new Todo({ title: 'x' });
    expect(t.completed).toBe(false);
    t.toggleComplete();
    expect(t.completed).toBe(true);
  });
});
