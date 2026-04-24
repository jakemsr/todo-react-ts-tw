import toast, { Toaster } from "react-hot-toast"
import { AddTodo, TodoList, Login } from "./components"
import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth"
import { auth } from "./firebase"
import { useTodo } from "./context"
import { motion, AnimatePresence } from "framer-motion"

function App() {

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const { todos, getTodos } = useTodo();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
        getTodos(user.uid);
      } else {
        setUser(undefined);
        todos.length = 0;
      }
    });
  }, []);

  function register(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // also signed in 
        setUser(userCredential.user);
        toast.success('User successfully registered!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.error(`Error registering: ${errorMessage.split('/')[1].replace(/-/g, " ").replace(/\)/, "")}`);
      });
  }

  function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        toast.success('Successfully logged in!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.error(`Error logging in: ${errorMessage.split('/')[1].replace(/-/g, " ").replace(/\)/, "")}`);
      });
  }

  function logout() {
    signOut(auth).then(() => {
      setUser(undefined);
      todos.length = 0;
      toast.success('Successfully logged out!');
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      toast.error(`Error logging out: ${errorMessage.split('/')[1].replace(/-/g, " ").replace(/\)/, "")}`);
    });
  }

  return (
    <div className="bg-blue-200 h-screen">
      <Toaster position="bottom-center" />
      <Login user={user} register={register} login={login} logout={logout} loading={loading} />
      <AnimatePresence mode="wait">
        {user !== undefined && (
          <motion.div key="no-user" exit={{ opacity: 0, transition: { duration: 0.8 } }}>
            <AddTodo user={user} />
            <TodoList />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
