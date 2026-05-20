import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Instagram } from "lucide-react";

export const OfferNotification = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show notification 15 seconds after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 100, opacity: 0, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[70] w-[calc(100vw-2rem)] sm:w-[380px] max-w-sm"
        >
          <div className="relative flex flex-col gap-3 p-5 bg-[#0d0e1a]/95 backdrop-blur-xl border border-yellow-500/40 rounded-2xl shadow-[0_0_40px_rgba(234,179,8,0.25)] overflow-hidden group">
            {/* Background glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-pink-500/5 pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-yellow-500/20 blur-3xl rounded-full pointer-events-none" />
            
            {/* Pulsing overlay border */}
            <div className="absolute inset-0 border-2 border-yellow-400/20 rounded-2xl animate-pulse pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(234,179,8,0.4)] relative">
                  <Gift className="w-5 h-5 text-black" />
                  {/* Ping effect on the icon */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0d0e1a]">
                    <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75" />
                  </div>
                </div>
                <div>
                  <p className="text-[15px] font-bold text-white font-display leading-tight flex items-center gap-2">
                    Special Offer! 
                  </p>
                  <p className="text-xs text-yellow-300 leading-tight mt-1 font-medium">
                    <span className="line-through text-slate-400 mr-1">₹2000/mo</span> ₹1500/mo this month only!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors shrink-0"
                aria-label="Close offer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="relative mt-2 text-sm text-slate-300 leading-relaxed">
              Enroll now to get <span className="text-white font-medium">solved PYQs</span>, <span className="text-white font-medium">handmade notes</span>, and <span className="text-white font-medium">full support</span> for CSIR-NET.
            </div>

            {/* CTA */}
            <a
              href="https://www.instagram.com/the_celestial_conspiracy/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white text-sm font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02]"
              onClick={() => setIsVisible(false)}
            >
              <Instagram className="w-4 h-4" />
              Contact me on Instagram
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};