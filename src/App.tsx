import { motion, AnimatePresence } from "framer-motion"
import { Toaster } from 'react-hot-toast'
import { AddTodo, TodoList, Login } from "./components"
import { useUser } from "./context"

function App() {

   const { user } = useUser();
  
  return (
    <div className="bg-blue-200 h-screen">
      <Toaster position="bottom-center" />
      <Login />
      <AnimatePresence mode="wait">
        {user !== undefined && (
          <motion.div key="no-user" exit={{ opacity: 0, transition: { duration: 0.8 } }}>
            <AddTodo />
            <TodoList />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
