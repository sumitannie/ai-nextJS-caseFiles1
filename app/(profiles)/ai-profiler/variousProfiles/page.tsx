"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const profiles = [
  {
    id: "victorian_banker/ai-profiler",
    title: "Victorian Banker Murder",
    description:
      "Analyze the psychological profiles of the banker's emotional wife, stoic secretary, and ruthless business rival through behavioral data from initial interviews.",
    setting: "Victorian London",
    difficulty: "Medium",
    theme: "from-amber-700 to-yellow-600",
    textColor: "text-white",
    icon: "🏛️",
  },
  {
    id: "countryside_manor/ai-profiler",
    title: "Countryside Manor Death",
    description:
      "Profile family members present at a gathering where a wealthy landowner was found dead, focusing on behavioral deception patterns.",
    setting: "English Manor",
    difficulty: "Medium",
    theme: "from-green-700 to-emerald-600",
    textColor: "text-white",
    icon: "🏰",
  },
  {
    id: "cyber_london/ai-profiler",
    title: "Tech CEO Poisoning",
    description:
      "Generate psychological profiles of the ambitious COO, resentful engineer, and secretive spouse through digital communications analysis.",
    setting: "Modern London",
    difficulty: "Hard",
    theme: "from-blue-600 to-cyan-500",
    textColor: "text-white",
    icon: "💻",
  },
  // {
  //   id: "kolkata-journalist",
  //   title: "Kolkata Journalist Case",
  //   description:
  //     "Profile a rival journalist, disgruntled politician, and close colleague through micro-expression analysis and deceptive language patterns.",
  //   setting: "Kolkata, India",
  //   difficulty: "Hard",
  //   theme: "from-orange-600 to-red-500",
  //   textColor: "text-white",
  //   icon: "📰",
  // },
  // {
  //   id: "noir-jazz-singer",
  //   title: "Missing Jazz Singer",
  //   description:
  //     "Analyze the nightclub owner, rival singer, and obsessive fan for traits of obsession, jealousy, and control in this noir-style disappearance.",
  //   setting: "New York City",
  //   difficulty: "Medium",
  //   theme: "from-purple-700 to-indigo-600",
  //   textColor: "text-white",
  //   icon: "🎷",
  // },
  {
    id: "art_theft_paris/ai-profiler",
    title: "Louvre Art Theft",
    description:
      "Profile the disgruntled guard, arrogant curator, and notorious dealer for psychological traits like narcissism, greed, and resentment.",
    setting: "Paris, France",
    difficulty: "Hard",
    theme: "from-rose-600 to-pink-500",
    textColor: "text-white",
    icon: "🎨",
  },
  {
    id: "snowy_lodge/ai-profiler",
    title: "Snowy Lodge Murder",
    description:
      "Analyze changing psychological states of guests trapped by snowstorm, modeling escalating paranoia and tension patterns.",
    setting: "Mountain Lodge",
    difficulty: "Medium",
    theme: "from-slate-600 to-blue-400",
    textColor: "text-white",
    icon: "🏔️",
  },
  {
    id: "professor_study/ai-profiler",
    title: "Professor Study Death",
    description:
      "Profile the protege, academic rival, and family member in an ambiguous death case requiring analysis of psychological stability and motive staging.",
    setting: "University",
    difficulty: "Hard",
    theme: "from-teal-700 to-green-500",
    textColor: "text-white",
    icon: "📚",
  },
];

export default function VariousProfilesPage() {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              PSYCHOLOGICAL PROFILING CASES
            </h1>
            <p className="text-xl text-gray-300  mx-auto leading-relaxed">
              Select a case file for behavioral analysis. Each scenario requires
              data-driven psychological profiling to model motives and predict
              criminal intent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto">
            {profiles.map((profile) => (
              <Link
                key={profile.id}
                href={`#`}
                className="group block"
                onClick={() => {
                  toast.info("Coming Soon");
                }}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${profile.theme} p-8 h-80 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25`}
                >
                  <div className="absolute inset-0 bg-black/20"></div>

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-4xl mb-4">{profile.icon}</div>
                      <h3
                        className={`text-2xl font-bold mb-3 ${profile.textColor} group-hover:text-white transition-colors`}
                      >
                        {profile.title}
                      </h3>
                      <p
                        className={`text-sm mb-4 ${profile.textColor} opacity-90 leading-relaxed`}
                      >
                        {profile.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <div
                          className={`text-xs ${profile.textColor} opacity-75 mb-1`}
                        >
                          SETTING
                        </div>
                        <div
                          className={`text-sm font-semibold ${profile.textColor}`}
                        >
                          {profile.setting}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-xs ${profile.textColor} opacity-75 mb-1`}
                        >
                          COMPLEXITY
                        </div>
                        <div
                          className={`text-sm font-semibold ${profile.textColor}`}
                        >
                          {profile.difficulty}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="fixed bottom-6 left-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl z-20"
        >
          ← Back
        </button>
      </div>
    </>
  );
}
