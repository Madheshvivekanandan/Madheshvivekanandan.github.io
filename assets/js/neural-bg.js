/* NEURAL PARTICLE CANVAS BACKGROUND SCRIPT */
class NeuralNetworkBackground {
  constructor() {
    this.canvas = document.getElementById("neural-canvas");
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.connectionDistance = 120;
    this.mouseDistance = 180;
    this.mouse = { x: null, y: null, active: false };
    
    // Dynamic settings based on device performance
    this.isMobile = window.innerWidth <= 768;
    this.maxParticles = this.isMobile ? 45 : 110;
    
    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resizeCanvas();
    this.particles = [];

    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height));
    }
  }

  resizeCanvas() {
    const scale = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * scale;
    this.canvas.height = window.innerHeight * scale;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.scale(scale, scale);
    
    this.isMobile = window.innerWidth <= 768;
    this.maxParticles = this.isMobile ? 45 : 110;
    this.connectionDistance = this.isMobile ? 90 : 120;
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      // Re-initialize particles to spread them nicely in new size
      this.particles = [];
      for (let i = 0; i < this.maxParticles; i++) {
        this.particles.push(new Particle(this.canvas.width / (window.devicePixelRatio || 1), this.canvas.height / (window.devicePixelRatio || 1)));
      }
    });

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    });

    window.addEventListener("mouseleave", () => {
      this.mouse.active = false;
      this.mouse.x = null;
      this.mouse.y = null;
    });

    window.addEventListener("touchstart", (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
        this.mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener("touchend", () => {
      this.mouse.active = false;
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    const width = this.canvas.width / (window.devicePixelRatio || 1);
    const height = this.canvas.height / (window.devicePixelRatio || 1);
    
    this.ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    this.particles.forEach((particle) => {
      particle.update(width, height, this.mouse, this.mouseDistance);
      particle.draw(this.ctx);
    });

    // Draw connections
    this.drawConnections();

    requestAnimationFrame(() => this.animate());
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          // Fade alpha as distance gets closer to connection limit
          const alpha = (1 - distance / this.connectionDistance) * 0.16;
          
          // Interpolate connecting lines colors based on proximity to cyan/violet theme
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }
  }
}

class Particle {
  constructor(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    
    // Slow, soothing drift speeds
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    
    this.radius = Math.random() * 2 + 1;
    this.baseRadius = this.radius;
    
    // Random cyan/violet/amber color nodes
    const colors = [
      "rgba(0, 240, 255, 0.4)", // Cyan
      "rgba(139, 92, 246, 0.35)", // Violet
      "rgba(255, 174, 66, 0.3)"   // Amber
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(width, height, mouse, mouseDistance) {
    // Standard bounce boundaries
    if (this.x < 0 || this.x > width) this.vx = -this.vx;
    if (this.y < 0 || this.y > height) this.vy = -this.vy;

    // Movement
    this.x += this.vx;
    this.y += this.vy;

    // Mouse interactive gravitational pull
    if (mouse.active && mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseDistance) {
        const force = (mouseDistance - distance) / mouseDistance;
        // Move slightly towards mouse
        this.x += (dx / distance) * force * 0.7;
        this.y += (dy / distance) * force * 0.7;
        // Expand slightly on proximity
        this.radius = this.baseRadius + force * 1.5;
      } else {
        // Shrink back
        if (this.radius > this.baseRadius) {
          this.radius -= 0.05;
        }
      }
    } else {
      // Shrink back
      if (this.radius > this.baseRadius) {
        this.radius -= 0.05;
      }
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    // Subtle glow on nodes
    if (this.radius > 2) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = this.color.replace("0.4", "0.08").replace("0.35", "0.07").replace("0.3", "0.06");
      ctx.fill();
    }
  }
}

// Instantiate canvas background
document.addEventListener("DOMContentLoaded", () => {
  // Can boot immediately or wait for ready signal
  new NeuralNetworkBackground();
});
