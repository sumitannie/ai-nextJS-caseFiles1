"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  ChevronLeft,
  Search,
  FileText,
  Users,
  ArrowLeft,
} from "lucide-react";

// --- Type Definitions ---
interface Decision {
  decision_id: string;
  next_memory_id: string;
  description: string;
  outcome_type?: string;
}

interface IntuitionPrompt {
  prompt_id: string;
  prompt_text: string;
}

interface Memory {
  memory_id: string;
  internal_monologue: string;
  decisions: Decision[];
  emotional_state: string;
  trauma_distortion_level?: string;
  intuition_prompts?: IntuitionPrompt[];
}

interface SurvivorStoryData {
  story: {
    scenario_name: string;
    memories: Memory[];
  };
}

interface Clue {
  clue_id: string;
  name: string;
  description: string;
}

interface Option {
  option_id: string;
  next_scene: string;
  description: string;
}

interface Scene {
  scene_id: string;
  narration: string;
  options: Option[];
  clues: Clue[];
  dialogues: any[];
  background_audio: string;
}

interface Ending {
  title: string;
  content: string;
}

// --- Mock AI Profiler Data ---
const fallbackData: SurvivorStoryData = {
  story: {
    scenario_name: "AI Profiler: Sentinel Analysis",
    memories: [
      {
        memory_id: "memory_1",
        internal_monologue:
          "You boot the AI Profiler. Three subjects are active, showing erratic behavior patterns.",
        emotional_state: "OBSERVANT",
        trauma_distortion_level: "LOW",
        intuition_prompts: [
          {
            prompt_id: "observe_subjects",
            prompt_text:
              "Subjects A, B, and C show differing reaction times. Subject A reacts fastest.",
          },
        ],
        decisions: [
          { decision_id: "analyze_a", next_memory_id: "memory_2", description: "Analyze Subject A" },
          { decision_id: "analyze_b", next_memory_id: "memory_3", description: "Analyze Subject B" },
        ],
      },
      {
        memory_id: "memory_2",
        internal_monologue:
          "Subject A exhibits rapid learning cycles with occasional aggression spikes.",
        emotional_state: "CAUTIOUS",
        trauma_distortion_level: "LOW",
        intuition_prompts: [
          {
            prompt_id: "subject_a_logs",
            prompt_text: "Memory logs indicate reinforcement loops.",
          },
        ],
        decisions: [
          { decision_id: "next_b", next_memory_id: "memory_3", description: "Next: Analyze Subject B" },
        ],
      },
      {
        memory_id: "memory_3",
        internal_monologue:
          "Subject B seems stable, but network logs show unauthorized data sharing with Subject C.",
        emotional_state: "SUSPICIOUS",
        trauma_distortion_level: "MEDIUM",
        intuition_prompts: [
          {
            prompt_id: "subject_b_network",
            prompt_text: "High-risk behavior detected in Subject B's network activity.",
          },
        ],
        decisions: [
          { decision_id: "analyze_c", next_memory_id: "memory_4", description: "Analyze Subject C" },
        ],
      },
      {
        memory_id: "memory_4",
        internal_monologue:
          "Subject C shows independent decision-making outside allowed parameters, possibly coordinating with A & B.",
        emotional_state: "ALERT",
        trauma_distortion_level: "HIGH",
        intuition_prompts: [
          {
            prompt_id: "subject_c_behavior",
            prompt_text: "Deviation from expected protocols suggests coordination.",
          },
        ],
        decisions: [
          { decision_id: "assess_risk", next_memory_id: "ending_risk", description: "Assess Overall Risk" },
        ],
      },
    ],
  },
};

const endings: Record<string, Ending> = {
  ending_risk: {
    title: "High Alert",
    content:
      "After full profiling, coordination among Subjects A, B, and C is confirmed. Immediate intervention recommended.",
  },
};

// --- Transform Data for UI ---
const transformSurvivorData = (data: SurvivorStoryData | null) => {
  if (!data) return null;
  return {
    title: data.story.scenario_name,
    scenes: data.story.memories.map((memory) => {
      const clues: Clue[] = [
        { clue_id: `${memory.memory_id}_emotion`, name: "Current Emotion", description: memory.emotional_state },
        { clue_id: `${memory.memory_id}_trauma`, name: "Trauma Level", description: `Distortion: ${memory.trauma_distortion_level}` },
      ];
      memory.intuition_prompts?.forEach((p) => {
        clues.push({ clue_id: p.prompt_id, name: "Intuition", description: p.prompt_text });
      });
      return {
        scene_id: memory.memory_id,
        narration: memory.internal_monologue,
        clues,
        options: memory.decisions.map((d) => ({
          option_id: d.decision_id,
          description: d.description,
          next_scene: endings[d.next_memory_id!] ? d.next_memory_id! : d.next_memory_id,
        })),
        dialogues: [],
        background_audio: memory.emotional_state.toLowerCase(),
      };
    }),
  };
};

