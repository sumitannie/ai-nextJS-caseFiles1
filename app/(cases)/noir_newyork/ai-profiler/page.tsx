"use client";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

// --- Type Definitions for AI Profiler ---
interface Decision {
  decision_id: string;
  next_scene: string;
  description: string;
}

interface Clue {
  clue_id: string;
  name: string;
  description: string;
}

interface Scene {
  scene_id: string;
  narration: string;
  options: Decision[];
  clues?: Clue[];
  dialogues?: { character: string; speech: string }[];
}

interface NarrativeCaseData {
  title: string;
  scenes: Scene[];
}

// --- Mock AI Profiler Data ---
const mockAIProfilerData: NarrativeCaseData = {
  title: "AI Profiler: Sentinel Analysis",
  scenes: [
    {
      scene_id: "scene_1",
      narration:
        "You boot the AI Profiler. Three subjects are active, showing erratic behavior patterns. Your task: analyze, log, and intervene if necessary.",
      dialogues: [
        { character: "System", speech: "Welcome, Analyst. Subjects A, B, and C are online." },
        { character: "You", speech: "Let's start profiling each subject." },
      ],
      options: [
        { decision_id: "analyze_a", description: "Analyze Subject A", next_scene: "scene_2" },
        { decision_id: "analyze_b", description: "Analyze Subject B", next_scene: "scene_3" },
      ],
    },
    {
      scene_id: "scene_2",
      narration:
        "Subject A exhibits rapid learning cycles with occasional aggression spikes. Memory logs suggest possible self-reinforcement loops.",
      clues: [
        { clue_id: "a_logs", name: "Subject A Logs", description: "Memory logs indicate reinforcement loops." },
        { clue_id: "a_emotion", name: "Emotional State", description: "Aggression spikes detected." },
      ],
      options: [
        { decision_id: "next_b", description: "Next: Analyze Subject B", next_scene: "scene_3" },
      ],
    },
    {
      scene_id: "scene_3",
      narration:
        "Subject B seems stable, but network logs show unauthorized data sharing with Subject C. Flagged as high-risk.",
      clues: [
        { clue_id: "b_network", name: "Subject B Network Logs", description: "Unauthorized data sharing detected." },
      ],
      options: [
        { decision_id: "analyze_c", description: "Analyze Subject C", next_scene: "scene_4" },
      ],
    },
    {
      scene_id: "scene_4",
      narration:
        "Subject C shows independent decision-making outside allowed parameters. Correlates with Subjects A & B, suggesting coordinated behavior.",
      clues: [
        { clue_id: "c_behavior", name: "Subject C Patterns", description: "Deviation from expected protocols." },
      ],
      options: [
        { decision_id: "assess_risk", description: "Assess Overall Risk", next_scene: "ending" },
      ],
    },
    {
      scene_id: "ending",
      narration:
        "After full profiling, coordination among Subjects A, B, and C is confirmed. Immediate intervention recommended.",
      dialogues: [
        { character: "System", speech: "Alert: Risk mitigation protocols recommended." },
        { character: "You", speech: "All subjects documented. Intervention plan prepared." },
      ],
      options: [],
    },
  ],
};

