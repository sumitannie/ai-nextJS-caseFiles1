"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

// Mock data for AI Profiler case
const mockProfilerData = {
  case_id: "countryside_manor_001",
  title: "Countryside Manor: Psychological Profiling",
  subjects: [
    {
      subject_id: "lady_blackwood",
      behavioral_data_points: [
        {
          data_point_id: "scene3_lady_emotion",
          observation_context: "Interview in drawing room",
          observed_behaviors: ["Dabs eyes with lace handkerchief", "Voice trembles", "Composure cracking"],
          verbal_cues: ["My husband seemed troubled lately..."],
          deception_likelihood: "MEDIUM",
        },
        {
          data_point_id: "scene7_lady_conflict",
          observation_context: "Interrogation about will change",
          observed_behaviors: ["Avoids eye contact", "Fidgets with jewelry"],
          verbal_cues: ["I have nothing to hide."],
          deception_likelihood: "HIGH",
        },
      ],
      psychological_profile: {
        dominant_traits: ["Anxious", "Secretive", "Protective of family"],
        potential_motives: ["Fear of scandal", "Emotional distress"],
        predicted_intent: "Low likelihood of violent intent",
      },
      profiling_actions: [
        {
          action_id: "run_emotion_heatmap_1",
          action_type: "RUN_EMOTION_HEATMAP",
          action_outcome: "Shows spikes of stress and anxiety during key questioning",
        },
        {
          action_id: "update_profiling_matrix_1",
          action_type: "UPDATE_PROFILING_MATRIX",
          action_outcome: "Highlights high emotional vulnerability in interpersonal conflicts",
        },
      ],
    },
    {
      subject_id: "mr_pemberton",
      behavioral_data_points: [
        {
          data_point_id: "scene8_lawyer_reveal",
          observation_context: "Interview about estate embezzlement",
          observed_behaviors: ["Perspiration on brow", "Trembling hands", "Voice wavers"],
          verbal_cues: ["Only family members and myself had access."],
          deception_likelihood: "HIGH",
        },
        {
          data_point_id: "scene10_final_reveal",
          observation_context: "Confrontation in study",
          observed_behaviors: ["Shoulders sagging", "Attempts to deflect blame", "Facial tension increases"],
          verbal_cues: ["You can't prove anything!"],
          deception_likelihood: "HIGH",
        },
      ],
      psychological_profile: {
        dominant_traits: ["Manipulative", "Greedy", "Secretive"],
        potential_motives: ["Financial gain", "Fear of exposure"],
        predicted_intent: "High likelihood of premeditated criminal act",
      },
      profiling_actions: [
        {
          action_id: "run_emotion_heatmap_2",
          action_type: "RUN_EMOTION_HEATMAP",
          action_outcome: "Reveals deception and stress when questioned about finances",
        },
        {
          action_id: "update_profiling_matrix_2",
          action_type: "UPDATE_PROFILING_MATRIX",
          action_outcome: "Identifies high correlation between opportunity and motive",
        },
      ],
    },
  ],
}

export default function ProfilerPage() {
  const [profilerData, setProfilerData] = useState(mockProfilerData)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchProfilerCase = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/profiler_case", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch profiler case data")
        const data = await res.json()
        setProfilerData(data)
      } catch {
        setProfilerData(mockProfilerData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfilerCase()
  }, [])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Analyzing behavioral patterns...</p>
        <style jsx>{`
          .loading-screen {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #1a2332, #2d3748);
            color: #e2e8f0;
            font-family: "Crimson Text", serif;
          }
          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(139, 69, 19, 0.3);
            border-top: 3px solid #8b4513;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  const subject = profilerData.subjects.find((s) => s.subject_id === selectedSubject) || null

  return (
    <div className="profiler-container">
      <h1>{profilerData.title}</h1>

      <div className="subject-selection">
        <h3>Subjects:</h3>
        {profilerData.subjects.map((s) => (
          <button
            key={s.subject_id}
            onClick={() => setSelectedSubject(s.subject_id)}
            className={selectedSubject === s.subject_id ? "selected" : ""}
          >
            {s.subject_id.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {subject && (
        <div className="subject-details">
          <h2>Behavioral Data Points</h2>
          {subject.behavioral_data_points.map((dp) => (
            <div key={dp.data_point_id} className="data-point">
              <strong>Context:</strong> {dp.observation_context}
              <p><strong>Observed Behaviors:</strong> {dp.observed_behaviors.join(", ")}</p>
              <p><strong>Verbal Cues:</strong> {dp.verbal_cues.join(", ")}</p>
              <p><strong>Deception Likelihood:</strong> {dp.deception_likelihood}</p>
            </div>
          ))}

          <h2>Psychological Profile</h2>
          <p><strong>Dominant Traits:</strong> {subject.psychological_profile.dominant_traits.join(", ")}</p>
          <p><strong>Potential Motives:</strong> {subject.psychological_profile.potential_motives.join(", ")}</p>
          <p><strong>Predicted Intent:</strong> {subject.psychological_profile.predicted_intent}</p>

          <h2>Profiling Actions</h2>
          {subject.profiling_actions.map((action) => (
            <div key={action.action_id} className="profiling-action">
              <strong>{action.action_type}</strong>: {action.action_outcome}
            </div>
          ))}
        </div>
      )}

      <button className="back-button" onClick={() => router.back()}>
        ← Return to Cases
      </button>

      <style jsx>{`
        .profiler-container {
          padding: 25px;
          font-family: "Crimson Text", serif;
          background: linear-gradient(135deg, #1a2332, #2d3748);
          color: #e2e8f0;
          min-height: 100vh;
        }

        h1 {
          text-align: center;
          color: #d4af37;
          margin-bottom: 25px;
          font-size: 2.5rem;
        }

        .subject-selection button {
          margin: 5px;
          padding: 10px 18px;
          border-radius: 10px;
          border: 2px solid #cd853f;
          background: rgba(139,69,19,0.2);
          color: #d4af37;
          font-weight: 600;
          cursor: pointer;
        }

        .subject-selection button.selected {
          background: #d4af37;
          color: #1a202c;
        }

        .subject-details {
          margin-top: 30px;
          background: rgba(45,55,72,0.8);
          padding: 20px;
          border-radius: 15px;
          border-left: 5px solid #cd853f;
        }

        .data-point, .profiling-action {
          margin: 12px 0;
          padding: 12px;
          background: rgba(205,133,63,0.15);
          border-radius: 8px;
        }

        .back-button {
          margin-top: 25px;
          padding: 12px 24px;
          border-radius: 25px;
          border: 2px solid #8b4513;
          background-color: transparent;
          color: #d4af37;
          font-weight: 600;
          cursor: pointer;
        }

        .back-button:hover {
          background: #8b4513;
          color: #fff;
        }
      `}</style>
    </div>
  )
}
