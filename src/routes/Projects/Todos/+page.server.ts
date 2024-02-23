import db from '../../../lib/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const todos = await db.todos.fetchAll(); 
  return {
    todos,
  };
};

export const actions: Actions = {
  addTodo: async ({ request }) => {
    const formData = await request.formData();
    const todoText = formData.get('todoText');

    if (typeof todoText === 'string' && todoText.trim().length > 0) {
      await db.todos.add(todoText);
      const updatedTodos = await db.todos.fetchAll(); // Fetch updated list
      return { todos: updatedTodos }; // Return updated list
    }
  },
  removeTodo: async ({ request }) => {
    const formData = await request.formData();
    const todoID = formData.get('todoID');

    if (todoID !== null && !isNaN(Number(todoID))) {
        await db.todos.remove(Number(todoID));
        const updatedTodos = await db.todos.fetchAll(); // Fetch updated list
        return { todos: updatedTodos }; // Return updated list
    }
  }
};