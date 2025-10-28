"use client"

import { Button } from "@/components/ui/button"
import { AboutFAQSection } from "@/components/about-faq-section"
import { RSVPForm } from "@/components/rsvp-form"
import { SpeakersSection } from "@/components/speakers-section"
import { Calendar, Clock, Globe } from "lucide-react"

const config = {
  event_phase: "pre-event",
  event_title: "Bitcoin Students Network Summit",
  event_date: "November 21, 2025",
  event_location: "Virtual",
  event_time: "12 PM - 3 PM ET",
  event_tagline: "Connecting academia to the opportunity of Bitcoin",
  rsvp_enabled: true,
}

export function EventPhaseContent() {
  return (
    <div className="w-full">
      <section className="relative bg-gradient-to-b from-[#002E1E] to-[#001A12] overflow-hidden">
        <div className="container mx-auto px-6 py-32 md:py-40 max-w-7xl relative z-10">
          <div className="text-center space-y-10 animate-fade-in-up">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-balance leading-[1.1] tracking-tight text-white">
                <a
                  href="https://www.bitcoinstudentsnetwork.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Bitcoin Students Network
                </a>{" "}
                Summit
              </h1>
              <div className="flex items-center justify-center gap-2 text-lg md:text-xl">
                <span className="text-white/60 font-normal">powered by</span>
                <a
                  href="https://www.bitcoinculturehub.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F7931A] font-bold hover:underline transition-all"
                >
                  Bitcoin Culture Hub
                </a>
              </div>
            </div>
            <p className="text-xl md:text-2xl text-primary font-semibold tracking-wide max-w-3xl mx-auto leading-relaxed">
              {config.event_tagline}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 text-base mt-20">
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">Date</div>
                  <div className="font-semibold text-white text-lg">{config.event_date}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">Time</div>
                  <div className="font-semibold text-white text-lg">{config.event_time}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">Format</div>
                  <div className="font-semibold text-white text-lg">{config.event_location}</div>
                </div>
              </div>
            </div>

            <div className="relative z-20 pt-4">
              <Button
                size="lg"
                className="font-semibold text-lg px-12 py-8 mt-8 rounded-2xl bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                onClick={() => document.getElementById("register-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                Register Now - It's Free →
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about-section" className="bg-white py-32 md:py-40 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <AboutFAQSection />
        </div>
      </section>

      <section id="speakers-section" className="bg-gradient-to-b from-[#EED9EB] to-white py-32 md:py-40 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <SpeakersSection />
        </div>
      </section>

      <section id="register-section" className="bg-white py-32 md:py-40 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 space-y-6 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-bold text-[#002E1E] tracking-tight">Register for the Summit</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
              Secure your spot at the BSN Summit and connect with students and industry leaders from around the world.
            </p>
          </div>
          <RSVPForm />
        </div>
      </section>

      <footer className="bg-[#001A12] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="container mx-auto px-6 max-w-7xl h-full relative">
            <img src="/student-silhouette.png" alt="" className="absolute top-8 left-[15%] h-24 w-auto" />
            <img src="/bitcoin-icon.png" alt="" className="absolute top-12 right-[20%] h-20 w-auto" />
            <img src="/laptop-silhouette.jpg" alt="" className="absolute bottom-8 left-[40%] h-22 w-auto" />
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="h-1 w-32 bg-[#F7931A] mx-auto mb-10 rounded-full" />
          <div className="text-center space-y-8">
            <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold">Powered by</p>
            <a href="https://www.bitcoinculturehub.com/" target="_blank" rel="noopener noreferrer" className="block">
              <h3 className="text-4xl font-bold text-[#F7931A] hover:underline transition-all">Bitcoin Culture Hub</h3>
            </a>
            <div className="space-y-3">
              <p className="text-2xl font-semibold text-white">Lifelong Learning with Bitcoin</p>
              <p className="text-lg text-[#C4D5CC] max-w-2xl mx-auto leading-relaxed font-normal">
                A new frontier of learning and belonging. Explore Bitcoin through culture, knowledge, and connection.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
