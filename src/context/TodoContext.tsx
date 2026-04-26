import React, { createContext, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';

interface TodoContextProps {
  todos: Todo[];
  getTodos: (uid: string) => void;
  addTodo: (text: string, uid: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  updateTodoStatus: (id: string, completed: boolean) => void;
  loadingTodos: boolean;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  uid: string;
}

export interface TodoFB {
  text: string;
  completed: boolean;
  uid: string;
}

export const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = (props: { children: React.ReactNode }) => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);

  // add new todo
  const addTodo = (text: string, uid: string) => {
    const newTodo: TodoFB = {
      text,
      completed: false,
      uid: uid
    }
    addDoc(collection(db, 'todos'), newTodo)
      .then((docRef) => {
        setTodos([...todos, { ...newTodo, id: docRef.id }])
        toast.success('Todo successfully saved!');
      })
      .catch((error) => {
        toast.error('Failed to save todo! ', error);
      });
  }

  // delete a todo
  const deleteTodo = (id: string) => {
    const postRef = doc(db, 'todos', id);
    deleteDoc(postRef)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
        toast.success('Successfully deleted todo!');
      })
      .catch((error) => {
        toast.error('Failed to delete todo! ', error);
      });
  }

  // edit a todo
  const editTodo = (id: string, text: string) => {
    const postRef = doc(db, 'todos', id);
    updateDoc(postRef, { text: text })
      .then(() => {
        setTodos(todos.map(todo => {
          if (todo.id === id) {
            return { ...todo, text: text }
          } else {
            return todo
          }
        }));
        toast.success('Successfully edited todo!');
      })
      .catch((error) => {
        toast.error('Failed to edit todo! ', error);
      });
  }

  // update todo status
  const updateTodoStatus = (id: string, completed: boolean) => {
    const postRef = doc(db, 'todos', id);
    updateDoc(postRef, { completed: !completed })
      .then(() => {
        setTodos(todos.map(todo => {
          if (todo.id === id) {
            return { ...todo, completed: !todo.completed }
          } else {
            return todo
          }
        }));
        toast.success('Successfully updated todo status!');
      })
      .catch((error) => {
        toast.error('Failed to update todo status! ', error);
      });

  }

  // get todos
  async function getTodos(uid: string) {
    setLoadingTodos(true);
    const postCollectionRef = await query(
      collection(db, "todos"),
      where("uid", "==", uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    const todos: Todo[] = docs.map(doc => ({ id: doc.id, text: doc.data()['text'], completed: doc.data()['completed'], uid: doc.data()['uid'] }));
    setTodos(todos);
    setLoadingTodos(false);
  }

  const value: TodoContextProps = {
    todos,
    getTodos,
    addTodo,
    deleteTodo,
    editTodo,
    updateTodoStatus,
    loadingTodos
  };

  return (
    <TodoContext.Provider value={value}>
      {props.children}
    </TodoContext.Provider>
  );
}
