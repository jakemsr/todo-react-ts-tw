import toast, { Toaster } from "react-hot-toast"
import { AddTodo, TodoList } from "./components"
import Login from "./components/Login"
import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth"
import { auth } from "./firebase"
import { useTodo } from "./context"

function App() {

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const { getTodos } = useTodo();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
        getTodos(user.uid);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  function register(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        console.log(userCredential.user);
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
        // Signed in ;
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
    console.log('logout');
    signOut(auth).then(() => {
      setUser(undefined);
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
      {user !== undefined && (
        <>
          <AddTodo user={user} />
          <TodoList />
        </>)}
    </div>
  )
}

export default App
