export const dimensions = [
  { id: 1, category: 'Human Anthropometry', name: 'Average Human Height', value: '170 cm', range: '160-180 cm', icon: '👤', explanation: 'Standard reference height for architectural design' },
  { id: 2, category: 'Human Anthropometry', name: 'Eye Level Height', value: '165 cm', range: '160-170 cm', icon: '👁️', explanation: 'Height at which a standing person sees directly ahead' },
  { id: 3, category: 'Human Anthropometry', name: 'Shoulder Width', value: '45 cm', range: '40-50 cm', icon: '↔️', explanation: 'Minimum clear width needed for comfortable passage' },
  { id: 4, category: 'Doorways & Openings', name: 'Standard Door Height', value: '210 cm', range: '205-215 cm', icon: '🚪', explanation: 'Minimum clearance for doorways in buildings' },
  { id: 5, category: 'Doorways & Openings', name: 'Standard Door Width', value: '90 cm', range: '80-100 cm', icon: '📏', explanation: 'Standard width for single passage doors' },
  { id: 6, category: 'Stairs', name: 'Stair Riser Height', value: '18 cm', range: '15-20 cm', icon: '📐', explanation: 'Vertical height between steps for comfortable climbing' },
  { id: 7, category: 'Stairs', name: 'Stair Tread Depth', value: '25 cm', range: '23-28 cm', icon: '👣', explanation: 'Horizontal depth of each step' },
  { id: 8, category: 'Furniture', name: 'Table Height', value: '75 cm', range: '70-80 cm', icon: '🍽️', explanation: 'Standard height for dining and work tables' },
  { id: 9, category: 'Furniture', name: 'Chair Seat Height', value: '45 cm', range: '40-50 cm', icon: '🪑', explanation: 'Comfortable seating height' },
  { id: 10, category: 'Kitchen', name: 'Counter Height', value: '90 cm', range: '85-95 cm', icon: '🍳', explanation: 'Standard kitchen counter work surface' }
];

export const gameQuestions = [
  { id: 1, mode: 'doors', question: 'What should be the minimum door height?', options: [{ text: '180 cm', correct: false }, { text: '210 cm', correct: true }, { text: '150 cm', correct: false }, { text: '190 cm', correct: false }], explanation: 'Standard door height is 210 cm to accommodate the average person with clearance.' },
  { id: 2, mode: 'doors', question: 'For accessibility, what minimum clear width should a doorway have?', options: [{ text: '75 cm', correct: false }, { text: '90 cm', correct: true }, { text: '120 cm', correct: false }, { text: '60 cm', correct: false }], explanation: 'A 90 cm door width is the standard minimum for single passage and wheelchair accessibility.' },
  { id: 3, mode: 'stairs', question: 'What is the standard height of stair risers in residential buildings?', options: [{ text: '25 cm', correct: false }, { text: '18 cm', correct: true }, { text: '15 cm', correct: false }, { text: '22 cm', correct: false }], explanation: 'Stair riser height of 18 cm is comfortable and safe for residential use.' },
  { id: 4, mode: 'stairs', question: 'The stair tread should be at least how deep?', options: [{ text: '20 cm', correct: false }, { text: '25 cm', correct: true }, { text: '30 cm', correct: false }, { text: '15 cm', correct: false }], explanation: 'A tread depth of 25 cm ensures safe and comfortable foot placement.' },
  { id: 5, mode: 'furniture', question: 'What is the standard height for a dining table?', options: [{ text: '60 cm', correct: false }, { text: '75 cm', correct: true }, { text: '85 cm', correct: false }, { text: '70 cm', correct: false }], explanation: 'A dining table height of 75 cm is standard.' },
  { id: 6, mode: 'furniture', question: 'What is the standard seat height for a dining chair?', options: [{ text: '35 cm', correct: false }, { text: '45 cm', correct: true }, { text: '55 cm', correct: false }, { text: '40 cm', correct: false }], explanation: 'Standard chair seat height is 45 cm.' },
  { id: 7, mode: 'accessibility', question: 'What radius is needed for a wheelchair 180-degree turn?', options: [{ text: '100 cm', correct: false }, { text: '150 cm', correct: true }, { text: '200 cm', correct: false }, { text: '120 cm', correct: false }], explanation: 'A 150 cm turning radius allows comfortable wheelchair maneuvering.' },
  { id: 8, mode: 'accessibility', question: 'Minimum corridor width for two-way pedestrian traffic?', options: [{ text: '100 cm', correct: false }, { text: '120 cm', correct: true }, { text: '150 cm', correct: false }, { text: '90 cm', correct: false }], explanation: 'A 120 cm corridor accommodates two people walking in opposite directions.' },
  { id: 9, mode: 'buildingCode', question: 'NBC minimum ceiling height in living spaces?', options: [{ text: '210 cm', correct: false }, { text: '240 cm', correct: true }, { text: '270 cm', correct: false }, { text: '230 cm', correct: false }], explanation: 'NBC mandates minimum 240 cm floor-to-ceiling height.' },
  { id: 10, mode: 'buildingCode', question: 'What gradient should a wheelchair ramp have?', options: [{ text: '1:8', correct: false }, { text: '1:12', correct: true }, { text: '1:15', correct: false }, { text: '1:10', correct: false }], explanation: 'A 1:12 gradient is standard for accessible ramps.' }
];

