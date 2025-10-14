"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const forensicCaseFile = {
  case_name: "Case File: Blackwood Manor",
  exhibits: [
    {
      exhibit_id: "EXH-001",
      item_description: "Fragments of a shattered wine glass containing a viscous, dark red residue.",
      collection_location: "On the floor of the study, near the victim's desk.",
      contamination_risk: "HIGH",
      available_analyses: [
        {
          analysis_id: "TOX-001",
          analysis_type: "CHEMICAL_ANALYSIS",
          results: {
            summary: "Toxicology report confirms the residue contains a lethal concentration of Digitalis (foxglove extract), a fast-acting cardiotoxin. The substance was mixed with a vintage port wine. The presence of this poison is conclusive evidence of homicide, ruling out suicide.",
            is_conclusive: true,
          }
        }
      ]
    },
    {
      exhibit_id: "EXH-002",
      item_description: "A draft of a new will, written on Lord Blackwood's personal stationery. The handwriting appears contested on the line naming the executor.",
      collection_location: "Recovered from the victim's desk in the study.",
      contamination_risk: "LOW",
      available_analyses: [
        {
          analysis_id: "DOC-001",
          analysis_type: "CHEMICAL_ANALYSIS",
          results: {
            summary: "Ink chromatography reveals two different formulations. The main body of the will is written in standard iron gall ink, consistent with Lord Blackwood's other documents. However, the line naming 'Mr. Pemberton' as executor was written with a modern, glycol-based ink, indicating it was fraudulently altered after the original document was drafted.",
            is_conclusive: true,
          }
        }
      ]
    },
    {
      exhibit_id: "EXH-003",
      item_description: "A single, dark green feather from a decorative hat or garment.",
      collection_location: "Found caught on the exterior latch of the study's open window.",
      contamination_risk: "MEDIUM",
      available_analyses: [
        {
          analysis_id: "DNA-001",
          analysis_type: "DNA_ANALYSIS",
          results: {
            summary: "Epithelial cells lifted from the feather's quill provide a partial DNA profile. The profile is not a match for the victim or any Blackwood family members. It is, however, a definitive match to a DNA sample recovered from the band of a coat belonging to the family lawyer, Mr. Pemberton.",
            is_conclusive: true,
          }
        }
      ]
    }
  ]
}

const sceneData:any = [
  {
    scene_id: "scene_1_intake",
    narration: "The forensic unit has received three evidence bags from Blackwood Manor, the site of Lord Blackwood's apparent suicide. The detective on scene, however, reports inconsistencies. Your task is to analyze the physical evidence to determine the true nature of the events. The chain of custody is secure, and initial processing can begin.",
    exhibits: forensicCaseFile.exhibits.map(exhibit => ({
      exhibit_id: exhibit.exhibit_id,
      name: `Exhibit ${exhibit.exhibit_id}: ${exhibit.item_description.split(',')[0]}`,
      description: `Description: ${exhibit.item_description} | Location: ${exhibit.collection_location} | Contamination Risk: ${exhibit.contamination_risk}`,
    })),
    options: forensicCaseFile.exhibits.map(exhibit => ({
      option_id: `opt_analyze_${exhibit.exhibit_id}`,
      description: `Begin Analysis on ${exhibit.exhibit_id}`,
      next_scene: `scene_2_results_${exhibit.exhibit_id}`,
    })),
  },
  ...forensicCaseFile.exhibits.flatMap(exhibit => [
    {
      scene_id: `scene_2_results_${exhibit.exhibit_id}`,
      narration: `Analysis of Exhibit ${exhibit.exhibit_id} is complete. The findings from the ${exhibit.available_analyses[0].analysis_type.replace('_', ' ')} are logged below.`,
      analysis: exhibit,
      options: [
        {
          option_id: "opt_return",
          description: "Return to Evidence List",
          next_scene: "scene_1_intake",
        },
        {
          option_id: "opt_conclusion",
          description: "Formulate Final Report",
          next_scene: "scene_3_conclusion",
        },
      ],
    },
  ]),
  {
    scene_id: "scene_3_conclusion",
    narration: "All forensic analyses are complete. The evidence paints a clear picture of premeditated murder disguised as suicide. The toxicology report (EXH-001) confirms death by poison, not a gunshot. The DNA on the feather (EXH-003) physically links Mr. Pemberton to the open window of the study, a likely point of entry or exit. The fraudulent ink analysis on the will (EXH-002) provides a powerful motive: Mr. Pemberton altered the document and killed Lord Blackwood to prevent his embezzlement from being exposed. The combined forensic evidence points conclusively to the family lawyer, Mr. Pemberton, as the sole perpetrator.",
    options: [
      {
        option_id: "opt_close_case",
        description: "Case Closed - Submit Report to Inspector Hayes",
        next_scene: "case_solved",
      },
    ],
  },
];

