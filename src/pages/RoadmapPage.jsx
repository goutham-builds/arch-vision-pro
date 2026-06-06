import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { roadmapPhases } from '../data'

export default function RoadmapPage() {
  const [expandedPhase, setExpandedPhase] = useState(1)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Professional Architecture Roadmap</h1>
        <p className="text-architecture-light/70">Your 2-year journey from student to professional architect</p>
      </div>

      <div className="space-y-4">
        {roadmapPhases.map((phase) => {
          const isExpanded = expandedPhase === phase.phase
          return (
            <div key={phase.phase} className="card cursor-pointer" onClick={() => setExpandedPhase(isExpanded ? null : phase.phase)}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 ${phase.color} rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0`}>{phase.phase}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                    <p className="text-architecture-light/70">{phase.description}</p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="text-architecture-accent" size={24} /> : <ChevronDown className="text-architecture-light/50" size={24} />}
              </div>

              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-architecture-accent/30 space-y-6 animate-fadeIn">
                  <div>
                    <h4 className="font-semibold text-architecture-gold mb-3 uppercase text-sm">Key Topics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.topics.map((topic, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-3 bg-architecture-dark/50 rounded-lg">
                          <span className="text-architecture-accent mt-1">✓</span>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-architecture-gold mb-3 uppercase text-sm">Resources</h4>
                    <div className="space-y-2">
                      {phase.resources.map((resource, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-3 bg-architecture-dark/50 rounded-lg">
                          <span>{resource}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}