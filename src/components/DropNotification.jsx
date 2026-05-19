import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ChevronRight } from "lucide-react";

export const DropNotification = ({ onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Drop the notification 2 seconds after the page loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-[60] w-[95%] sm:w-[90%] max-w-md"
        >
          <div className="relative flex flex-row items-center justify-between gap-2 sm:gap-4 p-2.5 sm:p-4 bg-[#0d0e1a]/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.2)] cursor-pointer group"
               onClick={() => {
                 onOpenModal();
                 setIsVisible(false); // Hide notification after clicking
               }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] sm:text-sm font-bold text-white font-display leading-tight">
                  CSIR NET Dominance Matrix
                </p>
                <p className="text-[11px] sm:text-xs text-cyan-200/70 leading-tight mt-0.5">
                  View unit weightage & PYQ analytics
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Hide the Chevron on mobile to save horizontal space */}
              <div className="hidden sm:flex w-8 h-8 rounded-full bg-white/5 items-center justify-center group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
              
              {/* Larger tap target for close button on mobile */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(false);
                }}
                className="p-2 sm:p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
