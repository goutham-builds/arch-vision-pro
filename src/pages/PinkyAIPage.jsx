import { useState, useRef, useEffect } from 'react'
import { Send, Loader, Lightbulb } from 'lucide-react'

export default function PinkyAIPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Pinky, your AI architecture assistant. Ask me anything about architectural standards, anthropometry, design principles, career guidance, or any study-related questions!",
      isBot: true
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const quickQuestions = [
    "What are standard door dimensions?",
    "Explain NBC building codes",
    "How do I design accessible spaces?",
    "What's a good career path in architecture?",
    "Tell me about sustainable design",
    "How do I use BIM software?"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (question) => {
    // Simulated AI responses - In production, connect to Claude API
    const responses = {
      'door': "Standard door heights are 2100mm (210cm). Standard door widths are typically 900mm (90cm) for single passage. For accessibility, minimum clear width should be 750mm.",
      'nbc': "The National Building Code (NBC) of India covers structural design, fire safety, accessibility, and safety standards. Key areas include: Seismic design, Fire safety, Accessibility requirements, Material standards.",
      'accessible': "To design accessible spaces: Provide ramps at 1:12 gradient, Minimum corridor width 1200mm, Wheelchair turning radius 1500mm, Handrails at 800-950mm height, Doorways minimum 900mm wide.",
      'career': "Career path in architecture: 1) Bachelor's (5 years) 2) Internships & practical experience 3) Registration as architect 4) Specialize in: Urban Design, Heritage Conservation, Sustainable Design, or BIM Management.",
      'sustainable': "Sustainable design principles: Use renewable materials, Optimize natural light & ventilation, Design for thermal comfort, Minimize energy consumption, Reduce water usage, Consider lifecycle impact.",
      'bim': "BIM (Building Information Modeling) involves: 3D modeling with Revit/ArchiCAD, Coordinating MEP systems, Clash detection, Scheduling, Lifecycle management. Start with basic 3D modeling, then coordinate with teams."
    }

    // Match keywords to responses
    for (const [key, response] of Object.entries(responses)) {
      if (question.toLowerCase().includes(key)) {
        return response
      }
    }

    // Default response
    return "That's a great question! In architecture, the key is understanding how form, function, and human scale work together. Could you be more specific about what aspect interests you? I can help with design principles, standards, career advice, or technical knowledge."
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      isBot: false
    }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateResponse(input),
        isBot: true
      }
      setMessages(prev => [...prev, botResponse])
      setLoading(false)
    }, 800)
  }

  const handleQuickQuestion = (question) => {
    setInput(question)
  }

  return (
    <div className="space-y-8 h-screen flex flex-col max-h-screen">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center text-2xl">
            🤖
          </div>
          <h1 className="text-4xl font-bold">Pinky AI</h1>
        </div>
        <p className="text-architecture-light/70">Your intelligent architecture assistant powered by AI</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-md p-4 rounded-lg ${
                  msg.isBot
                    ? 'bg-architecture-blue/50 border border-architecture-accent/30'
                    : 'bg-architecture-accent/30 border border-architecture-accent'
                }`}
              >
                {msg.isBot && <p className="text-xs font-semibold text-architecture-accent mb-2">Pinky</p>}
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-architecture-blue/50 border border-architecture-accent/30 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Loader size={16} className="animate-spin text-architecture-accent" />
                  <span className="text-sm">Pinky is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && !loading && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-architecture-light/70 mb-3 flex items-center gap-2">
              <Lightbulb size={14} />
              Quick Questions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left text-xs p-2 rounded-lg bg-architecture-blue/50 border border-architecture-accent/30 hover:border-architecture-accent hover:bg-architecture-blue/70 transition-all duration-300"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask Pinky anything about architecture..."
            className="flex-1 bg-architecture-dark/50 border border-architecture-accent/30 rounded-lg px-4 py-3 text-architecture-light placeholder-architecture-light/30 focus:outline-none focus:border-architecture-accent"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="btn-primary px-6 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="text-xs text-architecture-light/50 text-center mt-4">
        Pinky can help with: Architecture standards • Design principles • Career guidance • Study assistance
      </div>
    </div>
  )
}