export default function AIProfilerPage() {
  const router = useRouter();
  const [currentScene, setCurrentScene] = useState("scene_1");
  const [discoveredInsights, setDiscoveredInsights] = useState<string[]>([]);
  const [sceneHistory, setSceneHistory] = useState<string[]>(["scene_1"]);

  const caseData = useMemo(() => mockAIProfilerData, []);
  const scene = caseData.scenes.find((s) => s.scene_id === currentScene);

  useEffect(() => {
    if (scene?.clues) {
      const newClues = scene.clues.map((c) => c.clue_id);
      setDiscoveredInsights((prev) => [...new Set([...prev, ...newClues])]);
    }
  }, [currentScene, scene]);

  const handleOptionClick = (option: Decision) => {
    setSceneHistory((prev) => [...prev, option.next_scene]);
    setCurrentScene(option.next_scene);
  };

  const handleBackToScene = () => {
    if (sceneHistory.length > 1) {
      const newHistory = [...sceneHistory];
      newHistory.pop();
      const prevScene = newHistory[newHistory.length - 1];
      setSceneHistory(newHistory);
      setCurrentScene(prevScene);
    }
  };

  if (!scene) {
    return (
      <div className="error-screen">
        <h2>Profiler Data Corrupted</h2>
        <Link href="/">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <>
      <div className="case-container">
        <div className="noir-overlay"></div>
        <div className="case-header">
          <h1>{caseData.title}</h1>
          <div className="clues-counter">Insights Gained: {discoveredInsights.length}</div>
        </div>

        <div className="scene-content">
          {sceneHistory.length > 1 && scene.options.length > 0 && (
            <button className="scene-back-button" onClick={handleBackToScene}>
              ← Reconsider
            </button>
          )}

          <div className="narration-box">
            <h3>🧠 Analysis</h3>
            <p>{scene.narration}</p>
          </div>

          {scene.clues && (
            <div className="clues-section">
              <h3>⚡️ Observations</h3>
              {scene.clues.map((clue) => (
                <div key={clue.clue_id} className="clue-item">
                  <strong>{clue.name}</strong>
                  <p>{clue.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className="options-section">
            <h3>🤔 Next Action</h3>
            <div className="options-grid">
              {scene.options.length > 0 ? (
                scene.options.map((option) => (
                  <button
                    key={option.decision_id}
                    className="option-btn"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.description}
                  </button>
                ))
              ) : (
                <div className="ending-narration">
                  <p>Profiling complete.</p>
                  <button className="back-button" onClick={() => router.back()}>
                    Exit Profiler
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {discoveredInsights.length > 0 && (
          <div className="evidence-sidebar">
            <h3>📋 Logged Insights</h3>
            <div className="evidence-list">
              {discoveredInsights.map((id, i) => {
                const clue = caseData.scenes.flatMap((s) => s.clues || []).find((c) => c.clue_id === id);
                return clue ? (
                  <div key={i} className="evidence-item">
                    <strong>{clue.name}</strong>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        <button className="back-button main-back" onClick={() => router.back()}>
          ← Fade to Black
        </button>
      </div>

      {/* --- Reuse your Noir CSS from survivor page --- */}
      <style jsx>{`
        /* same styles as your noir_newyork survivor page */
        .case-container { min-height:100vh; padding:20px; position:relative; color:#e2e8f0; font-family:"Crimson Text", serif; background: linear-gradient(135deg,#0f0f23 0%,#1a1a2e 50%,#16213e 100%); overflow-x:hidden;}
        .noir-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background: radial-gradient(ellipse at 20% 50%, rgba(0,191,255,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(138,43,226,0.05) 0%, transparent 50%), radial-gradient(ellipse at 40% 80%, rgba(0,255,255,0.08) 0%, transparent 50%); pointer-events:none; animation:noirDrift 25s ease-in-out infinite;}
        @keyframes noirDrift{0%,100%{opacity:0.4; transform:translateX(0px);}50%{opacity:0.7; transform:translateX(15px);}}
        .case-header{text-align:center; margin-bottom:30px; padding:25px; background:rgba(0,191,255,0.15); border-radius:15px; border:2px solid #00bfff; box-shadow:0 8px 32px rgba(0,0,0,0.3); backdrop-filter: blur(10px);}
        .case-header h1{font-size:2.8rem; margin:0 0 10px 0; color:#00bfff; text-shadow:2px 2px 4px rgba(0,0,0,0.5); font-weight:700;}
        .clues-counter{font-size:1.2rem;color:#00ffff;font-weight:600;}
        .scene-content{max-width:900px;margin:0 auto; display:flex; flex-direction:column; gap:25px;}
        .narration-box, .clues-section, .options-section{background: rgba(26,26,46,0.8); padding:25px; border-radius:15px; border-left:5px solid #00bfff; box-shadow:0 4px 20px rgba(0,0,0,0.2); backdrop-filter: blur(5px);}
        .narration-box h3, .clues-section h3, .options-section h3{margin:0 0 18px 0;color:#00bfff;font-size:1.4rem;font-weight:600;}
        .clue-item{background: rgba(0,191,255,0.15); padding:18px; border-radius:10px; margin:12px 0; border:2px solid #00ffff; box-shadow:0 2px 10px rgba(0,255,255,0.2);}
        .clue-item strong{color:#00bfff; display:block; margin-bottom:8px; font-size:1.1rem;}
        .options-grid{display:grid; gap:18px; grid-template-columns:repeat(auto-fit,minmax(280px,1fr));}
        .option-btn{background:linear-gradient(45deg,#00bfff,#8a2be2); color:white; border:none; padding:18px 24px; border-radius:12px; font-size:1.05rem; font-weight:600; cursor:pointer; transition:all 0.3s ease; position:relative; box-shadow:0 4px 15px rgba(0,191,255,0.3);}
        .option-btn:hover{transform:translateY(-3px); box-shadow:0 8px 25px rgba(0,191,255,0.4); background:linear-gradient(45deg,#00ffff,#9370db);}
        .evidence-sidebar{position:fixed; right:20px; top:50%; transform:translateY(-50%); width:280px; background:rgba(15,15,35,0.95); padding:25px; border-radius:15px; border:2px solid #00ffff; box-shadow:0 8px 32px rgba(0,0,0,0.4); backdrop-filter: blur(10px);}
        .evidence-sidebar h3{color:#00bfff; margin:0 0 18px 0; text-align:center; font-size:1.3rem; font-weight:600;}
        .evidence-item{background: rgba(0,255,255,0.15); padding:12px; margin:8px 0; border-radius:8px; font-size:0.95rem; border-left:3px solid #00ffff;}
        .evidence-item strong{color:#e2e8f0;}
        .back-button.main-back{position:fixed; bottom:25px; left:25px;}
        .back-button{background-color:transparent; border:2px solid #00bfff; color:#00bfff; padding:15px 25px; border-radius:30px; font-size:1.05rem; font-weight:600; cursor:pointer; transition:all 0.3s ease;}
        .back-button:hover{background-color:#00bfff; color:white; transform:scale(1.05); box-shadow:0 4px 15px rgba(0,191,255,0.4);}
        .scene-back-button{background: rgba(0,191,255,0.1); color:#00bfff; border:2px solid #00bfff; padding:12px 20px; border-radius:25px; font-size:1rem; font-weight:600; cursor:pointer; transition:all 0.3s ease; margin-bottom:20px; align-self:flex-start;}
        .scene-back-button:hover{background:#00bfff;color:white; transform:translateX(3px); box-shadow:0 4px 15px rgba(0,191,255,0.4);}
        .ending-narration{text-align:center;color:#cbd5e0;font-style:italic;font-size:1.2rem;}
        .ending-narration .back-button{position:static;margin-top:20px;}
      `}</style>
    </>
  );
}
