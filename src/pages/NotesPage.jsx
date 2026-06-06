import { useState } from 'react'
import { Trash2, Plus, Edit2, Save, X } from 'lucide-react'
import useAppStore from '../store'

export default function NotesPage() {
  const { notes, addNote, deleteNote, updateNote } = useAppStore()
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ title: '', content: '' })

  const handleCreate = () => {
    if (formData.title.trim() && formData.content.trim()) {
      addNote(formData.title, formData.content)
      setFormData({ title: '', content: '' })
      setIsCreating(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Notes</h1>
        <button onClick={() => setIsCreating(true)} className="btn-primary flex items-center gap-2"><Plus size={20} />New</button>
      </div>

      {(isCreating || editingId) && (
        <div className="card p-8">
          <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Title" className="w-full bg-architecture-dark/50 border border-architecture-accent/30 rounded-lg px-4 py-2 mb-4" />
          <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Content" className="w-full bg-architecture-dark/50 border border-architecture-accent/30 rounded-lg px-4 py-3 h-32 mb-4" />
          <button onClick={() => isCreating ? handleCreate() : updateNote(editingId, formData.title, formData.content)} className="btn-primary"><Save size={18} />Save</button>
        </div>
      )}

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <div key={note.id} className="card p-6">
              <h3 className="text-lg font-bold mb-4">{note.title}</h3>
              <p className="text-architecture-light/70 text-sm line-clamp-4 mb-4">{note.content}</p>
              <div className="flex gap-2 justify-between">
                <button onClick={() => deleteNote(note.id)} className="p-2"><Trash2 size={16} className="text-red-500" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold mb-2">No notes yet</h3>
        </div>
      )}
    </div>
  )
}