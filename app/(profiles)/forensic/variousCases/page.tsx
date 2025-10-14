"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function VariousPagesPage() {
  const router = useRouter()

  const cases = [
    {
      id: "victorian_banker/forensic",
      title: "The Threadneedle Street Murder",
      description:
        "Analysis of a drugged sherry glass, a bloody paperweight, and mud-stained footprints reveals the dark secrets of Victorian high finance.",
      setting: "Forensic Lab, 1888 London",
      difficulty: "Medium",
      theme: "from-purple-900 to-indigo-900",
      textColor: "text-amber-300",
      icon: "🔬",
    },
    {
      id: "countryside_manor/forensic",
      title: "The Blackwood Manor Mystery",
      description: "Toxicology on a shattered wine glass, document analysis of a contested will, and biological traces from a feather expose the truth.",
      setting: "Forensic Lab, English Countryside",
      difficulty: "Medium",
      theme: "from-amber-800 to-orange-900",
      textColor: "text-amber-100",
      icon: "🧪",
    },
    // {
    //   id: "cyber_london/forensic",
    //   title: "Digital Shadows: The Silicon Murder",
    //   description: "Digital forensics on a laptop, a smart mug's data logs, and chemical analysis of keyboard residue uncover a high-tech crime.",
    //   setting: "Digital Forensics Unit, Modern London",
    //   difficulty: "Hard",
    //   theme: "from-green-900 to-teal-900",
    //   textColor: "text-green-300",
    //   icon: "💻",
    // },
    {
      id: "noir_newyork/forensic",
      title: "Shadows in the Spotlight",
      description: "Material analysis of a scuffed shoe, chemical profiling of lipstick, and audio recovery from a damaged record reveal a conspiracy.",
      setting: "Forensic Lab, 1947 New York City",
      difficulty: "Hard",
      theme: "from-gray-900 to-yellow-900",
      textColor: "text-amber-400",
      icon: "🎙️",
    },
    {
      id: "art_theft_paris/forensic",
      title: "The Louvre Heist",
      description: "Tool mark analysis on a cut wire, fingerprint matching, and pigment spectroscopy on a stray paint chip expose an elaborate plot.",
      setting: "Forensics Unit, Paris",
      difficulty: "Medium",
      theme: "from-red-900 to-pink-900",
      textColor: "text-rose-300",
      icon: "🧬",
    },
    // {
    //   id: "snowy_lodge/forensic",
    //   title: "The Pine Ridge Lodge Mystery",
    //   description: "Metallurgical analysis of a fireplace poker, toxicology, and isotopic analysis of melted snow solve a locked-room murder.",
    //   setting: "Field Forensics, Mountain Lodge",
    //   difficulty: "Medium",
    //   theme: "from-blue-900 to-cyan-900",
    //   textColor: "text-blue-300",
    //   icon: "❄️",
    // },
    {
      id: "professor_study/forensic",
      title: "The Professor's Final Lesson",
      description:
        "Toxicology of prescription meds, document analysis of a note, and a computer's activity log differentiate between murder and suicide.",
      setting: "Forensic Lab, University Campus",
      difficulty: "Hard",
      theme: "from-emerald-900 to-green-900",
      textColor: "text-emerald-300",
      icon: " M ",
    },
  ]

  return (
    <>
      <style jsx>{`
        .case-container {
          min-height: 100vh;
          position: relative;
          background-image: url('/imgForensicCases.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        /* Dark overlay for eerie vibe */
        .overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.65); /* dark, transparent */
          z-index: 0;
        }
        .cases-content {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 768px) {
          .cases-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .cases-content {
            padding: 15px;
          }
        }
      `}</style>

      <div className="case-container">
        <div className="overlay"></div>

        <div className="cases-content">
          {/* Header */}
          <div className="flex flex-col items-center justify-center text-center py-20 mb-16 gap-6">
            <h1 className="text-6xl font-bold text-white mb-6 font-serif">
              Forensic Case Files
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Choose a case file. Seven sets of evidence await your expert analysis.
              Each case presents unique forensic challenges to uncover the scientific truth.
            </p>

            {/* Medium Bouncing Arrow */}
            <div className="mt-6 animate-bounce text-4xl text-white">
              ⬇️
            </div>
          </div>

          {/* Cases Grid */}
          <div className="cases-grid">
            {cases.map((case_item) => (
              <Link
                key={case_item.id}
                href={`/${case_item.id}`}
                className="group block transform transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`bg-gradient-to-br ${case_item.theme} rounded-2xl p-6 shadow-2xl border border-gray-700 hover:border-gray-500 transition-all duration-300 h-full`}
                >
                  <div className="text-6xl mb-4 text-center">{case_item.icon}</div>
                  <h3
                    className={`text-2xl font-bold ${case_item.textColor} mb-3 text-center font-serif`}
                  >
                    {case_item.title}
                  </h3>
                  <p className="text-gray-300 text-base mb-4 leading-relaxed">
                    {case_item.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Location:</span>
                      <span className={`${case_item.textColor} text-sm font-medium`}>
                        {case_item.setting}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Complexity:</span>
                      <span className={`${case_item.textColor} text-sm font-medium`}>
                        {case_item.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <span
                      className={`inline-block px-8 py-4 ${case_item.textColor} border-2 border-current rounded-lg font-bold text-base transition-all duration-300 group-hover:bg-black/20 group-hover:backdrop-blur-sm min-w-[140px]`}
                    >
                      Analyze Evidence →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="fixed bottom-6 left-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-base shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl min-w-[180px]"
          >
            ← Back to Mainframe
          </button>
        </div>
      </div>
    </>
  )
}
