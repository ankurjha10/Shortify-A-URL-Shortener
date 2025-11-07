import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border-t border-border mt-auto"
    >
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          © 2025 Shortify — Built with Spring Boot & React
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
