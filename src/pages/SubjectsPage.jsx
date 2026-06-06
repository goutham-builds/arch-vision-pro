import { useState } from 'react'
import { CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react'
import useAppStore from '../store'

export default function SubjectsPage() {
  const { currentSemester, subjects, updateSubjectProgress } = useAppStore()
  const [expandedSubject, setExpandedSubject] = useState(null)
  const [semester, setSemester] = useState(currentSemester)

  const semesterSubjects = subjects[semester] || []
  const totalTopics = semesterSubjects.reduce((sum, s) => sum + s.topics.length, 0)
  const completedTopics = semesterSubjects.reduce((sum, s) => sum + s.completed, 0)
  const progress = Math.round((completedTopics / totalTopics) * 100)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Subjects Checklist</h1>
        <p className="text-architecture-light/70">Track your learning across all semesters</p>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={() => setSemester(3)} className={`px-6 py-3 rounded-lg font-semibold ${semester === 3 ? 'bg-architecture-accent text-white' : 'bg-architecture-blue/50 border border-architecture-accent/30'}`}>
          Semester 3
        </button>
        <button onClick={() => setSemester(4)} className={`px-6 py-3 rounded-lg font-semibold ${semester === 4 ? 'bg-architecture-accent text-white' : 'bg-architecture-blue/50 border border-architecture-accent/30'}`}>
          Semester 4
        </button>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Overall Progress</h3>
          <span className="text-2xl font-bold gradient-text">{progress}%</span>
        </div>
        <div className="w-full bg-architecture-dark/50 rounded-full h-3 overflow-hidden">
          <div className="bg-gradient-to-r from-architecture-accent to-architecture-gold h-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-4">
        {semesterSubjects.map(subject => {
          const isExpanded = expandedSubject === subject.id
          const subjectProgress = Math.round((subject.completed / subject.topics.length) * 100)

          return (
            <div key={subject.id} className="card cursor-pointer" onClick={() => setExpandedSubject(isExpanded ? null : subject.id)}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-architecture-accent/20 text-architecture-accent rounded-full text-xs font-semibold">{subject.id}</span>
                    <span className="px-3 py-1 bg-architecture-gold/20 text-architecture-gold rounded-full text-xs font-semibold">{subject.grade}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">{subject.name}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-xs bg-architecture-dark/50 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-architecture-accent to-architecture-gold h-full" style={{ width: `${subjectProgress}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-architecture-accent">{subjectProgress}%</span>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="text-architecture-accent" size={24} /> : <ChevronDown className="text-architecture-light/50" size={24} />}
              </div>

              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-architecture-accent/30 space-y-3 animate-fadeIn">
                  <h4 className="font-semibold text-sm uppercase text-architecture-light/70">Topics</h4>
                  {subject.topics.map((topic, index) => {
                    const isCompleted = index < subject.completed
                    return (
                      <button key={index} onClick={(e) => { e.stopPropagation(); if (!isCompleted) updateSubjectProgress(semester, subject.id, index) }} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-architecture-accent/10">
                        {isCompleted ? <CheckCircle className="text-architecture-accent flex-shrink-0" size={20} /> : <Circle className="text-architecture-light/40 flex-shrink-0" size={20} />}
                        <span className={isCompleted ? 'text-architecture-light/50 line-through' : 'text-architecture-light'}>{topic}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}