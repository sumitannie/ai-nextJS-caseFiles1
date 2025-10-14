"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

// --- Type Definitions ---

interface Clue {
  clue_id: string;
  name: string;
  description: string;
}

interface Dialogue {
  character: string;
  speech: string;
}

interface Option {
  option_id: string;
  next_scene: string;
  description: string;
  required_clues?: string[];
}

interface Scene {
  scene_id: string;
  narration: string;
  options: Option[];
  clues?: Clue[];
  dialogues?: Dialogue[];
  background_audio: string;
}

interface StoryData {
  story: {
    title: string;
    scenes: Scene[];
  };
}

// --- Fallback Mock Data ---
const fallbackData: StoryData = {
  story: {
    scenes: [
      {
        options: [
          {
            next_scene: "scene_2",
            option_id: "1A",
            description:
              "Examine the display case and the empty frame for trace evidence.",
          },
          {
            next_scene: "scene_3",
            description:
              "Interview the night guard who first discovered the theft.",
            option_id: "1B",
          },
        ],
        background_audio: "crime_scene",
        narration:
          "The Salle des États in the Louvre is unnervingly silent, a stark contrast to the usual cacophony of camera shutters and hushed awe. Before you stands the most famous empty space in the world, where the Mona Lisa used to be. The velvet rope barrier lies tossed aside, and the air hangs heavy with the scent of floor polish and a faint, almost imperceptible chemical odor. The bulletproof glass of her enclosure has been removed with surgical precision, not shattered. This was the work of a professional, not a common smash-and-grab thief. The museum director wrings his hands beside you, his face a mask of pure panic.",
        scene_id: "scene_1",
      },
      {
        clues: [
          {
            description:
              "A small, vibrant blue feather, clearly not from any local Parisian bird.",
            name: "Exotic Blue Feather",
            clue_id: "exotic_feather",
          },
        ],
        narration:
          "You kneel down, your eyes scanning every inch of the parquet floor around the violated display. The thieves were clean, leaving almost nothing behind. But 'almost' is the operative word. Tucked near the leg of the display, almost invisible against the dark wood, is a flash of iridescent blue. You carefully pick it up with your tweezers; it's a small, perfect feather, more vibrant and exotic than any pigeon or sparrow. This is an unexpected and potentially crucial piece of evidence. The thief was either careless or very, very vain.",
        options: [
          {
            next_scene: "scene_4",
            description:
              "Take the feather to an expert for immediate analysis.",
            option_id: "2A",
          },
          {
            next_scene: "scene_5",
            description:
              "Question the Head of Security about the alarm systems.",
            option_id: "2B",
          },
        ],
        background_audio: "mystery",
        scene_id: "scene_2",
      },
      {
        options: [
          {
            option_id: "3A",
            next_scene: "scene_5",
            description:
              "Press the guard about any flickering lights or system reboots.",
          },
          {
            description:
              "Go back to the crime scene for a more detailed search.",
            next_scene: "scene_2",
            option_id: "3B",
          },
          {
            option_id: "3C",
            description: "Interview the lead curator, Dr. Eleanor Vance.",
            next_scene: "scene_7",
          },
        ],
        narration:
          "You find the night guard, a young man named Luc, in a small security office. His face is pale and his hands tremble as he recounts the morning's discovery. He is adamant that the alarm system never triggered, a fact corroborated by the initial security report. Director Delacroix hovers nearby, his distress making the small room feel even more claustrophobic. He seems more concerned with the museum's reputation than the missing masterpiece itself, which you find slightly distasteful but not entirely surprising given his position.",
        dialogues: [
          {
            speech:
              "I swear, Inspector, I did my rounds perfectly. The system showed all green. No alarms, no noises... nothing. It was like she just... vanished. One minute she was there, the next... gone. It's a nightmare.",
            character: "Luc, Night Guard",
          },
          {
            character: "Director Delacroix",
            speech:
              "This is a catastrophe! A national embarrassment! Find her, Inspector. The reputation of the Louvre, of France itself, is at stake. The gala is in two weeks! What will I tell the Minister?",
          },
        ],
        background_audio: "tension",
        scene_id: "scene_3",
      },
      {
        options: [
          {
            description:
              "Research known collectors with a reputation for illicit acquisitions.",
            option_id: "4A",
            next_scene: "scene_6",
          },
          {
            option_id: "4B",
            description:
              "Confront the Head of Security with this new information.",
            next_scene: "scene_5",
          },
        ],
        narration:
          "You visit an old colleague, an ornithologist at the National Museum of Natural History. She places the feather under a microscope, her expression shifting from curiosity to astonishment. She explains the rarity of the bird, noting that owning one is a sign of immense wealth and a disregard for international conservation laws. The black market for such creatures is intertwined with other high-stakes illegal trades, including fine art. Your thief isn't just a thief; they're a collector of the highest and most illegal order.",
        dialogues: [
          {
            character: "Dr. Isabelle Moreau",
            speech:
              "Incredible! This is from a Cyanopsitta spixii, a Spix's Macaw. They are functionally extinct in the wild. Only a handful exist in private, protected aviaries. The owner of this bird would have to be an exceptionally wealthy and... morally flexible collector.",
          },
        ],
        clues: [
          {
            name: "Feather Analysis Report",
            description:
              "The feather belongs to a Spix's Macaw, an extremely rare, near-extinct parrot native to Brazil, often sold on the black market for astronomical sums.",
            clue_id: "feather_analysis",
          },
        ],
        background_audio: "mystery",
        scene_id: "scene_4",
      },
      {
        dialogues: [
          {
            speech:
              "A system reboot? Yes, we had one scheduled. A five-minute diagnostic window. It's standard procedure, happens every month. It is impossible that someone could have exploited it. My system is foolproof! Impossible!",
            character: "Jean-Pierre Moreau",
          },
        ],
        background_audio: "tension",
        options: [
          {
            next_scene: "scene_8",
            option_id: "5A",
            description: "Accuse Moreau of being an accomplice.",
          },
          {
            description:
              "Investigate the curator, Dr. Vance, whose office is nearby.",
            option_id: "5B",
            next_scene: "scene_7",
          },
          {
            required_clues: ["feather_analysis"],
            option_id: "5C",
            description:
              "[Requires Feather Analysis] Ask Moreau if he knows any wealthy collectors with a taste for the exotic.",
            next_scene: "scene_6",
          },
        ],
        narration:
          "You confront Jean-Pierre Moreau, the Louvre's Head of Security, in his state-of-the-art control room. He is a proud man, bristling at any suggestion of fault in his systems. When you question him about blind spots or outages, he defensively admits to a pre-scheduled 'five-minute maintenance reboot' in the early hours of the morning. He dismisses it as a coincidence, but his eyes shift nervously, and a bead of sweat traces a path down his temple. He is hiding something, but it could be incompetence rather than complicity.",
        scene_id: "scene_5",
      },
      {
        background_audio: "mystery",
        options: [
          {
            description: "Attempt to get a warrant to search Croft's property.",
            option_id: "6A",
            next_scene: "scene_9",
          },
          {
            description:
              "Go to Croft's townhouse and try to question him directly.",
            next_scene: "scene_8",
            option_id: "6B",
          },
        ],
        narration:
          "Your list of suspects who are both art collectors and fanciers of rare birds is remarkably short. One name shines like a beacon: Silas Croft. A British billionaire art dealer with a reputation as sharp and merciless as a shard of glass. He is infamous in auction houses for his aggressive tactics and is rumored to have the largest private collection of stolen artifacts in the world. Interpol files show he flew into a private Paris airfield two days ago. His townhouse is a veritable fortress in the 8th arrondissement.",
        scene_id: "scene_6",
      },
      {
        background_audio: "fireplace",
        options: [
          {
            description:
              "Accuse her of staging the theft to protect the painting.",
            next_scene: "scene_8",
            option_id: "7A",
          },
          {
            required_clues: ["feather_analysis"],
            description:
              "[Requires Feather Analysis] Ask her about her interest in rare birds.",
            next_scene: "scene_6",
            option_id: "7B",
          },
          {
            description: "Consider her a red herring and move on.",
            option_id: "7C",
            next_scene: "scene_5",
          },
        ],
        dialogues: [
          {
            speech:
              "She wasn't just a painting, Inspector. She was the heart of this museum. I have dedicated my life to her. To think someone could... defile this place, steal her away... it's like a death in the family. I was working on plans for a new, more secure enclosure. It seems I was too late.",
            character: "Dr. Eleanor Vance",
          },
        ],
        scene_id: "scene_7",
        narration:
          "Dr. Eleanor Vance's office is a shrine to Renaissance art. Books are piled high, and sketches of gallery layouts cover her desk. She speaks of the Mona Lisa with a reverence that borders on obsession, her eyes filled with genuine sorrow. You note her passion is all-consuming, which can be a powerful motivator for strange actions. She could have stolen the painting herself, believing she was the only one who could truly protect it. Your gaze falls upon a thick book on her shelf: 'The Avian Wonders of the Amazon'.",
      },
      {
        background_audio: "rain",
        narration:
          "You follow your gut and make a direct accusation, but your move is premature. Confronting Moreau gets him suspended, but no hard evidence connects him to the crime, and he files a complaint against you. Accusing Dr. Vance crushes the spirit of a devoted curator who has a clear alibi, having been at a conference in Geneva. Approaching Silas Croft without a warrant is even worse; he smiles, amused, as his lawyers surround you, threatening to end your career before escorting you off his property. The trail has gone cold, and your superiors are furious.",
        options: [
          {
            description: "Admit your error and focus on another lead.",
            next_scene: "scene_6",
            option_id: "8A",
          },
          {
            next_scene: "scene_10",
            option_id: "8B",
            description: "Close the case, admitting defeat.",
          },
        ],
        scene_id: "scene_8",
      },
      {
        clues: [
          {
            clue_id: "recovered_painting",
            name: "Mona Lisa",
            description: "The Mona Lisa, safe and sound.",
          },
        ],
        background_audio: "tension",
        options: [
          {
            next_scene: "scene_10",
            description: "Arrest Silas Croft.",
            option_id: "9A",
          },
        ],
        narration:
          "Armed with the feather analysis and a hard-won search warrant, you and a tactical team breach Silas Croft's opulent townhouse. Behind a priceless tapestry, you discover a hidden elevator. It descends into a private gallery that rivals the Louvre itself. At the far end is a massive, climate-controlled aviary filled with exotic birds. There, you spot a Spix's Macaw with a conspicuous gap in its tail feathers. Croft stands beside it, a smug look on his face, which vanishes when you reveal the feather. A button on his desk reveals the grand prize, hidden behind a steel wall: the Mona Lisa, smiling her enigmatic smile as if she knew you were coming.",
        scene_id: "scene_9",
      },
      {
        narration:
          "This is the end of the line. Your choices have led you to this conclusion.",
        background_audio: "silence",
        scene_id: "scene_10",
        options: [
          {
            option_id: "END_A",
            next_scene: "scene_10",
            required_clues: ["recovered_painting"],
            description:
              "(Ending A) With Croft in custody and the painting recovered, you are hailed as a hero. The Mona Lisa is returned to the Louvre, and your name is etched into the annals of art history's greatest detective cases. The subtle clue of the feather was the key that unlocked the entire conspiracy.",
          },
          {
            next_scene: "scene_10",
            option_id: "END_B",
            description:
              "(Ending B) Your investigation stalled after a series of missteps and wrong turns. The trail went cold and the Mona Lisa was never seen again, becoming the most famous unsolved art heist in history. The empty space on the Louvre's wall serves as a monument to your failure.",
          },
          {
            option_id: "END_C",
            next_scene: "scene_10",
            description:
              "(Ending C) You accused an innocent person, damaging their career and your own reputation. While you were distracted, the real thief smuggled the painting out of the country. The case is officially closed, a permanent stain on your record, and the art world whispers your name with contempt.",
          },
        ],
      },
    ],
    title: "The Shadow of the Louvre",
  },
};

