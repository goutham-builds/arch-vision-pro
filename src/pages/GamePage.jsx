import { useState, useEffect } from 'react'
import { RotateCcw, Volume2, VolumeX } from 'lucide-react'
import { gameQuestions, dimensions } from '../data'
import useAppStore from '../store'

export default function GamePage() {
  const { gameStats, updateGameStats, unlockAchievement } = useAppStore()
  const [gameMode, setGameMode] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFlashcards, setShowFlashcards] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [cardFlipped, setCardFlipped] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const modeQuestions = gameQuestions.filter(q => q.mode === gameMode)
  const currentQ = modeQuestions[currentQuestion]

  const playSound = (type) => {
    if (!soundEnabled) return
    // Simple beep using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = type === 'correct' ? 800 : 400
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  const handleAnswer = (option) => {
    if (answered) return
    
    setSelectedAnswer(option)
    setAnswered(true)
    
    const isCorrect = option.correct
    if (isCorrect) {
      setScore(score + 1)
      playSound('correct')
    } else {
      playSound('wrong')
    }
    
    updateGameStats(gameMode, isCorrect)
  }

  const nextQuestion = () => {
    if (currentQuestion < modeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswered(false)
      setSelectedAnswer(null)
    } else {
      endGame()
    }
  }

  const endGame = () => {
    const accuracy = Math.round((score / modeQuestions.length) * 100)
    
    // Check achievements
    if (score > 0) unlockAchievement('first-game')
    if (accuracy >= 50) unlockAchievement('architect-born')
    if (accuracy >= 90) unlockAchievement('hall-of-fame')
    
    setGameMode(null)
    setCurrentQuestion(0)
    setScore(0)
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setAnswered(false)
    setSelectedAnswer(null)
  }

  // Flashcard Mode
  if (showFlashcards) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Flashcard Mode</h1>
          <p className="text-architecture-light/70">Learn architectural dimensions</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setShowFlashcards(false)}
            className="btn-secondary"
          >
            Back to Game Modes
          </button>
        </div>

        {/* Card */}
        <div className="flex justify-center">
          <div
            className="w-full max-w-md aspect-square bg-gradient-to-br from-architecture-accent to-architecture-gold rounded-xl p-8 cursor-pointer transform transition-transform duration-300 hover:scale-105 card-hover"
            onClick={() => setCardFlipped(!cardFlipped)}
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              transform: cardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            <div className="h-full flex flex-col justify-between items-center text-center">
              {!cardFlipped ? (
                <div className="space-y-4">
                  <div className="text-6xl">{dimensions[currentCardIndex].icon}</div>
                  <div>
                    <p className="text-sm text-architecture-dark/70 uppercase mb-2">
                      {dimensions[currentCardIndex].category}
                    </p>
                    <h2 className="text-2xl font-bold text-architecture-dark">
                      {dimensions[currentCardIndex].name}
                    </h2>
                  </div>
                  <p className="text-sm text-architecture-dark/60">Click to reveal answer</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-architecture-dark/70 mb-2">STANDARD VALUE</p>
                    <p className="text-4xl font-bold text-architecture-dark">
                      {dimensions[currentCardIndex].value}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-architecture-dark/70 mb-2">RANGE</p>
                    <p className="text-xl font-semibold text-architecture-dark">
                      {dimensions[currentCardIndex].range}
                    </p>
                  </div>
                  <p className="text-sm text-architecture-dark/60 italic">
                    {dimensions[currentCardIndex].explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 items-center">
          <button
            onClick={() => setCurrentCardIndex(Math.max(0, currentCardIndex - 1))}
            className="btn-secondary"
          >
            ← Previous
          </button>
          <span className="text-architecture-light/70">
            {currentCardIndex + 1} / {dimensions.length}
          </span>
          <button
            onClick={() => setCurrentCardIndex(Math.min(dimensions.length - 1, currentCardIndex + 1))}
            className="btn-secondary"
          >
            Next →
          </button>
        </div>

        {/* Progress */}
        <div className="w-full bg-architecture-dark/50 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-architecture-accent to-architecture-gold h-full transition-all duration-300"
            style={{ width: `${((currentCardIndex + 1) / dimensions.length) * 100}%` }}
          />
        </div>
      </div>
    )
  }

  // Active Game
  if (gameMode && currentQ) {
    const accuracy = gameStats.gamesModes[gameMode].attempted > 0
      ? Math.round((gameStats.gamesModes[gameMode].correct / gameStats.gamesModes[gameMode].attempted) * 100)
      : 0

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 capitalize">{gameMode} Challenge</h1>
          <p className="text-architecture-light/70">Test your architectural knowledge</p>
        </div>

        {/* Score Bar */}
        <div className="grid grid-cols-4 gap-4">
          <div className="card text-center">
            <p className="text-3xl font-bold gradient-text">{score}/{modeQuestions.length}</p>
            <p className="text-sm text-architecture-light/70">Score</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold gradient-text">{accuracy}%</p>
            <p className="text-sm text-architecture-light/70">Accuracy</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold gradient-text">{gameStats.currentStreak}</p>
            <p className="text-sm text-architecture-light/70">Streak</p>
          </div>
          <div className="card text-center">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-full py-2 rounded-lg hover:bg-architecture-accent/20 transition-all duration-300"
            >
              {soundEnabled ? <Volume2 size={24} className="mx-auto" /> : <VolumeX size={24} className="mx-auto" />}
            </button>
          </div>
        </div>

        {/* Question */}
        <div className="card">
          <div className="mb-6">
            <p className="text-sm text-architecture-light/50 mb-2">
              Question {currentQuestion + 1} of {modeQuestions.length}
            </p>
            <div className="w-full bg-architecture-dark/50 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-architecture-accent to-architecture-gold h-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / modeQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-8">{currentQ.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === option
              const showCorrect = answered && option.correct
              const showWrong = answered && isSelected && !option.correct

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={answered}
                  className={`w-full p-4 rounded-lg font-semibold transition-all duration-300 text-left ${
                    showCorrect
                      ? 'bg-green-500/30 border-2 border-green-500 text-green-300'
                      : showWrong
                      ? 'bg-red-500/30 border-2 border-red-500 text-red-300'
                      : isSelected && answered
                      ? 'bg-architecture-accent/30 border-2 border-architecture-accent'
                      : 'bg-architecture-blue/50 border-2 border-architecture-accent/30 hover:border-architecture-accent hover:bg-architecture-blue/70'
                  } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {option.text}
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {answered && (
            <div className="bg-architecture-dark/50 border border-architecture-accent/30 rounded-lg p-4 mb-6 animate-fadeIn">
              <p className="text-sm text-architecture-light/70 mb-2">Explanation:</p>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {answered && (
            <button
              onClick={nextQuestion}
              className="w-full btn-primary"
            >
              {currentQuestion === modeQuestions.length - 1 ? 'Finish Game' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    )
  }

  // Game Mode Selection
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Anthro Architect Game</h1>
        <p className="text-architecture-light/70">Master architectural dimensions through interactive challenges</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold gradient-text">{gameStats.totalQuestions}</p>
          <p className="text-sm text-architecture-light/70">Questions Attempted</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold gradient-text">
            {gameStats.totalQuestions > 0 
              ? Math.round((gameStats.correctAnswers / gameStats.totalQuestions) * 100)
              : 0}%
          </p>
          <p className="text-sm text-architecture-light/70">Accuracy</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold gradient-text">{gameStats.currentStreak}</p>
          <p className="text-sm text-architecture-light/70">Current Streak</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold gradient-text">{gameStats.bestStreak}</p>
          <p className="text-sm text-architecture-light/70">Best Streak</p>
        </div>
      </div>

      {/* Game Modes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => {
            setGameMode('doors')
            resetGame()
          }}
          className="card-hover card p-8 text-center group"
        >
          <div className="text-6xl mb-4">🚪</div>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-architecture-accent">Door Clearance</h3>
          <p className="text-architecture-light/70 mb-4">Learn optimal door dimensions</p>
          <div className="text-sm text-architecture-light/50">
            {gameStats.gamesModes.doors.attempted} attempted • {gameStats.gamesModes.doors.correct} correct
          </div>
        </button>

        <button
          onClick={() => {
            setGameMode('stairs')
            resetGame()
          }}
          className="card-hover card p-8 text-center group"
        >
          <div className="text-6xl mb-4">📐</div>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-architecture-accent">Stair Design</h3>
          <p className="text-architecture-light/70 mb-4">Master stair proportions</p>
          <div className="text-sm text-architecture-light/50">
            {gameStats.gamesModes.stairs.attempted} attempted • {gameStats.gamesModes.stairs.correct} correct
          </div>
        </button>

        <button
          onClick={() => {
            setGameMode('furniture')
            resetGame()
          }}
          className="card-hover card p-8 text-center group"
        >
          <div className="text-6xl mb-4">🪑</div>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-architecture-accent">Furniture Ergonomics</h3>
          <p className="text-architecture-light/70 mb-4">Perfect furniture sizing</p>
          <div className="text-sm text-architecture-light/50">
            {gameStats.gamesModes.furniture.attempted} attempted • {gameStats.gamesModes.furniture.correct} correct
          </div>
        </button>

        <button
          onClick={() => {
            setGameMode('accessibility')
            resetGame()
          }}
          className="card-hover card p-8 text-center group"
        >
          <div className="text-6xl mb-4">♿</div>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-architecture-accent">Accessibility</h3>
          <p className="text-architecture-light/70 mb-4">Universal design standards</p>
          <div className="text-sm text-architecture-light/50">
            {gameStats.gamesModes.accessibility.attempted} attempted • {gameStats.gamesModes.accessibility.correct} correct
          </div>
        </button>

        <button
          onClick={() => {
            setGameMode('buildingCode')
            resetGame()
          }}
          className="card-hover card p-8 text-center group"
        >
          <div className="text-6xl mb-4">⚖️</div>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-architecture-accent">Building Code</h3>
          <p className="text-architecture-light/70 mb-4">NBC & regulatory standards</p>
          <div className="text-sm text-architecture-light/50">
            {gameStats.gamesModes.buildingCode.attempted} attempted • {gameStats.gamesModes.buildingCode.correct} correct
          </div>
        </button>

        <button
          onClick={() => {
            setShowFlashcards(true)
            setCurrentCardIndex(0)
            setCardFlipped(false)
          }}
          className="card-hover card p-8 text-center group"
        >
          <div className="text-6xl mb-4">🎴</div>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-architecture-accent">Flashcards</h3>
          <p className="text-architecture-light/70 mb-4">Learn all 20 dimensions</p>
          <div className="text-sm text-architecture-light/50">
            {dimensions.length} cards available
          </div>
        </button>
      </div>
    </div>
  )
}
