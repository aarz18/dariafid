document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SCROLL ANIMATION (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));


    // 2. AUDIO PLAYBACK ON START
    const btnStart = document.getElementById('btn-start');
    const bgMusic = document.getElementById('bg-music');

    if (btnStart) {
        btnStart.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.volume = 0.5; // Soft volume
                bgMusic.play().catch(error => console.log("Audio play failed:", error));
            }
            
            const memory1 = document.getElementById('memory-1');
            if (memory1) memory1.scrollIntoView({ behavior: 'smooth' });
        });
    }


    // 3. CELEBRATION BUTTON (CONFETTI, FINAL PHOTO & UI CHANGE)
    const btnSparkle = document.getElementById('btn-sparkle');
    const sparkleBtnWrapper = document.getElementById('sparkle-btn-wrapper');
    const finalWish = document.getElementById('final-wish');
    const celebrationSection = document.getElementById('celebration');

    if (btnSparkle) {
        btnSparkle.addEventListener('click', () => {
            celebrationSection.classList.add('party-mode');
            
            sparkleBtnWrapper.style.display = 'none';
            
            setTimeout(() => {
                finalWish.classList.add('show');
            }, 50);

            createConfetti();
        });
    }

    // Fungsi Confetti
    function createConfetti() {
        const container = document.getElementById('confetti-container');
        if (!container) return;

        const colors = ['#FFD1DC', '#FF9B9B', '#FFD8A9', '#E2C2FF', '#B5EAEA', '#FFF89A'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const size = Math.random() * 10 + 5; 
            const delay = Math.random() * 3;
            const duration = Math.random() * 2 + 3; 

            confetti.style.position = 'absolute';
            confetti.style.top = '-20px';
            confetti.style.left = `${left}vw`;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'; 
            confetti.style.zIndex = 100;
            confetti.style.animation = `fall ${duration}s linear ${delay}s forwards`;
            
            container.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
    }


    // 4. FLOATING FLOWER PARTICLES
    function createFlowers() {
        const container = document.getElementById('flower-particles');
        
        // Cek apakah div #flower-particles ada di HTML, kalau tidak ada jangan paksa jalan agar tidak error
        if (!container) {
            console.log("Container bunga tidak ditemukan, melewati efek bunga.");
            return; 
        }

        const flowers = ['🌸', '🌼', '🌺', '✨', '🌷'];
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('flower-particle');
            
            particle.innerText = flowers[Math.floor(Math.random() * flowers.length)];
            
            const left = Math.random() * 100;
            const size = Math.random() * 1.5 + 1;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 10;

            particle.style.left = `${left}vw`;
            particle.style.fontSize = `${size}rem`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;

            container.appendChild(particle);
        }
    }

    // Panggil efek bunga
    createFlowers();
}); 