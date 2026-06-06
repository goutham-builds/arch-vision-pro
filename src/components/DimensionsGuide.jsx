import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { dimensions } from '../data'

export default function DimensionsGuide() {
  const [expandedCategory, setExpandedCategory] = useState(null)

  const categories = [...new Set(dimensions.map(d => d.category))]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Architectural Dimensions Guide</h1>
        <p className="text-architecture-light/70">Complete reference for all standard measurements</p>
      </div>

      {categories.map(category => {
        const categoryDims = dimensions.filter(d => d.category === category)
        const isExpanded = expandedCategory === category

        return (
          <div key={category} className="card-hover card">
            <button
              onClick={() => setExpandedCategory(isExpanded ? null : category)}
              className="w-full flex items-center justify-between p-4 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{categoryDims[0].icon}</span>
                <div className="text-left">
                  <h3 className="text-xl font-bold">{category}</h3>
                  <p className="text-sm text-architecture-light/70">{categoryDims.length} dimensions</p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="text-architecture-accent" size={24} />
              ) : (
                <ChevronDown className="text-architecture-light/50" size={24} />
              )}
            </button>

            {isExpanded && (
              <div className="border-t border-architecture-accent/30 pt-4 space-y-3 animate-fadeIn">
                {categoryDims.map(dim => (
                  <div
                    key={dim.id}
                    className="p-4 bg-architecture-dark/50 rounded-lg border border-architecture-accent/20"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-lg">{dim.name}</h4>
                      <span className="text-2xl text-architecture-gold">{dim.value}</span>
                    </div>
                    <p className="text-sm text-architecture-light/70 mb-2">{dim.explanation}</p>
                    <p className="text-xs text-architecture-light/50">Range: {dim.range}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
