import { motion } from "framer-motion";
import { 
  GraduationCap, Award, Globe2, FlaskConical, FileText, Cpu, MapPin, BadgeCheck, 
  Instagram, Facebook, Linkedin 
} from "lucide-react";
import { IMAGES, MENTOR_CARDS } from "../lib/constants";

const iconForEyebrow = (e) => {
  const map = {
    Education: GraduationCap,
    "National Rank": Award,
    "USA Research Stint": Globe2,
    "Research Experience": FlaskConical,
    Publications: FileText,
    "Wet Lab + Computational": Cpu,
  };
  return map[e] || BadgeCheck;
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const Mentor = () => {
  // Replace these with your actual profile links
  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/a-drish-ghosh/" },
    { icon: Instagram, href: "https://www.instagram.com/the_celestial_conspiracy/" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100052865653169" },
  ];

  return (
    <section id="mentor" data-testid="mentor-section" className="relative py-24 md:py-32 overflow-hidden">
      <div className="orb bg-cyan-500/20 w-[420px] h-[420px] top-20 -left-32" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div {...fadeUp} className="max-w-3xl">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-cyan-400">
            The Mentor
          </span>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Learn from a{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Researcher, Mentor & Top Ranker
            </span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-300 leading-relaxed">
            A teacher who has cleared the exam — and is actively in the lab. You learn the science the way it is
            practiced at world-class institutions.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Portrait card */}
          <motion.div
            {...fadeUp}
            data-testid="mentor-portrait-card"
            className="md:col-span-5 lg:col-span-4 relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md min-h-[460px] group"
          >
            <img
              src={IMAGES.mentor}
              alt="Adrish Ghosh portrait"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
            
            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-400/30 w-fit">
                <BadgeCheck className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-xs font-medium text-yellow-200">Verified Researcher</span>
              </div>
              <div className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-white">
                Adrish Ghosh
              </div>
              <div className="text-slate-300 text-sm mt-1">
                BS-MS Dual Degree · IISER Kolkata
              </div>
              <div className="mt-2 flex items-center gap-2 text-slate-400 text-xs">
                <MapPin className="w-3.5 h-3.5" />
                Kolkata, India · Atlanta, USA (Visiting)
              </div>

              {/* Personal Social Media Links */}
              <div className="mt-5 flex items-center gap-3">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Credentials cards */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MENTOR_CARDS.map((c, i) => {
              const Icon = iconForEyebrow(c.eyebrow);
              const accent =
                c.accent === "gold"
                  ? "from-yellow-500/15 to-yellow-500/0 border-yellow-400/25"
                  : "from-cyan-500/10 to-cyan-500/0 border-cyan-400/20";
              return (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: 0.05 * i }}
                  data-testid={`mentor-card-${i}`}
                  className={`group rounded-2xl p-6 bg-gradient-to-br ${accent} border bg-white/5 backdrop-blur-md hover:-translate-y-1 hover:border-cyan-400/40 transition-all duration-300`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 grid place-items-center rounded-xl ${c.accent === "gold" ? "bg-yellow-400/10 text-yellow-300" : "bg-cyan-400/10 text-cyan-300"}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium">
                      {c.eyebrow}
                    </span>
                  </div>
                  <div className="mt-4 font-display text-lg font-semibold text-white">
                    {c.title}
                  </div>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">{c.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

