import { useUser } from "../context";
import { useState } from "react"
import { AnimatePresence, easeInOut, motion } from 'framer-motion'
import AnimatedButton from "./AnimatedButton"

export const Login = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, register, login, logout, loading } = useUser();

  // be sure to clear the use and password fields on logout
  function doLogout() {
    logout();
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex items-center">
      <AnimatePresence mode="wait">
        {user !== undefined ? (
          <motion.div
            key="logged-in"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-10 m-auto pt-5 text-lg font-semibold"
          >
            Welcome {user.email}!
            <AnimatedButton
              onClick={doLogout}
            >
              Logout
            </AnimatedButton>
          </motion.div>
        ) : (
          loading ? (
            <div className="flex justify-center w-full mt-20">
              <motion.div
                key="loading"
                className="w-12 h-12 rounded-full border-t-4 border-t-(-hue-1) border-solid border(--divider)"
                animate={{ transform: "rotate(360deg)" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
              </motion.div>
            </div>
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
