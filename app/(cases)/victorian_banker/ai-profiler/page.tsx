"use client"

import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import axios from "axios"

// --- Types ---
interface Decision {
  decision_id: string
  next_scene_id: string
  description: string
  outcome_type?: string
}

interface InsightPrompt {
  prompt_id: string
  prompt_text: string
}

interface AIProfileMemory {
  memory_id: string
  internal_monologue: string
  emotional_state: string
  cognitive_bias_level: string
  decisions: Decision[]
  insight_prompts?: InsightPrompt[]
}

interface AIProfilerData {
  story: {
    scenario_name: string
    memories: AIProfileMemory[]
  }
}

// UI Types
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

// --- Transform API data to UI format ---
const transformAIProfilerData = (data: AIProfilerData | null): NarrativeCaseData | null => {
  if (!data) return null

  const scenes: Scene[] = data.story.memories.map((mem) => {
    const clues: Clue[] = [
      { clue_id: `${mem.memory_id}_emotion`, name: "Emotional State", description: mem.emotional_state },
      { clue_id: `${mem.memory_id}_bias`, name: "Cognitive Bias", description: `Level: ${mem.cognitive_bias_level}` },
    ]
    if (mem.insight_prompts) {
      mem.insight_prompts.forEach((p) => {
        clues.push({ clue_id: p.prompt_id, name: "Insight Prompt", description: p.prompt_text })
      })
    }
    return {
      scene_id: mem.memory_id,
      narration: mem.internal_monologue,
      options: mem.decisions.map((d) => ({
        option_id: d.decision_id,
        next_scene: d.next_scene_id,
        description: d.description,
      })),
      clues,
    }
  })

  return {
    title: data.story.scenario_name || "AI Profiler — Internal Simulation",
    scenes,
  }
}

// --- React Component ---
export default function AIProfilerPage() {
  const router = useRouter()
  const [profilerData, setProfilerData] = useState<AIProfilerData | null>(null)
  const [currentScene, setCurrentScene] = useState<string>("")
  const [sceneHistory, setSceneHistory] = useState<string[]>([])
  const [discoveredInsights, setDiscoveredInsights] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.post<AIProfilerData>("/api/ai-profiler", { case: "ai_simulation" })
        setProfilerData(res.data)
        const firstId = res.data.story.memories[0]?.memory_id || ""
        setCurrentScene(firstId)
        setSceneHistory(firstId ? [firstId] : [])
      } catch (err) {
        console.warn("API failed, using fallback.", err)
        // Fallback placeholder
        const fallback: AIProfilerData = {
          story: {
            scenario_name: "AI Profiler — Simulation Fallback",
            memories: [
              {
                memory_id: "mem_1",
                internal_monologue: "AI internal evaluation initiated...",
                emotional_state: "NEUTRAL",
                cognitive_bias_level: "LOW",
                decisions: [
                  { decision_id: "d1", next_scene_id: "mem_2", description: "Analyze first input." },
                  { decision_id: "d2", next_scene_id: "mem_3", description: "Skip analysis." },
                ],
              },
            ],
          },
        }
        setProfilerData(fallback)
        const firstId = fallback.story.memories[0]?.memory_id || ""
        setCurrentScene(firstId)
        setSceneHistory(firstId ? [firstId] : [])
      } finally {
        setTimeout(() => setIsLoading(false), 700)
      }
    }
    fetchData()
  }, [])

  const caseData = useMemo(() => transformAIProfilerData(profilerData), [profilerData])
  const scene = caseData?.scenes.find((s) => s.scene_id === currentScene)

  const handleOptionClick = (option: Option) => {
    if (scene?.clues) {
      const newIds = scene.clues.map((c) => c.clue_id)
      setDiscoveredInsights((prev) => [...new Set([...prev, ...newIds])])
    }
    setSceneHistory((prev) => [...prev, option.next_scene])
    setCurrentScene(option.next_scene)
  }

  const handleBackToScene = () => {
    if (sceneHistory.length > 1) {
      const newHist = [...sceneHistory]
      newHist.pop()
      const prevScene = newHist[newHist.length - 1]
      setSceneHistory(newHist)
      setCurrentScene(prevScene)
    }
  }

  if (isLoading || !caseData) return <div>Loading AI simulation...</div>
  if (!scene) return <div>Scene not found.</div>

  // Include final scene insights
  if (scene.options.length === 0 && scene.clues) {
    const newIds = scene.clues.map((c) => c.clue_id)
    if (!newIds.every((id) => discoveredInsights.includes(id))) {
      setDiscoveredInsights((prev) => [...new Set([...prev, ...newIds])])
    }
  }

  return (
    <div className="profiler-container">
      <header>
        <h1>{caseData.title}</h1>
        <div>Insights Collected: {discoveredInsights.length}</div>
      </header>

      {sceneHistory.length > 1 && scene.options.length > 0 && (
        <button onClick={handleBackToScene}>← Reconsider</button>
      )}

      <section>
        <h3>Internal Monologue</h3>
        <p>{scene.narration}</p>
      </section>

      {scene.clues?.length > 0 && (
        <section>
          <h3>Insights & Prompts</h3>
          {scene.clues.map((c) => (
            <div key={c.clue_id}>
              <strong>{c.name}</strong>: {c.description}
            </div>
          ))}
        </section>
      )}

      <section>
        <h3>Decisions</h3>
        {scene.options.length > 0 ? (
          scene.options.map((o) => (
            <button key={o.option_id} onClick={() => handleOptionClick(o)}>
              {o.description}
            </button>
          ))
        ) : (
          <div>
            <p>Simulation complete.</p>
            <button onClick={() => router.back()}>Exit Profiler</button>
          </div>
        )}
      </section>

      <aside>
        <h3>Collected Insights</h3>
        {discoveredInsights.map((id) => {
          const clue = caseData.scenes.flatMap((s) => s.clues || []).find((c) => c.clue_id === id)
          return clue ? <div key={id}>{clue.name}</div> : null
        })}
      </aside>
    </div>
  )
}
