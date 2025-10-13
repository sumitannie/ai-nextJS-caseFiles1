"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function AIProfilerParis() {
  const router = useRouter();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Mock fallback data (similar structure to Survivor but profiler tone)
  const fallbackData = {
    title: "Louvre Art Theft — Profiler Report",
    subject: "Primary Subject: Clara Moreau (Curator)",
    summary:
      "Objective: Analyze behavioral indicators, speech cues, and microexpressions from the curator to establish motive probability in the Louvre theft incident.",
    scenes: [
      {
        id: 1,
        title: "Initial Observation",
        description:
          "The subject displays calmness inconsistent with the gravity of the theft. Pupillary constriction noted when referencing security logs.",
        insights: [
          "Possible cognitive suppression — rehearsed denial.",
          "Emotion baseline stable; deception probability 27%.",
        ],
        options: [
          { text: "Run linguistic anomaly scan", nextScene: 1 },
          { text: "Cross-check stress pattern logs", nextScene: 2 },
          { text: "Continue passive observation", nextScene: 3 },
        ],
      },
      {
        id: 2,
        title: "Stress Pattern Cross-Check",
        description:
          "When discussing the night of the theft, speech rhythm falters for 0.6s near the phrase 'the shipment delay.'",
        insights: [
          "Keyword-triggered stress reaction detected.",
          "Subconscious recall spike — possible withheld event.",
        ],
        options: [
          { text: "Flag 'shipment delay' for deeper probe", nextScene: 3 },
          { text: "Store biometric delta data", nextScene: 3 },
        ],
      },
      {
        id: 3,
        title: "Inference Layer",
        description:
          "Cognitive model comparison complete. Clara’s responses align 82% with concealed awareness behavior models. Motive correlation: internal collusion (36%), emotional leverage (22%).",
        insights: [
          "Recommendation: Cross-analyze her with subject ID-07 (security lead).",
          "Proceed to generate suspect hierarchy tree.",
        ],
        options: [
          { text: "Generate hierarchy tree", nextScene: 4 },
          { text: "Store full report to case log", nextScene: 4 },
        ],
      },
      {
        id: 4,
        title: "Profiler Summary",
        description:
          "Report stored. Clara Moreau marked as medium-risk subject. Awaiting corroboration from Detective stream.",
        insights: [
          "Deception probability stabilized at 31%.",
          "Profiler confidence index: 88%.",
        ],
        options: [],
      },
    ],
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/ai-profiler/art-theft-paris");
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        setAnalysisData(data);
      } catch (err) {
        setError(true);
        setAnalysisData(fallbackData);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Initializing profiler module...
      </div>
    );

  if (error)
    console.warn("Using fallback data for AI Profiler: Louvre Art Theft");

  const scene = analysisData.scenes[sceneIndex];

  const handleOptionClick = (nextIndex: number) => {
    if (nextIndex < analysisData.scenes.length) {
      setSceneIndex(nextIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-gray-100 flex flex-col p-6">
      {/* HEADER */}
      <div className="flex items-center mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-gray-400 hover:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2 tracking-wide">
          AI Profiler — Case Interface
        </h1>
      </div>

      {/* HUD */}
      <div className="flex flex-wrap justify-between items-center mb-6 text-xs text-gray-400">
        <p>Case ID: CF-023-PARIS</p>
        <p>Profiler System Active — v2.8 Neural Insight Model</p>
        <p>Confidence Threshold: ≥75%</p>
      </div>

      {/* MAIN CARD */}
      <motion.div
        key={scene.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-slate-800/70 border border-slate-700 shadow-lg backdrop-blur-sm mb-6">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-cyan-300">
              {scene.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {scene.description}
            </p>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase">
                Behavioral Insights
              </h3>
              <ul className="list-disc list-inside text-gray-400 space-y-1 mt-2">
                {scene.insights.map((insight: string, i: number) => (
                  <li key={i}>{insight}</li>
                ))}
              </ul>
            </div>

            {scene.options.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                {scene.options.map((opt: any, i: number) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="bg-slate-700/50 text-cyan-200 border-cyan-600 hover:bg-cyan-800/50"
                    onClick={() => handleOptionClick(opt.nextScene)}
                  >
                    {opt.text}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* STATUS FOOTER */}
      <div className="mt-auto text-xs text-gray-500 text-center">
        <p>
          Data Source: {error ? "Local Fallback Simulation" : "AI Profiler API"}
        </p>
        <p>
          Cognitive Trace ID:{" "}
          <span className="text-cyan-400">PARIS-PROFILER-07</span>
        </p>
      </div>
    </div>
  );
}
