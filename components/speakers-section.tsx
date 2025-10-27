"use client"

import { Users } from "lucide-react"

const speakers = [
  {
    name: "Jeff Booth",
    title: "Founding Partner",
    organization: "Ego Death Capital",
    role: "Author of The Price of Tomorrow",
  },
  {
    name: "Matt Odell",
    title: "Managing Partner",
    organization: "Ten31 VC",
    role: "Co-Founder of OpenSats and Bitcoin Park",
  },
  {
    name: "Ishaana Misra",
    title: "Bitcoin Core Contributor",
    organization: "MIT",
    role: "Co-founder of Generation Bitcoin",
  },
  {
    name: "Abubakar Nur Khalil",
    title: "Bitcoin Core Contributor",
    organization: "Btrust",
    role: "Board Member",
  },
  {
    name: "David Zell",
    title: "Co-Founder & Co-President",
    organization: "Bitcoin Policy Institute",
    role: "",
  },
  {
    name: "Ella Hough",
    title: "Co-founder",
    organization: "Bitcoin Students Network",
    role: "Bitcoin Advocacy Associate at Strategy, Cornell Bitcoin Major",
  },
  {
    name: "Arsh Molu",
    title: "Co-founder",
    organization: "Bitcoin Students Network",
    role: "Financial Freedom Operations Lead at Human Rights Foundation",
  },
  {
    name: "Kyle Knight",
    title: "Founder",
    organization: "Bitcoin Culture Hub",
    role: "Built student-Bitcoin culture initiatives including UCLA's Bitcoin Bruins and a campus Bitcoin summit",
  },
  {
    name: "Sean Mihelich",
    title: "Founder & President",
    organization: "UW-Madison BTC Club",
    role: "Head of Operations at Bitcoin Culture Hub",
  },
]

export function SpeakersSection() {
  return (
    <div className="space-y-16 animate-fade-in-up">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-primary/10 text-primary">
          <Users className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Featured Speakers</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-[#002E1E] tracking-tight">
          Gen Z Pioneers & Industry Leaders
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
          Learn from the pioneers building the future of Bitcoin education and adoption
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {speakers.map((speaker, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="space-y-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {speaker.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#002E1E] group-hover:text-primary transition-colors">
                  {speaker.name}
                </h3>
                <div className="space-y-2 text-sm">
                  {speaker.title && (
                    <p className="text-primary font-semibold leading-snug">
                      {speaker.title}
                      {speaker.organization && (
                        <>
                          ,{" "}
                          {speaker.organization === "Bitcoin Students Network" ? (
                            <a
                              href="https://www.bitcoinstudentnetwork.org/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline transition-all"
                            >
                              {speaker.organization}
                            </a>
                          ) : (
                            speaker.organization
                          )}
                        </>
                      )}
                    </p>
                  )}
                  {speaker.role && <p className="text-gray-600 font-normal leading-snug">{speaker.role}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
