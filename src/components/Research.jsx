import { motion } from "framer-motion";
import { BookOpenText, Microscope, ExternalLink, Activity, Sparkles } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const Research = () => {
  return (
    <section id="research" className="relative py-24 md:py-32 bg-[#0B1120] overflow-hidden">
      <div className="orb bg-blue-500/10 w-[500px] h-[500px] top-1/4 -right-64" />
      <div className="orb bg-cyan-500/10 w-[400px] h-[400px] bottom-10 -left-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div {...fadeUp} className="max-w-3xl">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-cyan-400 flex items-center gap-2">
            <Microscope className="w-4 h-4" /> Active Science
          </span>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Publications &{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Ongoing Research
            </span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-300 leading-relaxed">
            Learn from a mentor who isn't just teaching textbook biology, but actively advancing the frontiers of neuro-oncology and cellular communication at world-class labs.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-col gap-8">
          {/* Published Paper Card */}
          <motion.div
            {...fadeUp}
            className="group relative rounded-3xl p-8 md:p-10 bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 backdrop-blur-sm transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
              <BookOpenText className="w-64 h-64 text-cyan-100" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Published Paper
              </div>
              <div className="text-left md:text-right">
                <div className="text-white font-display font-medium tracking-wide">Translational Oncology</div>
                <div className="text-cyan-400/80 font-mono text-sm">(2025)</div>
              </div>
            </div>

            <h3 className="relative z-10 font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-[1.2]">
              Connexin43 functions as a non-canonical phenotypic stability factor in promoting hybrid Epithelial/Mesenchymal phenotype in glioblastoma cells
            </h3>
            
            <p className="relative z-10 mt-5 text-base text-slate-400 font-medium leading-relaxed">
              Anushka Mondal, Sanchari Saha, <span className="text-cyan-300 font-bold underline decoration-cyan-500/30 underline-offset-4">Adrish Ghosh</span>, Justin D. Lathia, Jayasri Das Sarma
            </p>

            <div className="relative z-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="p-5 rounded-2xl bg-black/20 border border-white/5">
                <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3">Background</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Glioblastoma (GBM) is a highly malignant brain tumor. Gap junction protein Connexin43 (Cx43) plays a crucial role in GBM by having both tumor-suppressing and tumor-promoting roles.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-black/20 border border-white/5">
                <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3">Findings</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Identified a critical tumor-promoting role of Cx43 functioning as a non-canonical phenotypic stability factor, activating the NF-κB pathway to promote a hybrid E/M phenotype, stress resistance, and collective migration.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-black/20 border border-white/5">
                <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3">Conclusion</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  These results offer highly valuable insights into targeting Cx43-mediated signaling pathways due to the critical potential tumor-promoting role of Cx43 in glioblastoma.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-8 border-t border-white/10 flex justify-start">
              <a
                href="https://doi.org/10.1016/j.tranon.2024.102463"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white font-medium hover:bg-cyan-500/10 hover:border-cyan-500/40 hover:text-cyan-300 transition-all duration-300 group/btn"
              >
                View Paper on Elsevier
                <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </a>
            </div>
          </motion.div>

          {/* Ongoing Project Card */}
          <motion.div
            {...fadeUp}
            className="relative rounded-3xl p-8 md:p-10 bg-gradient-to-br from-blue-900/10 to-transparent border border-dashed border-blue-500/30 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Activity className="w-40 h-40 text-blue-400" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono tracking-widest uppercase mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Ongoing Project
              </div>

              <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-semibold text-white leading-snug max-w-3xl">
                Role of novel isoform of Pannexin channels in tumor invasiveness in glioblastoma.
              </h3>
              
              <p className="mt-4 text-sm text-slate-400 font-medium">
                Authors: <span className="text-cyan-300 font-bold">Adrish Ghosh</span>, Michael H. Koval, Jayasri Das Sarma
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

