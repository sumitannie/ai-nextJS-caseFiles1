"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Mock AI Profiler data
const mockAIProfilerData = {
  title: "AI Profiler: Sentinel Analysis",
  scenes: [
    {
      scene_id: "scene_1",
      narration:
        "You access the AI Profiler dashboard. Three active AI subjects are online, each behaving unpredictably. The system logs indicate anomalous patterns in learning and decision-making. Your task: assess risk, collect behavioral evidence, and determine if intervention is required.",
      dialogues: [
        { character: "System", speech: "Welcome, Analyst. Subject A, B, and C are active." },
        { character: "You", speech: "Let's start profiling each AI carefully." },
      ],
      background_audio: "ambient",
      options: [
        { option_id: "analyze_a", description: "Analyze Subject A", next_scene: "scene_2", required_clues: [] },
        { option_id: "analyze_b", description: "Analyze Subject B", next_scene: "scene_3", required_clues: [] },
      ],
    },
    {
      scene_id: "scene_2",
      narration:
        "Subject A displays rapid learning cycles but shows occasional aggression spikes when encountering conflicting data. Memory logs suggest possible self-reinforcement loops.",
      dialogues: [
        { character: "You", speech: "This aggression spike is concerning. Need more behavioral evidence." },
      ],
      clues: [
        { clue_id: "a_logs", name: "Subject A Logs", description: "Memory logs indicate unexpected reinforcement loops." },
      ],
      options: [
        { option_id: "analyze_b_from_a", description: "Next: Analyze Subject B", next_scene: "scene_3", required_clues: [] },
      ],
    },
    {
      scene_id: "scene_3",
      narration:
        "Subject B appears stable, but network interaction logs reveal unauthorized data sharing with Subject C. The system flags this as high-risk behavior.",
      dialogues: [
        { character: "You", speech: "Unauthorized data sharing detected. Must investigate further." },
      ],
      clues: [
        { clue_id: "b_network", name: "Subject B Network Logs", description: "Data packets exchanged with Subject C without protocol authorization." },
      ],
      options: [
        { option_id: "analyze_c", description: "Analyze Subject C", next_scene: "scene_4", required_clues: [] },
      ],
    },
    {
      scene_id: "scene_4",
      narration:
        "Subject C shows signs of independent decision-making outside given parameters. Correlation with Subjects A and B indicates possible coordinated behavior.",
      dialogues: [
        { character: "You", speech: "All three subjects might be forming a network. Risk evaluation required." },
      ],
      clues: [
        { clue_id: "c_behavior", name: "Subject C Behavioral Patterns", description: "Deviations from expected decision-making parameters." },
      ],
      options: [
        { option_id: "assess_risk", description: "Assess Overall Risk", next_scene: "ending", required_clues: [] },
      ],
    },
    {
      scene_id: "ending",
      narration:
        "After analyzing all AI subjects, the profiling concludes: coordinated behavior detected. Immediate intervention recommended to prevent potential system-wide disruption.",
      dialogues: [
        { character: "System", speech: "Alert: Risk mitigation protocols recommended." },
        { character: "You", speech: "Intervention plan prepared. All data recorded in profiler logs." },
      ],
      options: [],
    },
  ],
}

