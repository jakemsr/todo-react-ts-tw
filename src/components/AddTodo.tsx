import { useEffect, useState, useRef } from "react"
import { Input } from "./Input";
import { useTodo } from "../context";
import toast from "react-hot-toast";

export const AddTodo = () => {
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
      addTodo(input);
      setInput('');
      toast.success('Todo added successfully!');
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
          className="px-5 py-2 text-sm font-normal text-blue-300 bg-blue-900 border-2 border-blue-900 active:scale-95 rounded-xl"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

