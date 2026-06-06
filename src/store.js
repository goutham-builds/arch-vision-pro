import { create } from 'zustand';

const useAppStore = create((set) => ({
  // User Progress
  currentSemester: 3,
  subjects: {
    3: [
      { id: 'AR-214', name: 'ARCHITECTURAL DRAWING & GRAPHICS-III', points: 6, grade: 'B', gp: 48, completed: 0, topics: ['2D Drawing', 'Perspective', 'Technical Drawings', 'Presentation'] },
      { id: 'AR-212', name: 'BUILDING CONSTRUCTION & MATERIALS-III', points: 4, grade: 'BC', gp: 28, completed: 0, topics: ['RCC Construction', 'Steel Structures', 'Masonry', 'Roofing Systems'] },
      { id: 'AR-211', name: 'ARCHITECTURAL DESIGN-III', points: 9, grade: 'B', gp: 72, completed: 0, topics: ['Space Planning', 'Design Principles', 'Project Development', 'Presentations'] },
      { id: 'AR-213', name: 'HISTORY OF ARCHITECTURE-III', points: 4, grade: 'BC', gp: 28, completed: 0, topics: ['Modern Architecture', 'Postmodern Era', 'Contemporary Design', 'Regional Architecture'] },
      { id: 'AR-215', name: 'CLIMATE AND BUILT ENVIRONMENT', points: 4, grade: 'B', gp: 32, completed: 0, topics: ['Climate Analysis', 'Passive Design', 'Sustainability', 'Environmental Impact'] },
      { id: 'CE-201', name: 'ANALYSIS OF STRUCTURES', points: 4, grade: 'B', gp: 32, completed: 0, topics: ['Force Analysis', 'Moments', 'Beam Design', 'Stress Distribution'] }
    ],
    4: [
      { id: 'AR-222', name: 'BUILDING CONSTRUCTION & MATERIALS-IV', points: 4, grade: 'BC', gp: 28, completed: 0, topics: ['Advanced Construction', 'Prefab Systems', 'Sustainable Materials', 'Finishing'] },
      { id: 'AR-224', name: 'COMPUTER APPLICATIONS IN ARCHITECTURE', points: 4, grade: 'B', gp: 32, completed: 0, topics: ['CAD Basics', 'BIM Fundamentals', 'Rendering', '3D Modeling'] },
      { id: 'AR-223', name: 'BUILDING SERVICES-I', points: 4, grade: 'C', gp: 24, completed: 0, topics: ['MEP Systems', 'HVAC Design', 'Electrical Planning', 'Plumbing'] },
      { id: 'AR-221', name: 'ARCHITECTURAL DESIGN-IV', points: 9, grade: 'B', gp: 72, completed: 0, topics: ['Complex Projects', 'Urban Design', 'Heritage Conservation', 'Advanced Design'] },
      { id: 'CE-202', name: 'DESIGN OF RCC STRUCTURES', points: 4, grade: 'B', gp: 32, completed: 0, topics: ['Reinforcement Design', 'Beam Design', 'Column Design', 'Foundation Design'] }
    ]
  },

  sgpa: 7.74,
  cgpa: 8.04,

  // Game Progress
  gameStats: {
    totalQuestions: 0,
    correctAnswers: 0,
    currentStreak: 0,
    bestStreak: 0,
    gamesModes: {
      doors: { attempted: 0, correct: 0 },
      stairs: { attempted: 0, correct: 0 },
      furniture: { attempted: 0, correct: 0 },
      accessibility: { attempted: 0, correct: 0 },
      buildingCode: { attempted: 0, correct: 0 }
    }
  },

  // Achievements
  achievements: [
    { id: 'first-game', name: 'First Steps', description: 'Complete your first quiz', unlocked: false },
    { id: 'architect-born', name: 'Architect Born', description: 'Reach 50% accuracy', unlocked: false },
    { id: 'precision-master', name: 'Precision Master', description: 'Get 10 correct in a row', unlocked: false },
    { id: 'dimension-expert', name: 'Dimension Expert', description: 'Complete all flashcards', unlocked: false },
    { id: 'game-master', name: 'Game Master', description: 'Complete 100 questions', unlocked: false },
    { id: 'hall-of-fame', name: 'Hall of Fame', description: 'Achieve 90%+ accuracy', unlocked: false }
  ],

  // Notes
  notes: [],

  // Actions
  updateSubjectProgress: (semester, subjectId, topicIndex) =>
    set((state) => ({
      subjects: {
        ...state.subjects,
        [semester]: state.subjects[semester].map(subject =>
          subject.id === subjectId
            ? { ...subject, completed: Math.min(subject.completed + 1, subject.topics.length) }
            : subject
        )
      }
    })),

  updateGameStats: (mode, isCorrect) =>
    set((state) => {
      const newStats = { ...state.gameStats };
      newStats.totalQuestions += 1;
      if (isCorrect) {
        newStats.correctAnswers += 1;
        newStats.currentStreak += 1;
        newStats.bestStreak = Math.max(newStats.currentStreak, newStats.bestStreak);
      } else {
        newStats.currentStreak = 0;
      }
      newStats.gamesModes[mode].attempted += 1;
      if (isCorrect) newStats.gamesModes[mode].correct += 1;

      return { gameStats: newStats };
    }),

  unlockAchievement: (achievementId) =>
    set((state) => ({
      achievements: state.achievements.map(achievement =>
        achievement.id === achievementId ? { ...achievement, unlocked: true } : achievement
      )
    })),

  addNote: (title, content) =>
    set((state) => ({
      notes: [...state.notes, { id: Date.now(), title, content, createdAt: new Date().toISOString() }]
    })),

  deleteNote: (noteId) =>
    set((state) => ({
      notes: state.notes.filter(note => note.id !== noteId)
    })),

  updateNote: (noteId, title, content) =>
    set((state) => ({
      notes: state.notes.map(note =>
        note.id === noteId ? { ...note, title, content } : note
      )
    }))
}));

export default useAppStore;