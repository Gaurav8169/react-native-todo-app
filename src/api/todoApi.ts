import axios from 'axios';
import { Todo } from '../types/todo';

// export const fetchTodosApi = async (): Promise<Todo[]> => {
//   const res = await axios.get(
//     'https://jsonplaceholder.typicode.com/todos?_limit=20',
//   );

//   const now = Date.now();

//   return res.data.map((item: any) => ({
//     id: item.id,
//     title: item.title,
//     completed: item.completed,
//     created_at: now,
//     updated_at: now,
//   }));
// };

export const fetchTodosApi = async (page: number) => {
  const limit = 10;

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`,
  );

  const data = await res.json();

  const now = Date.now();

  return data.map((item: any, index: number) => ({
    id: item.id + page * 1000, // avoid duplicate ids
    title: item.title,
    completed: item.completed,
    created_at: now - index,
    updated_at: now - index,
  }));
};
