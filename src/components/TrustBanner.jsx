// src/components/TrustBanner.jsx
import { motion } from "framer-motion";

const trustMarks = [
  {
    name: "CSIR NET",
    type: "text",
    content: (
      <div className="font-display text-xl md:text-2xl tracking-[0.15em] flex items-center">
        <span className="font-extrabold">CSIR</span>
        <span className="font-light ml-2 opacity-70">NET</span>
      </div>
    ),
  },
  {
    name: "IISER Kolkata",
    type: "text",
    content: (
      <div className="font-display text-lg md:text-xl tracking-[0.2em] uppercase flex items-center">
        <span className="font-bold">IISER</span>
        <span className="font-light ml-2 opacity-80">Kolkata</span>
      </div>
    ),
  },
  {
    name: "EMBO",
    type: "text",
    content: (
      <div className="font-display text-2xl md:text-3xl font-black tracking-[0.25em]">
        EMBO
      </div>
    ),
  },
  {
    name: "Emory University",
    type: "image",
    src: "/logos/emory.png", // Ensure this file is inside your public/logos/ folder
  },
];

export const TrustBanner = () => {
  return (
    <section className="relative py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <p className="text-center text-[11px] font-mono tracking-[0.2em] text-slate-500 uppercase mb-10">
          Academic Roots & Research Associations
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-24">
          {trustMarks.map((mark, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative flex items-center justify-center cursor-default"
            >
              {/* Subtle Cyan Glow behind the logo/text on hover */}
              <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Conditional Rendering: Text vs Image */}
              {mark.type === "text" ? (
                <div className="relative z-10 text-slate-500 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.5)] transition-all duration-500">
                  {mark.content}
                </div>
              ) : (
                <img
                  src={mark.src}
                  alt={mark.name}
                  /* brightness-0 invert makes black logos white. Remove them if your PNG is already white */
                  className="h-8 md:h-10 w-auto object-contain relative z-10 opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.5)] transition-all duration-500 brightness-0 invert"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};