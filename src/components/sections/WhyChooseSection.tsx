"use client";

import { Code2, Layers, FolderGit2, Compass } from "lucide-react";

const whyFeatures = [
  {
    icon: Code2,
    title: "Coding Fundamentals",
    description:
      "Build a strong programming foundation from variables and loops to functions, OOP, and problem-solving in your preferred language.",
    cta: "Start Coding",
    href: "#paths",
  },
  {
    icon: Layers,
    title: "DSA & Pattern Mastery",
    description:
      "Master essential DSA concepts through structured roadmaps and pattern-based practice, from arrays and hashing to trees and graphs.",
    cta: "Master DSA",
    href: "#roadmap",
  },
  {
    icon: FolderGit2,
    title: "Projects & GitHub",
    description:
      "Turn your knowledge into real-world projects. Learn Git, manage code with GitHub, and build a portfolio that showcases your skills.",
    cta: "Build Your Profile",
    href: "#paths",
  },
  {
    icon: Compass,
    title: "Placement Roadmap",
    description:
      "Follow a structured path covering aptitude, CS fundamentals, coding assessments, core electronics, and interview preparation.",
    cta: "Get Placement Ready",
    href: "#roadmap",
  },
];

export function WhyChooseSection() {
  return (
    <section id="why-choose" className="pt-8 pb-16 sm:pt-14 sm:pb-20 lg:pt-32 lg:pb-28 bg-[#050508] relative scroll-mt-24">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#8B5CF6]/8 blur-[140px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Why Choose{" "}
            <span className="text-[#A855F7] drop-shadow-[0_0_30px_rgba(168,85,247,0.35)]">
              SkillNex?
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-[#94A3B8] text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Everything engineered to take you from foundational concepts to placement-ready confidence.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-[#090712] border border-[#1E1B2E] hover:border-[#8B5CF6]/50 rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_36px_rgba(139,92,246,0.18)]"
              >
                {/* Subtle top border gradient accent on hover */}
                <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Icon badge */}
                  <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center mb-6 group-hover:bg-[#8B5CF6]/20 group-hover:border-[#8B5CF6]/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all">
                    <Icon size={26} className="text-[#C084FC] group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC] mb-3 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer link / CTA */}
                <a
                  href={item.href}
                  className="mt-6 pt-4 border-t border-[#1E1B2E]/70 flex items-center justify-between text-xs font-semibold text-[#C084FC] hover:text-white transition-colors group/link select-none"
                >
                  <span className="tracking-wide">{item.cta}</span>
                  <span className="transition-transform group-hover/link:translate-x-1 text-[#A855F7] font-bold">
                    →
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
