import type { User } from "firebase/auth"
import { useState } from "react"
import { AnimatePresence, easeInOut, motion } from 'framer-motion'
import AnimatedButton from "./AnimatedButton"

interface LoginProps {
  user: User | undefined
  register: (email: string, password: string) => void
  login: (email: string, password: string) => void
  logout: () => void
  loading: boolean
}

export const Login = ({ user, register, login, logout, loading }: LoginProps) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex items-center">
      <AnimatePresence mode="wait">
        {user !== undefined ? (
          <motion.div
            key="logged-in"
            initial={{ opacity:0, y: -20}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-10 m-auto pt-5 text-lg font-semibold"
          >
            Welcome {user.email}!
            <AnimatedButton
              onClick={logout}
            >
              Logout
            </AnimatedButton>
          </motion.div>
        ) : (
          loading ? (
            <button>X</button>
          ) : (
            <motion.div
              key="logged-out"
              className="flex flex-col items-center w-full max-w-md gap-2 m-auto pt-20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: easeInOut }}
            >
              <span className="text-lg font-semibold">Please login or register.</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-500 focus:border-white"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-500 focus:border-white"
              />
              <div className="flex gap-2">
                <AnimatedButton
                  onClick={() => login(email, password)}
                >
                  Login
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => register(email, password)}
                >
                  Register
                </AnimatedButton>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
