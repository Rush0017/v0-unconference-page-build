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
    name: "Preston Pysh",
    title: "General Partner",
    organization: "Ego Death Capital",
    role: "Co-Founder, The Investors Podcast Network",
  },
  {
    name: "Matt Odell",
    title: "Managing Partner",
    organization: "Ten31 VC",
    role: "Co-Founder, OpenSats and Bitcoin Park",
  },
  {
    name: "Natalie Brunell",
    title: "Host and Founder",
    organization: "Coin Stories",
    role: "Bitcoin Educator and Journalist",
  },
  {
    name: "Abubakar Nur Khalil",
    title: "Bitcoin Core Contributor",
    organization: "Btrust",
    role: "Board Member",
  },
  {
    name: "Adam Jonas",
    title: "Head of Special Projects",
    organization: "Chaincode Labs",
    role: "Cohost, The Chaincode Podcast",
  },
  {
    name: "David Zell",
    title: "Co-Founder & Co-President",
    organization: "Bitcoin Policy Institute",
    role: "",
  },
  {
    name: "Niftynei",
    title: "Founder",
    organization: "Base58",
    role: "Core Lightning Contributor; bitcoin++ Conference Lead",
  },
  {
    name: "Ishaana Misra",
    title: "Bitcoin Core Contributor",
    organization: "MIT",
    role: "Co-Founder, Generation Bitcoin",
  },
  {
    name: "Andrew M. Bailey",
    title: "Professor of Humanities (Philosophy)",
    organization: "Yale-NUS College",
    role: "Coauthor of Resistance Money",
  },
  {
    name: "Bradley Rettler",
    title: "Associate Professor of Philosophy",
    organization: "University of Wyoming",
    role: "Coauthor of Resistance Money",
  },
  {
    name: "Ella Hough",
    title: "Co-Founder",
    organization: "Bitcoin Students Network",
    role: "Bitcoin Advocacy Associate at Strategy",
  },
  {
    name: "Arsh Molu",
    title: "Co-Founder",
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
  {
    name: "Salvador Pineda",
    title: "Researcher on Bitcoin and Transitional Justice",
    organization: "Cornell University",
    role: "",
  },
  {
    name: "Matthew Vuk",
    title: "Researcher",
    organization: "Second (Ark Protocol L2 implementation)",
    role: "",
  },
  {
    name: "Arman Dashti",
    title: "Economics & Data Science Student",
    organization: "Claremont McKenna College",
    role: "Founder, Claremont Bitcoin Club",
  },
  {
    name: "Halston Valencia",
    title: "Bitcoin Educator and Gen Z Advocate",
    organization: "USC Graduate",
    role: "",
  },
  {
    name: "Zach Young",
    title: "Analyst",
    organization: "Trammell Venture Partners",
    role: "Bitcoin-Native VC Fund",
  },
  {
    name: "Nicki Sharma",
    title: "Founder and Host",
    organization: "Orange Peel Podcast",
    role: "University of Melbourne student",
  },
  {
    name: "Blake Kaufman",
    title: "Creator and Builder",
    organization: "Blitz Wallet",
    role: "",
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
          Learn from the pioneers shaping the future of Bitcoin
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
