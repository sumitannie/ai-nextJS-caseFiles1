"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

// Mock data for the cyber London case
const story = {
  title: "Digital Shadows: The Silicon Murder",
  scenes: [
    {
      scene_id: "scene_1",
      narration:
        "Rain streaks down the glass walls of the Nexus Tower in Canary Wharf, each droplet catching the neon glow of the city's digital heartbeat. Detective Sarah Chen receives an urgent call about a high-profile death, the static-filled transmission cutting through the night like a digital scream. The tower rises forty stories into the London sky, a monument to technological ambition where fortunes are made and lost with the click of a mouse. Inside, the building hums with the constant whisper of servers and the soft glow of monitors that never sleep. Security cameras track every movement through corridors lined with startup dreams and corporate nightmares. Tonight, one of those dreams has turned deadly, and the digital realm that promised transparency has become a maze of encrypted secrets and hidden motives.",
      dialogues: [
        {
          character: "Dispatch",
          speech:
            "Tech CEO Marcus Blackwell found dead in his office. Possible poisoning. Scene secured.",
        },
        {
          character: "Detective Chen",
          speech:
            "On my way. This is going to be complicated - tech executives have many enemies.",
        },
      ],
      background_audio: "rain",
      options: [
        {
          option_id: "go_scene_2",
          description: "Examine the crime scene",
          next_scene: "scene_2",
          required_clues: [],
        },
        {
          option_id: "go_scene_3",
          description: "Interview the security team",
          next_scene: "scene_3",
          required_clues: [],
        },
      ],
    },
    {
      scene_id: "scene_2",
      narration:
        "The 40th floor executive office is pristine except for Marcus Blackwell slumped over his standing desk, his lifeless form a stark contrast to the gleaming technology surrounding him. Multiple monitors still glow with code and financial data, their screens casting an eerie blue light across his pale features. The office speaks of success and ambition - awards line the walls, and expensive gadgets occupy every surface like trophies of technological conquest. A half-eaten sandwich sits beside his keyboard, suggesting he was working late into the evening, unaware that death was approaching with silent, calculated steps. The air conditioning hums quietly, circulating the sterile atmosphere of corporate power that has now become a tomb. Through the floor-to-ceiling windows, London's lights twinkle below like digital stars, oblivious to the tragedy that has unfolded in this glass tower reaching toward the heavens.",
      dialogues: [
        {
          character: "Forensics",
          speech:
            "Preliminary toxicology suggests ricin poisoning. Victim died approximately 2 hours ago.",
        },
        {
          character: "Detective Chen",
          speech:
            "Ricin... that's not a crime of passion. Someone planned this carefully.",
        },
      ],
      background_audio: "crime_scene",
      clues: [
        {
          clue_id: "coffee_cup",
          name: "Poisoned Coffee Cup",
          description:
            "Half-empty coffee cup on desk with traces of ricin. Custom blend from the executive floor.",
        },
      ],
      options: [
        {
          option_id: "examine_computer",
          description: "Examine the victim's computer",
          next_scene: "scene_4",
          required_clues: [],
        },
        {
          option_id: "check_security_footage",
          description: "Review security footage",
          next_scene: "scene_5",
          required_clues: [],
        },
      ],
    },
    {
      scene_id: "scene_3",
      narration:
        "The security control room buzzes with monitors showing every corner of the building, a digital panopticon that watches over the corporate kingdom with unblinking electronic eyes. Head of Security James Morrison looks nervous, his usual confidence shaken by the evening's events as he fidgets with his security badge. Banks of screens flicker with feeds from hundreds of cameras, creating a mosaic of corporate life that has suddenly turned sinister. The room smells of coffee and electronic equipment, the familiar scents of a 24-hour operation that never truly sleeps. Red lights blink on various control panels, indicating systems running diagnostics and security protocols that should have prevented what happened tonight. Morrison's hands shake slightly as he pulls up the relevant footage, knowing that somewhere in this digital maze lies the key to understanding how death penetrated their supposedly impenetrable fortress.",
      dialogues: [
        {
          character: "James Morrison",
          speech:
            "Mr. Blackwell had a meeting scheduled with his inner circle today. CTO, CFO, and his assistant were all here.",
        },
        {
          character: "Detective Chen",
          speech: "Anyone else have access to the executive floor?",
        },
        {
          character: "James Morrison",
          speech:
            "Only those with executive keycards. But... there was a system glitch around 2 PM. Cameras went dark for 10 minutes.",
        },
      ],
      background_audio: "tension",
      clues: [
        {
          clue_id: "system_glitch",
          name: "Security System Glitch",
          description:
            "Suspicious 10-minute gap in security footage during the estimated time of murder.",
        },
      ],
      options: [
        {
          option_id: "investigate_glitch",
          description: "Investigate the system glitch",
          next_scene: "scene_6",
          required_clues: [],
        },
        {
          option_id: "return_to_scene_2",
          description: "Return to examine the crime scene",
          next_scene: "scene_2",
          required_clues: [],
        },
      ],
    },
    {
      scene_id: "scene_4",
      narration:
        "Marcus's computer is still logged in, its multiple screens displaying a digital autopsy of corporate secrets that died with him. Multiple encrypted files and a draft email marked 'URGENT - BOARD MEETING' catch your attention like neon signs in the digital darkness. The desktop is organized with military precision, folders labeled with cryptic names that hint at projects worth millions of pounds. Browser tabs remain open to financial websites and encrypted messaging platforms, suggesting he was conducting sensitive business right up until his final moments. The keyboard still bears the warmth of his fingers, and the mouse cursor blinks expectantly in a half-finished sentence that will never be completed. Lines of code scroll across one monitor like digital poetry, while another displays financial charts that tell a story of success built on foundations that may not be as solid as they appear.",
      dialogues: [
        {
          character: "Detective Chen",
          speech:
            "He was working on something important before he died. This email mentions 'financial irregularities'.",
        },
      ],
      background_audio: "discovery",
      clues: [
        {
          clue_id: "encrypted_files",
          name: "Encrypted Financial Files",
          description:
            "Password-protected files containing evidence of embezzlement within the company.",
        },
        {
          clue_id: "draft_email",
          name: "Unsent Email Draft",
          description:
            "Email to the board exposing someone stealing millions from company accounts.",
        },
      ],
      options: [
        {
          option_id: "decrypt_files",
          description: "Work with IT to decrypt the files",
          next_scene: "scene_7",
          required_clues: [],
        },
      ],
    },
    {
      scene_id: "scene_5",
      narration:
        "Reviewing the security footage from before the glitch, you see several people entering and leaving Marcus's office throughout the day like actors in a digital drama. The high-definition cameras capture every detail with clinical precision, recording the final hours of a man who had no idea he was living his last day. Each visitor moves with purpose through the corridors, their keycard access logged with timestamp accuracy that creates a digital breadcrumb trail. The footage reveals the rhythm of corporate life - meetings, phone calls, and the constant flow of information that keeps the business world spinning. But somewhere in this recorded history lies a killer who moved among the innocent with deadly intent. The screens flicker with the ghosts of the past, each frame a potential clue in a puzzle that grows more complex with every passing moment.",
      dialogues: [
        {
          character: "Detective Chen",
          speech:
            "Three people had access: Elena Rodriguez the CTO, David Park the CFO, and Lisa Wong his executive assistant.",
        },
      ],
      background_audio: "investigation",
      clues: [
        {
          clue_id: "visitor_log",
          name: "Digital Visitor Log",
          description:
            "Keycard access shows Elena at 1:30 PM, David at 1:45 PM, and Lisa at 2:15 PM - right before the glitch.",
        },
      ],
      options: [
        {
          option_id: "interview_suspects",
          description: "Interview the three suspects",
          next_scene: "scene_8",
          required_clues: [],
        },
      ],
    },
    {
      scene_id: "scene_6",
      narration:
        "The IT department reveals the security glitch was caused by a sophisticated cyber attack - someone with inside knowledge who understood the system's vulnerabilities like a digital architect. Server rooms hum with the constant whisper of cooling fans and blinking status lights that tell the story of the building's electronic nervous system. The attack was surgical in its precision, targeting specific cameras and logging systems with the skill of someone who knew exactly where to strike. Cables snake across the floor like digital arteries, carrying the lifeblood of information that keeps the corporate world alive. The IT specialists work with the focused intensity of digital detectives, their screens filled with code and system logs that reveal the electronic fingerprints of the intruder. In this realm of ones and zeros, someone has committed the perfect digital crime to cover up a very analog murder.",
      dialogues: [
        {
          character: "IT Specialist",
          speech:
            "This wasn't random. Someone used admin credentials to create a blind spot in our surveillance.",
        },
        {
          character: "Detective Chen",
          speech: "Who has admin access to the security system?",
        },
        {
          character: "IT Specialist",
          speech:
            "Only three people: the CTO, CFO, and... the head of security himself.",
        },
      ],
      background_audio: "revelation",
      clues: [
        {
          clue_id: "admin_access",
          name: "Admin Access Records",
          description:
            "Security system was compromised using Elena Rodriguez's admin credentials at 1:50 PM.",
        },
      ],
      options: [
        {
          option_id: "confront_elena",
          description: "Confront Elena about the security breach",
          next_scene: "scene_9",
          required_clues: [],
        },
      ],
    },
    {
      scene_id: "scene_7",
      narration:
        "The decrypted files reveal a shocking truth that cuts through the corporate facade like a digital sword: someone has been siphoning money from the company's AI research budget for months. Spreadsheets tell the story of systematic theft, each entry a small wound that collectively bled the company of millions. The financial records are meticulous in their detail, showing transfers to offshore accounts and shell companies that exist only in the digital realm. Marcus had been conducting his own investigation, following the money trail with the determination of a man who refused to let his life's work be destroyed by greed. Bank statements and transaction logs paint a picture of betrayal that goes to the very heart of the organization he built. The numbers don't lie, and they point to someone close enough to the CEO to have intimate knowledge of the company's financial structure and security protocols.",
      dialogues: [
        {
          character: "Detective Chen",
          speech:
            "£2.3 million stolen over six months. Marcus discovered the theft and was about to expose it.",
        },
      ],
      background_audio: "tension",
      clues: [
        {
          clue_id: "embezzlement_evidence",
          name: "Embezzlement Evidence",
          description:
            "Financial records showing systematic theft from AI research funds, traced to offshore accounts.",
        },
      ],
      options: [
        {
          option_id: "trace_accounts",
          description: "Trace the offshore accounts",
          next_scene: "scene_8",
          required_clues: [],
        },
      ],
    },
    {
      scene_id: "scene_8",
      narration:
        "You interview the three suspects in the sterile conference room, its glass walls offering no privacy from the digital eyes that watch every corner of the building. Elena seems genuinely shocked by the accusations, her technical mind racing to understand how her credentials could have been compromised. David is defensive about the finances, his CFO training kicking in as he mentally calculates the implications of the missing money. But Lisa appears unusually calm, her composure almost unnatural given the gravity of the situation and the death of her longtime employer. The fluorescent lights cast harsh shadows across their faces, revealing the stress lines and nervous tics that betray their inner turmoil. Each person sits like a suspect in a digital age mystery, where alibis are measured in keycard swipes and guilt is hidden behind encrypted passwords.",
      dialogues: [
        {
          character: "Elena Rodriguez",
          speech:
            "Someone used my credentials? That's impossible! I was in the server room during the glitch.",
        },
        {
          character: "David Park",
          speech:
            "I handle the budgets, but I would never steal! Marcus trusted me completely.",
        },
        {
          character: "Lisa Wong",
          speech:
            "I brought Marcus his afternoon coffee as usual. He seemed stressed about some financial report.",
        },
      ],
      background_audio: "interrogation",
      clues: [
        {
          clue_id: "false_alibi",
          name: "Lisa's Coffee Delivery",
          description:
            "Lisa claims she delivered the coffee, but security shows she left before returning during the glitch.",
        },
      ],
      options: [
        {
          option_id: "investigate_lisa",
          description: "Investigate Lisa's background",
          next_scene: "scene_9",
          required_clues: [],
        },
      ],
    },
    {
      scene_id: "scene_9",
      narration:
        "A deeper investigation reveals Lisa Wong has been living beyond her means, her modest salary unable to support the luxury lifestyle she's been maintaining in secret. Bank records show deposits that don't match her income, and connections to the offshore accounts used in the embezzlement create a web of financial deception. Her apartment, when searched, reveals expensive jewelry and designer clothes that would cost more than she earns in a year. The woman who appeared to be the perfect executive assistant has been living a double life, funded by stolen money from the company she pretended to serve faithfully. Credit card statements show payments to medical facilities, revealing the desperate motivation behind her crimes. As the evidence mounts, her calm facade finally begins to crack, and the truth emerges like data from a corrupted hard drive being slowly recovered.",
      dialogues: [
        {
          character: "Detective Chen",
          speech:
            "Lisa, we know about the stolen money. Marcus found out, didn't he?",
        },
        {
          character: "Lisa Wong",
          speech:
            "You don't understand! I needed that money for my mother's cancer treatment. Marcus would have destroyed my life!",
        },
        {
          character: "Detective Chen",
          speech:
            "So you poisoned his coffee and used Elena's stolen credentials to cover your tracks.",
        },
      ],
      background_audio: "confrontation",
      clues: [
        {
          clue_id: "confession",
          name: "Lisa's Confession",
          description:
            "Lisa admits to poisoning Marcus's coffee and framing Elena by using her stolen admin credentials.",
        },
      ],
      options: [
        {
          option_id: "solve_case",
          description: "Arrest Lisa Wong",
          next_scene: "ending",
          required_clues: [],
        },
      ],
    },
    {
      scene_id: "scene_10",
      narration:
        "The case is closed as the digital dust settles over the Nexus Tower, its glass walls reflecting the city lights like a monument to both technological achievement and human frailty. Lisa Wong is arrested for the murder of Marcus Blackwell, her handcuffs clicking with the finality of justice served in the digital age. The false clue of Elena's compromised credentials nearly led the investigation astray, a reminder that in the world of technology, even the most sophisticated systems can be manipulated by human cunning. The building's servers continue to hum with their electronic whispers, processing data and transactions as if nothing has changed. But in the executive suite where Marcus once dreamed of digital futures, only silence remains. The investigation has revealed that no amount of encryption can hide the oldest motives for murder: greed, desperation, and the lengths people will go to protect their secrets.",
      dialogues: [
        {
          character: "Detective Chen",
          speech:
            "Technology can hide the truth, but human motives always surface in the end.",
        },
      ],
      background_audio: "resolution",
      options: [],
    },
  ],
};

