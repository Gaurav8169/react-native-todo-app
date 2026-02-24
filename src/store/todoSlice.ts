import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/todo';
import { fetchTodosApi } from '../api/todoApi';

export type FilterType = 'ALL' | 'ACTIVE' | 'DONE';
export type SortType = 'ID' | 'RECENT';

interface TodoState {
  todos: Todo[];
  filter: FilterType;
  sortBy: SortType;
  page: number;
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  filter: 'ALL',
  sortBy: 'ID',
  page: 1,
  loading: false,
};

export const fetchTodos = createAsyncThunk(
  'todos/fetch',
  async (page: number) => {
    return await fetchTodosApi(page);
  },
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      const now = Date.now();
      state.todos.unshift({
        id: Date.now(),
        title: action.payload,
        completed: false,
        created_at: now,
        updated_at: now,
      });
    },

    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updated_at = Date.now();
      }
    },

    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },

    editTodo(state, action: PayloadAction<{ id: number; title: string }>) {
      const todo = state.todos.find(t => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.updated_at = Date.now();
      }
    },

    setFilter(state, action: PayloadAction<FilterType>) {
      state.filter = action.payload;
    },

    setSort(state, action: PayloadAction<SortType>) {
      state.sortBy = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = [...state.todos, ...action.payload];
      state.page += 1;
      state.loading = false;
    });
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, setFilter, setSort } =
  todoSlice.actions;

export default todoSlice.reducer;