export const architectureTrends = [
  { id: 1, title: 'Biophilic Design', category: 'Sustainability', date: 'June 2024', image: '🌿', excerpt: 'Integrating nature into built environments', content: 'Biophilic design is transforming spaces by incorporating living walls and natural materials.' },
  { id: 2, title: 'Mass Timber Construction', category: 'Materials', date: 'May 2024', image: '🌲', excerpt: 'Sustainable timber buildings', content: 'Mass timber offers strength and carbon-negative properties.' },
  { id: 3, title: 'AI in Architecture', category: 'Technology', date: 'April 2024', image: '🤖', excerpt: 'Machine learning in design', content: 'AI-powered tools are accelerating the design phase.' },
  { id: 4, title: 'Smart Cities', category: 'Urban', date: 'March 2024', image: '🏙️', excerpt: 'IoT-enabled urban development', content: 'Cities implementing smart infrastructure and green spaces.' },
  { id: 5, title: 'Parametric Design', category: 'Innovation', date: 'February 2024', image: '🔶', excerpt: 'Data-driven facades', content: 'Facades that respond to environmental conditions.' },
  { id: 6, title: 'Adaptive Reuse', category: 'Sustainability', date: 'January 2024', image: '♻️', excerpt: 'Converting heritage buildings', content: 'Preserving history while serving modern purposes.' },
  { id: 7, title: 'Modular Housing', category: 'Housing', date: 'December 2023', image: '🏠', excerpt: 'Prefabricated solutions', content: 'Modular units address housing shortage efficiently.' },
  { id: 8, title: 'Regenerative Design', category: 'Sustainability', date: 'November 2023', image: '🌍', excerpt: 'Buildings that give back', content: 'Regenerative architecture creates net-positive environmental impact.' }
];

export const roadmapPhases = [
  { phase: 1, title: 'Foundation (Months 1-3)', description: 'Build core understanding', color: 'bg-blue-500', topics: ['Drafting', 'History', 'Design Principles', 'Materials'], resources: ['Ching - Architectural Graphics', 'Building Construction Illustrated', 'SketchUp tutorials', 'History textbooks'] },
  { phase: 2, title: 'Technical Development (Months 4-8)', description: 'Master tools and skills', color: 'bg-purple-500', topics: ['CAD & BIM', 'Structures', 'MEP Systems', 'Visualization'], resources: ['Revit course', 'Structural Design', '3DS Max tutorials', 'BIM guide'] },
  { phase: 3, title: 'Design Proficiency (Months 9-15)', description: 'Develop design thinking', color: 'bg-green-500', topics: ['Design Theory', 'Project Management', 'Site Analysis', 'Sustainability'], resources: ['Theory books', 'Case studies', 'Project tools', 'LEED course'] },
  { phase: 4, title: 'Professional Practice (Months 16-24)', description: 'Real-world experience', color: 'bg-orange-500', topics: ['Client Communication', 'Compliance', 'Budgeting', 'Documentation'], resources: ['Internships', 'NBC codes', 'Portfolio building', 'Legal aspects'] },
  { phase: 5, title: 'Leadership & Specialization (Months 25+)', description: 'Lead projects', color: 'bg-red-500', topics: ['Urban Design', 'Heritage', 'Sustainability', 'Research'], resources: ['Urban masterclasses', 'Certifications', 'Publishing', 'Research projects'] }
];