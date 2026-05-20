import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, AlertTriangle, Lightbulb, Activity, Lock } from "lucide-react";
import { SYLLABUS_DATA, KEY_FINDINGS } from "../lib/constants";

export const SyllabusModal = ({ isOpen, onClose }) => {
  const [showPaywall, setShowPaywall] = useState(false);
  const scrollRef = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowPaywall(false); // Reset paywall when reopened
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Show paywall after 40% scroll or 60 seconds
  useEffect(() => {
    if (!isOpen) return;
    let timer;
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight > 0 && scrollTop / scrollHeight > 0.4) {
        setShowPaywall(true);
      }
    };
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }
    timer = setTimeout(() => setShowPaywall(true), 60000);
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(timer);
    };
  }, [isOpen]);

  const getDensityStyle = (density) => {
    if (density === 'VERY HIGH') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (density === 'HIGH') return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    return 'bg-white/10 text-slate-300 border-white/20';
  };

  const getFindingIcon = (iconStr) => {
    if (iconStr === "⚠️" || iconStr === "🚨") return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    if (iconStr === "📌") return <Lightbulb className="w-5 h-5 text-cyan-400" />;
    return <Activity className="w-5 h-5 text-purple-400" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0B1120]/90 backdrop-blur-xl" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            onContextMenu={(e) => e.preventDefault()} // Prevents right click
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-[#13141f] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            
            {/* Paywall Overlay (Covers the ENTIRE modal so no scrolling/clicking happens behind) */}
            <AnimatePresence>
              {showPaywall && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-[#0B1120]/80 backdrop-blur-md"
                >
                  <motion.div 
                    initial={{ scale: 0.95, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-[#181e2a] border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)] max-w-md w-full p-6 sm:p-8 flex flex-col items-center text-center relative"
                  >
                    {/* Close button closes the whole modal, not just the paywall */}
                    <button
                      onClick={() => {
                        setShowPaywall(false);
                        onClose && onClose();
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      aria-label="Close paywall"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center justify-center mb-4">
                      <Trophy className="w-8 h-8 text-yellow-400 mr-2" />
                      <span className="text-lg font-bold text-cyan-300">Unlock Rigorous Analysis</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">Go Beyond the Matrix</h3>
                    <p className="text-sm sm:text-base text-slate-300 mb-6">
                      Get solved PYQs, practice sessions, and deeper analytics for every unit.<br />
                      <span className="text-yellow-400 font-semibold">Subscribe for ₹1500/month</span> to access advanced features.
                    </p>
                    <a
                      href="#pricing"
                      onClick={() => {
                        setShowPaywall(false);
                        onClose && onClose();
                        setTimeout(() => {
                          document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 300);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 w-full shadow-lg hover:shadow-cyan-500/25"
                    >
                      Unlock Now — ₹1500/mo
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10 bg-white/[0.02]">
              <div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-cyan-400 mb-1">
                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4" /> Grandmaster Overview
                </div>
                <h2 className="text-xl sm:text-3xl font-display font-bold text-white">
                  Syllabus Dominance <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Matrix</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Scrollable Body - Disables events when paywall is active */}
            <div ref={scrollRef} className={`flex-1 ${showPaywall ? 'overflow-hidden pointer-events-none select-none' : 'overflow-y-auto'} p-4 sm:p-8 custom-scrollbar relative`}>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Data Section */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-sm font-mono tracking-widest text-slate-400 uppercase">Priority Analytics</h3>
                  
                  {/* DESKTOP VIEW: Traditional Data Table */}
                  <div className="hidden md:block overflow-x-auto rounded-xl border border-white/10 bg-[#0d0e1a]">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-xs font-mono tracking-wider text-cyan-400 uppercase">
                          <th className="p-4 whitespace-nowrap">Unit</th>
                          <th className="p-4">Domain</th>
                          <th className="p-4 whitespace-nowrap">Sec B</th>
                          <th className="p-4 whitespace-nowrap">Sec C</th>
                          <th className="p-4">Density</th>
                          <th className="p-4">Priority</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {SYLLABUS_DATA.map((row, i) => {
                          const isLocked = showPaywall && i >= 3;
                          
                          // Anti-Inspect Element: DOM physically replaces premium data with dummy blocks
                          if (isLocked) {
                            return (
                              <tr key={i} className="border-b border-white/5 opacity-40 bg-white/[0.01]">
                                <td className="p-4 font-mono font-bold text-cyan-300/50 whitespace-nowrap blur-[3px]">UNIT X</td>
                                <td className="p-4 text-slate-300/50 blur-[3px]">Locked Premium Content...</td>
                                <td className="p-4 font-mono text-slate-400/50 whitespace-nowrap blur-[3px]">--%</td>
                                <td className="p-4 font-mono font-medium text-green-400/50 whitespace-nowrap blur-[3px]">--%</td>
                                <td className="p-4">
                                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold border bg-white/5 text-slate-400 border-white/10 blur-[2px]">LOCKED</span>
                                </td>
                                <td className="p-4">
                                  <span className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold bg-white/5 text-slate-500">
                                    <Lock className="w-4 h-4" />
                                  </span>
                                </td>
                              </tr>
                            );
                          }

                          return (
                            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                              <td className="p-4 font-mono font-bold text-cyan-300 whitespace-nowrap">{row.unit}</td>
                              <td className="p-4 text-slate-300">{row.domain}</td>
                              <td className="p-4 font-mono text-slate-400 whitespace-nowrap">{row.pctB}%</td>
                              <td className="p-4 font-mono font-medium text-green-400 whitespace-nowrap">{row.pctC}%</td>
                              <td className="p-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border whitespace-nowrap ${getDensityStyle(row.density)}`}>
                                  {row.density}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold ${row.priority <= 3 ? 'bg-yellow-500/20 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.2)]' : 'bg-white/10 text-slate-400'}`}>
                                  {row.priority}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE VIEW: Animated Chart Cards */}
                  <div className="md:hidden flex flex-col gap-4">
                    {SYLLABUS_DATA.map((row, i) => {
                      const isLocked = showPaywall && i >= 3;
                      
                      // Anti-Inspect Element: DOM physically replaces premium data with dummy blocks
                      if (isLocked) {
                        return (
                          <div key={i} className="relative p-5 rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col gap-4 shadow-lg opacity-40">
                            <div className="relative z-10 flex justify-between items-start blur-[4px]">
                              <div className="pr-2 w-full">
                                <div className="h-3 w-16 bg-cyan-500/20 rounded mb-2"></div>
                                <div className="h-5 w-3/4 bg-white/20 rounded"></div>
                              </div>
                              <div className="flex flex-col items-end gap-2 shrink-0">
                                <div className="h-5 w-16 bg-white/10 rounded border border-white/10"></div>
                                <div className="h-5 w-8 bg-white/10 rounded"></div>
                              </div>
                            </div>
                            <div className="relative z-10 mt-1 space-y-3 p-3 bg-black/40 rounded-xl border border-white/5 blur-[4px]">
                              <div>
                                <div className="flex justify-between mb-1.5"><div className="h-2 w-12 bg-white/10 rounded"></div><div className="h-2 w-6 bg-white/10 rounded"></div></div>
                                <div className="w-full h-2 bg-white/5 rounded-full"></div>
                              </div>
                              <div>
                                <div className="flex justify-between mb-1.5"><div className="h-2 w-12 bg-white/10 rounded"></div><div className="h-2 w-6 bg-white/10 rounded"></div></div>
                                <div className="w-full h-2 bg-white/5 rounded-full"></div>
                              </div>
                            </div>
                            {/* Overlay Lock icon */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                               <Lock className="w-8 h-8 text-slate-400 mb-2" />
                               <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">Premium Data Hidden</span>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={i} className="relative p-5 rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col gap-4 shadow-lg">
                          <div className={`absolute -right-8 -top-8 w-32 h-32 blur-3xl rounded-full opacity-40 pointer-events-none ${row.density === 'VERY HIGH' ? 'bg-yellow-500' : row.density === 'HIGH' ? 'bg-cyan-500' : 'bg-slate-500'}`} />
                          
                          <div className="relative z-10 flex justify-between items-start">
                            <div className="pr-2">
                              <div className="text-cyan-400 font-mono text-[11px] font-bold tracking-wider mb-1 uppercase">{row.unit}</div>
                              <div className="text-white font-semibold text-sm leading-snug">{row.domain}</div>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                              <span className={`px-2.5 py-1 rounded-md text-[9px] font-mono font-bold border ${getDensityStyle(row.density)}`}>
                                {row.density}
                              </span>
                              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                                <span className="text-slate-400 uppercase tracking-widest">Pri</span>
                                <span className={`flex items-center justify-center w-5 h-5 rounded ${row.priority <= 3 ? 'bg-yellow-500/20 text-yellow-400 font-bold' : 'bg-white/10 text-slate-400'}`}>
                                  {row.priority}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="relative z-10 mt-1 space-y-3 p-3 bg-black/40 rounded-xl border border-white/5">
                            <div>
                              <div className="flex justify-between text-[10px] mb-1.5 font-mono">
                                <span className="text-slate-400">Section B</span>
                                <span className="text-cyan-300 font-bold">{row.pctB}%</span>
                              </div>
                              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${row.pctB}%` }}
                                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                                  viewport={{ once: true }}
                                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[10px] mb-1.5 font-mono">
                                <span className="text-slate-400">Section C</span>
                                <span className="text-green-400 font-bold">{row.pctC}%</span>
                              </div>
                              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${row.pctC}%` }}
                                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                                  viewport={{ once: true }}
                                  className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Key Findings Section */}
                <div className="space-y-6">
                  <h3 className="text-sm font-mono tracking-widest text-slate-400 uppercase">Key Points</h3>
                  <div className="flex flex-col gap-4">
                    {KEY_FINDINGS.map((finding, i) => {
                      const isLocked = showPaywall && i >= 2;
                      
                      // Anti-Inspect Element Logic
                      if (isLocked) {
                        return (
                          <div key={i} className="relative flex items-start gap-3 sm:gap-4 p-4 rounded-xl border bg-white/5 border-white/10 opacity-40">
                            <div className="shrink-0 mt-0.5 blur-[2px]"><div className="w-5 h-5 rounded-full bg-white/20"></div></div>
                            <div className="flex-1 space-y-2 mt-1 blur-[3px]">
                              <div className="h-3 bg-white/20 rounded w-full"></div>
                              <div className="h-3 bg-white/20 rounded w-4/5"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                               <Lock className="w-5 h-5 text-slate-500" />
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={i} className={`flex items-start gap-3 sm:gap-4 p-4 rounded-xl border ${finding.type === 'warn' || finding.type === 'alert' ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-cyan-500/5 border-cyan-500/20'}`}>
                          <div className="shrink-0 mt-0.5">{getFindingIcon(finding.icon)}</div>
                          <p className="text-sm text-slate-300 leading-relaxed">{finding.text}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Strategic Note */}
                  {showPaywall ? (
                    <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden opacity-40 flex items-center justify-center min-h-[140px]">
                      <div className="absolute inset-0 blur-[4px] p-5 sm:p-6 flex flex-col justify-center">
                         <div className="h-3 w-32 bg-yellow-500/20 rounded mb-4"></div>
                         <div className="space-y-2">
                           <div className="h-2 bg-white/20 rounded w-full"></div>
                           <div className="h-2 bg-white/20 rounded w-5/6"></div>
                           <div className="h-2 bg-white/20 rounded w-4/5"></div>
                         </div>
                      </div>
                      <div className="relative z-20 flex flex-col items-center">
                        <Lock className="w-6 h-6 text-yellow-500/50 mb-2" />
                        <span className="text-xs font-mono tracking-widest text-yellow-500/50 uppercase">Locked Insight</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 relative overflow-hidden">
                      <div className="absolute -top-6 -right-6 text-yellow-500/10 text-9xl font-display font-bold">"</div>
                      <h4 className="text-xs font-mono tracking-widest text-yellow-400 uppercase mb-3">Strategic Insight</h4>
                      <p className="text-sm text-slate-300 leading-relaxed relative z-10">
                        Sections B and C share the same content universe but differ in cognitive demand. For every concept in your revision, ask: <span className="text-yellow-400 font-medium">"How would an examiner convert this into a multi-panel experiment?"</span> Mastering this reflex is what separates 99th percentile scorers.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