export default function CountrysideManorPage() {
  const [currentScene, setCurrentScene] = useState<string>("scene_1_intake")
  const [discoveredAnalyses, setDiscoveredAnalyses] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sceneHistory, setSceneHistory] = useState<string[]>(["scene_1_intake"])
  const router = useRouter()

  useEffect(() => {
    setIsLoading(true);
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => setIsLoading(false));
  }, [])

  const currentSceneData = sceneData.find((scene:any) => scene.scene_id === currentScene)

  const handleOptionClick = (option: any) => {
    if (currentSceneData?.analysis) {
      setDiscoveredAnalyses(prev => [...new Set([...prev, currentSceneData.analysis.exhibit_id])])
    }

    if (option.next_scene === "case_solved") {
      alert(
        "Forensic Report Submitted. Evidence indicates Mr. Pemberton poisoned Lord Blackwood to conceal his fraudulent alteration of the will and ongoing embezzlement."
      )
      return
    }

    setSceneHistory((prev) => [...prev, option.next_scene])
    setCurrentScene(option.next_scene)
  }

  const handlePreviousScene = () => {
    if (sceneHistory.length > 1) {
      const newHistory = [...sceneHistory]
      newHistory.pop()
      const previousScene = newHistory[newHistory.length - 1]
      setSceneHistory(newHistory)
      setCurrentScene(previousScene)
    }
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Entering the foggy manor...</p>
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

  if (!currentSceneData) {
    return (
      <div className="error-screen">
        <h2>Scene not found</h2>
        <Link href="/">Return to Cases</Link>
      </div>
    )
  }

  return (
    <>
      <div className="case-container">
        <div className="fog-overlay"></div>
        {sceneHistory.length > 1 && (
          <button className="previous-scene-button" onClick={handlePreviousScene}>
            ← Previous Step
          </button>
        )}
        <div className="case-header">
          <h1>Forensic File: The Countryside Manor</h1>
          <div className="status-bar">
            <div className="clues-counter">
              <span className="label">ANALYSES:</span>
              <span className="count">{discoveredAnalyses.length}/{forensicCaseFile.exhibits.length}</span>
            </div>
            <div className="scene-indicator">
              <span className="label">STATUS:</span>
              <span className="scene-id">{currentScene.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="scene-content">
          <div className="narration-box">
            <div className="section-header">
              <span className="icon">🏰</span>
              <h3>Forensic Summary</h3>
            </div>
            <p className="narration">{currentSceneData.narration}</p>
          </div>

          {currentSceneData.exhibits && (
            <div className="clues-section">
              <div className="section-header">
                <span className="icon">🔍</span>
                <h3>Exhibits Logged</h3>
              </div>
              {currentSceneData.exhibits.map((exhibit:any, index:number) => (
                <div key={index} className="clue-item">
                  <div className="clue-header">
                    <strong className="clue-name">{exhibit.name.toUpperCase()}</strong>
                    <span className="clue-status">PENDING</span>
                  </div>
                  <p className="clue-description">{exhibit.description}</p>
                </div>
              ))}
            </div>
          )}

          {currentSceneData.analysis && (
            <div className="clues-section">
              <div className="section-header">
                <span className="icon">🔬</span>
                <h3>Analysis Results: {currentSceneData.analysis.exhibit_id}</h3>
              </div>
              <div className="clue-item">
                <div className="clue-header">
                  <strong className="clue-name">{currentSceneData.analysis.available_analyses[0].analysis_type.replace('_', ' ')}</strong>
                  <span className={`clue-status ${currentSceneData.analysis.available_analyses[0].results.is_conclusive ? 'verified' : 'inconclusive'}`}>
                    {currentSceneData.analysis.available_analyses[0].results.is_conclusive ? "CONCLUSIVE" : "INCONCLUSIVE"}
                  </span>
                </div>
                <p className="clue-description">{currentSceneData.analysis.available_analyses[0].results.summary}</p>
              </div>
            </div>
          )}

          <div className="options-section">
            <div className="section-header">
              <span className="icon">🤔</span>
              <h3>Your Next Action</h3>
            </div>
            <div className="options-grid">
              {currentSceneData.options.map((option:any, index:number) => (
                <button
                  key={index}
                  className="option-btn"
                  onClick={() => handleOptionClick(option)}
                >
                  <span className="option-text">{option.description}</span>
                  <div className="btn-glow"></div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button className="back-button" onClick={() => router.back()}>
          ← Return to Cases
        </button>
      </div>
      <style jsx>{`
        .case-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a2332 0%, #2d3748 50%, #1a202c 100%);
          color: #e2e8f0;
          font-family: "Crimson Text", serif;
          padding: 20px;
          position: relative;
          overflow-x: hidden;
        }
        .fog-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%);
          pointer-events: none;
          animation: fogDrift 20s ease-in-out infinite;
        }
        @keyframes fogDrift {
          0%, 100% { opacity: 0.3; transform: translateX(0px); }
          50% { opacity: 0.6; transform: translateX(10px); }
        }
        .case-header {
          text-align: center; margin-bottom: 30px; padding: 25px;
          background: rgba(139, 69, 19, 0.15); border-radius: 15px;
          border: 2px solid #8b4513; box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          backdrop-filter: blur(10px);
        }
        .case-header h1 {
          font-size: 2.8rem; margin: 0 0 15px 0; color: #d4af37;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5); font-weight: 700;
        }
        .status-bar {
          display: flex;
          justify-content: center;
          gap: 40px;
          font-size: 1.1rem;
        }
        .clues-counter, .scene-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .label {
          color: #d4af37;
          font-weight: bold;
        }
        .count, .scene-id {
          color: #e2e8f0;
          background: rgba(139, 69, 19, 0.3);
          padding: 4px 8px;
          border-radius: 4px;
        }
        .scene-content { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 25px; }
        .narration-box, .clues-section, .options-section {
          background: rgba(45, 55, 72, 0.8); padding: 25px; border-radius: 15px;
          border-left: 5px solid #8b4513; box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          backdrop-filter: blur(5px);
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(139, 69, 19, 0.4);
        }
        .section-header .icon { font-size: 1.2rem; }
        .section-header h3 {
          margin: 0; color: #d4af37; font-size: 1.4rem; font-weight: 600;
        }
        .narration { font-size: 1.15rem; line-height: 1.7; font-style: italic; color: #cbd5e0; }
        .clues-section { border-left-color: #cd853f; background: rgba(205, 133, 63, 0.1); }
        .clue-item {
          background: rgba(212, 175, 55, 0.1);
          padding: 18px; border-radius: 10px;
          margin: 12px 0; border: 1px solid #cd853f;
        }
        .clue-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .clue-name { color: #d4af37; font-size: 1.1rem; }
        .clue-status {
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: bold;
          background: #cd853f;
          color: #1a202c;
        }
        .clue-status.verified {
          background: #d4af37;
        }
        .clue-status.inconclusive {
          background: #a0aec0;
          color: #1a202c;
        }
        .clue-description {
          color: #cbd5e0;
          margin: 0;
          line-height: 1.6;
        }
        .options-grid { display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
        .option-btn {
          background: linear-gradient(45deg, #8b4513, #a0522d); color: white; border: none;
          padding: 18px 24px; border-radius: 12px; font-size: 1.05rem; font-weight: 600;
          cursor: pointer; transition: all 0.3s ease; font-family: "Crimson Text", serif;
          box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
          position: relative;
          overflow: hidden;
        }
        .option-btn:hover {
          transform: translateY(-3px); box-shadow: 0 8px 25px rgba(139, 69, 19, 0.4);
          background: linear-gradient(45deg, #a0522d, #cd853f);
        }
        .btn-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        .option-btn:hover .btn-glow {
          left: 100%;
        }
        .back-button {
          position: fixed; bottom: 25px; left: 25px; background-color: transparent;
          border: 2px solid #8b4513; color: #d4af37; padding: 15px 25px; border-radius: 30px;
          font-size: 1.05rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;
          font-family: "Crimson Text", serif;
        }
        .back-button:hover {
          background-color: #8b4513; color: white; transform: scale(1.05);
        }
        .previous-scene-button {
          position: fixed; top: 25px; left: 25px; background-color: rgba(26, 32, 44, 0.8);
          border: 2px solid #8b4513; color: #d4af37; padding: 12px 20px; border-radius: 25px;
          font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;
          font-family: "Crimson Text", serif; z-index: 1000; backdrop-filter: blur(10px);
        }
        .previous-scene-button:hover { background-color: #8b4513; color: white; transform: scale(1.05); }
        @media (max-width: 768px) {
          .case-header h1 { font-size: 2.2rem; }
          .status-bar { flex-direction: column; gap: 15px; }
          .options-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
