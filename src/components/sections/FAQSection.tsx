"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data/landing-page";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-14 sm:py-20 lg:py-28 bg-[#050508] relative scroll-mt-20">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left: heading */}
          <div className="lg:col-span-5">
            <SectionHeading
              title={
                <>
                  Questions before <br />
                  <span className="text-[#A855F7]">you get started?</span>
                </>
              }
              subtitle="Everything you need to know about our pattern-first curriculum, roadmaps, and coding simulator."
            />
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={cn(
                    "border rounded-2xl overflow-hidden transition-all duration-200",
                    isOpen
                      ? "border-[#8B5CF6]/50 bg-[#0E0C18] shadow-[0_0_20px_rgba(139,92,246,0.12)]"
                      : "border-[#1E1B2E] bg-[#090712] hover:border-[#2D2744]"
                  )}
                >
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6] rounded-2xl cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#F8FAFC]">{faq.q}</span>
                    <span
                      className={cn(
                        "shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors",
                        isOpen
                          ? "bg-[#8B5CF6]/20 border-[#8B5CF6]/40 text-[#C084FC]"
                          : "border-[#231E33] text-[#64748B]"
                      )}
                    >
                      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="px-6 pb-5 text-sm text-[#94A3B8] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

