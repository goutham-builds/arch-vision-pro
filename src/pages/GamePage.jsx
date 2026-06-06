import { useState } from 'react'
import { dimensions, gameQuestions } from '../data'
import useAppStore from '../store'

export default function GamePage() {
  const { gameStats, updateGameStats } = useAppStore()
  const [gameMode, setGameMode] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFlashcards, setShowFlashcards] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  const modeQuestions = gameQuestions.filter(q => q.mode === gameMode)
  const currentQ = modeQuestions[currentQuestion]

  const handleAnswer = (option) => {
    if (answered) return
    setSelectedAnswer(option)
    setAnswered(true)
    const isCorrect = option.correct
    if (isCorrect) setScore(score + 1)
    updateGameStats(gameMode, isCorrect)
  }

  const nextQuestion = () => {
    if (currentQuestion < modeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswered(false)
      setSelectedAnswer(null)
    } else {
      setGameMode(null)
      setCurrentQuestion(0)
      setScore(0)
    }
  }

  if (showFlashcards) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Flashcard Mode</h1>
        </div>
        <div className="flex justify-center">
          <button onClick={() => setShowFlashcards(false)} className="btn-secondary">Back</button>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-gradient-to-br from-architecture-accent to-architecture-gold rounded-xl p-8 text-architecture-dark text-center">
            <div className="text-6xl mb-4">{dimensions[currentCardIndex].icon}</div>
            <p className="text-sm uppercase mb-2">{dimensions[currentCardIndex].category}</p>
            <h2 className="text-2xl font-bold">{dimensions[currentCardIndex].name}</h2>
            <p className="text-sm mt-4">{dimensions[currentCardIndex].value}</p>
          </div>
        </div>
      </div>
    )
  }

  if (gameMode && currentQ) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 capitalize">{gameMode} Challenge</h1>
        </div>
        <div className="card">
          <p className="text-sm text-architecture-light/50 mb-2">Question {currentQuestion + 1} of {modeQuestions.length}</p>
          <h2 className="text-2xl font-bold mb-8">{currentQ.question}</h2>
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === option
              const showCorrect = answered && option.correct
              const showWrong = answered && isSelected && !option.correct
              return (
                <button key={idx} onClick={() => handleAnswer(option)} disabled={answered} className={`w-full p-4 rounded-lg font-semibold text-left ${showCorrect ? 'bg-green-500/30 border-2 border-green-500' : showWrong ? 'bg-red-500/30 border-2 border-red-500' : isSelected && answered ? 'bg-architecture-accent/30' : 'bg-architecture-blue/50 border-2 border-architecture-accent/30'}`}>
                  {option.text}
                </button>
              )
            })}
          </div>
          {answered && <p className="mb-4 p-4 bg-architecture-dark/50 rounded-lg">{currentQ.explanation}</p>}
          {answered && <button onClick={nextQuestion} className="w-full btn-primary">{currentQuestion === modeQuestions.length - 1 ? 'Finish' : 'Next'}</button>}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Anthro Architect Game</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button onClick={() => setGameMode('doors')} className="card p-8 text-center"><div className="text-6xl mb-4">🚪</div><h3 className="text-2xl font-bold mb-2">Door Challenge</h3></button>
        <button onClick={() => setGameMode('stairs')} className="card p-8 text-center"><div className="text-6xl mb-4">📐</div><h3 className="text-2xl font-bold mb-2">Stairs</h3></button>
        <button onClick={() => setGameMode('furniture')} className="card p-8 text-center"><div className="text-6xl mb-4">🪑</div><h3 className="text-2xl font-bold mb-2">Furniture</h3></button>
        <button onClick={() => setGameMode('accessibility')} className="card p-8 text-center"><div className="text-6xl mb-4">♿</div><h3 className="text-2xl font-bold mb-2">Accessibility</h3></button>
        <button onClick={() => setGameMode('buildingCode')} className="card p-8 text-center"><div className="text-6xl mb-4">⚖️</div><h3 className="text-2xl font-bold mb-2">Building Code</h3></button>
        <button onClick={() => setShowFlashcards(true)} className="card p-8 text-center"><div className="text-6xl mb-4">🎴</div><h3 className="text-2xl font-bold mb-2">Flashcards</h3></button>
      </div>
    </div>
  )
}