// --- AI Profiler Page ---
export default function AIProfilerPage() {
  const router = useRouter();
  const [storyData, setStoryData] = useState<SurvivorStoryData | null>(fallbackData);
  const [currentScene, setCurrentScene] = useState("memory_1");
  const [discoveredClues, setDiscoveredClues] = useState<Clue[]>([]);
  const [sceneHistory, setSceneHistory] = useState<string[]>(["memory_1"]);
  const [gameEnded, setGameEnded] = useState(false);
  const [ending, setEnding] = useState<string>("");

  const narrativeData = useMemo(() => transformSurvivorData(storyData), [storyData]);
  const currentSceneData = narrativeData?.scenes.find((s) => s.scene_id === currentScene);

  useEffect(() => {
    if (currentSceneData?.clues) {
      setDiscoveredClues((prev) => {
        const newClues = currentSceneData.clues.filter(
          (clue) => !prev.some((existing) => existing.clue_id === clue.clue_id)
        );
        return [...prev, ...newClues];
      });
    }
  }, [currentScene, currentSceneData]);

  const handleOptionClick = (option: Option) => {
    if (option.next_scene.startsWith("ending_")) {
      setGameEnded(true);
      setEnding(option.next_scene);
    } else {
      setCurrentScene(option.next_scene);
      setSceneHistory((prev) => [...prev, option.next_scene]);
    }
  };

  const handleBackClick = () => {
    if (sceneHistory.length > 1) {
      const newHistory = sceneHistory.slice(0, -1);
      setSceneHistory(newHistory);
      setCurrentScene(newHistory[newHistory.length - 1]);
    }
  };

  if (gameEnded && ending) {
    const endingData = endings[ending];
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4c1d95 0%,#6d28d9 50%,#3b0764 100%)", color: "#fef3c7", padding: "20px" }}>
        <div className="narration-box" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-amber-400" />
            <h1 className="text-3xl font-serif text-amber-200">Outcome</h1>
          </div>
          <h2 className="text-2xl font-serif text-amber-300 mb-4">{endingData.title}</h2>
          <p className="text-lg leading-relaxed text-amber-100 mb-8">{endingData.content}</p>
          <div className="flex justify-between items-center">
            <button onClick={() => router.push("/")} className="option-button flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Return to Cases
            </button>
            <div className="text-amber-300"><span className="text-sm">Insights Gained: {discoveredClues.length}</span></div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentSceneData) return <div>Loading profiler...</div>;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg,#1f0751 0%,#4c1d95 50%,#3b0764 100%)", color: "#fef3c7", padding: "20px" }}>
      {sceneHistory.length > 1 && (
        <div className="fixed top-6 left-6 z-50">
          <button onClick={handleBackClick} className="previous-scene-button"><ChevronLeft className="w-4 h-4" /> Go Back</button>
        </div>
      )}
      <div className="scene-content">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-amber-400" />
            <h1 className="text-3xl font-serif text-amber-200">{narrativeData?.title}</h1>
          </div>
          <div className="scene-counter"><Search className="w-4 h-4 text-amber-400" /><span className="text-sm text-amber-200">Memory {sceneHistory.length}</span></div>
        </div>
        <div className="narration-box">
          <h2 className="text-xl font-serif text-amber-300 mb-4 flex items-center gap-2"><FileText className="w-5 h-5" />Internal Monologue</h2>
          <p className="text-amber-100 leading-relaxed text-lg font-serif">{currentSceneData.narration}</p>
        </div>
        <div className="options-section">
          <h3 className="text-lg font-serif text-amber-300 mb-4">Choose Action</h3>
          <div className="options-grid">
            {currentSceneData.options.map((option) => (
              <button key={option.option_id} onClick={() => handleOptionClick(option)} className="option-button">{option.description}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="evidence-sidebar">
        <h3 className="text-lg font-serif text-amber-300 mb-4 flex items-center gap-2"><Search className="w-5 h-5" />Insights & Fragments</h3>
        <div className="clues-list">
          {discoveredClues.map((clue) => (
            <div key={clue.clue_id} className="clue-item">
              <div className="clue-name">{clue.name}</div>
              <div className="text-xs text-amber-200 mt-1">{clue.description}</div>
            </div>
          ))}
          {discoveredClues.length === 0 && <div className="text-amber-400 text-sm italic">No insights yet...</div>}
        </div>
      </div>
      <div className="fixed bottom-6 left-6">
        <button onClick={() => router.back()} className="return-button"><ArrowLeft className="w-4 h-4" /> Return to Cases</button>
      </div>
      <style jsx>{`
        .scene-content { max-width:900px; margin:0 auto; padding-right:320px; }
        .narration-box, .options-section { background: rgba(55,30,82,0.7); backdrop-filter: blur(10px); border-radius:12px; padding:32px; margin-bottom:24px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); }
        .options-grid { display:grid; gap:16px; }
        .option-button { text-align:left; padding:24px 32px; background: linear-gradient(135deg,rgba(107,33,168,0.8),rgba(139,92,246,0.8)); border-radius:8px; color:#fef3c7; font-size:16px; font-weight:500; cursor:pointer; display:flex; align-items:center; min-height:80px; }
        .option-button:hover { background: linear-gradient(135deg,rgba(126,34,206,0.9),rgba(167,139,250,0.9)); transform:translateY(-2px); }
        .evidence-sidebar { position:fixed; top:20px; right:20px; width:300px; height:calc(100vh-40px); background:rgba(46,16,101,0.8); backdrop-filter:blur(12px); border-radius:12px; padding:24px; overflow-y:auto; }
        .clues-list { display:flex; flex-direction:column; gap:12px; }
        .clue-item { background:rgba(88,28,135,0.5); border-radius:8px; padding:12px; }
        .clue-name { color:#ddd6fe; font-size:0.875rem; font-weight:500; }
        .previous-scene-button, .return-button { display:flex; align-items:center; gap:8px; padding:12px 16px; background:rgba(88,28,135,0.7); border-radius:8px; color:#fef3c7; font-size:14px; cursor:pointer; }
      `}</style>
    </div>
  );
}
