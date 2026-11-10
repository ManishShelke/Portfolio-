document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Animated Code Background (Canvas)
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const nums = '0123456789';
    const codeSymbols = '<>{}/[]=;:()!@#$%^&*+-~_`|';
    const alphabet = katakana + latin + nums + codeSymbols;

    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let rainDrops = [];

    const initRain = () => {
        columns = Math.floor(canvas.width / fontSize);
        rainDrops = [];
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = Math.floor(Math.random() * -50);
        }
    };
    initRain();

    const draw = () => {
        ctx.fillStyle = 'rgba(234, 234, 224, 0.12)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(26, 26, 0, 0.75)';
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

    setInterval(draw, 40);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initRain();
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
        if (!typeWriterElement) return;
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
    setTimeout(type, 600);

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

    // ==========================================
    // Initialize 3D Experiences
    // ==========================================
    init3DExperiences();

});

/* ==========================================================================
   3D EXPERIENCES MODULE (Three.js) - Premium Aesthetic Enhancement
   ========================================================================== */
async function init3DExperiences() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasWebGL = !!document.createElement('canvas').getContext('webgl');

    if (!hasWebGL || prefersReducedMotion) {
        console.log('3D experiences disabled');
        return;
    }

    try {
        const THREE = await import('three');

        // Initialize premium 3D scenes
        await initHeroGlassOrb(THREE);
        initAmbientParticles(THREE);
        initProjectTilt(THREE);
        initAINeuralNetwork(THREE);
        initAbstractSculpture(THREE);
        initOrbitalElements(THREE);

    } catch (error) {
        console.warn('Failed to load 3D experiences:', error);
    }
}

/**
 * HERO SECTION - Floating Glass Orb with internal Neural Network
 */
async function initHeroGlassOrb(THREE) {
    const heroSection = document.getElementById('about');
    if (!heroSection) return;

    const container = document.createElement('div');
    container.id = 'hero-3d-container';
    container.style.cssText = `
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
        border-radius: var(--radius-xl);
    `;

    const card = heroSection.querySelector('.dark-card');
    if (card) {
        card.style.position = 'relative';
        card.insertBefore(container, card.firstChild);
    }

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'width: 100%; height: 100%; display: block;';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 15;

    // --- Glass Orb ---
    const orbGeometry = new THREE.SphereGeometry(4, 64, 64);
    const orbMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.05,
        transmission: 0.95,
        thickness: 2,
        ior: 1.5,
        transparent: true,
        opacity: 0.3,
        clearcoat: 1,
    });
    const glassOrb = new THREE.Mesh(orbGeometry, orbMaterial);
    scene.add(glassOrb);

    // --- Internal Neural Network ---
    const pointCount = 40;
    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / pointCount);
        const theta = Math.sqrt(pointCount * Math.PI) * phi;
        const r = 3.2; // Slightly smaller than orb
        positions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
        positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pointsMaterial = new THREE.PointsMaterial({
        color: 0xFFFFCC,
        size: 0.08,
        transparent: true,
        opacity: 0.8,
    });
    const neuralPoints = new THREE.Points(pointsGeometry, pointsMaterial);
    glassOrb.add(neuralPoints);

    // Internal Connections
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFCC, transparent: true, opacity: 0.2 });
    const lines = new THREE.Group();
    for (let i = 0; i < pointCount; i++) {
        for (let j = i + 1; j < pointCount; j++) {
            const dist = new THREE.Vector3(positions[i*3], positions[i*3+1], positions[i*3+2])
                .distanceTo(new THREE.Vector3(positions[j*3], positions[j*3+1], positions[j*3+2]));
            if (dist < 2.5) {
                const lineGeo = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(positions[i*3], positions[i*3+1], positions[i*3+2]),
                    new THREE.Vector3(positions[j*3], positions[j*3+1], positions[j*3+2])
                ]);
                lines.add(new THREE.Line(lineGeo, lineMaterial));
            }
        }
    }
    glassOrb.add(lines);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x3b82f6, 1.5, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.005;
        glassOrb.rotation.y += 0.003;
        glassOrb.rotation.x = Math.sin(time) * 0.1;

        // Mouse follow parallax
        glassOrb.position.x += (mouseX * 1.5 - glassOrb.position.x) * 0.05;
        glassOrb.position.y += (mouseY * 0.8 - glassOrb.position.y) * 0.05;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

/**
 * AMBIENT PARTICLE BACKGROUND
 */
function initAmbientParticles(THREE) {
    const container = document.createElement('div');
    container.id = 'ambient-3d-particles';
    container.style.cssText = 'position: fixed; inset: 0; pointer-events: none; z-index: -2; opacity: 0.4;';
    document.body.appendChild(container);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const count = 300;
    const geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 120;
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const material = new THREE.PointsMaterial({ size: 0.15, color: 0x1A1A00, transparent: true, opacity: 0.3 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0002;
        particles.rotation.x += 0.0001;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/**
 * PROJECT CARD 3D TILT
 */
function initProjectTilt() {
    const cards = document.querySelectorAll('.project-slide-content');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            card.style.boxShadow = '10px 10px 20px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
            card.style.boxShadow = 'var(--shadow-sm)';
        });
    });
}

