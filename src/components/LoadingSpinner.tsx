import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  key: string;
}

export const LoadingSpinner = ({ key }: LoadingSpinnerProps) => {
  return (
    <motion.div
      key={key}
      className="w-12 h-12 rounded-full border-t-4 border-t-(-hue-1) border-solid border(--divider)"
      animate={{ transform: "rotate(360deg)" }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }}
    >
    </motion.div>
  )
}
