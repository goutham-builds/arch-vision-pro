import { useState } from 'react'
import { architectureTrends } from '../data'

export default function TrendsPage() {
  const [selectedTrend, setSelectedTrend] = useState(null)
  const currentTrend = selectedTrend ? architectureTrends.find(t => t.id === selectedTrend) : null

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Global Architecture Trends</h1>
      </div>

      {currentTrend ? (
        <div className="space-y-6">
          <button onClick={() => setSelectedTrend(null)} className="btn-ghost">← Back</button>
          <div className="card p-8">
            <div className="text-6xl mb-4">{currentTrend.image}</div>
            <h1 className="text-4xl font-bold mb-2">{currentTrend.title}</h1>
            <p className="text-architecture-light/70 mb-6">{currentTrend.date} • {currentTrend.category}</p>
            <p className="text-lg leading-relaxed">{currentTrend.content}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {architectureTrends.map(trend => (
            <div key={trend.id} className="card p-6 cursor-pointer" onClick={() => setSelectedTrend(trend.id)}>
              <div className="text-5xl mb-4">{trend.image}</div>
              <h3 className="text-xl font-bold mb-2">{trend.title}</h3>
              <p className="text-architecture-light/70 text-sm mb-3">{trend.excerpt}</p>
              <p className="text-xs text-architecture-light/50">{trend.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}