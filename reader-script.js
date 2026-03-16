// ===================================
// STORY TIME - Reader Script (FIXED)
// ===================================

// Story Data Configuration with CORRECTED PATHS
const storyData = {
    'scarlet-honey': {
        title: 'The Scarlet Honey',
        totalChapters: 25,
        chapters: generateChapterTitles('The Scarlet Honey', 25),
        htmlFiles: {
            1: 'The-scarlet-honey1.html',
            2: 'The-Scarlet-honey2.html',
            3: 'The-scarlet-honey3.html',
            4: 'The-scarlet-honey4.html',
            5: 'The-scarlet-honey5.html',
            6: 'The-scarlet-honey6.html',
            7: 'The-scarlet-honey7.html',
            8: 'The-scarlet-honey8.html',
            9: 'The-scarlet-honey9.html',
            10: 'The-scarlet-honey10.html',
            11: 'The-scarlet-honey11.html',
            12: 'The-scarlet-honey12.html',
            13: 'The-scarlet-honey13.html',
            14: 'The-scarlet-honey14.html',
            15: 'The-scarlet-honey15.html',
            16: 'The-scarlet-honey16.html',
            17: 'The-scarlet-honey17.html',
            18: 'The-scarlet-honey18.html',
            19: 'The-scarlet-honey19.html',
            20: 'The-scarlet-honey20.html',
            21: 'The-scarlet-honey21.html',
            22: 'The-scarlet-honey22.html',
            23: 'The-scarlet-honey23.html',
            24: 'The-scarlet-honey24.html',
            25: 'The-scarlet-honey25.html'
        },
        audioFiles: {
            1: 'chapter 10.mp3',
            2: 'Chapter 11.mp3',
            3: 'Chapter 12.mp3',
            4: 'Chapter 13.mp3',
            5: 'Chapter 14.mp3',
            6: 'Chapter 15.mp3',
            7: 'Chapter 16.mp3',
            8: 'Chapter 17.mp3',
            9: 'Chapter 18.mp3',
        }
    },
    'nelly': {
        title: "Nelly's Story",
        totalChapters: 22,
        chapters: generateChapterTitles("Nelly's Story", 22),
        htmlFiles: {
            1: 'NELLY-story.html',
            2: 'NELLY-story-page2.html',
            3: 'NELLY-story-page3.html',
            4: 'NELLY-story-page4.html',
            5: 'NELLY-story-page5.html',
            6: 'NELLY-story-page6.html',
            7: 'NELLY-story-page7.html',
            8: 'NELLY-story-page8.html',
            9: 'NELLY-story-page9.html',
            10: 'NELLY-story-page10.html',
            11: 'NELLY-story-page11.html',
            12: 'NELLY-story-page12.html',
            13: 'NELLY-story-page13.html',
            14: 'NELLY-story-page14.html',
            15: 'NELLY-story-page15.html',
            16: 'NELLY-story-page16.html',
            17: 'NELLY-story-page17.html',
            18: 'NELLY-story-page18.html',
            19: 'NELLY-story-page19.html',
            20: 'NELLY-story-page20.html',
            21: 'NELLY-story-page21.html',
            22: 'NELLY-story-page22.html'
        },
        audioFiles: {
            1: 'Chapter 1.mp3',
            2: 'Chapter 2.mp3',
            3: 'Chapter 3.mp3',
            4: 'Chapter 4.mp3',
            5: 'Chapter 5.mp3',
            6: 'Chapter 6.mp3',
            7: 'Chapter 7.mp3',
        }
    }
};

// Helper function to generate chapter titles
function generateChapterTitles(storyName, count) {
    const titles = {};
    for (let i = 1; i <= count; i++) {
        titles[i] = `Chapter ${i}`;
    }
    return titles;
}

// ===================================
// State Management
// ===================================

let currentStory = '';
let currentChapter = 1;
let currentStoryData = null;

// ===================================
// Initialize Reader
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeReader();
    setupEventListeners();
    loadSettings();
});

function initializeReader() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const storyParam = urlParams.get('story');
    const chapterParam = parseInt(urlParams.get('chapter')) || 1;
    
    // Try to get from localStorage if not in URL
    currentStory = storyParam || localStorage.getItem('currentStory') || 'scarlet-honey';
    currentChapter = chapterParam;
    
    // Validate story exists
    if (!storyData[currentStory]) {
        console.error('Story not found:', currentStory);
        currentStory = 'scarlet-honey';
    }
    
    currentStoryData = storyData[currentStory];
    
    // Update UI
    document.getElementById('currentStoryTitle').textContent = currentStoryData.title;
    
    // Load chapter
    loadChapter(currentChapter);
    
    // Populate chapter list
    populateChapterList();
}

