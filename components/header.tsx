"use client"

import { Button } from "@/components/ui/button"

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="border-b border-white/10 bg-[#00260B] sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between gap-8">
          <div className="flex flex-col gap-1">
            <a
              href="https://www.bitcoinstudentsnetwork.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold text-white hover:text-[#B860AC] transition-colors"
            >
              Bitcoin Students Network Summit
            </a>
            <span className="text-sm text-white/70">
              powered by{" "}
              <a
                href="https://www.bitcoinculturehub.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F7931A] font-semibold hover:underline transition-all"
              >
                Bitcoin Culture Hub
              </a>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("about-section")}
                className="text-white/80 hover:text-white font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("speakers-section")}
                className="text-white/80 hover:text-white font-medium transition-colors"
              >
                Speakers
              </button>
            </div>
            <Button
              size="default"
              className="bg-[#B860AC] hover:bg-[#B860AC]/90 text-white font-semibold px-8 py-2 shadow-lg hover:shadow-xl transition-all"
              onClick={() => scrollToSection("register-section")}
            >
              Register Free
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
