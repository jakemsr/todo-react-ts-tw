import { useEffect, useState, useRef } from "react"
import { Input } from "./Input";
import { useTodo } from "../context";
import toast from "react-hot-toast";
import type { User } from "firebase/auth";

interface AddTodoProps {
  user: User
}

export const AddTodo = ({ user }: AddTodoProps) => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodo } = useTodo();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmission = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (input.trim() !== '') {
      addTodo(input, user.uid);
      setInput('');
    } else {
      toast.error('Todo field cannot be empty!');
    }
  }

  return (
    <form onSubmit={handleSubmission}>
      <div className="flex items-center w-full max-w-lg gap-2 p-5 m-auto">
        <Input
          ref={inputRef}
          type="text"
          placeholder="start typing ..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-5 py-2 text-sm font-normal text-blue-300 bg-blue-900 border-2 border-blue-900 active:scale-95 rounded-xl cursor-pointer"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
