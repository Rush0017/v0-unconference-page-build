"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Globe, Users, ChevronDown } from "lucide-react"
import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "Who can attend?",
    answer:
      "Any student, educator, or professional interested in Bitcoin is welcome. You don't need to be in a Bitcoin club to join.",
  },
  {
    question: "Is the event free?",
    answer: "Yes. Attendance is completely free. RSVP to receive the event link and updates.",
  },
  {
    question: "How do I register?",
    answer:
      "Fill out the RSVP form on this page. You'll be asked for your name, school, and topics or speakers you're interested in.",
  },
  {
    question: "Will sessions be recorded?",
    answer: "Yes. All main sessions will be recorded and shared afterward with registered attendees.",
  },
  {
    question: "How can I get involved or partner?",
    answer:
      "After the Summit, we'll share ways to join regional programs or collaborate on initiatives. You can also email kyle@bitcoinculturehub.com.",
  },
]

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left text-gray-900 hover:text-primary transition-colors group"
      >
        <span className="font-semibold pr-4 text-base">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 text-gray-500 group-hover:text-primary ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-gray-600 leading-relaxed text-base">{item.answer}</div>
      </div>
    </div>
  )
}

export function AboutFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="bg-gradient-to-br from-[#1C3B2E] to-[#234E3A] py-24 rounded-[32px] shadow-2xl">
      <div className="container mx-auto px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            {/* About Section */}
            <div className="space-y-10 animate-fade-in-up">
              <h2 className="text-5xl md:text-6xl font-bold text-primary tracking-tight">About the Summit</h2>
              <div className="space-y-6 text-[#C4D5CC] leading-relaxed text-lg font-normal">
                <p>
                  The{" "}
                  <a
                    href="https://www.bitcoinstudentsnetwork.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline transition-all font-semibold"
                  >
                    Bitcoin Students Network
                  </a>{" "}
                  Summit connects the next generation of builders with leaders shaping Bitcoin's future.
                </p>
                <p>
                  This free virtual event brings together university clubs, students, and industry experts for talks,
                  discussions, and global collaboration.
                </p>
              </div>

              <Card className="bg-white rounded-2xl shadow-lg card-elevated border-0">
                <CardContent className="pt-8 pb-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-4">
                      <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Date</div>
                        <div className="font-bold text-base mt-1">Nov 21, 2025</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Time</div>
                        <div className="font-bold text-base mt-1">12 PM–3 PM ET</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Globe className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                          Format
                        </div>
                        <div className="font-bold text-base mt-1">Virtual</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Users className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                          Audience
                        </div>
                        <div className="font-bold text-base mt-1">Students & Educators</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center gap-4 pt-6">
                <span className="text-base text-[#C4D5CC] font-normal">Powered by</span>
                <a
                  href="https://www.bitcoinculturehub.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-accent hover:underline transition-all"
                >
                  Bitcoin Culture Hub
                </a>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-5xl md:text-6xl font-bold text-primary tracking-tight">FAQ</h2>
              <Card className="bg-white rounded-2xl shadow-lg card-elevated border-0">
                <CardContent className="pt-10 pb-6">
                  <div className="space-y-0">
                    {faqs.map((faq, index) => (
                      <FAQAccordion
                        key={index}
                        item={faq}
                        isOpen={openIndex === index}
                        onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
