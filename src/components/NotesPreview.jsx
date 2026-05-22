import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Lock, Eye, X, BookOpen, Sparkles, ChevronRight } from "lucide-react";

// Placeholder data - replace previewUrl with actual paths to your 1st page images 
// (e.g. "/notes/cell-cycle-page-1.jpg")
const NOTES_DATA = [
  {
    id: 1,
    title: "Molecular Biology & DNA Replication",
    unit: "Unit 3: Fundamental Processes",
    pages: 18,
    previewUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Cell Cycle & Apoptosis",
    unit: "Unit 2: Cellular Organization",
    pages: 14,
    previewUrl: "https://i.ibb.co/7mQrSdG/apop.jpg"
  },
  {
    id: 3,
    title: "Biochemical Pathways & Metabolism",
    unit: "Unit 1: Molecules & Interaction",
    pages: 22,
    previewUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800"
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const NotesPreview = () => {
  const [selectedNote, setSelectedNote] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedNote) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedNote]);

  const handleUnlockClick = () => {
    setSelectedNote(null);
    setTimeout(() => {
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section id="notes" className="relative py-24 md:py-32 bg-[#0B1120] overflow-hidden">
      {/* Background elements */}
      <div className="orb bg-purple-500/10 w-[500px] h-[500px] top-0 -left-64" />
      <div className="orb bg-cyan-500/10 w-[400px] h-[400px] bottom-0 -right-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div {...fadeUp} className="max-w-3xl">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-purple-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Study Material
          </span>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Premium{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
              Concept-Focused Notes
            </span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-300 leading-relaxed">
            High-yield, concept-mapped notes designed specifically for CSIR NET Life Science. Get a free preview of the first page before enrolling.
          </p>
        </motion.div>

        {/* Notes Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {NOTES_DATA.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="group flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/40 transition-all duration-500"
            >
              {/* Thumbnail Area */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#13141f]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent z-10 opacity-60" />
                <img 
                  src={note.previewUrl} 
                  alt={note.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                  onContextMenu={(e) => e.preventDefault()} // Disable right click on thumbnail
                  draggable="false"
                />
                
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                    <FileText className="w-3 h-3 text-cyan-400" />
                    {note.pages} Pages
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex flex-col flex-1 p-6 sm:p-8">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3">
                  {note.unit}
                </div>
                <h3 className="font-display text-xl font-semibold text-white leading-snug mb-6">
                  {note.title}
                </h3>
                
                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedNote(note)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/15 hover:bg-white/10 text-white text-sm font-medium transition-colors"
                  >
                    <Eye className="w-4 h-4 text-cyan-400" />
                    Preview
                  </button>
                  <button
                    onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                    className="flex-none p-2.5 rounded-full bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500 hover:border-purple-400 text-purple-300 hover:text-white transition-all group/lock"
                    aria-label="Unlock Full Note"
                  >
                    <Lock className="w-4 h-4 transition-transform group-hover/lock:scale-110" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Interactive Document Preview Modal */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-[#0B1120]/95 backdrop-blur-xl" 
              onClick={() => setSelectedNote(null)} 
            />

            {/* Modal Container */}
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#13141f] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-white/[0.02] shrink-0">
                <div className="flex items-center gap-3 pr-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-cyan-400 truncate">
                      Free Preview
                    </p>
                    <h3 className="text-sm sm:text-base font-display font-semibold text-white truncate">
                      {selectedNote.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNote(null)}
                  className="p-2 shrink-0 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Document Scroll Area */}
              <div className="flex-1 overflow-y-auto bg-[#0a0f18] p-4 sm:p-8 custom-scrollbar">
                <div className="max-w-2xl mx-auto flex flex-col gap-8">
                  
                  {/* PAGE 1: The REAL Image Preview */}
                  <div className="bg-white rounded-lg p-2 shadow-xl relative group">
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] text-white font-mono font-bold tracking-widest uppercase z-10">
                      Page 1 / {selectedNote.pages}
                    </div>
                    {/* Anti-inspect security features: onContextMenu & draggable="false" */}
                    <img 
                      src={selectedNote.previewUrl} 
                      alt={`Page 1 of ${selectedNote.title}`}
                      className="w-full h-auto rounded border border-slate-200 pointer-events-none select-none"
                      onContextMenu={(e) => e.preventDefault()}
                      draggable="false"
                    />
                  </div>

                  {/* REST OF PAGES: The FAKE Blurred Paywall */}
                  {/* Note: We do NOT load pages 2+ in the DOM at all. We just show a dummy skeleton. */}
                  <div className="relative rounded-lg overflow-hidden select-none" onContextMenu={(e) => e.preventDefault()}>
                    {/* Dummy background representing "Page 2" */}
                    <div className="bg-white p-8 aspect-[1/1.2] flex flex-col gap-6 blur-[6px] opacity-60">
                      <div className="h-10 w-3/4 bg-slate-300 rounded" />
                      <div className="space-y-4 mt-6">
                        <div className="h-4 w-full bg-slate-200 rounded" />
                        <div className="h-4 w-full bg-slate-200 rounded" />
                        <div className="h-4 w-5/6 bg-slate-200 rounded" />
                      </div>
                      <div className="h-64 w-full bg-slate-200 rounded mt-8" />
                    </div>

                    {/* Paywall Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0B1120]/70 backdrop-blur-sm p-6 text-center z-20">
                      <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                        <Lock className="w-8 h-8 text-purple-400" />
                      </div>
                      <h4 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                        Unlock the Full Document
                      </h4>
                      <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8">
                        The remaining <span className="text-white font-bold">{selectedNote.pages - 1} pages</span> are strictly reserved for enrolled students. Subscribe to access the complete library of notes and resources.
                      </p>
                      
                      <button
                        onClick={handleUnlockClick}
                        className="pulse-cta inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-purple-500/25 w-full sm:w-auto"
                      >
                        <Sparkles className="w-4 h-4" />
                        Enroll to Unlock All Notes
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