export default function ArtTheftParisPage() {
  const router = useRouter();

  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [currentScene, setCurrentScene] = useState<string>("scene_1");
  const [discoveredClues, setDiscoveredClues] = useState<Clue[]>([]);
  const [sceneHistory, setSceneHistory] = useState<string[]>(["scene_1"]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [storyName, setStoryName] = useState<string | null>(null);

  // --- API Call Simulation ---
  useEffect(() => {
    const fetchStoryData = async () => {
      setIsLoading(true);
      try {
        // This will fail, causing the catch block to run and use fallbackData
        const response = await axios.post<StoryData>(
          "http://localhost:8000/api/detective-story",
          {
            seatNumber:"G24",
            sourceStation:"Howrah"
          }
        );

        // fetch("http://localhost:8000/api/detective-story")
        setStoryData(response.data);
        setStoryName(response.data.story.title);
      } catch (error) {
        console.warn("API call failed. Using fallback mock data.", error);
        setStoryData(fallbackData);
        setStoryName(fallbackData.story.title);
      } finally {
        setTimeout(() => setIsLoading(false), 700); // Simulate network delay
      }
    };
    if (!storyData) fetchStoryData();
  }, []);

  const currentSceneData: Scene | undefined = storyData?.story.scenes.find(
    (scene) => scene.scene_id === currentScene
  );

  // --- Clue Discovery ---
  useEffect(() => {
    if (currentSceneData?.clues) {
      setDiscoveredClues((prev) => {
        const newClues = currentSceneData.clues!.filter(
          (clue) =>
            !prev.some((existingClue) => existingClue.clue_id === clue.clue_id)
        );
        // Use a Set to ensure uniqueness if scenes are revisited
        return [...prev, ...newClues];
      });
    }
  }, [currentScene, currentSceneData]);

  const handleOptionClick = (option: Option) => {
    // Endings are handled as alerts
    if (option.option_id.startsWith("END_")) {
      alert(option.description);
      return;
    }

    // Check if player has required clues for an option
    const discoveredClueIds = discoveredClues.map((c) => c.clue_id);
    const hasRequiredClues =
      option.required_clues?.every((req) => discoveredClueIds.includes(req)) ??
      true;

    if (!hasRequiredClues) {
      alert("You need more evidence to pursue this lead.");
      return;
    }

    // Prevent adding history for final scene loops
    if (currentScene !== option.next_scene) {
      setSceneHistory((prev) => [...prev, option.next_scene]);
    }
    setCurrentScene(option.next_scene);
  };

  const handleBackToScene = () => {
    if (sceneHistory.length > 1) {
      const newHistory = [...sceneHistory];
      newHistory.pop();
      const previousScene = newHistory[newHistory.length - 1];
      setSceneHistory(newHistory);
      setCurrentScene(previousScene);
    }
  };

  if (isLoading || !currentSceneData) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Accessing Louvre archives...</p>
        <style jsx>{`
          .loading-screen {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: #ecf0f1;
            font-family: serif;
          }
          .loading-spinner {
            width: 60px;
            height: 60px;
            border: 3px solid rgba(236, 240, 241, 0.3);
            border-top: 3px solid #ecf0f1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <div className="case-container">
        <div className="case-header">
          <h1>{storyData?.story.title || "The Louvre Heist"}</h1>
          <p className="subtitle">A Masterpiece of Deception</p>
          <div className="status-bar">
            <div className="clues-counter">
              <span className="label">EVIDENCE:</span>
              <span className="count">{discoveredClues.length}</span>
            </div>
            <div className="scene-indicator">
              <span className="label">LOCATION:</span>
              <span className="scene-id">
                {currentScene.toUpperCase().replace("_", " ")}
              </span>
            </div>
          </div>
        </div>

        <div className="scene-content">
          {sceneHistory.length > 1 && currentScene !== "scene_10" && (
            <button className="scene-back-button" onClick={handleBackToScene}>
              ← PREVIOUS SCENE
            </button>
          )}

          <div className="narration-box">
            <div className="section-header">
              <span className="icon">🏛️</span>
              <h3>INVESTIGATION NOTES</h3>
            </div>
            <p className="narration">{currentSceneData.narration}</p>
          </div>

          {currentSceneData.dialogues &&
            currentSceneData.dialogues.length > 0 && (
              <div className="dialogue-section">
                <div className="section-header">
                  <span className="icon">💬</span>
                  <h3>CONVERSATIONS</h3>
                </div>
                {currentSceneData.dialogues.map((dialogue, index) => (
                  <div key={index} className="dialogue-item">
                    <div className="character-tag">{dialogue.character}</div>
                    <div className="speech-bubble">"{dialogue.speech}"</div>
                  </div>
                ))}
              </div>
            )}

          {currentSceneData.clues && currentSceneData.clues.length > 0 && (
            <div className="clues-section">
              <div className="section-header">
                <span className="icon">🔍</span>
                <h3>EVIDENCE DISCOVERED</h3>
              </div>
              {currentSceneData.clues.map((clue) => (
                <div key={clue.clue_id} className="clue-item">
                  <div className="clue-header">
                    <strong className="clue-name">
                      {clue.name.toUpperCase()}
                    </strong>
                    <span className="clue-status">VERIFIED</span>
                  </div>
                  <p className="clue-description">{clue.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className="options-section">
            <div className="section-header">
              <span className="icon">⚖️</span>
              <h3>NEXT ACTION</h3>
            </div>
            <div className="options-grid">
              {currentSceneData.options.map((option) => {
                const discoveredClueIds = discoveredClues.map((c) => c.clue_id);
                const hasRequiredClues =
                  option.required_clues?.every((req) =>
                    discoveredClueIds.includes(req)
                  ) ?? true;

                return (
                  <button
                    key={option.option_id}
                    className={`option-btn ${
                      !hasRequiredClues ? "disabled" : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                    disabled={!hasRequiredClues}
                    title={
                      !hasRequiredClues
                        ? `Requires evidence: ${option.required_clues?.join(
                            ", "
                          )}`
                        : ""
                    }
                  >
                    <span className="option-text">{option.description}</span>
                    <div className="btn-glow"></div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {discoveredClues.length > 0 && (
          <div className="evidence-sidebar">
            <div className="sidebar-header">
              <h3>CASE FILES</h3>
              <div className="connection-status">SECURE</div>
            </div>
            <div className="evidence-list">
              {discoveredClues.map((clue) => (
                <div key={clue.clue_id} className="evidence-item">
                  <div className="evidence-icon">📄</div>
                  <div className="evidence-name">{clue.name.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="back-button" onClick={() => router.back()}>
          <span>← RETURN TO CASES</span>
        </button>
      </div>

      <style jsx>{`
        /* Your original CSS is preserved here. A few minor theme tweaks for this story. */
        .case-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #2c3e50, #465873, #6f7f95);
          color: #e0e7ef;
          font-family: serif;
          padding: 20px;
          position: relative;
          overflow-x: hidden;
        }
        .case-header {
          text-align: center;
          margin-bottom: 30px;
          padding: 25px;
          background: rgba(224, 231, 239, 0.1);
          border-radius: 10px;
          border: 2px solid #9fb3c8;
          box-shadow: 0 0 20px rgba(159, 179, 200, 0.3);
          backdrop-filter: blur(10px);
        }
        .case-header h1 {
          font-size: 2.5rem;
          margin: 0 0 10px 0;
          color: #e0e7ef;
          text-shadow: 0 0 15px rgba(224, 231, 239, 0.8);
          letter-spacing: 2px;
        }
        .subtitle {
          font-size: 1.2rem;
          color: #b0c4de;
          font-style: italic;
          margin-bottom: 15px;
        }
        .status-bar {
          display: flex;
          justify-content: center;
          gap: 40px;
          font-size: 1.1rem;
        }
        .clues-counter,
        .scene-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .label {
          color: #ff6b6b;
          font-weight: bold;
        }
        .count,
        .scene-id {
          color: #e0e7ef;
          background: rgba(176, 196, 222, 0.2);
          padding: 4px 8px;
          border-radius: 4px;
        }
        .scene-content {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .narration-box,
        .dialogue-section,
        .clues-section,
        .options-section {
          background: rgba(29, 59, 83, 0.7);
          padding: 25px;
          border-radius: 10px;
          border: 1px solid #6f7f95;
          box-shadow: 0 0 15px rgba(111, 127, 149, 0.2);
          backdrop-filter: blur(5px);
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(111, 127, 149, 0.3);
        }
        .section-header .icon {
          font-size: 1.2rem;
        }
        .section-header h3 {
          margin: 0;
          color: white;
          text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
            1px 1px 0 #000;
          font-size: 1.2rem;
          letter-spacing: 1px;
        }
        .narration {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #d4dde7;
          font-style: italic;
        }
        .dialogue-item {
          margin: 15px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .character-tag {
          background: linear-gradient(45deg, #e74c3c, #f39c12);
          color: #fff;
          padding: 4px 12px;
          border-radius: 15px;
          font-weight: bold;
          font-size: 0.9rem;
          align-self: flex-start;
        }
        .speech-bubble {
          background: rgba(243, 156, 18, 0.1);
          padding: 12px 18px;
          border-radius: 10px;
          border-left: 3px solid #f39c12;
          color: #ecf0f1;
          font-style: italic;
        }
        .clues-section {
          border-color: #6495ed;
          box-shadow: 0 0 15px rgba(100, 149, 237, 0.2);
        }
        .clue-item {
          background: rgba(100, 149, 237, 0.1);
          padding: 18px;
          border-radius: 8px;
          margin: 15px 0;
          border: 1px solid #6495ed;
        }
        .clue-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .clue-name {
          color: #87ceeb;
          font-size: 1.1rem;
        }
        .clue-status {
          background: #5cb85c;
          color: #fff;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: bold;
        }
        .clue-description {
          color: #d4dde7;
          margin: 0;
          line-height: 1.5;
        }
        .options-grid {
          display: grid;
          gap: 15px;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }
        .option-btn {
          background: linear-gradient(45deg, #4e73df, #224abe);
          color: #fff;
          border: none;
          padding: 20px 28px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          font-family: serif;
          overflow: hidden;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .option-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(34, 74, 190, 0.4);
        }
        .option-btn.disabled {
          background: linear-gradient(45deg, #5a626b, #343a40);
          color: #adb5bd;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .option-btn.disabled:hover {
          transform: none;
        }
        .btn-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }
        .option-btn:hover .btn-glow {
          left: 100%;
        }
        .evidence-sidebar {
          position: fixed;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          width: 280px;
          background: rgba(29, 59, 83, 0.9);
          padding: 20px;
          border-radius: 10px;
          border: 2px solid #6f7f95;
          box-shadow: 0 0 20px rgba(111, 127, 149, 0.3);
          backdrop-filter: blur(10px);
        }
        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #6f7f95;
        }
        .sidebar-header h3 {
          color: #e0e7ef;
          margin: 0;
          font-size: 1.1rem;
        }
        .connection-status {
          background: #28a745;
          color: #fff;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: bold;
        }
        .evidence-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(111, 127, 149, 0.1);
          padding: 10px;
          margin: 8px 0;
          border-radius: 5px;
          font-size: 0.9rem;
        }
        .evidence-icon {
          font-size: 1.1rem;
        }
        .evidence-name {
          color: #b0c4de;
        }
        .back-button {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: transparent;
          border: 2px solid #9fb3c8;
          color: #9fb3c8;
          padding: 15px 25px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: serif;
        }
        .back-button:hover {
          background: #9fb3c8;
          color: #1d3b53;
          box-shadow: 0 0 20px rgba(159, 179, 200, 0.5);
          transform: scale(1.05);
        }
        .scene-back-button {
          background: rgba(159, 179, 200, 0.2);
          color: #b0c4de;
          border: 2px solid #9fb3c8;
          padding: 15px 25px;
          border-radius: 20px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: serif;
          margin-bottom: 20px;
          align-self: flex-start;
        }
        .scene-back-button:hover {
          background: #b0c4de;
          color: #1d3b53;
          transform: translateX(-5px);
          box-shadow: 0 0 15px rgba(176, 196, 222, 0.4);
        }
        @media (max-width: 768px) {
          .evidence-sidebar {
            position: relative;
            right: auto;
            top: auto;
            transform: none;
            width: 100%;
            margin-top: 20px;
          }
          .case-header h1 {
            font-size: 2rem;
          }
          .status-bar {
            flex-direction: column;
            gap: 15px;
          }
          .options-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
