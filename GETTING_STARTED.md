## 🚀 Quick Start Guide

### Installation

```bash
# Clone repository
git clone https://github.com/goutham-builds/arch-vision-pro.git
cd arch-vision-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📱 Installation on Devices

### iPhone (Safari)
1. Open app in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. App is installed and ready to use

### Windows (Edge/Chrome)
1. Open app in Edge or Chrome
2. Click Install button in address bar
3. Choose where to install
4. App launches with desktop shortcut

---

## 🎮 How to Use Each Feature

### 1. Dashboard
- View your SGPA (7.74) and CGPA (8.04)
- See overall learning progress
- Check unlocked achievements
- Access quick links to all sections

### 2. Subjects Checklist
- **Semester Selection**: Switch between S03 and S04
- **Topic Tracking**: Click topics to mark as complete
- **Progress Bars**: Visual representation of completion
- **Grade Display**: View your grades for each subject

**Subjects Include:**
- Sem 3: AR-214, AR-212, AR-211, AR-213, AR-215, CE-201
- Sem 4: AR-222, AR-224, AR-223, AR-221, CE-202

### 3. Professional Roadmap
- **5 Phases**: Foundation → Technical → Design → Professional → Leadership
- **Expand Sections**: Click to see detailed topics and resources
- **Resource Links**: Direct access to learning platforms and tools
- **Timeline**: Visual representation of your journey

### 4. Anthro Architect Game
- **5 Game Modes**:
  - 🚪 Door Clearance Challenge
  - 📐 Stair Design Challenge
  - 🪑 Furniture Ergonomics
  - ♿ Accessibility Challenge
  - ⚖️ Building Code Quiz

- **Flashcard Mode**:
  - 20 interactive flashcards
  - Learn architectural dimensions
  - Click to flip and reveal answers

- **Scoring System**:
  - Track accuracy percentage
  - Build streaks
  - Unlock achievements

### 5. Global Trends
- **Browse Latest News**: Architecture innovations and trends
- **Save Favorites**: Click heart icon to save articles
- **Read Full Articles**: Click card to see detailed content
- **Categories**: Filter by type (Sustainability, Technology, etc.)

### 6. Notes
- **Create Notes**: Click "New Note" button
- **Edit Notes**: Hover and click edit icon
- **Delete Notes**: Hover and click delete icon
- **View All**: All notes saved locally on your device

### 7. Pinky AI Assistant
- **Ask Questions**: Type any architecture-related question
- **Quick Questions**: Click suggested questions for common topics
- **Sound Control**: Toggle sound effects on/off
- **Topics**: NBC codes, dimensions, design, career advice

---

## 📊 Game Scoring

### Achievements Unlock When:
- ✅ **First Steps**: Complete any quiz
- ✅ **Architect Born**: Reach 50% accuracy
- ✅ **Precision Master**: Get 10 correct answers in a row
- ✅ **Dimension Expert**: Complete all 20 flashcards
- ✅ **Game Master**: Answer 100 total questions
- ✅ **Hall of Fame**: Achieve 90%+ accuracy

---

## 💾 Data Storage

All data is stored **locally on your device**:
- Subject progress
- Game scores and streaks
- Notes you create
- Achievements unlocked
- Game history

**No internet required after first load** thanks to Service Workers!

---

## 🔄 Cross-Device Sync Setup (Optional)

To sync data across devices, follow these steps:

### Option 1: Using Firebase (Recommended)

1. Create Firebase project: https://firebase.google.com
2. Get Firebase config
3. Create `src/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  // Your Firebase config here
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
```

4. Update `store.js` to sync with Firebase

### Option 2: Using Custom Backend

Replace the `updateGameStats` function in `store.js` with API calls to your backend.

---

## 🎨 Customization

### Change App Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  architecture: {
    dark: '#1a1a2e',      // Background
    blue: '#0f3460',       // Cards
    accent: '#e94560',     // Highlights
    light: '#eeeeee',      // Text
    gold: '#d4af37'        // Special
  }
}
```

### Add More Subjects

Edit `src/data.js`:

```javascript
{
  id: 'AR-XXX',
  name: 'Subject Name',
  points: 4,
  grade: 'B',
  gp: 32,
  completed: 0,
  topics: ['Topic 1', 'Topic 2', 'Topic 3']
}
```

### Customize Game Questions

Edit `gameQuestions` array in `src/data.js`.

---

## 🐛 Troubleshooting

### App won't load
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check console for errors (F12)

### Progress not saving
- Check browser storage limit (localStorage full?)
- Try incognito/private window
- Clear cookies and try again

### Game not working
- Enable JavaScript in browser settings
- Try different browser
- Check internet connection for first load

### Service Worker issues
- Uninstall app and reinstall
- Clear app cache in browser settings
- Check "Update on reload" in DevTools → Application

---

## 📈 Performance Tips

1. **Daily Practice**: Spend 30 minutes on game modes
2. **Track Progress**: Check off topics as you learn
3. **Take Notes**: Write key concepts while studying
4. **Ask Pinky**: Use AI for instant clarification
5. **Review Trends**: Stay updated with architecture news

---

## 🔗 Useful Resources

### Learning Platforms
- Khan Academy: https://khanacademy.org
- Coursera: https://coursera.org
- Udemy: https://udemy.com

### Tools & Software
- AutoCAD: https://autodesk.com/autocad
- Revit: https://autodesk.com/revit
- SketchUp: https://sketchup.com

### Standards & Codes
- NBC India: https://nbc.org
- LEED Certification: https://usgbc.org/leed
- ISO Standards: https://iso.org

---

## 🤝 Support & Help

### Can't find an answer?
1. Check README.md
2. Look at existing issues on GitHub
3. Create a new issue describing the problem
4. Include: Device, Browser, What you were doing when error occurred

### Want to suggest improvements?
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a Pull Request

---

## 📞 Contact

- **GitHub Issues**: Report bugs or suggest features
- **Discussions**: Ask questions and share ideas
- **Email**: Check repository for contact info

---

## ✨ Features Roadmap

**Coming Soon:**
- [ ] Video tutorials for each subject
- [ ] Study groups & collaboration
- [ ] Downloadable study materials
- [ ] Progress reports (PDF export)
- [ ] Leaderboard system
- [ ] Mobile app (React Native)
- [ ] Real Claude API integration
- [ ] Cloud synchronization

---

## 🎓 About

**ArchVision Pro** helps architecture students transition from beginner to professional through:
- Structured subject tracking
- Interactive learning games
- AI-powered assistance
- Industry trend awareness
- Professional development roadmap

**Ideal for:**
- Architecture students (any semester)
- Architecture professionals
- Those aspiring to enter the field

---

**Version**: 1.0.0  
**Last Updated**: June 2024  
**Made with ❤️ for Architecture Students** 🏗️
