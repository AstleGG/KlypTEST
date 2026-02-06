import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@1.40.0";

// --- State Variables ---
let currentStatus = 'idle'; // idle | fetching | ready | downloading | completed | error
let currentPlatform = 'youtube';
let currentFormat = 'video';
let currentProgress = 0;

// --- DOM Elements ---
const form = document.getElementById('klyp-form');
const urlInput = document.getElementById('url-input');
const clearInputBtn = document.getElementById('clear-input');
const platformBtns = document.querySelectorAll('.platform-btn');
const formatBtns = document.querySelectorAll('.format-btn');
const qualitySelect = document.getElementById('quality-select');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const optionsGrid = document.getElementById('options-grid');
const errorBox = document.getElementById('error-box');
const errorMessage = document.getElementById('error-message');
const metadataPreview = document.getElementById('metadata-preview');
const metaThumb = document.getElementById('meta-thumb');
const metaTitle = document.getElementById('meta-title');
const metaAuthor = document.getElementById('meta-author');
const metaFormatTag = document.getElementById('meta-format-tag');
const resetFormBtn = document.getElementById('reset-form');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

const supportBtn = document.getElementById('support-btn');
const supportModal = document.getElementById('support-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');

// --- Initialization ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Functions ---

const updateUI = () => {
    // Input handling
    clearInputBtn.classList.toggle('hidden', !urlInput.value || currentStatus !== 'idle');
    urlInput.disabled = ['fetching', 'downloading', 'completed'].includes(currentStatus);

    // Options grid visibility/opacity
    optionsGrid.classList.toggle('opacity-100', currentStatus === 'idle');
    optionsGrid.classList.toggle('opacity-40', currentStatus !== 'idle');
    optionsGrid.classList.toggle('pointer-events-none', currentStatus !== 'idle');

    // Error box
    errorBox.classList.toggle('hidden', currentStatus !== 'error');

    // Metadata Preview
    metadataPreview.classList.toggle('hidden', currentStatus !== 'ready');

    // Button states
    submitBtn.disabled = (currentStatus === 'idle' && !urlInput.value.trim()) || 
                         ['fetching', 'downloading'].includes(currentStatus);

    // Progress
    progressContainer.classList.toggle('hidden', currentStatus !== 'downloading');
    progressBar.style.width = `${currentProgress}%`;
    progressText.textContent = `Processing: ${Math.floor(currentProgress)}%`;

    // Button Text / Content
    if (currentStatus === 'fetching') {
        btnText.innerHTML = `<div class="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div><span>Analysing...</span>`;
        submitBtn.className = "w-full py-4 rounded-2xl text-lg font-bold transition-all transform flex items-center justify-center gap-3 bg-slate-100 text-slate-400 cursor-not-allowed";
    } else if (currentStatus === 'ready') {
        btnText.innerHTML = `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg><span>Download Now</span>`;
        submitBtn.className = "w-full py-4 rounded-2xl text-lg font-bold transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200";
    } else if (currentStatus === 'downloading') {
        btnText.textContent = "Downloading...";
        submitBtn.className = "w-full py-4 rounded-2xl text-lg font-bold transition-all transform flex items-center justify-center gap-3 bg-slate-100 text-slate-400 cursor-not-allowed";
    } else if (currentStatus === 'completed') {
        btnText.innerHTML = `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg><span>Download Saved</span>`;
        submitBtn.className = "w-full py-4 rounded-2xl text-lg font-bold transition-all transform flex items-center justify-center gap-3 bg-green-500 text-white cursor-default";
    } else {
        btnText.textContent = "Continue";
        submitBtn.className = "w-full py-4 rounded-2xl text-lg font-bold transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400";
    }
};

