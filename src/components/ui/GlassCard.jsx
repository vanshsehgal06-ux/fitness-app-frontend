import { motion } from "framer-motion";

export default function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-[0_0_40px_rgba(0,0,0,.35)]
        p-8
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}