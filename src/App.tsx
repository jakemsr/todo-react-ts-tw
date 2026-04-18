import { Toaster } from "react-hot-toast"
import { AddTodo, TodoList } from "./components"

function App() {

  return (
    <div>
      <Toaster position="bottom-center" />
      <AddTodo />
      <TodoList />
    </div>
  )
}

export default App
