import { useTodo } from '../context';
import { SiStarship } from 'react-icons/si';
import { TodoItem } from './TodoItem';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';


const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 1.2, staggerChildren: 0.3 } }
}

export const TodoList = () => {
  const { todos, loadingTodos } = useTodo();

  return (
    <AnimatePresence mode="wait">
      {loadingTodos ? (
        <motion.div
          className="flex justify-center w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: {delay: 0.5}}}
        >
          <LoadingSpinner key="loadingTodos" />
        </motion.div>
      ) : todos.length === 0 ? (
        <motion.div
          key="nothing"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="max-w-lg px-5 m-auto text-white/90">
          <h1 className="flex flex-col items-center gap-5 px-5 py-10 text-xl font-bold text-center rounded-xl bg-zinc-900">
            <SiStarship className="text-5xl" />
            You have nothing to do!
          </h1>
        </motion.div>
      ) : (
        <motion.ul
          key="list"
          variants={container}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="grid max-w-lg gap-2 px-5 m-auto text-white/90"
        >
          <AnimatePresence>
            {todos.map((todo, index) => (
              <TodoItem todo={todo} key={index} />
            ))}
          </AnimatePresence>
        </motion.ul>
      )
      }
    </AnimatePresence>
  );
}
