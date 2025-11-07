import { Link, useLocation } from "react-router-dom";
import { LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <LinkIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Shortify
            </span>
          </Link>

          <div className="flex gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive("/")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/statistics"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive("/statistics")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              Statistics
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
