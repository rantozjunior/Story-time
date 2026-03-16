# Story Time 

A professional, immersive digital reading platform featuring audio narration, progress tracking, and a premium reading experience.

## 📁 Directory Structure

```
story-time-fixed/
├── index.html              # Landing page
├── reader.html             # Reading interface
│
├── css/
│   ├── styles.css          # Landing page styles
│   ├── reader-styles.css   # Reader interface styles
│   └── MAIN.css            # Additional styles
│
├── js/
│   ├── script.js           # Landing page functionality
│   └── reader-script.js    # Reader functionality (FIXED)
│
├── stories/
│   ├── The-scarlet-honey1.html
│   ├── The-scarlet-honey2.html
│   ├── ... (all 25 Scarlet Honey chapters)
│   ├── NELLY-story.html
│   ├── NELLY-story-page2.html
│   └── ... (all 22 Nelly chapters)
│
├── audio/
│   ├── chapter 1..mp3
│   ├── Chapter 2.mp3
│   ├── Chapter 3.mp3
│   ├── ... (all audio files)
│   └── Chapter 91.mp3
│
└── images/
    ├── ScarletHoney.jpeg
    ├── Fallen world1.jpeg
    └── App logo.jpeg
```


##  Features

### Reading Experience
-  Clean, distraction-free interface
-  Customizable font size (16-24px)
-  Adjustable line spacing (1.4-2.2)
-  Three reading themes: Dark, Sepia, Light
-  First-letter drop caps
-  Reading progress indicator

### Audio Integration
-  Professional audio narration
-  Integrated audio player with controls
-  Play/pause functionality
-  Seek bar for navigation
-  Time display

### Navigation
-  Chapter navigation (previous/next)
-  Chapter list modal for quick access
-  Keyboard shortcuts:
  - `←` Previous chapter
  - `→` Next chapter
  - `Space` Play/pause audio
  - `Esc` Close modals

### Progress Tracking
-  Automatic progress saving
-  Resume where you left off
-  Visual progress bar

##  Available Stories

### The Scarlet Honey (25 Chapters)
A tale of mystery and intrigue featuring the Skeem family and their encounters with Ida Mbona. Chapters 1-7 have audio narration.

### Nelly's Story (22 Chapters)
An epic adventure through a transformed world. Chapters 1-9 have audio narration.

##  Customization

### Color Scheme
Edit CSS variables in `css/styles.css`:

```css
:root {
    --color-black: #0A0A0A;
    --color-white: #FAFAFA;
    --color-accent: #D4AF37;  /* Gold accent */
    --color-gray-light: #E5E5E5;
    --color-gray-mid: #A0A0A0;
    --color-gray-dark: #1A1A1A;
}
```

### Adding New Stories

1. **Add story HTML files** to `stories/` folder

2. **Add audio files** to `audio/` folder

3. **Update `js/reader-script.js`**:
```javascript
const storyData = {
    'your-story-slug': {
        title: 'Your Story Title',
        totalChapters: 20,
        chapters: generateChapterTitles('Your Story', 20),
        htmlFiles: {
            1: 'your-chapter-1.html',
            2: 'your-chapter-2.html',
            // ... map all chapters
        },
        audioFiles: {
            1: 'your-audio-1.mp3',
            2: 'your-audio-2.mp3',
            // ... map available audio
        }
    }
};
```

4. **Add story card to `index.html`** (see existing cards as template)

##  Technical Details

### Technologies
- Pure HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- Google Fonts (Playfair Display, Crimson Pro)
- LocalStorage for persistence

### Browser Support
- Chrome 
- Firefox 
- Safari 
- Edge 
- Modern mobile browsers 

##  Troubleshooting

### Audio Not Playing
- Ensure you're using a local server (not file://)
- Check browser console for errors
- Verify audio files exist in `audio/` folder
- Some browsers require user interaction before audio plays

### Chapters Not Loading
- Verify HTML files exist in `stories/` folder
- Check filename spelling matches `storyData` in `reader-script.js`
- Use browser developer tools to check for 404 errors

### Images Not Showing
- Ensure images are in `images/` folder
- Check file names match exactly (case-sensitive)
- Verify image formats (.jpeg, .jpg)

##  Mobile Optimization

- Touch-friendly navigation
- Responsive breakpoints (768px, 480px)
- Optimized font sizes for mobile
- Streamlined audio controls on small screens

##  Known Limitations

1. **Audio availability**: Not all chapters have audio files
2. **Offline mode**: Requires local server or web hosting
3. **Cloud sync**: Progress only saved locally

##  Deployment

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch

### Netlify/Vercel
1. Connect repository
2. Deploy (no build step needed)
3. Your site is live!

### Traditional Web Hosting
1. Upload all files via FTP
2. Maintain directory structure
3. Ensure all file permissions are correct

##  License

Open source - Free for personal and commercial use

##  Tips for Best Experience

1. **Use a local server** - Avoids CORS issues
2. **Enable audio** - Best experienced with narration
3. **Try different themes** - Find your comfort zone
4. **Use keyboard shortcuts** - Faster navigation
5. **Bookmark chapters** - Save your progress

##  Contributing

Found a bug or want to add a feature?
- Report issues
- Submit pull requests
- Suggest improvements

---

**Enjoy your immersive reading experience! **
