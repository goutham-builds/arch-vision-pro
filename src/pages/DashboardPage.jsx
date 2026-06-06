import { Award, Target, TrendingUp, Zap } from 'lucide-react'
import useAppStore from '../store'

export default function DashboardPage() {
  const { subjects, sgpa, cgpa, gameStats, achievements } = useAppStore()

  const totalTopics = Object.values(subjects).reduce((sum, semSubjects) =>
    sum + semSubjects.reduce((s, subj) => s + subj.topics.length, 0), 0
  )

  const completedTopics = Object.values(subjects).reduce((sum, semSubjects) =>
    sum + semSubjects.reduce((s, subj) => s + subj.completed, 0), 0
  )

  const overallProgress = Math.round((completedTopics / totalTopics) * 100)
  const accuracy = gameStats.totalQuestions > 0
    ? Math.round((gameStats.correctAnswers / gameStats.totalQuestions) * 100)
    : 0

  const unlockedAchievements = achievements.filter(a => a.unlocked).length

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-architecture-accent to-architecture-gold rounded-xl p-8 text-architecture-dark">
        <h1 className="text-4xl font-bold mb-2">Welcome to ArchVision Pro</h1>
        <p className="text-lg">Your companion for becoming a professional architect</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <p className="text-sm text-architecture-light/70 uppercase font-semibold">SGPA</p>
          <p className="text-4xl font-bold gradient-text">{sgpa.toFixed(2)}</p>
          <p className="text-xs text-architecture-light/50 mt-2">Semester GPA</p>
        </div>
        <div className="card">
          <p className="text-sm text-architecture-light/70 uppercase font-semibold">CGPA</p>
          <p className="text-4xl font-bold gradient-text">{cgpa.toFixed(2)}</p>
          <p className="text-xs text-architecture-light/50 mt-2">Cumulative GPA</p>
        </div>
        <div className="card">
          <p className="text-sm text-architecture-light/70 uppercase font-semibold">Learning</p>
          <p className="text-4xl font-bold gradient-text">{overallProgress}%</p>
          <p className="text-xs text-architecture-light/50 mt-2">Topics Complete</p>
        </div>
        <div className="card">
          <p className="text-sm text-architecture-light/70 uppercase font-semibold">Achievements</p>
          <p className="text-4xl font-bold gradient-text">{unlockedAchievements}/{achievements.length}</p>
          <p className="text-xs text-architecture-light/50 mt-2">Badges Unlocked</p>
        </div>
      </div>

      <div className="card p-8">
        <h2 className="text-2xl font-bold mb-6">✨ Features Ready to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-4">
            <div className="text-2xl">📚</div>
            <div><h3 className="font-bold">Subjects</h3><p className="text-sm text-architecture-light/70">Track all subjects & topics</p></div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">🗺️</div>
            <div><h3 className="font-bold">Roadmap</h3><p className="text-sm text-architecture-light/70">Professional journey</p></div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">🎮</div>
            <div><h3 className="font-bold">Game</h3><p className="text-sm text-architecture-light/70">Learn with games</p></div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">🤖</div>
            <div><h3 className="font-bold">Pinky AI</h3><p className="text-sm text-architecture-light/70">Ask anything</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}