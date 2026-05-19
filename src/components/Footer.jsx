// src/components/Footer.jsx
import { Mail, Phone, FlaskConical, Instagram, Facebook, Linkedin } from "lucide-react";
import { BRAND } from "../lib/constants";

export const Footer = () => {
  // Replace these with your actual profile links
  const socials = [
    { icon: Instagram, href: "https://www.instagram.com/the_celestial_conspiracy/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100052865653169", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/a-drish-ghosh/", label: "LinkedIn" },
  ];

  return (
    <footer data-testid="footer" className="relative border-t border-white/10 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 grid place-items-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 border border-cyan-400/30">
                <FlaskConical className="w-5 h-5 text-cyan-400" />
              </span>
              <div className="font-display text-base font-semibold text-white">
                {BRAND.name}
                <div className="text-xs text-slate-400 font-normal">{BRAND.tagline}</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-xs">
              Dedicated to building the next generation of life science researchers.
            </p>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-400 font-medium">Contact & Connect</div>
            <div className="mt-4 space-y-3">
              <a
                data-testid="footer-email"
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2 text-sm text-slate-200 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                {BRAND.email}
              </a>
              <a
                data-testid="footer-phone"
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-slate-200 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                {BRAND.phone}
              </a>
              
              {/* Social Media Row */}
              <div className="pt-3 flex items-center gap-4">
                {socials.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-slate-400 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-400 font-medium">Disclaimer</div>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              This program is an independent mentorship initiative by Adrish Ghosh, intended for serious aspirants of
              CSIR NET Life Science. All trademarks and exam names belong to their respective owners.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
          <div className="text-xs text-slate-500">
            Crafted with research-grade precision.
          </div>
        </div>
      </div>
    </footer>
  );
};