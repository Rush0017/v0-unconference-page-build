"use client"

import { Users } from "lucide-react"
import Image from "next/image"

const speakers = [
  {
    name: "Andrew Bailey",
    title: "Professor of Humanities (Philosophy)",
    organization: "Yale-NUS College",
    role: "Board Member, Bitcoin Students Network",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1756640022348-tqOGwZjxqjWK998OoCBwws9wiP62ks.jpg",
  },
  {
    name: "Jeff Booth",
    title: "Founding Partner",
    organization: "Ego Death Capital",
    role: "General Advisor, Bitcoin Students Network",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4504-9dtyMSqO2VdWKOoLfomYdixk4g7ETU.jpeg",
  },
  {
    name: "Natalie Brunell",
    title: "Host and Founder",
    organization: "Coin Stories",
    role: "Bitcoin Educator and Journalist",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1740021423436-A6PJEZZXuBYMO0A6ySnZ0VzLKrZXsQ.jpg",
  },
  {
    name: "Troy Cross",
    title: "Professor of Philosophy & Humanities",
    organization: "Reed College",
    role: "Fellow, Bitcoin Policy Institute",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1626739600155-6QilkFhqEYdnR2avx9X5RrRoO5SD4O.jpg",
  },
  {
    name: "Arman Dashti",
    title: "Founder",
    organization: "Claremont Bitcoin Club",
    role: "Economics & Data Science Student, Claremont McKenna College",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1731361114189-2Bqmhs4APoHrXZ2cSb4ZDu7cBfdXGl.jpg",
  },
  {
    name: "Ella Hough",
    title: "Co-Founder",
    organization: "Bitcoin Students Network",
    role: "Bitcoin Advocacy Associate at Strategy",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1710883451075-KmctyOOYpsH6uTesEMxV1IWip95iF4.jpg",
  },
  {
    name: "Adam Jonas",
    title: "CEO",
    organization: "Chaincode Labs",
    role: "",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1517598054229-rV9MONN4avCAE0qNIy8u9QjQ70JqXD.jpg",
  },
  {
    name: "Blake Kaufman",
    title: "Creator and Builder",
    organization: "Blitz Wallet",
    role: "",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1643141640764-Hk9WoxDqsNS8ILrX4B3NekPPSlBJGb.jpg",
  },
  {
    name: "Abubakar Nur Khalil",
    title: "CEO",
    organization: "Btrust",
    role: "Board Member, Bitcoin Students Network",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1722875880760-onCRTBfCXPDVmecAGCTpojIm6a5McD.jpg",
  },
  {
    name: "Kyle Knight",
    title: "Founder",
    organization: "Bitcoin Culture Hub",
    role: "Founder, UCLA Bitcoin Bruins",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1740949028805-f2uAE2RJZMgUcy0KTjNPdUmSltvSKv.jpg",
  },
  {
    name: "Sean Mihelich",
    title: "Head of Operations",
    organization: "Bitcoin Culture Hub",
    role: "Founder & President, UW-Madison Bitcoin Club",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1761073961788%20%281%29-SC7boeLc87xVzb0mclB0TKVlgj3kb1.jpg",
  },
  {
    name: "Ishaana Misra",
    title: "Bitcoin Core Contributor",
    organization: "MIT",
    role: "Co-Founder, Generation Bitcoin",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%2BShot%2B2023-03-10%2Bat%2B7.30.03%2BPM-z7OjGrf8nTYlLIhuYYozaCGTy8hou6.webp",
  },
  {
    name: "Arsh Molu",
    title: "Co-Founder",
    organization: "Bitcoin Students Network",
    role: "Financial Freedom Operations Lead at Human Rights Foundation",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Profile-Arsh-Molu-V1-StaH3XySQEI1uVks2f2xU2rJkIEqmq.webp",
  },
  {
    name: "Lisa Neigut",
    title: "Founder",
    organization: "Base58",
    role: "Board Member, BSN",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1617074837380-XQpkfIBNXoks7XtE59o0rLhQ5Zm2QO.jpg",
    imagePosition: "40% center",
  },
  {
    name: "Matt Odell",
    title: "Managing Partner",
    organization: "Ten31 VC",
    role: "Co-Founder, OpenSats and Bitcoin Park",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4505-yastyJD8uamgyIZoHSeLGAhNARLLEw.jpeg",
  },
  {
    name: "Salvador Pineda",
    title: "Researcher on Bitcoin and Transitional Justice, MBA Candidate",
    organization: "Cornell University",
    role: "",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1730684659212-cIvRHwyZsSRVEELD6bHt0hOIaIIQ9v.jpg",
  },
  {
    name: "Preston Pysh",
    title: "General Partner",
    organization: "Ego Death Capital",
    role: "Co-Founder, The Investors Podcast Network",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3978-hC0H4sUwfMafzjOawcBXuL3Nt2I1Yd.jpeg",
  },
  {
    name: "Bradley Rettler",
    title: "Associate Professor of Philosophy",
    organization: "University of Wyoming",
    role: "Co-author of Resistance Money",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1744825870303-9RlpDh7w1kjGenZRken3lDoK6Gh31V.jpg",
  },
  {
    name: "Michael Rihani",
    title: "Head of Crypto",
    organization: "Nubank",
    role: "General Advisor, Bitcoin Students Network",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/da7d1ea9002d4015b146a0be25b4dc7f-5DPvXrtARtio1ounSg8PIgPK72EgSv.avif",
  },
  {
    name: "Sabina Waithira",
    title: "Co-founder",
    organization: "Tando",
    role: "",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3977-bhZ0dpwWFJEJZgojxFi0G6gi6eYkp4.jpeg",
  },
  {
    name: "Nicki Sharma",
    title: "Founder and Host",
    organization: "Orange Peel Podcast",
    role: "University of Melbourne student",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/55x0N.jpg",
  },
  {
    name: "Halston Valencia",
    title: "Marketing Director",
    organization: "Bitcoin Well",
    role: "Bitcoin Educator",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rxXB5.jpg",
  },
  {
    name: "Zach Young",
    title: "Analyst",
    organization: "Trammell Venture Partners",
    role: "",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ZOfoH.jpg",
  },
  {
    name: "Zach Cohen",
    title: "Associate",
    organization: "Bitcoin Policy Institute",
    role: "Host, The Bitcoin Policy Hour",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pv6WU.png",
  },
  {
    name: "David Zell",
    title: "President",
    organization: "Bitcoin Policy Institute",
    role: "",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hZoxO.jpg",
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

      <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
        {speakers.map((speaker, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
          >
            <div className="space-y-5">
              {speaker.image ? (
                <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src={speaker.image || "/placeholder.svg"}
                    alt={`${speaker.name} headshot`}
                    fill
                    className="object-cover"
                    style={speaker.imagePosition ? { objectPosition: speaker.imagePosition } : undefined}
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {speaker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}

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
