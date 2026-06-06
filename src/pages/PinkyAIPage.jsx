import { useState, useRef } from 'react'
import { Send, Loader } from 'lucide-react'

export default function PinkyAIPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Pinky, your AI assistant. Ask me about architecture!", isBot: true }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const quickQuestions = [
    "What are standard door dimensions?",
    "Explain NBC building codes",
    "How do I design accessible spaces?",
    "Tell me about sustainable design"
  ]

  const handleSendMessage = () => {
    if (!input.trim()) return
    const userMessage = { id: messages.length + 1, text: input, isBot: false }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const responses = {
        'door': 'Standard door height is 210cm, width is 90cm minimum.',
        'nbc': 'NBC covers structural design, fire safety, and accessibility.',
        'accessible': 'Use 1:12 ramps, 1200mm corridors, and 1500mm wheelchair radius.',
        'sustainable': 'Use renewable materials, optimize natural light, and minimize energy.'
      }
      let response = 'Great question! '
      for (const [key, val] of Object.entries(responses)) {
        if (input.toLowerCase().includes(key)) response = val
      }
      setMessages(prev => [...prev, { id: prev.length + 1, text: response, isBot: true }])
      setLoading(false)
    }, 800)
  }

  return (
    <div className="space-y-8 h-screen flex flex-col">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Pinky AI</h1>
        <p className="text-architecture-light/70">Your intelligent architecture assistant</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-md p-4 rounded-lg ${msg.isBot ? 'bg-architecture-blue/50' : 'bg-architecture-accent/30'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><Loader size={16} className="animate-spin" /></div>}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="mb-4 space-y-2">
          {quickQuestions.map((q, i) => (
            <button key={i} onClick={() => setInput(q)} className="w-full text-left text-xs p-2 rounded-lg bg-architecture-blue/50 border border-architecture-accent/30 hover:border-architecture-accent">
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask Pinky..." className="flex-1 bg-architecture-dark/50 border border-architecture-accent/30 rounded-lg px-4 py-3 focus:outline-none focus:border-architecture-accent" />
        <button onClick={handleSendMessage} disabled={loading} className="btn-primary px-6 flex items-center gap-2"><Send size={18} /></button>
      </div>
    </div>
  )
}