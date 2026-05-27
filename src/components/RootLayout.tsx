import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariants } from "../animations/variants";

export function RootLayout() {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      variants={pageVariants}
      initial="initial"
      animate="animate">
      <Outlet />
    </motion.div>
  );
}
