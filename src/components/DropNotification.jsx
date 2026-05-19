import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ChevronRight } from "lucide-react";

export const DropNotification = ({ onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show promo only after user scrolls and after they spent some time on page
    const start = Date.now();

    const onScroll = () => {
      if (localStorage.getItem("csir_promo_shown")) return;
      const elapsed = Date.now() - start;
      const scrolledEnough = window.scrollY > 400; // user scrolled down
      if (scrolledEnough && elapsed > 8000) {
        // Slight delay so it feels natural after user has been reading
        setTimeout(() => setIsVisible(true), 300);
        localStorage.setItem("csir_promo_shown", "1");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // fallback: if user doesn't scroll, show after 20s once
    const fallback = setTimeout(() => {
      if (!localStorage.getItem("csir_promo_shown")) {
        setIsVisible(true);
        localStorage.setItem("csir_promo_shown", "1");
      }
    }, 20000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(fallback);
    };
  }, []);

  const handleClose = (e) => {
    e?.stopPropagation();
    setIsVisible(false);
    localStorage.setItem("csir_promo_shown", "1");
  };

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
          <div
            className="relative flex flex-row items-center justify-between gap-2 sm:gap-4 p-2.5 sm:p-4 bg-gradient-to-r from-[#071023]/80 to-[#0b1020]/70 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-[0_8px_40px_rgba(6,182,212,0.12)] cursor-pointer group"
            onClick={() => {
              onOpenModal();
              setIsVisible(false); // Hide notification after clicking CTA
              localStorage.setItem("csir_promo_shown", "1");
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/6 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white leading-tight">Limited time — Enrollment Offer</p>
                <p className="text-xs text-cyan-200/80 mt-1 leading-tight">
                  Instead of monthly ₹2000, now only <span className="font-semibold text-white">₹1500</span> for this month. Enroll to get solved PYQs, handmade notes & full CSIR-NET support.
                </p>
                <p className="text-[11px] text-cyan-300/80 mt-1">Contact on Instagram for details.</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-xs text-cyan-200">Monthly</span>
                <span className="text-sm font-bold text-white">₹1500 <span className="text-xs text-slate-400 line-through ml-1">₹2000</span></span>
              </div>

              <div className="hidden sm:flex w-8 h-8 rounded-full bg-white/5 items-center justify-center group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>

              <button
                onClick={handleClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
