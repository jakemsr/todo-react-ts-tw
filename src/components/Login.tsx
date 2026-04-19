import type { User } from "firebase/auth"
import { useState } from "react"

interface LoginProps {
  user: User | undefined
  register: (email: string, password: string) => void
  login: (email: string, password: string) => void
  logout: () => void
  loading: boolean
}

const Login = ({ user, register, login, logout, loading }: LoginProps) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex items-center">
      {user !== undefined ? (
        <div className="flex items-center gap-2 m-auto pt-5">
          Welcome {user.email}!
          <button
            onClick={logout}
            className="btn"
          >
            Logout
          </button>
        </div>
      ) : (
        loading ? (
          <button>X</button>
        ) : (
          <div className="flex items-center w-full max-w-xl gap-2 m-auto pt-20">
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
            <button
              onClick={() => login(email, password)}
              className="btn"
            >
              Login
            </button>
            <button
              onClick={() => register(email, password)}
              className="btn"
            >
              Register
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default Login
