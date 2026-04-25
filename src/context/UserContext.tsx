import type { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useTodo } from "./"

interface UserContextProps {
  user: User | undefined;
  register: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = (props: { children: React.ReactNode }) => {

  const [user, setUser] = useState<User>();
  const { todos, getTodos } = useTodo();
  const [loading, setLoading] = useState(true);

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

  const value: UserContextProps = {
    user,
    register,
    login,
    logout,
    loading
  };

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
}
