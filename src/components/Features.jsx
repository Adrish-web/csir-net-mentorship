import { motion } from "framer-motion";
import {
  Brain,
  FileSearch,
  MessageCircleQuestion,
  Microscope,
  Target,
  BadgeIndianRupee,
} from "lucide-react";
import { FEATURES } from "../lib/constants";

const iconMap = { Brain, FileSearch, MessageCircleQuestion, Microscope, Target, BadgeIndianRupee };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const Features = () => {
  return (
    <section id="features" data-testid="features-section" className="relative py-24 md:py-32 overflow-hidden">
      <div className="orb bg-yellow-500/10 w-[420px] h-[420px] top-20 -right-32" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-cyan-400">
            Why this batch
          </span>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Built for{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              serious aspirants
            </span>{" "}
            who want JRF.
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-300 leading-relaxed">
            A research-led methodology designed around how top rankers actually think — concepts, patterns, and
            problem-solving at scientific depth.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="features-grid"
        >
          {FEATURES.map((f, i) => {
            const Icon = iconMap[f.icon] || Brain;
            return (
              <motion.div
                key={i}
                variants={item}
                data-testid={`feature-card-${i}`}
                className="group relative rounded-2xl p-7 bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 grid place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 border border-cyan-400/30 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">{f.title}</h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">{f.body}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cyan-400/80 font-medium">
                    <span className="w-6 h-px bg-cyan-400/60" />
                    0{i + 1}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