const handleGeminiFetch = async (url) => {
    // Simulate real Gemini API integration via process.env.API_KEY (which is handled by the platform)
    // We use the @google/genai SDK in a static context via ESM.sh
    const apiKey = "API_KEY_PLACEHOLDER"; // In real scenario, handled by system
    try {
        const ai = new GoogleGenAI({ apiKey: "none" }); // Placeholder initialization as key is injected
        // For static demo without a real key in context, we simulate a small delay + result
        // if you want real Gemini logic, uncomment the block below:
        /*
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Extract media metadata for: ${url}. Return JSON: {title, author, thumbnail, isValid, errorMessage}`,
            config: { responseMimeType: "application/json" }
        });
        return JSON.parse(response.text);
        */
        
        // Simulation for robustness in various environments
        await new Promise(r => setTimeout(r, 1500));
        
        if (!url.includes('youtube.com') && !url.includes('tiktok.com') && !url.includes('youtu.be')) {
            return { isValid: false, errorMessage: "Only YouTube and TikTok links are currently supported." };
        }

        return {
            isValid: true,
            title: "Super Awesome " + (currentPlatform === 'youtube' ? "Video" : "TikTok"),
            author: "Creator One",
            thumbnail: `https://picsum.photos/seed/${Math.random()}/400/225`,
        };
    } catch (e) {
        console.error(e);
        return { isValid: false, errorMessage: "Failed to reach processing engine." };
    }
};

const startDownload = () => {
    currentStatus = 'downloading';
    currentProgress = 0;
    updateUI();

    const interval = setInterval(() => {
        currentProgress += Math.random() * 15;
        if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(interval);
            
            // Trigger actual simulated file download
            const blob = new Blob(["Klyp Media Download Content"], { type: 'text/plain' });
            const dUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = dUrl;
            a.download = `klyp_media_${Date.now()}.txt`;
            a.click();
            window.URL.revokeObjectURL(dUrl);

            currentStatus = 'completed';
            updateUI();

            setTimeout(() => {
                resetForm();
            }, 5000);
        }
        updateUI();
    }, 200);
};

const resetForm = () => {
    currentStatus = 'idle';
    currentProgress = 0;
    urlInput.value = '';
    updateUI();
};

// --- Event Listeners ---

urlInput.addEventListener('input', () => {
    updateUI();
});

clearInputBtn.addEventListener('click', () => {
    urlInput.value = '';
    updateUI();
});

platformBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        platformBtns.forEach(b => {
            b.classList.remove('bg-white', 'shadow-sm', 'text-indigo-600');
            b.classList.add('text-slate-500');
        });
        btn.classList.add('bg-white', 'shadow-sm', 'text-indigo-600');
        btn.classList.remove('text-slate-500');
        currentPlatform = btn.dataset.platform;
        urlInput.placeholder = `Paste your ${currentPlatform} link...`;
    });
});

formatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        formatBtns.forEach(b => {
            b.classList.remove('bg-white', 'shadow-sm', 'text-indigo-600');
            b.classList.add('text-slate-500');
        });
        btn.classList.add('bg-white', 'shadow-sm', 'text-indigo-600');
        btn.classList.remove('text-slate-500');
        currentFormat = btn.dataset.format;
        metaFormatTag.textContent = currentFormat;
    });
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (currentStatus === 'idle' || currentStatus === 'error') {
        currentStatus = 'fetching';
        updateUI();
        
        const result = await handleGeminiFetch(urlInput.value);
        
        if (result.isValid) {
            currentStatus = 'ready';
            metaTitle.textContent = result.title;
            metaAuthor.textContent = result.author;
            metaThumb.src = result.thumbnail;
            metaFormatTag.textContent = currentFormat;
        } else {
            currentStatus = 'error';
            errorMessage.textContent = result.errorMessage;
        }
        updateUI();
    } else if (currentStatus === 'ready') {
        startDownload();
    }
});

resetFormBtn.addEventListener('click', resetForm);

// Modal Logic
const toggleModal = (show) => {
    if (show) {
        supportModal.classList.remove('hidden');
        setTimeout(() => {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    } else {
        modalContent.classList.add('scale-95', 'opacity-0');
        modalContent.classList.remove('scale-100', 'opacity-100');
        setTimeout(() => {
            supportModal.classList.add('hidden');
        }, 300);
    }
};

supportBtn.addEventListener('click', () => toggleModal(true));
closeModalBtn.addEventListener('click', () => toggleModal(false));
modalOverlay.addEventListener('click', () => toggleModal(false));

// Initial State
updateUI();