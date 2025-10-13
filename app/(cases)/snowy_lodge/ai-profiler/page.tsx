"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

// --- Types ---
interface Decision {
  decision_id: string
  next_memory_id: string
  description: string
  outcome_type: string
}

interface IntuitionPrompt {
  prompt_id: string
  prompt_text: string
}

interface Memory {
  memory_id: string
  internal_monologue: string
  decisions: Decision[]
  emotional_state: string
  trauma_distortion_level: string
  intuition_prompts?: IntuitionPrompt[]
}

interface ProfilerData {
  story: {
    scenario_name?: string
    memory_id?: string
    internal_monologue?: string
    emotional_state?: string
    trauma_distortion_level?: string
    decisions?: Decision[]
    memories?: Memory[]
  }
}

interface Clue {
  clue_id: string
  name: string
  description: string
}

interface Option {
  option_id: string
  next_scene: string
  description: string
}

interface Scene {
  scene_id: string
  narration: string
  options: Option[]
  clues?: Clue[]
}

interface NarrativeCaseData {
  title: string
  scenes: Scene[]
}

// --- Fallback AI Profiler Data ---
const fallbackRaw: ProfilerData = {
  story: {
    scenario_name: "AI Profiler: Sentinel Analysis",
    memory_id: "memory_1",
    internal_monologue:
      "Booting the AI profiler. Three subjects show erratic neural patterns. Subject A reacts fastest, Subject B shares data with C, Subject C shows independent decision-making outside protocols.",
    emotional_state: "OBSERVANT",
    trauma_distortion_level: "LOW",
    decisions: [
      { decision_id: "decision_1", next_memory_id: "memory_2", description: "Analyze Subject A", outcome_type: "INFO_GAIN" },
      { decision_id: "decision_2", next_memory_id: "memory_3", description: "Analyze Subject B", outcome_type: "INFO_GAIN" },
    ],
  },
}

// --- Normalize payload ---
function normalizeProfilerPayload(input: ProfilerData | null): ProfilerData | null {
  if (!input || !input.story) return input
  const s = input.story

  if (Array.isArray(s.memories) && s.memories.length > 0) return input

  const singleMemory: Memory | null =
    s.memory_id && s.internal_monologue && s.emotional_state && s.trauma_distortion_level
      ? {
          memory_id: s.memory_id,
          internal_monologue: s.internal_monologue,
          emotional_state: s.emotional_state,
          trauma_distortion_level: s.trauma_distortion_level,
          decisions: s.decisions ?? [],
        }
      : null

  return {
    story: {
      scenario_name: s.scenario_name ?? "AI Profiler Session",
      memories: singleMemory ? [singleMemory] : [],
    },
  }
}

// --- Transform for UI ---
function transformProfilerData(data: ProfilerData | null): NarrativeCaseData | null {
  if (!data || !data.story || !data.story.memories) return null

  const scenes: Scene[] = data.story.memories.map((memory: Memory) => {
    const clues: Clue[] = [
      { clue_id: `${memory.memory_id}_emotion`, name: "Emotional State", description: memory.emotional_state },
      { clue_id: `${memory.memory_id}_trauma`, name: "Trauma Distortion", description: `Level: ${memory.trauma_distortion_level}` },
    ]
    if (memory.intuition_prompts) {
      memory.intuition_prompts.forEach((p) => {
        clues.push({ clue_id: p.prompt_id, name: "Intuition", description: p.prompt_text })
      })
    }

    return {
      scene_id: memory.memory_id,
      narration: memory.internal_monologue,
      options: (memory.decisions || []).map((d) => ({
        option_id: d.decision_id,
        next_scene: d.next_memory_id,
        description: d.description,
      })),
      clues,
    }
  })

  return {
    title: data.story.scenario_name ?? "AI Profiler Session",
    scenes,
  }
}

