import React from "react";
import { Linkedin } from "lucide-react";

// X (formerly Twitter) brand icon SVG
function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Social links for contact
const CONTACT_LINKS = {
  x: "https://x.com/Samir_kumar19?t=59IZjgWvM2UOMVTwaPKoDw&s=08",
  linkedin: "https://www.linkedin.com/in/samir-kumar-sahu-1726883a6",
};

const footerLinks = {
  Platform: [
    { label: "Why SkillNex", href: "#why-choose" },
    { label: "Learning Roadmap", href: "#roadmap" },
    { label: "Practice Modules", href: "#roadmap" },
    { label: "Preparation Paths", href: "#paths" },
  ],
  Resources: [
    { label: "Pattern Cheatsheet", href: "#roadmap" },
    { label: "Mock Interviews", href: "#roadmap" },
    { label: "Frequently Asked", href: "#faq" },
  ],
};

export function Footer() {
  return (
    <footer id="contact" className="bg-[#050508] border-t border-[#1E1B2E] scroll-mt-12">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <a href="#hero" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 flex items-center justify-center text-[#C084FC] group-hover:bg-[#8B5CF6]/25 transition-all">
                <span className="font-mono text-sm font-bold">&lt;&gt;</span>
              </span>
              <span className="font-bold text-lg text-[#F8FAFC]">
                Skill<span className="text-[#A855F7]">Nex</span>
              </span>
            </a>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              Master patterns, not just problems. A deliberate, structured
              roadmap to technical interview and placement readiness.
            </p>

            {/* Quick Contact Icons */}
            <div className="mt-5 flex items-center gap-3">
              <span className="text-xs text-[#64748B] font-medium">Connect:</span>
              <a
                href={CONTACT_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact on X (Twitter)"
                title="Contact on X (Twitter)"
                className="w-8 h-8 rounded-lg bg-[#0F0D1A] border border-[#1E1B2E] hover:border-[#8B5CF6]/60 hover:bg-[#8B5CF6]/15 hover:text-white text-[#94A3B8] flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={CONTACT_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact on LinkedIn"
                title="Contact on LinkedIn"
                className="w-8 h-8 rounded-lg bg-[#0F0D1A] border border-[#1E1B2E] hover:border-[#8B5CF6]/60 hover:bg-[#8B5CF6]/15 hover:text-white text-[#94A3B8] flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links: Platform & Resources */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#CBD5E1] mb-4">
                {group}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#94A3B8] hover:text-[#C084FC] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6] rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Us Column */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#CBD5E1] mb-4">
              Contact Us
            </h3>
            <p className="text-sm text-[#94A3B8] mb-4 leading-relaxed">
              Have questions, feedback, or need placement guidance? Reach out directly:
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={CONTACT_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact on X (Twitter)"
                className="inline-flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#090712] border border-[#1E1B2E] hover:border-[#8B5CF6]/60 hover:bg-[#8B5CF6]/10 text-[#94A3B8] hover:text-white transition-all duration-200 group shadow-sm"
              >
                <span className="w-7 h-7 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-white group-hover:border-[#8B5CF6]/50 group-hover:scale-105 transition-all">
                  <XIcon className="w-3.5 h-3.5" />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-[#F8FAFC]">X (Twitter)</span>
                  <span className="text-[11px] text-[#64748B] group-hover:text-[#A855F7] transition-colors">
                    @Samir_kumar19
                  </span>
                </div>
              </a>

              <a
                href={CONTACT_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact on LinkedIn"
                className="inline-flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#090712] border border-[#1E1B2E] hover:border-[#8B5CF6]/60 hover:bg-[#8B5CF6]/10 text-[#94A3B8] hover:text-white transition-all duration-200 group shadow-sm"
              >
                <span className="w-7 h-7 rounded-lg bg-[#0077B5]/20 border border-[#0077B5]/40 flex items-center justify-center text-[#60A5FA] group-hover:bg-[#0077B5]/30 group-hover:scale-105 transition-all">
                  <Linkedin className="w-3.5 h-3.5" />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-[#F8FAFC]">LinkedIn</span>
                  <span className="text-[11px] text-[#64748B] group-hover:text-[#A855F7] transition-colors">
                    Samir Kumar Sahu
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#1E1B2E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#64748B]">
            © {new Date().getFullYear()} SkillNex. Designed with deliberate pattern practice.
          </p>
          <div className="flex items-center gap-5 text-xs text-[#64748B]">
            <a href="#" className="hover:text-[#C084FC] transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-[#C084FC] transition-colors">Terms of Service</a>
            <span>·</span>
            <a href="#" className="hover:text-[#C084FC] transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