// ===================================
// Chapter Loading
// ===================================

async function loadChapter(chapterNum) {
    currentChapter = chapterNum;
    
    // Update UI
    document.getElementById('chapterNumber').textContent = `Chapter ${chapterNum}`;
    document.getElementById('chapterTitle').textContent = currentStoryData.chapters[chapterNum] || `Chapter ${chapterNum}`;
    
    // Update progress bar
    const progress = (chapterNum / currentStoryData.totalChapters) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    // Load chapter content
    const htmlFile = currentStoryData.htmlFiles[chapterNum];
    if (htmlFile) {
        try {
            const response = await fetch(`stories/${htmlFile}`);
            if (response.ok) {
                const html = await response.text();
                extractAndDisplayContent(html);
            } else {
                displayError(`Chapter ${chapterNum} not found`);
            }
        } catch (error) {
            console.error('Error loading chapter:', error);
            displayError('Error loading chapter content');
        }
    } else {
        displayPlaceholder(chapterNum);
    }
    
    // Load audio if available
    loadAudio(chapterNum);
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Save progress
    saveProgress();
    
    // Update URL without reload
    const newUrl = `${window.location.pathname}?story=${currentStory}&chapter=${chapterNum}`;
    window.history.pushState({}, '', newUrl);
}

function extractAndDisplayContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Try to extract the main content
    const storyContent = doc.querySelector('.story-content') || doc.querySelector('body');
    
    if (storyContent) {
        // Get the content and clean it up
        let content = storyContent.innerHTML;
        
        // Remove navigation links from the content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        
        // Remove buttons and navigation links
        tempDiv.querySelectorAll('a.back, a.button, button').forEach(el => el.remove());
        
        document.getElementById('chapterContent').innerHTML = tempDiv.innerHTML;
    } else {
        displayError('Could not extract chapter content');
    }
}

function displayPlaceholder(chapterNum) {
    document.getElementById('chapterContent').innerHTML = `
        <p>Chapter ${chapterNum} content will be available soon.</p>
        <p>This is a placeholder for the upcoming chapter.</p>
    `;
}

function displayError(message) {
    document.getElementById('chapterContent').innerHTML = `
        <p class="error-message">${message}</p>
    `;
}

// ===================================
// Audio Management
// ===================================

const audioElement = document.getElementById('audioElement');
const playPauseBtn = document.getElementById('playPauseBtn');
const audioSeek = document.getElementById('audioSeek');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');

function loadAudio(chapterNum) {
    const audioFile = currentStoryData.audioFiles[chapterNum];
    
    if (audioFile) {
        audioElement.src = `audio/${audioFile}`;
        document.getElementById('audioPlayer').style.display = 'flex';
    } else {
        document.getElementById('audioPlayer').style.display = 'none';
    }
    
    // Reset audio state
    pauseAudio();
    audioSeek.value = 0;
    currentTimeDisplay.textContent = '0:00';
}

playPauseBtn.addEventListener('click', toggleAudio);

function toggleAudio() {
    if (audioElement.paused) {
        playAudio();
    } else {
        pauseAudio();
    }
}

function playAudio() {
    audioElement.play();
    document.querySelector('.play-icon').classList.add('hidden');
    document.querySelector('.pause-icon').classList.remove('hidden');
}

function pauseAudio() {
    audioElement.pause();
    document.querySelector('.play-icon').classList.remove('hidden');
    document.querySelector('.pause-icon').classList.add('hidden');
}

// Audio time updates
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        audioSeek.value = progress;
        currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
    }
});

audioElement.addEventListener('loadedmetadata', () => {
    totalTimeDisplay.textContent = formatTime(audioElement.duration);
});

audioSeek.addEventListener('input', () => {
    const time = (audioSeek.value / 100) * audioElement.duration;
    audioElement.currentTime = time;
});

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ===================================
// Navigation
// ===================================

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevChapter');
    const nextBtn = document.getElementById('nextChapter');
    
    prevBtn.disabled = currentChapter <= 1;
    nextBtn.disabled = currentChapter >= currentStoryData.totalChapters;
}

