import { atom } from 'jotai';

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

// Atoms
export const todosAtom = atom<Todo[]>([]);

export const newTodoAtom = atom<string>('');

export const toggleTodoAtom = atom(
  () => '',
  (get, set, id: number) => {
    set(todosAtom, toggleTodo(get(todosAtom), id));
  }
);

export const updateTodoAtom = atom(
  () => '',
  (get, set, { id, text }: { id: number; text: string }) => {
    set(todosAtom, updateTodo(get(todosAtom), id, text));
  }
);

export const removeTodoAtom = atom(
  () => '',
  (get, set, id: number) => {
    set(todosAtom, removeTodo(get(todosAtom), id));
  }
);

export const addTodoAtom = atom(
  () => '',
  (get, set) => {
    // 1. get(todosAtom)을 호출하여 todosAtom의 현재 상태, 즉 현재까지의 할 일 목록을 가져오기
    // 2. get(newTodoAtom)을 호출하여 newTodoAtom의 현재 상태, 즉 사용자가 입력한 새로운 할 일의 텍스트를 가져오기
    // 3. 이 두 상태를 addTodo 함수에 전달하여 새로운 할 일 항목을 추가한 새로운 할 일 목록을 가져오기
    // 4. set(todosAtom, ...)을 호출하여 todosAtom의 상태를 새로운 할 일 목록으로 업데이트
    set(todosAtom, addTodo(get(todosAtom), get(newTodoAtom)));
    set(newTodoAtom, '');
  }
);
