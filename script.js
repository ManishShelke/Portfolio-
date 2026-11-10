document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Animated Code Background (Canvas)
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(234, 234, 224, 0.1)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(26, 26, 0, 0.3)'; 
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };
    
    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // ==========================================
    // Year
    // ==========================================
    document.getElementById('year').textContent = new Date().getFullYear();

    // ==========================================
    // Typewriter Effect
    // ==========================================
    const texts = ["digital experiences.", "AI applications.", "scalable solutions."];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    const typeWriterElement = document.getElementById("typewriter");
    let isDeleting = false;

    function type() {
        if (count === texts.length) count = 0;
        currentText = texts[count];
        if (isDeleting) letter = currentText.slice(0, --index);
        else letter = currentText.slice(0, ++index);
        
        typeWriterElement.textContent = letter;

        let typeSpeed = 100;
        if (isDeleting) typeSpeed /= 2;

        if (!isDeleting && letter.length === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);

    // ==========================================
    // Mobile Menu
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            if(link.id !== 'open-connect-mobile') mobileMenu.classList.add('hidden');
        });
    });

    // ==========================================
    // Connect Modal
    // ==========================================
    const connectModal = document.getElementById('connect-modal');
    document.getElementById('open-connect-modal').addEventListener('click', () => connectModal.classList.remove('hidden'));
    document.getElementById('open-connect-mobile').addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        connectModal.classList.remove('hidden');
    });
    document.getElementById('close-connect-modal').addEventListener('click', () => connectModal.classList.add('hidden'));

    // ==========================================
    // Projects Carousel
    // ==========================================
    const track = document.getElementById('project-track');
    let slides = Array.from(track.children);
    const nextBtn = document.getElementById('next-slide');
    const prevBtn = document.getElementById('prev-slide');
    const dotsNav = document.getElementById('carousel-dots');
    
    // Build dots dynamically based on number of slides
    dotsNav.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-indicator';
        if (i === 0) dot.classList.add('current-indicator');
        dotsNav.appendChild(dot);
    });
    let dots = Array.from(dotsNav.children);

    let currentIndex = 0;

    function updateCarousel(idx) {
        track.style.transform = `translateX(-${idx * 100}%)`;
        dots.forEach(dot => dot.classList.remove('current-indicator'));
        if (dots[idx]) dots[idx].classList.add('current-indicator');
        prevBtn.disabled = idx === 0;
        nextBtn.disabled = idx === slides.length - 1;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) { currentIndex++; updateCarousel(currentIndex); }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) { currentIndex--; updateCarousel(currentIndex); }
    });

    dotsNav.addEventListener('click', (e) => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;
        currentIndex = dots.findIndex(dot => dot === targetDot);
        updateCarousel(currentIndex);
    });

    updateCarousel(0);

    // Close Modals on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target === connectModal) connectModal.classList.add('hidden');
    });

});


    // ==========================================
    // AI Caption Generator
    // ==========================================
    const captionModal = document.getElementById('caption-modal');
    const openCaptionBtn = document.getElementById('open-caption-modal');
    const closeCaptionBtn = document.getElementById('close-caption-modal');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('caption-file-input');
    const previewContainer = document.getElementById('caption-preview-container');
    const previewImg = document.getElementById('caption-preview-img');
    const removeImgBtn = document.getElementById('caption-remove-img');
    const eventNameInput = document.getElementById('caption-event-name');
    const eventDateInput = document.getElementById('caption-event-date');
    const apiKeyInput = document.getElementById('caption-api-key');
    const generateBtn = document.getElementById('caption-generate-btn');
    const uploadStep = document.getElementById('caption-upload-step');
    const resultStep = document.getElementById('caption-result-step');
    const loadingState = document.getElementById('caption-loading');
    const resultImg = document.getElementById('caption-result-img');
    const resultEvent = document.getElementById('caption-result-event');
    const resultDate = document.getElementById('caption-result-date');
    const resultText = document.getElementById('caption-result-text');
    const regenerateBtn = document.getElementById('caption-regenerate-btn');
    const copyBtn = document.getElementById('caption-copy-btn');
    const addBtn = document.getElementById('caption-add-btn');
    const backBtn = document.getElementById('caption-back-btn');

    let captionImageBase64 = null;
    let captionImageMime = null;
    let captionImageDataUrl = null;

    // Restore saved API key
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) apiKeyInput.value = savedKey;

    // Open / Close modal
    openCaptionBtn.addEventListener('click', () => captionModal.classList.remove('hidden'));
    closeCaptionBtn.addEventListener('click', () => captionModal.classList.add('hidden'));
    window.addEventListener('click', (e) => {
        if (e.target === captionModal) captionModal.classList.add('hidden');
    });

    // Drag & drop
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) handleImageFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) handleImageFile(fileInput.files[0]);
    });

    function handleImageFile(file) {
        if (!file.type.startsWith('image/')) return;
        captionImageMime = file.type;
        const reader = new FileReader();
        reader.onload = (e) => {
            captionImageDataUrl = e.target.result;
            captionImageBase64 = captionImageDataUrl.split(',')[1];
            previewImg.src = captionImageDataUrl;
            previewContainer.classList.remove('hidden');
            dropZone.classList.add('hidden');
            updateGenerateState();
        };
        reader.readAsDataURL(file);
    }

    removeImgBtn.addEventListener('click', () => {
        captionImageBase64 = null;
        captionImageMime = null;
        captionImageDataUrl = null;
        previewContainer.classList.add('hidden');
        dropZone.classList.remove('hidden');
        fileInput.value = '';
        updateGenerateState();
    });

    function updateGenerateState() {
        generateBtn.disabled = !(captionImageBase64 && apiKeyInput.value.trim());
    }
    apiKeyInput.addEventListener('input', updateGenerateState);

    // Generate caption
    generateBtn.addEventListener('click', () => generateCaption());
    regenerateBtn.addEventListener('click', () => generateCaption());

    async function generateCaption() {
        const apiKey = apiKeyInput.value.trim();
        if (!apiKey || !captionImageBase64) return;

        // Save API key
        localStorage.setItem('gemini_api_key', apiKey);

        // Show loading
        uploadStep.classList.add('hidden');
        resultStep.classList.add('hidden');
        loadingState.classList.remove('hidden');

        const eventName = eventNameInput.value.trim();
        const eventDate = eventDateInput.value.trim();

        const userContext = [];
        if (eventName) userContext.push(`Event name: ${eventName}`);
        if (eventDate) userContext.push(`Date: ${eventDate}`);
        const contextStr = userContext.length ? `\n\nUser-provided context:\n${userContext.join('\n')}` : '';

        const prompt = `You are a professional portfolio caption writer for a developer/engineer.

Analyze this event photo and generate a concise, engaging, first-person caption suitable for a developer portfolio's "Summits & Events" section.

Rules:
- Write in Kalam/handwritten casual-professional tone (like writing on a polaroid photo)
- Keep it 1-3 sentences, under 180 characters ideally
- Identify the event name, venue, sponsors, technology brands, banners, or any visible text
- Highlight learning, networking, technical exploration, or achievements when supported by the image
- Include 1-2 relevant emojis
- Never invent event details that cannot be verified from the image
- If you can identify the event name from the image, start by referencing it
- Do NOT use hashtags${contextStr}

Also identify the event name from the image (or use the user-provided one). Return your response as JSON:
{"eventName": "...", "caption": "..."}

Return ONLY valid JSON, no markdown.`;

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: prompt },
                                {
                                    inlineData: {
                                        mimeType: captionImageMime,
                                        data: captionImageBase64
                                    }
                                }
                            ]
                        }],
                        generationConfig: {
                            temperature: 0.8,
                            maxOutputTokens: 300
                        }
                    })
                }
            );

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || 'API request failed');
            }

            const data = await response.json();
            const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

            // Parse JSON from response (handle possible markdown wrapping)
            let parsed;
            try {
                const jsonStr = rawText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
                parsed = JSON.parse(jsonStr);
            } catch {
                // Fallback: use raw text as caption
                parsed = { eventName: eventName || 'Event', caption: rawText.trim() };
            }

            // Show result
            loadingState.classList.add('hidden');
            resultStep.classList.remove('hidden');
            resultImg.src = captionImageDataUrl;
            resultEvent.textContent = parsed.eventName || eventName || 'Event';
            resultDate.textContent = eventDate || '';
            resultText.value = parsed.caption || rawText.trim();

        } catch (err) {
            loadingState.classList.add('hidden');
            uploadStep.classList.remove('hidden');
            showToast('Error: ' + err.message, true);
        }
    }

    // Copy caption
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(resultText.value).then(() => {
            showToast('Caption copied!');
        });
    });

    // Back to upload
    backBtn.addEventListener('click', () => {
        resultStep.classList.add('hidden');
        uploadStep.classList.remove('hidden');
    });

    // Add to Portfolio
    addBtn.addEventListener('click', () => {
        const grid = document.getElementById('polaroid-grid');
        const caption = resultText.value.trim();
        const eventName = resultEvent.textContent;
        const eventDate = resultDate.textContent;
        const imgSrc = captionImageDataUrl;

        if (!caption || !imgSrc) return;

        // Create polaroid card matching existing structure
        const existingCount = grid.querySelectorAll('.polaroid').length;
        const tiltClass = existingCount % 2 === 0 ? 'tilt-left' : 'tilt-right';

        const polaroid = document.createElement('div');
        polaroid.className = `polaroid ${tiltClass}`;
        polaroid.style.animation = 'fadeInUp 0.6s ease forwards';

        let eventLabel = '';
        if (eventName && eventName !== 'Event') {
            eventLabel = `<div class="polaroid-event-name">${escapeHtml(eventName)}</div>`;
        }
        let dateLabel = '';
        if (eventDate) {
            dateLabel = `<div class="polaroid-date">${escapeHtml(eventDate)}</div>`;
        }

        polaroid.innerHTML = `
            ${eventLabel}
            ${dateLabel}
            <img src="${imgSrc}" class="polaroid-img" alt="${escapeHtml(eventName)}">
            <div class="polaroid-caption">${escapeHtml(caption)}</div>
        `;

        grid.appendChild(polaroid);

        // Close modal & reset
        captionModal.classList.add('hidden');
        resetCaptionModal();
        showToast('Event added to portfolio!');

        // Scroll to the new card
        setTimeout(() => polaroid.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    });

    function resetCaptionModal() {
        resultStep.classList.add('hidden');
        loadingState.classList.add('hidden');
        uploadStep.classList.remove('hidden');
        captionImageBase64 = null;
        captionImageMime = null;
        captionImageDataUrl = null;
        previewContainer.classList.add('hidden');
        dropZone.classList.remove('hidden');
        fileInput.value = '';
        eventNameInput.value = '';
        eventDateInput.value = '';
        resultText.value = '';
        updateGenerateState();
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function showToast(message, isError = false) {
        const existing = document.querySelector('.caption-toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'caption-toast';
        if (isError) toast.style.background = '#dc2626';
        toast.innerHTML = `<i class="ph ph-${isError ? 'warning' : 'check-circle'}"></i> ${message}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
