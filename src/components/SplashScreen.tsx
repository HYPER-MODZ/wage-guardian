import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Main content */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center z-10"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">
            Time & Attendance
          </h1>
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </motion.div>

        {/* Watermark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ 
            duration: 1,
            ease: "easeOut",
            delay: 0.5
          }}
          className="absolute bottom-8 text-center w-full text-gray-800"
        >
          <div className="text-lg font-bold tracking-widest">
            POWERED BY
          </div>
          <div className="text-2xl font-extrabold tracking-[0.2em]">
            HYPER MOD
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;