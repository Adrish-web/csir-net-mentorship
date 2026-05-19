import { motion } from "framer-motion";
import { Trophy, GraduationCap, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { IMAGES, TRUST_BADGES } from "../lib/constants";

const iconMap = { Trophy, GraduationCap, BookOpen };

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export const Hero = ({ onPrimary, onSecondary }) => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Cellular biology background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/70 via-[#0B1120]/80 to-[#0B1120]" />
        <div className="absolute inset-0 grid-bg opacity-50" />
      </div>

      {/* Orbs */}
      <div className="orb bg-cyan-500/30 w-[420px] h-[420px] -top-32 -left-32" />
      <div className="orb bg-yellow-500/15 w-[360px] h-[360px] -bottom-32 -right-20" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">
        <motion.div
          {...fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-cyan-500/30 backdrop-blur-md"
          data-testid="hero-eyebrow"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-cyan-300 font-medium">
            CSIR NET · Dec 2026 Batch · Live
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] text-white"
          data-testid="hero-headline"
        >
          Crack <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">CSIR NET Dec 2026</span>
          <br className="hidden sm:block" /> Life Science.{" "}
          <span className="text-yellow-400">JRF is Yours.</span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed"
          data-testid="hero-subheadline"
        >
          Research-Oriented Preparation with{" "}
          <span className="text-white font-medium">Concept-First Teaching</span> &{" "}
          <span className="text-white font-medium">PYQ-Driven Strategy</span>.
        </motion.p>

        {/* Trust badges */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-1"
          data-testid="hero-trust-badges"
        >
          {TRUST_BADGES.map((b, idx) => {
            const Icon = iconMap[b.icon] || Trophy;
            return (
              <span
                key={idx}
                data-testid={`trust-badge-${idx}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-slate-200"
              >
                <Icon className="w-3.5 h-3.5 text-yellow-400" />
                {b.label}
              </span>
            );
          })}
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-6 sm:mt-3 w-full sm:w-auto"
        >
          <button
            data-testid="hero-primary-cta"
            onClick={onPrimary}
            className="w-full sm:w-auto justify-center pulse-cta group inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
          >
            Join the Batch — ₹1500/mo
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            data-testid="hero-secondary-cta"
            onClick={onSecondary}
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-medium bg-white/5 border border-white/15 hover:bg-white/10 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300"
          >
            View Mentor Profile
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 mt-10 pt-8 border-t border-white/10 w-full max-w-3xl"
          data-testid="hero-stats"
        >
          {[
            { k: "AIR 86", v: "CSIR NET" },
            { k: "Top 1%", v: "INSPIRE-SHE Fellow" },
            { k: "Emory, USA", v: "Khorana Scholar '25" },
          ].map((s, i) => (
            <div key={i} className={`text-center ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
              <div className="font-display text-2xl sm:text-3xl font-bold text-white">{s.k}</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