/**
 * AI NEURAL NETWORK (Subtle background for Education)
 */
function initAINeuralNetwork(THREE) {
    const target = document.getElementById('education');
    if (!target) return;

    const container = document.createElement('div');
    container.style.cssText = 'position: absolute; inset: 0; z-index: 0; opacity: 0.08; pointer-events: none; overflow: hidden;';
    target.style.position = 'relative';
    target.prepend(container);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, target.clientWidth / target.clientHeight, 0.1, 100);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(target.clientWidth, target.clientHeight);
    container.appendChild(renderer.domElement);

    const count = 40;
    const geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const velocities = [];
    for (let i = 0; i < count; i++) {
        pos[i*3] = (Math.random() - 0.5) * 30;
        pos[i*3+1] = (Math.random() - 0.5) * 20;
        pos[i*3+2] = (Math.random() - 0.5) * 10;
        velocities.push(new THREE.Vector3((Math.random()-0.5)*0.015, (Math.random()-0.5)*0.015, (Math.random()-0.5)*0.01));
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const material = new THREE.PointsMaterial({ size: 0.2, color: 0x1A1A00 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x1A1A00, transparent: true, opacity: 0.15 });
    let lines = new THREE.Group();
    scene.add(lines);

    function animate() {
        requestAnimationFrame(animate);
        const pArr = geometry.attributes.position.array;

        // Clear previous lines
        scene.remove(lines);
        lines = new THREE.Group();

        for(let i=0; i<count; i++) {
            pArr[i*3] += velocities[i].x;
            pArr[i*3+1] += velocities[i].y;
            pArr[i*3+2] += velocities[i].z;

            // Bounce within bounds
            if(Math.abs(pArr[i*3]) > 15) velocities[i].x *= -1;
            if(Math.abs(pArr[i*3+1]) > 10) velocities[i].y *= -1;
            if(Math.abs(pArr[i*3+2]) > 5) velocities[i].z *= -1;

            for(let j=i+1; j<count; j++) {
                const dx = pArr[i*3] - pArr[j*3];
                const dy = pArr[i*3+1] - pArr[j*3+1];
                const dz = pArr[i*3+2] - pArr[j*3+2];
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                if(dist < 7) {
                    const lineGeo = new THREE.BufferGeometry().setFromPoints([
                        new THREE.Vector3(pArr[i*3], pArr[i*3+1], pArr[i*3+2]),
                        new THREE.Vector3(pArr[j*3], pArr[j*3+1], pArr[j*3+2])
                    ]);
                    lines.add(new THREE.Line(lineGeo, lineMaterial));
                }
            }
        }
        geometry.attributes.position.needsUpdate = true;
        scene.add(lines);
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = target.clientWidth / target.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(target.clientWidth, target.clientHeight);
    });
}

/**
 * ABSTRACT LIQUID GLASS SCULPTURE (Projects section)
 */
function initAbstractSculpture(THREE) {
    const target = document.getElementById('projects');
    if (!target) return;

    const container = document.createElement('div');
    container.style.cssText = 'position: absolute; right: 2%; top: 5%; width: 250px; height: 250px; z-index: 0; opacity: 0.15; pointer-events: none;';
    target.style.position = 'relative';
    target.prepend(container);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(250, 250);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(2, 0.5, 150, 20);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x3b82f6,
        metalness: 0.2,
        roughness: 0.1,
        transmission: 0.95,
        thickness: 1.5,
        transparent: true,
    });
    const sculpture = new THREE.Mesh(geometry, material);
    scene.add(sculpture);

    const light = new THREE.PointLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    function animate() {
        requestAnimationFrame(animate);
        sculpture.rotation.x += 0.008;
        sculpture.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

/**
 * ORBITAL ELEMENTS (Scattered in Events)
 */
function initOrbitalElements(THREE) {
    const target = document.getElementById('gallery');
    if (!target) return;

    const container = document.createElement('div');
    container.style.cssText = 'position: absolute; inset: 0; z-index: -1; pointer-events: none; overflow: hidden;';
    target.style.position = 'relative';
    target.prepend(container);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, target.clientWidth / target.clientHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(target.clientWidth, target.clientHeight);
    container.appendChild(renderer.domElement);

    const ringGeo = new THREE.TorusGeometry(15, 0.03, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x1A1A00, transparent: true, opacity: 0.05 });

    const rings = [];
    for (let i = 0; i < 4; i++) {
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set((Math.random()-0.5)*150, (Math.random()-0.5)*100, (Math.random()-0.5)*50);
        ring.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
        scene.add(ring);

        const orbGeo = new THREE.SphereGeometry(0.8, 16, 16);
        const orbMat = new THREE.MeshPhysicalMaterial({ color: 0xFFFFCC, transparent: true, opacity: 0.2, roughness: 0.1, metalness: 0.5 });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        ring.add(orb);
        orb.position.x = 15;

        rings.push(ring);
    }

    function animate() {
        requestAnimationFrame(animate);
        rings.forEach((ring, i) => {
            ring.rotation.z += 0.002 + (i * 0.001);
            ring.rotation.x += 0.001;
        });
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = target.clientWidth / target.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(target.clientWidth, target.clientHeight);
    });
}
