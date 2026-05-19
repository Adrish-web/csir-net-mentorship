import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, FlaskConical } from "lucide-react";

const links = [
  { label: "About Mentor", href: "#mentor" },
  { label: "Research", href: "#research" },      // <-- Added this line
  { label: "Course Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export const Navbar = ({ onEnroll }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      data-testid="navbar"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1120]/85 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <a
          href="#top"
          data-testid="navbar-logo"
          className="flex items-center gap-2 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="w-9 h-9 grid place-items-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 border border-cyan-400/30">
            <FlaskConical className="w-5 h-5 text-cyan-400" />
          </span>
          <span className="font-display text-sm sm:text-base">
            <span className="text-white font-semibold">Adrish Ghosh</span>
            <span className="hidden sm:inline text-slate-400 font-light"> — CSIR NET Life Science</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-link-${l.href.replace("#", "")}`}
              onClick={() => handleLink(l.href)}
              className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            data-testid="navbar-enroll-button"
            onClick={onEnroll}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_24px_rgba(6,182,212,0.35)] transition-all"
          >
            Enroll Now
          </button>
        </div>

        <button
          data-testid="navbar-mobile-toggle"
          className="md:hidden p-2 rounded-md text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/10 bg-[#0B1120]/95 backdrop-blur-xl"
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <button
                key={l.href}
                data-testid={`mobile-nav-link-${l.href.replace("#", "")}`}
                onClick={() => handleLink(l.href)}
                className="text-left text-slate-200 py-2"
              >
                {l.label}
              </button>
            ))}
            <button
              data-testid="mobile-navbar-enroll-button"
              onClick={() => {
                setOpen(false);
                onEnroll?.();
              }}
              className="mt-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600"
            >
              Enroll Now
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
