"use client"

import Link from "next/link"
import { useState } from "react"

export default function Sandbox1Page() {
  const [isRealistic, setIsRealistic] = useState(false)

  const [sandboxData, setSandboxData] = useState({
    useQuery:"",
    difficulty:"EASY"
  })

  

  return (
    <>
      <div className="sandbox-container">
        <h1>SANDBOX MODE</h1>
        <h2>Create Your Case!</h2>

        <div className="top-buttons">
          <button className="top-btn">New Case</button>
          <button className="top-btn">Import Template</button>
          <button className="top-btn">View Community Cases</button>
        </div>

        <div className="section-grid">
          {/* Case Details */}
          <div className="section">
            <h3>Case Details</h3>
            <input type="text" placeholder="Case Name" />
            <textarea placeholder="Summary"></textarea>
            <select>
              <option>Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <div className="toggle-row">
              <label>Realistic</label>
              <label className="switch">
                <input type="checkbox" checked={isRealistic} onChange={(e) => setIsRealistic(e.target.checked)} />
                <span className="slider round"></span>
              </label>
              <label>Fictional</label>
            </div>

            <select>
              <option>Time Period</option>
              <option>Modern</option>
              <option>Historic</option>
              <option>Future</option>
            </select>
          </div>

          {/* Crime Scene Builder */}
          <div className="section">
            <h3>Crime Scene Builder</h3>
            <select>
              <option>Room setup</option>
            </select>
            <select>
              <option>Outdoor scene</option>
            </select>
            <select>
              <option>Objects</option>
            </select>
            <select>
              <option>Environment</option>
            </select>
          </div>

          {/* Evidence Builder */}
          <div className="section">
            <h3>Evidence Builder</h3>
            <input type="text" placeholder="Items" />
            <input type="text" placeholder="False Leads" />
          </div>

          {/* Character Creation */}
          <div className="section">
            <h3>Character Creation</h3>
            <input type="text" placeholder="Suspects" />
            <input type="text" placeholder="Victims" />
            <input type="text" placeholder="Witnesses" />
            <select>
              <option>Role</option>
            </select>
            <input type="text" placeholder="Traits" />
          </div>

          {/* Case Resolution */}
          <div className="section">
            <h3>Case Resolution</h3>
            <input type="text" placeholder="Winning Conditions" />
            <input type="text" placeholder="Endings" />
          </div>
        </div>

        <div className="bottom-buttons">
          <Link href="/menu" className="back-btn">
            ← Back
          </Link>
          <button className="create-btn">Create Case!</button>
          <Link href="/sandbox2" className="next-btn">
            Next →
          </Link>
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .sandbox-container {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background-color: #0a0a1a;
          color: white;
          min-height: 100vh;
        }

        h1 {
          font-size: 3.2em;
          letter-spacing: 5px;
          text-align: center;
          margin-top: 30px;
          font-weight: 900;
          text-transform: uppercase;
          text-shadow: 2px 2px 8px black;
        }

        h2 {
          text-align: center;
          font-size: 1.6em;
          font-weight: bold;
          color: #ffffff;
          text-shadow: 1px 1px 5px black;
          letter-spacing: 2px;
          margin-bottom: 30px;
        }

        .top-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .top-btn {
          background: linear-gradient(to right, #9000ff, #e100ff);
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 0 8px #ff00ff;
        }

        .section-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
          margin: 30px 0;
        }

        .section {
          background: rgba(0, 0, 0, 0.65);
          padding: 20px;
          border-radius: 15px;
          width: 260px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
        }

        .section h3 {
          margin-bottom: 10px;
          text-align: center;
          text-shadow: 1px 1px black;
          text-transform: uppercase;
          font-size: 1.1em;
        }

        .section input,
        .section select,
        .section textarea {
          width: 100%;
          padding: 10px;
          margin: 7px 0;
          border-radius: 8px;
          border: 1px solid #888;
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          font-weight: bold;
        }

        textarea {
          resize: vertical;
          height: 60px;
        }

        .section input::placeholder,
        .section textarea::placeholder {
          color: #ddd;
        }

        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 10px 0;
        }

        .toggle-row label {
          font-weight: bold;
          font-size: 0.9em;
          color: yellow;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 20px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          background-color: #666;
          transition: 0.4s;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 20px;
        }

        .slider:before {
          content: "";
          position: absolute;
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #ffcc00;
        }

        input:checked + .slider:before {
          transform: translateX(20px);
        }

        .bottom-buttons {
          display: flex;
          justify-content: space-between;
          margin: 40px 20px;
        }

        .back-btn, .next-btn {
          color: white;
          font-size: 1.2em;
          font-weight: bold;
          background: none;
          border: none;
          cursor: pointer;
          text-shadow: 1px 1px 3px black;
          text-decoration: none;
        }

        .create-btn {
          background-color: red;
          color: white;
          padding: 12px 25px;
          font-size: 1.2em;
          font-weight: bold;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 0 8px black;
        }
      `}</style>
    </>
  )
}
