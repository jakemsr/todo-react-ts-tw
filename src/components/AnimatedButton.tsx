import { motion } from "framer-motion"

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: React.MouseEventHandler
}

const AnimatedButton = ({ children, onClick }: AnimatedButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="btn"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.95, y: 1 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
    >
      {children}
    </motion.button>
  )
}

export default AnimatedButton