// --- Main Page ---
export default function AIProfilerPage() {
  const router = useRouter()
  const [profilerData, setProfilerData] = useState<ProfilerData | null>(null)
  const [currentScene, setCurrentScene] = useState<string | null>(null)
  const [sceneHistory, setSceneHistory] = useState<string[]>([])
  const [discoveredInsightIds, setDiscoveredInsightIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.post<ProfilerData>("/api/ai-profiler", { session: "sentinel" })
        setProfilerData(res.data)
      } catch (err) {
        console.warn("[v0] AI Profiler API failed, using fallback:", err)
        setProfilerData(fallbackRaw)
      } finally {
        await new Promise((r) => setTimeout(r, 700))
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const normalized = useMemo(() => normalizeProfilerPayload(profilerData), [profilerData])
  const caseData = useMemo(() => transformProfilerData(normalized), [normalized])

  useEffect(() => {
    if (!currentScene && caseData?.scenes?.length) {
      const firstId = caseData.scenes[0].scene_id
      setCurrentScene(firstId)
      setSceneHistory([firstId])
    }
  }, [caseData, currentScene])

  const scene = useMemo(() => caseData?.scenes.find((s) => s.scene_id === currentScene) ?? null, [caseData, currentScene])

  useEffect(() => {
    if (!scene?.clues) return
    const newIds = scene.clues.map((c) => c.clue_id)
    setDiscoveredInsightIds((prev) => [...new Set([...prev, ...newIds])])
  }, [scene?.scene_id])

  const handleChoose = (opt: Option) => {
    setCurrentScene(opt.next_scene)
    setSceneHistory((prev) => [...prev, opt.next_scene])
  }

  const handleReconsider = () => {
    if (sceneHistory.length <= 1) return
    const newHistory = sceneHistory.slice(0, -1)
    setSceneHistory(newHistory)
    setCurrentScene(newHistory[newHistory.length - 1])
  }

  if (isLoading || !caseData || !currentScene) {
    return (
      <div className="loading-screen">
        <div className="snow-spinner" />
        <p>Initializing AI Profiler…</p>
        <style jsx>{`
          .loading-screen {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0b1220, #1e293b);
            color: #e5f0ff;
            font-family: "Crimson Text", serif;
          }
          .snow-spinner {
            width: 56px;
            height: 56px;
            border: 3px solid rgba(96, 165, 250, 0.3);
            border-top-color: #60a5fa;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    )
  }

  const isEnding = scene?.options.length === 0

  return (
    <>
      <div className="case-container">
        <header className="case-header">
          <h1>{caseData.title}</h1>
          <p className="subtitle">Analyzing subject behavior & neural patterns</p>
          <div className="insight-counter">Insights: {discoveredInsightIds.length}</div>
        </header>

        <main className="scene-wrap">
          {sceneHistory.length > 1 && !isEnding && (
            <button className="scene-back" onClick={handleReconsider}>
              ← Reconsider
            </button>
          )}

          <section className="narration-box">
            <h3 className="section-title">Profiler Observation</h3>
            <p className="narration">{scene?.narration}</p>
          </section>

          {scene?.clues && scene.clues.length > 0 && (
            <section className="clues-box">
              <h3 className="section-title">Insights & Intuition</h3>
              <div className="clues-list">
                {scene.clues.map((c) => (
                  <div className="clue-item" key={c.clue_id}>
                    <strong>{c.name}</strong>
                    <p>{c.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="options-box">
            <h3 className="section-title">{isEnding ? "Analysis Complete" : "Next Action"}</h3>
            {!isEnding ? (
              <div className="options-grid">
                {scene?.options.map((o) => (
                  <button key={o.option_id} className="option-btn" onClick={() => handleChoose(o)}>
                    {o.description}
                  </button>
                ))}
              </div>
            ) : (
              <div className="ending-wrap">
                <p className="ending-text">The AI profiling session concludes.</p>
                <button className="back-main" onClick={() => router.back()}>
                  Exit Profiler
                </button>
              </div>
            )}
          </section>
        </main>

        {discoveredInsightIds.length > 0 && (
          <aside className="evidence-panel" aria-label="Collected Insights">
            <h3>Insights Collected</h3>
            <div className="frag-list">
              {discoveredInsightIds.map((id) => {
                const clue = caseData.scenes.flatMap((s) => s.clues || []).find((c) => c.clue_id === id)
                if (!clue) return null
                return <div key={id} className="frag-item">{clue.name}</div>
              })}
            </div>
          </aside>
        )}

        <button className="leave-btn" onClick={() => router.back()}>
          ← Return to Cases
        </button>
      </div>

      <style jsx>{`
        /* Reuse Snowy Lodge styling */
        .case-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0b1220 0%, #1e293b 50%, #0b1220 100%);
          color: #e5f0ff;
          font-family: "Crimson Text", serif;
          padding: 20px;
          position: relative;
          overflow-x: hidden;
        }
        .case-header {
          text-align: center;
          margin: 0 auto 24px;
          padding: 20px;
          max-width: 900px;
          background: rgba(15, 23, 42, 0.7);
          border: 2px solid #60a5fa;
          border-radius: 14px;
          box-shadow: 0 8px 28px rgba(96, 165, 250, 0.2);
          backdrop-filter: blur(10px);
        }
        .scene-wrap { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }
        .narration-box, .clues-box, .options-box {
          background: rgba(15, 23, 42, 0.78);
          border: 1.5px solid rgba(96, 165, 250, 0.35);
          border-left: 4px solid #60a5fa;
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.25);
          padding: 20px;
          border-radius: 14px;
          backdrop-filter: blur(6px);
        }
        .narration { color: #e5f0ff; line-height: 1.7; font-size: 1.1rem; font-style: italic; }
        .options-grid { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
        .option-btn { background: linear-gradient(135deg, #60a5fa, #22d3ee); color: #0b1220; border: none; padding: 16px 18px; border-radius: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 8px 18px rgba(96, 165, 250, 0.25); transition: all 0.2s ease; }
        .option-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(34, 211, 238, 0.28); }
        .evidence-panel { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); width: 280px; background: rgba(2, 6, 23, 0.85); border: 2px solid #22d3ee; border-radius: 14px; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35); backdrop-filter: blur(8px); padding: 18px; }
        .frag-list { display: grid; gap: 10px; }
        .frag-item { background: rgba(34, 211, 238, 0.1); border: 1.5px solid rgba(34, 211, 238, 0.4); color: #e5f0ff; padding: 10px; border-radius: 10px; text-align: center; }
        .leave-btn { position: fixed; bottom: 20px; left: 20px; background: transparent; border: 2px solid #60a5fa; color: #e5f0ff; padding: 10px 18px; border-radius: 999px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
        .leave-btn:hover { background: #60a5fa; color: #0b1220; }
      `}</style>
    </>
  )
}
