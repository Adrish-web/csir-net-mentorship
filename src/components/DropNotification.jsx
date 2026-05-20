import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Beautiful Animated Mini Graph Plot
const AnimatedChart = () => (
  <div className="w-12 h-12 rounded-xl bg-[#0B1120] border border-cyan-500/30 flex items-end justify-center gap-[3px] p-2 shrink-0 relative overflow-hidden shadow-[inset_0_0_12px_rgba(6,182,212,0.2)]">
    {/* Subtle background grid for the plot */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:4px_4px]" />
    
    {/* Animated Bars */}
    {[35, 75, 45, 95, 65, 50].map((h, i) => (
      <motion.div
        key={i}
        animate={{ height: [`${h / 2.5}%`, `${h}%`, `${h / 2}%`, `${h / 2.5}%`] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        className="w-1.5 bg-gradient-to-t from-blue-600 via-cyan-400 to-cyan-200 rounded-t-sm relative z-10 shadow-[0_0_5px_rgba(34,211,238,0.5)]"
        style={{ height: `${h}%` }}
      />
    ))}
  </div>
);

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
          // Fixed positioning for mobile: locked to left & right with 1rem margin. 
          // On PC (sm+): centered exactly.
          className="fixed top-20 sm:top-24 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-[60] sm:w-[480px] max-w-full"
        >
          <div 
            className="relative w-full p-4 bg-[#0d0e1a]/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl shadow-[0_10px_40px_-10px_rgba(6,182,212,0.4)] cursor-pointer group overflow-hidden"
            onClick={() => {
              onOpenModal();
              setIsVisible(false); // Hide notification after clicking
            }}
          >
            {/* Background hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="relative flex items-center justify-between gap-3">
              
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <AnimatedChart />
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Live Data
                    </span>
                    {/* Live Ping indicator */}
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                  </div>
                  
                  <p className="text-[14px] sm:text-[15px] font-bold text-white font-display leading-tight truncate">
                    Syllabus Dominance Matrix
                  </p>
                  <p className="text-[11px] sm:text-[12px] text-cyan-100/70 leading-snug mt-1 truncate">
                    Tap to reveal unit weightage & PYQ trends
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-1 sm:ml-2">
                <div className="hidden sm:flex items-center justify-center px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                  View Plot
                </div>
                
                {/* Close Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(false);
                  }}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                  aria-label="Close notification"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
