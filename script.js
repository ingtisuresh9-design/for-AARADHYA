function unlock() 
{
    const pass = document.getElementById('passInput').value;
    const error = document.getElementById('error');
    
    if (pass === "CEO2026") 
        {
        const login = document.getElementById('loginScreen');
        login.style.opacity = '0';
        
        setTimeout(() => 
            {
            login.style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';
            window.scrollTo(0,0);
        }, 1000);
    } 
    
    else 
    {
        error.style.display = 'block';
        error.style.animation = 'shake 0.4s';
    }
}

function unlock() 
{
    const pass = document.getElementById('passInput').value;
    const song1 = document.getElementById('song1');
    const song2 = document.getElementById('song2');
    const trackLabel = document.getElementById('trackName');

    if (pass === "CEO2026") {
        // Unlock Screen Transition
        document.getElementById('loginScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';
            
            // --- MUSIC SEQUENCE START ---
            // Play Song 1
            song1.play();
            
            // After 10 seconds (10000ms), switch to Song 2
            setTimeout(() => {
                // Gentle Fade Out
                let fadeOut = setInterval(() => {
                    if (song1.volume > 0.1) {
                        song1.volume -= 0.1;
                    } else {
                        clearInterval(fadeOut);
                        song1.pause();
                        
                        // Start Song 2
                        trackLabel.innerText = "Playing a song...";
                        song2.play();
                    }
                }, 200);
            }, 20000); // Change 10000 to however many seconds you want for the first song
            
        }, 1000);
    } else {
        document.getElementById('error').style.display = 'block';
    }
}

// Particle Engine remains the same...
// Countdown Logic remains the same...

// --- PARTICLE ENGINE (Floating Hearts & Rose Petals) ---
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle 
{
    constructor() 
    {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() 
    {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 15 + 5;
        this.speed = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.type = Math.random() > 0.5 ? '❤️' : '🌸';
    }

    update() 
    {
        this.y -= this.speed;
        this.x += Math.sin(this.y / 30) * 0.5; // Gentle sway
        if (this.y < -20) this.reset();
    }

    draw() 
    {
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px serif`;
        ctx.fillText(this.type, this.x, this.y);
    }
}

function init() 
{
    for (let i = 0; i < 50; i++) particles.push(new Particle());
}

function animate() 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// --- COUNTDOWN LOGIC ---
const targetDate = new Date("March 15, 2026 00:00:00").getTime();

setInterval(() => 
{
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('secs').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}, 1000);

init();
animate();