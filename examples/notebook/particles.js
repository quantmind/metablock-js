import { timer } from "https://cdn.skypack.dev/d3-timer@3";

class Particles extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  params() {
    const n = +(this.getAttribute("num-particles") || 200);
    const aspectRatio = +(this.getAttribute("aspect-ratio") || 70);
    const width_ = +(this.getAttribute("width") || 0);
    const height_ = +(this.getAttribute("height") || 0);
    const radius = +(this.getAttribute("radius") || 2.5);
    const color = this.getAttribute("color");
    const minDistance = +(this.getAttribute("min-distance") || 40);
    const maxDistance = +(this.getAttribute("max-distance") || 60);
    const width =
      width_ || this.clientWidth || this.parentElement.clientWidth || 600;
    const height = height_ || (width * aspectRatio) / 100;
    return {
      width,
      height,
      n,
      radius,
      minDistance,
      maxDistance,
      color,
    };
  }

  connectedCallback() {
    const { width, height, n, radius, minDistance, maxDistance, color } =
      this.params();
    const minDistance2 = minDistance * minDistance;
    const maxDistance2 = maxDistance * maxDistance;
    //
    const context = notebook.context2d(width, height);
    const color_ = color || notebook.options.mode === "dark" ? "#fff" : "#000";
    context.strokeStyle = color_;
    context.fillStyle = color_;
    this.shadowRoot.append(context.canvas);

    const particles = new Array(n);
    for (let i = 0; i < n; ++i) {
      particles[i] = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
      };
    }

    this.timer = timer(() => {
      context.save();
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < n; ++i) {
        const p = particles[i];
        p.x += p.vx;
        if (p.x < -maxDistance) p.x += width + maxDistance * 2;
        else if (p.x > width + maxDistance) p.x -= width + maxDistance * 2;
        p.y += p.vy;
        if (p.y < -maxDistance) p.y += height + maxDistance * 2;
        else if (p.y > height + maxDistance) p.y -= height + maxDistance * 2;
        p.vx += 0.2 * (Math.random() - 0.5) - 0.01 * p.vx;
        p.vy += 0.2 * (Math.random() - 0.5) - 0.01 * p.vy;
        context.beginPath();
        context.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        context.fill();
      }

      for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
          const pi = particles[i];
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDistance2) {
            context.globalAlpha =
              d2 > minDistance2
                ? (maxDistance2 - d2) / (maxDistance2 - minDistance2)
                : 1;
            context.beginPath();
            context.moveTo(pi.x, pi.y);
            context.lineTo(pj.x, pj.y);
            context.stroke();
          }
        }
      }
      context.restore();
    });
  }

  disconnectedCallback() {
    if (this.timer) this.timer.stop();
  }
}

customElements.define("connected-particles", Particles);