export default function CyberLondonPage() {
  const [currentScene, setCurrentScene] = useState("scene_1");
  const [discoveredClues, setDiscoveredClues] = useState<string[]>([]);
  const [caseData, setCaseData] = useState(story);
  const [isLoading, setIsLoading] = useState(false);
  const [sceneHistory, setSceneHistory] = useState<string[]>(["scene_1"]);
  const router = useRouter();

  // Mock API call to fetch case data
  useEffect(() => {
    const fetchCaseData = async () => {
      setIsLoading(true);
      try {
        // This will fail, causing the catch block to run and use fallbackData
        const response = await axios.post(
          "http://localhost:8000/api/detective-story",
          {
            prompt: "string",
          }
        );

        // fetch("http://localhost:8000/api/detective-story")
        setCaseData(response.data);
        // setStoryName(response.data.story.title);
      } catch (error) {
        console.warn("API call failed. Using fallback mock data.", error);
        setCaseData(story);
        // setStoryName(fallbackData.story.title);
      } finally {
        setTimeout(() => setIsLoading(false), 700); // Simulate network delay
      }

      // Simulate API delay
      // await new Promise((resolve) => setTimeout(resolve, 1000))
      //    http://127.0.0.1:8000 /api/detective-story

      // console.log("API response:", response.data);

      // setCaseData(story);
      // setIsLoading(false);
    };

    fetchCaseData();
  }, []);

  useEffect(() => {
    const scene = getCurrentSceneData();
    if (scene?.clues) {
      const newClues = scene.clues.map((clue) => clue.clue_id);
      setDiscoveredClues((prev) => [...new Set([...prev, ...newClues])]);
    }
  }, [currentScene]);

  const getCurrentSceneData = () => {
    return caseData.scenes.find((scene) => scene.scene_id === currentScene);
  };

  const handleOptionClick = (option: any) => {
    // Check if option requires clues
    if (option.required_clues) {
      const hasRequiredClues = option.required_clues.every((clue: string) =>
        discoveredClues.includes(clue)
      );
      if (!hasRequiredClues) {
        alert("You need more digital evidence before choosing this option!");
        return;
      }
    }

    if (option.next_scene === "ending") {
      alert(
        "Case Solved! Lisa Wong murdered Marcus Blackwell to cover up her embezzlement, using Elena's stolen credentials as a false trail."
      );
      return;
    }

    setSceneHistory((prev) => [...prev, option.next_scene]);
    setCurrentScene(option.next_scene);
  };

  const goToPreviousScene = () => {
    if (sceneHistory.length > 1) {
      const newHistory = [...sceneHistory];
      newHistory.pop(); // Remove current scene
      const previousScene = newHistory[newHistory.length - 1];
      setSceneHistory(newHistory);
      setCurrentScene(previousScene);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Initializing cyber investigation...</p>
        <div className="matrix-bg"></div>
        <style jsx>{`
          .loading-screen {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e);
            color: #00ff41;
            font-family: "Courier New", monospace;
            position: relative;
            overflow: hidden;
          }
          .loading-spinner {
            width: 60px;
            height: 60px;
            border: 3px solid rgba(0, 255, 65, 0.3);
            border-top: 3px solid #00ff41;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
          }
          .matrix-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(
                90deg,
                transparent 98%,
                rgba(0, 255, 65, 0.1) 100%
              ),
              linear-gradient(0deg, transparent 98%, rgba(0, 255, 65, 0.1) 100%);
            background-size: 20px 20px;
            animation: matrix-scroll 2s linear infinite;
            z-index: -1;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes matrix-scroll {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(20px, 20px);
            }
          }
        `}</style>
      </div>
    );
  }

  const scene = getCurrentSceneData();

  if (!scene) {
    return (
      <div className="error-screen">
        <h2>Connection Lost</h2>
        <Link href="/detective">Return to Detective Hub</Link>
      </div>
    );
  }

  return (
    <>
      <div className="case-container">
        <div className="matrix-overlay"></div>

        {sceneHistory.length > 1 && (
          <button className="previous-scene-button" onClick={goToPreviousScene}>
            <span>← Previous Scene</span>
          </button>
        )}

        <div className="case-header">
          <h1>{caseData.title}</h1>
          <div className="status-bar">
            <div className="clues-counter">
              <span className="label">EVIDENCE:</span>
              <span className="count">{discoveredClues.length}</span>
            </div>
            <div className="scene-indicator">
              <span className="label">SCENE:</span>
              <span className="scene-id">{currentScene.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="scene-content">
          <div className="narration-box">
            <div className="section-header">
              <span className="icon">📍</span>
              <h3>LOCATION ANALYSIS</h3>
            </div>
            <p className="narration">{scene.narration}</p>
          </div>

          {scene.dialogues && scene.dialogues.length > 0 && (
            <div className="dialogue-section">
              <div className="section-header">
                <span className="icon">💬</span>
                <h3>AUDIO TRANSCRIPT</h3>
              </div>
              {scene.dialogues.map((dialogue, index) => (
                <div key={index} className="dialogue-item">
                  <div className="character-tag">{dialogue.character}</div>
                  <div className="speech-bubble">"{dialogue.speech}"</div>
                </div>
              ))}
            </div>
          )}

          {scene.clues && scene.clues.length > 0 && (
            <div className="clues-section">
              <div className="section-header">
                <span className="icon">🔍</span>
                <h3>DIGITAL EVIDENCE ACQUIRED</h3>
              </div>
              {scene.clues.map((clue, index) => (
                <div key={index} className="clue-item">
                  <div className="clue-header">
                    <strong className="clue-name">{clue.name}</strong>
                    <span className="clue-status">VERIFIED</span>
                  </div>
                  <p className="clue-description">{clue.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className="options-section">
            <div className="section-header">
              <span className="icon">⚡</span>
              <h3>NEXT ACTION</h3>
            </div>
            <div className="options-grid">
              {scene.options.map((option, index) => {
                const isDisabled =
                  option.required_clues &&
                  !option.required_clues.every((clue: string) =>
                    discoveredClues.includes(clue)
                  );

                return (
                  <button
                    key={index}
                    className={`option-btn ${isDisabled ? "disabled" : ""}`}
                    onClick={() => handleOptionClick(option)}
                    disabled={isDisabled}
                  >
                    <span className="option-text">{option.description}</span>
                    {isDisabled && <span className="locked-icon">🔒</span>}
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
              {discoveredClues.map((clueId, index) => {
                const clue = caseData.scenes
                  .flatMap((s) => s.clues || [])
                  .find((c) => c.clue_id === clueId);
                return clue ? (
                  <div key={index} className="evidence-item">
                    <div className="evidence-icon">📄</div>
                    <div className="evidence-name">{clue.name}</div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        <button className="back-button" onClick={() => router.back()}>
          <span>← DISCONNECT</span>
        </button>
      </div>

      <style jsx>{`
        .case-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e);
          color: #00ff41;
          font-family: "Courier New", monospace;
          padding: 20px;
          position: relative;
          overflow-x: hidden;
        }

        .matrix-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(
              90deg,
              transparent 98%,
              rgba(0, 255, 65, 0.05) 100%
            ),
            linear-gradient(0deg, transparent 98%, rgba(0, 255, 65, 0.05) 100%);
          background-size: 30px 30px;
          animation: matrix-scroll 4s linear infinite;
          pointer-events: none;
          z-index: -1;
        }

        @keyframes matrix-scroll {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(30px, 30px);
          }
        }

        .case-header {
          text-align: center;
          margin-bottom: 30px;
          padding: 25px;
          background: rgba(0, 255, 65, 0.1);
          border-radius: 10px;
          border: 2px solid #00ff41;
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
          backdrop-filter: blur(10px);
        }

        .case-header h1 {
          font-size: 2.5rem;
          margin: 0 0 15px 0;
          color: #00ff41;
          text-shadow: 0 0 15px rgba(0, 255, 65, 0.8);
          letter-spacing: 2px;
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
          color: #0ff;
          font-weight: bold;
        }

        .count,
        .scene-id {
          color: #00ff41;
          background: rgba(0, 255, 65, 0.2);
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
          background: rgba(0, 0, 0, 0.7);
          padding: 25px;
          border-radius: 10px;
          border: 1px solid #00ff41;
          box-shadow: 0 0 15px rgba(0, 255, 65, 0.2);
          backdrop-filter: blur(5px);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(0, 255, 65, 0.3);
        }

        .section-header .icon {
          font-size: 1.2rem;
        }

        .section-header h3 {
          margin: 0;
          color: #0ff;
          font-size: 1.2rem;
          letter-spacing: 1px;
        }

        .narration {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #e0e0e0;
          font-style: italic;
        }

        .dialogue-item {
          margin: 15px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .character-tag {
          background: linear-gradient(45deg, #0ff, #00ff41);
          color: #000;
          padding: 4px 12px;
          border-radius: 15px;
          font-weight: bold;
          font-size: 0.9rem;
          align-self: flex-start;
        }

        .speech-bubble {
          background: rgba(0, 255, 255, 0.1);
          padding: 12px 18px;
          border-radius: 10px;
          border-left: 3px solid #0ff;
          color: #e0e0e0;
          font-style: italic;
        }

        .clues-section {
          border-color: #ffd700;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
        }

        .clue-item {
          background: rgba(255, 215, 0, 0.1);
          padding: 18px;
          border-radius: 8px;
          margin: 15px 0;
          border: 1px solid #ffd700;
        }

        .clue-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .clue-name {
          color: #ffd700;
          font-size: 1.1rem;
        }

        .clue-status {
          background: #ffd700;
          color: #000;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: bold;
        }

        .clue-description {
          color: #e0e0e0;
          margin: 0;
          line-height: 1.5;
        }

        .options-grid {
          display: grid;
          gap: 15px;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        .option-btn {
          background: linear-gradient(45deg, #00ff41, #0ff);
          color: #000;
          border: none;
          padding: 18px 25px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          font-family: "Courier New", monospace;
          overflow: hidden;
        }

        .option-btn:hover:not(.disabled) {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 255, 65, 0.4);
        }

        .option-btn.disabled {
          background: #333;
          color: #666;
          cursor: not-allowed;
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

        .option-btn:hover:not(.disabled) .btn-glow {
          left: 100%;
        }

        .locked-icon {
          position: absolute;
          top: 8px;
          right: 8px;
          font-size: 0.9rem;
        }

        .evidence-sidebar {
          position: fixed;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          width: 280px;
          background: rgba(0, 0, 0, 0.9);
          padding: 20px;
          border-radius: 10px;
          border: 2px solid #ffd700;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
          backdrop-filter: blur(10px);
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #ffd700;
        }

        .sidebar-header h3 {
          color: #ffd700;
          margin: 0;
          font-size: 1.1rem;
        }

        .connection-status {
          background: #00ff41;
          color: #000;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: bold;
        }

        .evidence-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 215, 0, 0.1);
          padding: 10px;
          margin: 8px 0;
          border-radius: 5px;
          font-size: 0.9rem;
        }

        .evidence-icon {
          font-size: 1.1rem;
        }

        .evidence-name {
          color: #e0e0e0;
        }

        .back-button {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: transparent;
          border: 2px solid #00ff41;
          color: #00ff41;
          padding: 12px 20px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Courier New", monospace;
        }

        .back-button:hover {
          background: #00ff41;
          color: #000;
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
          transform: scale(1.05);
        }

        // Added styling for Previous Scene button
        .previous-scene-button {
          position: fixed;
          top: 20px;
          left: 20px;
          background: transparent;
          border: 2px solid #0ff;
          color: #0ff;
          padding: 10px 18px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Courier New", monospace;
          z-index: 1000;
        }

        .previous-scene-button:hover {
          background: #0ff;
          color: #000;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
          transform: scale(1.05);
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
