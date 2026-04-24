import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react";
import type { Todo } from "../context"
import { useTodo } from "../context";
import toast from "react-hot-toast";
import { Input } from "./Input";
import { BsCheck2Square } from "react-icons/bs";
import { TbRefresh } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";


const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

interface TodoItemsProps {
  todo: Todo;
} 

export const TodoItem = ({ todo }: TodoItemsProps) => {

  const [editingTodoText, setEditingTodoText] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const { deleteTodo, editTodo, updateTodoStatus } = useTodo();

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTodoId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTodoId])

  const handleEdit = (todoId: string, todoText: string) => {
    setEditingTodoId(todoId);
    setEditingTodoText(todoText);
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }

  const handleUpdate = (todoId: string) => {
    if (editingTodoText.trim() !== '') {
      editTodo(todoId, editingTodoText);
      setEditingTodoId(null);
      setEditingTodoText('');
    } else {
      toast.error('Todo Field cannot be empty!');
    }
  }

  const handleDelete = (todoId: string) => {
    deleteTodo(todoId);
  }

  const handleStatusUpdate = (todoId: string) => {
    updateTodoStatus(todoId, todo.completed);
  }

  return (
    <motion.li
      key={todo.id}
      whileHover={{ scale: 1.02 }}
      variants={item}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className={cn(
        'p-5 rounded-xl bg-zinc-900',
        todo.completed && 'bg-opacity-50 text-zinc-500',
      )}
    >
      <AnimatePresence mode="wait">
        {editingTodoId === todo.id ? (
          <motion.div
            key={`${todo.id} + 'edit'`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex gap-2"
          >
            <Input
              ref={editInputRef}
              type="text"
              value={editingTodoText}
              onChange={e => setEditingTodoText(e.target.value)}
            />
            <button
              className="px-5 py-2 text-sm font-normal text-orange-300 bg-orange-900 border-2 border-orange-900 active:scale-95 rounded-xl"
              onClick={() => handleUpdate(todo.id)}
            >
              Update
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`${todo.id} + 'no-edit'`}
            className="flex flex-col gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              layout
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </motion.span>
            <div className="flex justify-between gap-5 text-white">
              <button onClick={() => handleStatusUpdate(todo.id)}>
                {todo.completed === false ? (
                  <span className="flex items-center gap-1 cursor-pointer">
                    <BsCheck2Square />
                    Mark Completed
                  </span>
                ) : (
                  <span className="flex items-center gap-1 cursor-pointer">
                    <TbRefresh />
                    Mark Undone
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(todo.id, todo.text)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <FaRegEdit />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="flex items-center gap-1 cursor-pointer text-red-500"
                >
                  <RiDeleteBin7Line />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}