document.getElementById('prevChapter').addEventListener('click', () => {
    if (currentChapter > 1) {
        loadChapter(currentChapter - 1);
    }
});

document.getElementById('nextChapter').addEventListener('click', () => {
    if (currentChapter < currentStoryData.totalChapters) {
        loadChapter(currentChapter + 1);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentChapter > 1) {
        loadChapter(currentChapter - 1);
    } else if (e.key === 'ArrowRight' && currentChapter < currentStoryData.totalChapters) {
        loadChapter(currentChapter + 1);
    } else if (e.key === ' ' && !e.target.matches('input')) {
        e.preventDefault();
        toggleAudio();
    }
});

// ===================================
// Chapter List Modal
// ===================================

function populateChapterList() {
    const chapterList = document.getElementById('chapterList');
    chapterList.innerHTML = '';
    
    for (let i = 1; i <= currentStoryData.totalChapters; i++) {
        const chapterItem = document.createElement('div');
        chapterItem.className = 'chapter-item';
        if (i === currentChapter) {
            chapterItem.classList.add('active');
        }
        
        chapterItem.innerHTML = `
            <span class="chapter-num">Chapter ${i}</span>
            <span class="chapter-name">${currentStoryData.chapters[i] || ''}</span>
        `;
        
        chapterItem.addEventListener('click', () => {
            loadChapter(i);
            closeChapterModal();
        });
        
        chapterList.appendChild(chapterItem);
    }
}

document.getElementById('chapterListBtn').addEventListener('click', () => {
    document.getElementById('chapterModal').classList.add('active');
});

document.getElementById('closeModal').addEventListener('click', closeChapterModal);

document.getElementById('chapterModal').addEventListener('click', (e) => {
    if (e.target.id === 'chapterModal') {
        closeChapterModal();
    }
});

function closeChapterModal() {
    document.getElementById('chapterModal').classList.remove('active');
}

// ===================================
// Settings Panel
// ===================================

const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const fontSizeSlider = document.getElementById('fontSizeSlider');
const lineHeightSlider = document.getElementById('lineHeightSlider');
const themeButtons = document.querySelectorAll('.theme-btn');

settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('active');
});

// Close settings when clicking outside
document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
        settingsPanel.classList.remove('active');
    }
});

// Font size control
fontSizeSlider.addEventListener('input', () => {
    const size = fontSizeSlider.value;
    document.getElementById('fontSizeValue').textContent = `${size}px`;
    document.getElementById('chapterContent').style.fontSize = `${size}px`;
    saveSettings();
});

// Line height control
lineHeightSlider.addEventListener('input', () => {
    const height = lineHeightSlider.value;
    document.getElementById('lineHeightValue').textContent = height;
    document.getElementById('chapterContent').style.lineHeight = height;
    saveSettings();
});

// Theme control
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        setTheme(theme);
        
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        saveSettings();
    });
});

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
}

// ===================================
// Save/Load Functions
// ===================================

function saveProgress() {
    localStorage.setItem('currentStory', currentStory);
    localStorage.setItem(`${currentStory}_chapter`, currentChapter);
}

function saveSettings() {
    const settings = {
        fontSize: fontSizeSlider.value,
        lineHeight: lineHeightSlider.value,
        theme: document.querySelector('.theme-btn.active').dataset.theme
    };
    localStorage.setItem('readerSettings', JSON.stringify(settings));
}

function loadSettings() {
    const saved = localStorage.getItem('readerSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        
        fontSizeSlider.value = settings.fontSize || 18;
        lineHeightSlider.value = settings.lineHeight || 1.8;
        
        document.getElementById('fontSizeValue').textContent = `${settings.fontSize}px`;
        document.getElementById('lineHeightValue').textContent = settings.lineHeight;
        document.getElementById('chapterContent').style.fontSize = `${settings.fontSize}px`;
        document.getElementById('chapterContent').style.lineHeight = settings.lineHeight;
        
        if (settings.theme) {
            setTheme(settings.theme);
            // Remove active from all buttons first
            themeButtons.forEach(b => b.classList.remove('active'));
            // Add active to the saved theme
            const themeBtn = document.querySelector(`[data-theme="${settings.theme}"]`);
            if (themeBtn) themeBtn.classList.add('active');
        }
    } else {
        // Set default theme (dark) if no settings saved
        setTheme('dark');
    }
}

function setupEventListeners() {
    // Additional event listeners can be added here
}
