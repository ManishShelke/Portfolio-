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
