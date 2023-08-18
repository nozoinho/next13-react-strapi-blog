"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const PageTransition = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 12, opacity: 0 }}
      transition={{
        type: "string",
        stiffness: 260,
        damping: 40,
        duration: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
};
export default PageTransition;