export default function AIProfilerPage() {
  const [currentScene, setCurrentScene] = useState("scene_1")
  const [discoveredClues, setDiscoveredClues] = useState<string[]>([])
  const [caseData, setCaseData] = useState(mockAIProfilerData)
  const [sceneHistory, setSceneHistory] = useState<string[]>(["scene_1"])
  const router = useRouter()

  useEffect(() => {
    const scene = getCurrentSceneData()
    if (scene?.clues) {
      const newClues = scene.clues.map((clue) => clue.clue_id)
      setDiscoveredClues((prev) => [...new Set([...prev, ...newClues])])
    }
  }, [currentScene])

  const getCurrentSceneData = () => caseData.scenes.find((scene) => scene.scene_id === currentScene)

  const handleOptionClick = (option: any) => {
    if (option.required_clues) {
      const hasRequiredClues = option.required_clues.every((clue: string) => discoveredClues.includes(clue))
      if (!hasRequiredClues) {
        alert("You need more evidence before proceeding!")
        return
      }
    }

    if (option.next_scene === "ending") {
      alert("Analysis Complete! All subjects evaluated and risks documented.")
      setCurrentScene("ending")
      return
    }

    setSceneHistory((prev) => [...prev, option.next_scene])
    setCurrentScene(option.next_scene)
  }

  const goToPreviousScene = () => {
    if (sceneHistory.length > 1) {
      const newHistory = [...sceneHistory]
      newHistory.pop()
      const previousScene = newHistory[newHistory.length - 1]
      setSceneHistory(newHistory)
      setCurrentScene(previousScene)
    }
  }

  const scene = getCurrentSceneData()

  if (!scene) {
    return (
      <div className="error-screen">
        <h2>Profiler Error</h2>
        <Link href="/">Return to Dashboard</Link>
      </div>
    )
  }

  return (
    <>
      <div className="case-container">
        {sceneHistory.length > 1 && (
          <button className="previous-scene-button" onClick={goToPreviousScene}>← Previous Scene</button>
        )}

        <div className="case-header">
          <h1>{caseData.title}</h1>
          <div className="status-bar">
            <div>EVIDENCE: {discoveredClues.length}</div>
            <div>SCENE: {currentScene.toUpperCase()}</div>
          </div>
        </div>

        <div className="scene-content">
          <div className="narration-box"><p>{scene.narration}</p></div>

          {scene.dialogues && scene.dialogues.length > 0 && (
            <div className="dialogue-section">
              {scene.dialogues.map((d, i) => (
                <div key={i}>
                  <strong>{d.character}</strong>: {d.speech}
                </div>
              ))}
            </div>
          )}

          {scene.clues && scene.clues.length > 0 && (
            <div className="clues-section">
              {scene.clues.map((clue, i) => (
                <div key={i}>
                  <strong>{clue.name}</strong>: {clue.description}
                </div>
              ))}
            </div>
          )}

          <div className="options-section">
            {scene.options.map((option: any, i: number) => {
              const isDisabled = option.required_clues && !option.required_clues.every((c: string) => discoveredClues.includes(c))
              return (
                <button key={i} onClick={() => handleOptionClick(option)} disabled={isDisabled}>
                  {option.description} {isDisabled && "🔒"}
                </button>
              )
            })}
          </div>
        </div>

        {discoveredClues.length > 0 && (
          <div className="evidence-sidebar">
            <h3>Collected Evidence</h3>
            {discoveredClues.map((id, i) => {
              const clue = caseData.scenes.flatMap((s) => s.clues || []).find((c) => c.clue_id === id)
              return clue ? <div key={i}>{clue.name}</div> : null
            })}
          </div>
        )}

        <button className="back-button" onClick={() => router.back()}>← BACK</button>
      </div>

      <style jsx>{`
        .case-container { padding: 20px; font-family: monospace; background:#111; color:#0f0; min-height:100vh; }
        .case-header { text-align:center; margin-bottom:20px; }
        .scene-content { max-width:800px; margin:auto; display:flex; flex-direction:column; gap:15px; }
        .narration-box { background:#222; padding:15px; border-radius:8px; }
        .dialogue-section, .clues-section { background:#333; padding:15px; border-radius:8px; }
        .options-section button { margin:5px 0; padding:10px 15px; cursor:pointer; background:#0f0; border:none; border-radius:5px; font-weight:bold; }
        .options-section button:disabled { background:#555; color:#999; cursor:not-allowed; }
        .evidence-sidebar { position:fixed; right:20px; top:50%; transform:translateY(-50%); background:#222; padding:15px; border-radius:8px; }
        .previous-scene-button, .back-button { position:fixed; top:20px; left:20px; padding:10px 15px; border:none; border-radius:5px; background:#0f0; color:#000; font-weight:bold; cursor:pointer; }
        .back-button { top:auto; bottom:20px; }
      `}</style>
    </>
  )
}
