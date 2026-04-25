import { useEffect, useState, useRef } from "react"
import { Input } from "./Input";
import { useUser } from "../context";
import { useTodo } from "../context";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";

export const AddTodo = () => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodo } = useTodo();
  const { user } = useUser();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmission = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (user === undefined) {
      console.error("User is undefined. This should not happen!");
    } else {
      if (input.trim() !== '') {
        addTodo(input, user.uid);
        setInput('');
      } else {
        toast.error('Todo field cannot be empty!');
      }
    }
  }

  return (
    <form onSubmit={handleSubmission}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex items-center w-full max-w-lg gap-2 p-5 m-auto"
      >
        <Input
          ref={inputRef}
          type="text"
          placeholder="enter a new todo"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <AnimatedButton>
          Submit
        </AnimatedButton>
      </motion.div>
    </form>
  );
}
