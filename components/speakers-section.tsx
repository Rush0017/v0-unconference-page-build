"use client"

import { Users } from "lucide-react"
import { useState } from "react"

const speakers = [
  {
    name: "Abubakar Nur Khalil",
    bio: "CEO, Btrust; Board Member, Bitcoin Students Network",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1722875880760-onCRTBfCXPDVmecAGCTpojIm6a5McD.jpg"
  },
  {
    name: "Adam Jonas",
    bio: "CEO, Chaincode Labs",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1517598054229-rV9MONN4avCAE0qNIy8u9QjQ70JqXD.jpg"
  },
  {
    name: "Anaïse Kanimba",
    bio: "Global development strategist and human rights advocate; Founding Member, World Liberty Congress",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vMHWRJz6uii56aIYF690ul8KVGVGYf.png"
  },
  {
    name: "Andrew Bailey",
    bio: "Professor of Humanities (Philosophy), Yale-NUS College; Board Member, Bitcoin Students Network",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1756640022348-tqOGwZjxqjWK998OoCBwws9wiP62ks.jpg"
  },
  {
    name: "Anna Stenstrom",
    bio: "Fellow at University of Alabama; Bitcoin Policy Advocate intern at BPI",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M1KFPMthtdnwXRoXS3T0wRT6vYiunf.png"
  },
  {
    name: "Arman Dashti",
    bio: "Founder, Claremont Bitcoin Club; Economics & Data Science Student, Claremont McKenna College",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1731361114189-2Bqmhs4APoHrXZ2cSb4ZDu7cBfdXGl.jpg"
  },
  {
    name: "Arsh Molu",
    bio: "Co-Founder, Bitcoin Students Network; Financial Freedom Operations Lead at Human Rights Foundation",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Profile-Arsh-Molu-V1-StaH3XySQEI1uVks2f2xU2rJkIEqmq.webp"
  },
  {
    name: "Blake Kaufman",
    bio: "Creator and Builder, Blitz Wallet",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1643141640764-Hk9WoxDqsNS8ILrX4B3NekPPSlBJGb.jpg"
  },
  {
    name: "Bradley Rettler",
    bio: "Associate Professor of Philosophy, University of Wyoming; Co-author of Resistance Money",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1744825870303-9RlpDh7w1kjGenZRken3lDoK6Gh31V.jpg"
  },
  {
    name: "David Zell",
    bio: "President, Bitcoin Policy Institute",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AEdPHnUj0XesLEmDIRdpdswKYk1SuG.png"
  },
  {
    name: "Demian Schatt",
    bio: "Head of Operations, The Bitcoin Layer; Founder and President, USC Bitcoin Club",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pGeKmkoqm9byltPVmto1kO5dM2zsy6.png"
  },
  {
    name: "Ella Hough",
    bio: "Co-Founder, Bitcoin Students Network; Bitcoin Advocacy Associate at Strategy",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1710883451075-KmctyOOYpsH6uTesEMxV1IWip95iF4.jpg"
  },
  {
    name: "Fabian Kraus",
    bio: "Intern: Summer of Bitcoin; studied under Rene Pickhart",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-i7fURbcJu4eqwz3BQvm1x2ZQDwpKap.png"
  },
  {
    name: "Filip Djurovic",
    bio: "Founder of Bitcoin Club; Student at Rochester Institute of Technology",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HgRk4j4brQ7qgNqt7uoxhRyuuUhcwA.png"
  },
  {
    name: "Francesco Pelle",
    bio: "President, BitPolito",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3ZWm82c9osfobwf2rud1zt0C34fL71.png"
  },
  {
    name: "Halston Valencia",
    bio: "Marketing Director, Bitcoin Well; Bitcoin Educator",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-q8nXgl5y8BubfRBnH72UiUQYIwHxPS.png"
  },
  {
    name: "Ishaana Misra",
    bio: "Bitcoin Core Contributor, MIT; Co-Founder, Generation Bitcoin",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%2BShot%2B2023-03-10%2Bat%2B7.30.03%2BPM-z7OjGrf8nTYlLIhuYYozaCGTy8hou6.webp"
  },
  {
    name: "Jack Mallers",
    bio: "Founder and CEO of Strike, Twenty One",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-d6s5UaB8oObJ1fuSR9Ukl0oHaofyoC.png"
  },
  {
    name: "Janie England",
    bio: "Student at BYU-Idaho; Intern with Senator Cynthia Lummis and Bitcoin Policy Institute",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6f5mKIXPhz2eRXkiMf79Z4Tp78tYJ4.png"
  },
  {
    name: "Jeff Booth",
    bio: "Founding Partner, Ego Death Capital; General Advisor, Bitcoin Students Network",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4504-9dtyMSqO2VdWKOoLfomYdixk4g7ETU.jpeg"
  },
  {
    name: "Kyle Knight",
    bio: "Founder, Bitcoin Culture Hub; Founder, UCLA Bitcoin Bruins",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1740949028805-f2uAE2RJZMgUcy0KTjNPdUmSltvSKv.jpg"
  },
  {
    name: "Lisa Neigut",
    bio: "Founder, Base58; Board Member, BSN",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1617074837380-XQpkfIBNXoks7XtE59o0rLhQ5Zm2QO.jpg",
    imagePosition: "40% center"
  },
  {
    name: "Lorraine Marcel",
    bio: "Founder of Bitcoin Dada; Financial activist empowering African women",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QtEsGbkpBassl1JOnDf16Q8zrntq1f.png"
  },
  {
    name: "Lucas Ferreira",
    bio: "Co-founder and Executive Director, Vinteum; Organizer, Satsconf",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-j7dLKrvEw9Px7Zns3fMnntNPG2DcYZ.png"
  },
  {
    name: "Luke Danielian",
    bio: "Intern, Bitcoin Policy Institute; Student, University of Maryland",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vQHvJFagFHQcJfbgZY85HQ2frEA8uH.png"
  },
  {
    name: "Matt Odell",
    bio: "Managing Partner, Ten31 VC; Co-Founder, OpenSats and Bitcoin Park",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4505-yastyJD8uamgyIZoHSeLGAhNARLLEw.jpeg"
  },
  {
    name: "Matthew Vuk",
    bio: "Ark liquidity researcher, Second; Economics & Accounting student; BSN member",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wGEDWLRrsKqDH714OIlzXf0ypZqlxo.png"
  },
  {
    name: "Michael Rihani",
    bio: "Head of Crypto, Nubank; General Advisor, Bitcoin Students Network",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/da7d1ea9002d4015b146a0be25b4dc7f-5DPvXrtARtio1ounSg8PIgPK72EgSv.avif"
  },
  {
    name: "Natalie Brunell",
    bio: "Host and Founder, Coin Stories; Bitcoin Educator and Journalist",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1740021423436-A6PJEZZXuBYMO0A6ySnZ0VzLKrZXsQ.jpg"
  },
  {
    name: "Neha Narula",
    bio: "Director, Digital Currency Initiative, MIT Media Lab; Board Member, Block",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mldqgndEVtle7B2ykUh8nqLceIS8Cc.png"
  },
  {
    name: "Nicki Sharma",
    bio: "Founder and Host, Orange Peel Podcast; University of Melbourne student",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2vpLVBa8cadHAKsvShltKBpzbGPn0m.png"
  },
  {
    name: "Nik Bhatia",
    bio: "Founder of The Bitcoin Layer; Adjunct Professor of Finance, USC Marshall School of Business",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cPX35RJSL2nWBe4wwB0RMlm0vWIYLA.png"
  },
  {
    name: "Pedro Merino",
    bio: "Cofounder of Bitcoin Students Network ITAM",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XFRjJVcf1TkvlAvboxbTfoBEBVxdTP.png"
  },
  {
    name: "Sabina Waithira",
    bio: "Co-founder, Tando",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3977-bhZ0dpwWFJEJZgojxFi0G6gi6eYkp4.jpeg"
  },
  {
    name: "Salvador Pineda",
    bio: "Researcher on Bitcoin and Transitional Justice, MBA Candidate, Cornell University",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1730684659212-cIvRHwyZsSRVEELD6bHt0hOIaIIQ9v.jpg"
  },
  {
    name: "Sean Mihelich",
    bio: "Head of Business Development, Bitcoin Culture Hub; Founder & President, Wisconsin Bitcoin Club",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WlQBLrnBX91sqqZOIl0uUOFIRRfkNz.png"
  },
  {
    name: "Shehzan Maredia",
    bio: "Founder and CEO, Lava",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hj8s5zEkSSna7UB6Zoy4ZoJJcxr2YJ.png"
  },
  {
    name: "Troy Cross",
    bio: "Professor of Philosophy & Humanities, Reed College; Fellow, Bitcoin Policy Institute",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1626739600155-6QilkFhqEYdnR2avx9X5RrRoO5SD4O.jpg"
  },
  {
    name: "Zach Young",
    bio: "Analyst, Trammell Venture Partners",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7fThedsXeshxHFc9UWsVfPUpd4Vm2Q.png"
  },
  {
    name: "Zack Cohen",
    bio: "Associate, Bitcoin Policy Institute; Host, The Bitcoin Policy Hour",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yvrNzRv4HI0woLGnhPqIcpQuhZkrdU.png"
  },
  {
    name: "Adi Shankara",
    bio: "Senior Product Manager of Lightning at Blockstream & Lead at Summer of Bitcoin",
    image: "https://btcprague.com/wp-content/uploads/2023/06/Adi-Shankara.jpg"
  },
  {
    name: "Daniela Villalba",
    bio: "Unchained, The Ledger Chronicles",
    image: "https://media.licdn.com/dms/image/v2/D5603AQFlbqPGVxPUSw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1716064352741?e=1765411200&v=beta&t=TNJmMPljEjPrRXAxs2DUnrCmFTXzQxb7VcVMOGCEhNY"
  },
  {
    name: "Anja Schuetz",
    bio: "Founder of BITVOCATION",
    image: "https://anjaschuetz.net/wp-content/uploads/2019/08/Screenshot-2019-08-18-at-15.37.37.png"
  },
  {
    name: "Shiv Chandran",
    bio: "Client Operations @ River",
    image: "https://media.licdn.com/dms/image/v2/D5603AQHlhzbvtpGatA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723671149213?e=1765411200&v=beta&t=LMwW4q8wqLHqds7yRKANZxG39ZZJEAtsFoRbe1dB-H8"
  }
]
const sortedSpeakers = speakers.sort((a, b) => {
  const aLast = a.name.split(" ").slice(-1)[0];
  const bLast = b.name.split(" ").slice(-1)[0];
  return aLast.localeCompare(bLast);
});

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
        {sortedSpeakers.map((speaker, index) => (
          <SpeakerCard key={index} speaker={speaker} />
        ))}
      </div>
    </div>
  )
}

function SpeakerCard({ speaker }: { speaker: (typeof speakers)[0] }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="group bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
      <div className="space-y-5">
        {speaker.image && !imageError ? (
          <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg">
            <img
              src={speaker.image || "/placeholder.svg"}
              alt={`${speaker.name} headshot`}
              className="w-full h-full object-cover"
              style={speaker.imagePosition ? { objectPosition: speaker.imagePosition } : undefined}
              onError={() => setImageError(true)}
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
          <p className="text-sm text-gray-600 leading-relaxed">{speaker.bio}</p>
        </div>
      </div>
    </div>
  )
}
