/**
 * Birthday Website — effect.js v3
 * 4-Scene Flow: Start → Celebrate → Story → Finale
 * Background image orbs + celebration sequence + sentence-by-sentence message
 */

/* ═══════════════════════════════════════════════════════════
   BIRTHDAY STORY — sentence by sentence
═══════════════════════════════════════════════════════════ */
const STORY = [
  "So… here we are",
  "your special day feels like a gentle sunrise",
  "Happy Birthday, <span class='name'>Ridhi</span> 🤍",
  "<span class='divider'>✦ ✦ ✦</span>",
  "I wasn’t sure how to start this",
  "because I wanted it to feel warm",
  "not just another birthday wish",
  "<span class='divider'>✦ ✦ ✦</span>",
  "it’s something soft and honest",
  "how every moment with you feels meaningful",
  "since we first started talking",
  "and somehow",
  "that first quiet conversation",
  "still feels just as clear",
  "<span class='divider'>✦ ✦ ✦</span>",
  "I still remember",
  "how easy it felt",
  "like sitting in the calmest place",
  "where nothing was forced",
  "and everything felt right",
  "<span class='divider'>✦ ✦ ✦</span>",
  "and over time…",
  "there were small things I noticed",
  "the kind of details I wanted to keep",
  "<span class='divider'>✦ ✦ ✦</span>",
  "your voice…",
  "it has a gentle rhythm to it",
  "like something you could listen to",
  "on a quiet evening",
  "and suddenly feel at peace",
  "it’s soft…",
  "comforting…",
  "and it stays with me longer than expected",
  "<span class='divider'>✦ ✦ ✦</span>",
  "and your eyes…",
  "they have their own way of speaking",
  "a softness mixed with a little spark",
  "something tender… yet unforgettable",
  "like they carry stories",
  "even when you don’t say a word",
  "<span class='divider'>✦ ✦ ✦</span>",
  "maybe that’s why",
  "talking to you never really feels like effort",
  "it just feels… natural",
  "<span class='divider'>✦ ✦ ✦</span>",
  "so today,",
  "I just want to wish you",
  "<span class='glow-word'>joy</span>",
  "<span class='glow-word'>peace</span>",
  "and moments that make you smile",
  "without even realizing it",
  "<span class='divider'>✦ ✦ ✦</span>",
  "I hope this year brings you",
  "beautiful memories",
  "warm surprises",
  "and everything your heart quietly wishes for",
  "<span class='divider'>✦ ✦ ✦</span>",
  "so keep smiling",
  "keep shining",
  "and keep being exactly who you are",
  "<span class='divider'>✦ ✦ ✦</span>",
  "once again…",
  "Happy Birthday, <span class='name'>Ridhi</span> 🤍",
];
/* ─── Helpers ──────────────────────────────────────────── */
const $id = (id) => document.getElementById(id);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* Video Configuration - Add your videos here */
const VIDEO_MOMENTS = {
  // Add more videos as needed: 10: "https://youtube.com/watch?v=xxx"
};

function wordCount(html) {
  return html
    .replace(/<[^>]*>/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
}

function holdDuration(html) {
  if (html.includes("divider")) return 1200;
  const wc = wordCount(html);
  if (wc <= 5) return 2200;
  if (wc <= 10) return 3000;
  return 3800;
}

/* ─── Particle Effects ─────────────────────────────────── */
function createParticle(type = "heart") {
  const container = $id("particles-container");
  if (!container) return;

  const particle = document.createElement("div");
  particle.className = `particle ${type}`;
  particle.textContent = type === "heart" ? "❤" : "✨";
  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = Math.random() * (window.innerHeight * 0.6) + "px";

  container.appendChild(particle);

  setTimeout(() => particle.remove(), type === "heart" ? 3000 : 2000);
}

function spawnParticles(count = 3, type = "heart") {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createParticle(type), i * 100);
  }
}

/* ─── Video Management ─────────────────────────────────── */
function showVideo(videoId) {
  const container = $id("video-container");
  const iframe = $id("story-video");
  if (!container || !iframe) return;

  // Extract YouTube video ID and create embed URL
  let embedUrl = "";
  if (videoId.includes("youtube.com") || videoId.includes("youtu.be")) {
    const match = videoId.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/,
    );
    if (match && match[1]) {
      embedUrl = `https://www.youtube.com/embed/${match[1]}`;
    }
  } else if (videoId.includes("shorts")) {
    const match = videoId.match(/shorts\/([^?&\/ ]+)/);
    if (match && match[1]) {
      embedUrl = `https://www.youtube.com/embed/${match[1]}`;
    }
  } else {
    embedUrl = videoId;
  }

  iframe.src = embedUrl;
  container.classList.remove("hidden");
}

function hideVideo() {
  const container = $id("video-container");
  if (container) {
    container.classList.add("hidden");
    const iframe = $id("story-video");
    if (iframe) iframe.src = "about:blank";
  }
}

/* ─── Scene Switcher ───────────────────────────────────── */
function showScene(id) {
  document.querySelectorAll(".scene").forEach((s) => {
    s.classList.add("hidden");
    s.style.opacity = "0";
    s.style.transform = "scale(0.97)";
    s.style.pointerEvents = "none";
  });
  const el = $id(id);
  if (!el) return;
  el.classList.remove("hidden");
  el.style.transition = "none";
  el.style.opacity = "0";
  el.style.transform = "scale(0.96)";
  el.style.pointerEvents = "";
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      el.style.transition =
        "opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1)";
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
    }),
  );
}

/* ─── Button Reveal Helper ─────────────────────────────── */
function revealBtn(id, delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const btn = $id(id);
      if (!btn) {
        resolve();
        return;
      }
      btn.style.display = "inline-flex";
      btn.style.opacity = "0";
      btn.style.transform = "translateY(10px) scale(0.93)";
      btn.style.transition =
        "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          btn.style.opacity = "1";
          btn.style.transform = "translateY(0) scale(1)";
        }),
      );
      resolve();
    }, delay);
  });
}

function hideBtn(id) {
  return new Promise((resolve) => {
    const btn = $id(id);
    if (!btn) {
      resolve();
      return;
    }
    btn.style.transition = "opacity 0.35s ease, transform 0.35s ease";
    btn.style.opacity = "0";
    btn.style.transform = "translateY(-8px) scale(0.93)";
    setTimeout(() => {
      btn.style.display = "none";
      resolve();
    }, 380);
  });
}

/* ═══════════════════════════════════════════════════════════
   FLOATING IMAGE ORBS
═══════════════════════════════════════════════════════════ */
function initLights() {
  const orbs = document.querySelectorAll(".light-orb");
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  orbs.forEach((orb, i) => {
    const size = parseInt(orb.dataset.size) || 200;
    const speed = parseFloat(orb.dataset.speed) || 0.7;
    const sx = Math.random() * (vw - size);
    const sy = Math.random() * (vh - size);
    orb.style.width = size + "px";
    orb.style.height = size + "px";
    orb.style.left = sx + "px";
    orb.style.top = sy + "px";
    setTimeout(
      () => {
        orb.style.transition = "opacity 2.5s ease";
        orb.style.opacity = (0.12 + Math.random() * 0.2).toFixed(2);
      },
      i * 280 + 200,
    );
    floatOrb(orb, sx, sy, size, speed, vw, vh);
  });

  window.addEventListener("resize", () => {
    const w = window.innerWidth,
      h = window.innerHeight;
    orbs.forEach((orb) => {
      const s = parseInt(orb.dataset.size) || 200;
      orb.style.left = Math.min(parseFloat(orb.style.left), w - s) + "px";
      orb.style.top = Math.min(parseFloat(orb.style.top), h - s) + "px";
    });
  });
}

function floatOrb(orb, x, y, size, speed, vw, vh) {
  const dur = (8000 + Math.random() * 10000) / speed;
  let tx = x + (Math.random() - 0.5) * 360;
  let ty = y + (Math.random() - 0.5) * 360;
  tx = Math.max(0, Math.min(vw - size, tx));
  ty = Math.max(0, Math.min(vh - size, ty));
  orb.style.transition = `left ${dur}ms ease-in-out, top ${dur}ms ease-in-out`;
  orb.style.left = tx + "px";
  orb.style.top = ty + "px";
  setTimeout(() => floatOrb(orb, tx, ty, size, speed, vw, vh), dur);
}

/* ═══════════════════════════════════════════════════════════
   CELEBRATION SCENE — BALLOON ENGINE
═══════════════════════════════════════════════════════════ */
const BALLOON_IDS = ["b1b", "b2b", "b3b", "b4b", "b5b", "b6b", "b7b", "b8b"];
const _balloonTimers = {};

function floatBalloon(id) {
  const el = $id(id);
  if (!el) return;
  const vw = window.innerWidth,
    vh = window.innerHeight;
  const tx = 40 + Math.random() * (vw - 160);
  const ty = 60 + Math.random() * (vh * 0.55);
  const dur = 2800 + Math.random() * 2000;
  el.style.transition = `left ${dur}ms ease-in-out, bottom ${dur}ms ease-in-out`;
  el.style.left = tx + "px";
  el.style.bottom = ty + "px";
  _balloonTimers[id] = setTimeout(() => floatBalloon(id), dur + 100);
}

function stopBalloons() {
  BALLOON_IDS.forEach((id) => clearTimeout(_balloonTimers[id]));
}

function launchBalloons() {
  BALLOON_IDS.forEach((id, i) => {
    const el = $id(id);
    if (!el) return;
    el.style.position = "fixed";
    el.style.left = 30 + Math.random() * (window.innerWidth - 120) + "px";
    el.style.bottom = "-120px";
    el.style.top = "auto";
    el.style.opacity = "1";
    el.style.transition = `bottom 1.4s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms`;
    setTimeout(() => {
      el.style.bottom = 80 + Math.random() * 250 + "px";
    }, 80);
  });
  // Drift classes
  ["b1b", "b3b", "b5b", "b7b"].forEach((id) =>
    $id(id)?.classList.add("balloons-drift-a"),
  );
  ["b2b", "b4b", "b6b", "b8b"].forEach((id) =>
    $id(id)?.classList.add("balloons-drift-b"),
  );
  // Start float loops
  BALLOON_IDS.forEach((id) => setTimeout(() => floatBalloon(id), 1600));
}

/**
 * Scatter balloons to screen edges for story scene background deco.
 * Stops float loops, repositions to 8 corner/edge spots,
 * applies .story-bg for reduced opacity + blur.
 *
 * FIX: Top-row balloons now start at 165px (below banner at ~58px + ~65px height + gap)
 *      Middle-row at vh/2, bottom-row at vh - 160/200px — all unchanged.
 */
function scatterBalloonsToEdges() {
  stopBalloons();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const bw = 70;

  // Banner bottom edge ≈ 58px (top) + ~65px (banner height) + 20px gap = 143px
  // Using 165px gives a comfortable clearance so no balloon hides behind the banner.
  const BANNER_CLEAR = 165;

  const edgePositions = [
    { left: 10, top: BANNER_CLEAR }, // top-left   — was 90, now 165
    { left: vw / 2 - bw / 2, top: BANNER_CLEAR - 15 }, // top-center — was 60, now 150
    { left: vw - bw - 10, top: BANNER_CLEAR }, // top-right  — was 90, now 165
    { left: 10, top: vh / 2 - 40 }, // mid-left   (unchanged)
    { left: vw - bw - 10, top: vh / 2 - 40 }, // mid-right  (unchanged)
    { left: 20, top: vh - 160 }, // bot-left   (unchanged)
    { left: vw / 2 - bw / 2, top: vh - 200 }, // bot-center (unchanged)
    { left: vw - bw - 20, top: vh - 160 }, // bot-right  (unchanged)
  ];

  BALLOON_IDS.forEach((id, i) => {
    const el = $id(id);
    if (!el) return;
    el.style.bottom = "auto";
    el.style.left = edgePositions[i].left + "px";
    el.style.top = edgePositions[i].top + "px";
    el.classList.add("story-bg");
    el.classList.remove("balloons-drift-a", "balloons-drift-b");
    // Gentle ambient sway
    el.style.animation = `driftA ${3 + (i % 3)}s ease-in-out infinite alternate`;
  });

  // Hide balloon letters during story
  document.querySelectorAll(".balloons span").forEach((sp) => {
    sp.style.opacity = "0";
  });
}

function arrangeBalloons() {
  stopBalloons();
  const vw = window.innerWidth / 2;
  const offsets = [-350, -250, -160, -60, 60, 160, 250, 350];
  BALLOON_IDS.forEach((id, i) => {
    const el = $id(id);
    if (!el) return;
    el.style.transition =
      "left 0.6s cubic-bezier(0.22,1,0.36,1), top 0.6s ease, bottom 0.6s ease";
    el.style.left = vw + offsets[i] - 35 + "px";
    el.style.top = "130px";
    el.style.bottom = "auto";
  });
  // Show balloon letters
  document.querySelectorAll(".balloons span").forEach((sp, i) => {
    setTimeout(() => {
      sp.style.opacity = "1";
    }, i * 120);
  });
}

/* ═══════════════════════════════════════════════════════════
   CONFETTI
═══════════════════════════════════════════════════════════ */
const confCanvas = $id("confetti-canvas");
const confCtx = confCanvas?.getContext("2d");
let confettiPieces = [],
  confettiRunning = false;

function resizeConf() {
  if (!confCanvas) return;
  confCanvas.width = window.innerWidth;
  confCanvas.height = window.innerHeight;
}
resizeConf();
window.addEventListener("resize", resizeConf);

const CONF_COLORS = [
  "#FFD700",
  "#FF6B9D",
  "#C084FC",
  "#74B9FF",
  "#55EFC4",
  "#FDCB6E",
  "#FFA502",
];

class ConfettiPiece {
  constructor() {
    this.x = Math.random() * confCanvas.width;
    this.y = -20 - Math.random() * confCanvas.height * 0.5;
    this.color = CONF_COLORS[Math.floor(Math.random() * CONF_COLORS.length)];
    this.w = 6 + Math.random() * 10;
    this.h = this.w * (0.4 + Math.random() * 0.4);
    this.vx = (Math.random() - 0.5) * 2.5;
    this.vy = 1.5 + Math.random() * 3;
    this.angle = Math.random() * 360;
    this.va = (Math.random() - 0.5) * 7;
    this.wobble = Math.random() * Math.PI * 2;
    this.alive = true;
  }
  update() {
    this.wobble += 0.05;
    this.x += this.vx + Math.sin(this.wobble) * 0.8;
    this.y += this.vy;
    this.angle += this.va;
    if (this.y > confCanvas.height + 20) this.alive = false;
  }
  draw() {
    confCtx.save();
    confCtx.fillStyle = this.color;
    confCtx.globalAlpha = 0.9;
    confCtx.translate(this.x, this.y);
    confCtx.rotate((this.angle * Math.PI) / 180);
    confCtx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    confCtx.restore();
  }
}

function startConfetti() {
  if (!confCtx) return;
  confCanvas.classList.add("active");
  confettiPieces = Array.from({ length: 200 }, () => new ConfettiPiece());
  animateConfetti();
  setTimeout(() => {
    confettiRunning = false;
  }, 7000);
}

function animateConfetti() {
  confCtx.clearRect(0, 0, confCanvas.width, confCanvas.height);
  confettiPieces = confettiPieces.filter((p) => p.alive);
  confettiPieces.forEach((p) => {
    p.update();
    p.draw();
  });
  if (confettiPieces.length > 0) requestAnimationFrame(animateConfetti);
  else confCanvas.classList.remove("active");
}

/* ═══════════════════════════════════════════════════════════
   STORY ENGINE (unchanged)
═══════════════════════════════════════════════════════════ */
let storyIndex = 0,
  storyPaused = false,
  storyTimeout = null,
  storyRunning = false;
const sentenceCard = $id("sentence-card");
const sentenceText = $id("sentence-text");
const progressFill = $id("progress-fill");

function updateProgress() {
  const pct = ((storyIndex + 1) / (STORY.length + 1)) * 100;
  if (progressFill) progressFill.style.width = Math.min(pct, 100) + "%";
}

async function showSentence(index) {
  if (index < 0 || index >= STORY.length) return;
  const html = STORY[index];

  // Show/hide video based on configuration
  if (VIDEO_MOMENTS[index]) {
    showVideo(VIDEO_MOMENTS[index]);
  } else {
    hideVideo();
  }

  // Emotion-responsive background logic
  const emotionalIndices = [34, 35, 36, 37, 38, 39]; // Eyes section (heartfelt)
  const joyfulIndices = [47, 48, 49]; // Wishes section (joyful)

  // Remove all emotion classes
  sentenceCard.classList.remove(
    "emotional-moment",
    "joyful-moment",
    "heartfelt-moment",
  );

  // Apply emotion class based on story index
  if (emotionalIndices.includes(index)) {
    sentenceCard.classList.add("emotional-moment");
    spawnParticles(3, "heart");
  } else if (joyfulIndices.includes(index)) {
    sentenceCard.classList.add("joyful-moment");
    spawnParticles(4, "sparkle");
  } else if (index >= 25 && index <= 33) {
    sentenceCard.classList.add("heartfelt-moment");
    spawnParticles(2, "heart");
  }

  if (sentenceCard.classList.contains("visible")) {
    sentenceCard.classList.remove("visible");
    sentenceCard.classList.add("exiting");
    await sleep(620);
  }
  sentenceText.innerHTML = html;
  sentenceCard.classList.remove("exiting", "visible");
  sentenceCard.classList.add("entering");
  void sentenceCard.offsetWidth;
  sentenceCard.classList.remove("entering");
  sentenceCard.classList.add("visible");
  updateProgress();
}

async function storyLoop() {
  storyRunning = true;
  while (storyIndex < STORY.length) {
    if (!storyRunning) break;
    await showSentence(storyIndex);
    const hold = holdDuration(STORY[storyIndex]);
    await new Promise((resolve) => {
      storyTimeout = setTimeout(resolve, hold + 620);
    });
    if (!storyRunning) break;
    while (storyPaused) {
      await sleep(150);
      if (!storyRunning) break;
    }
    if (!storyRunning) break;
    storyIndex++;
  }
  if (storyRunning && storyIndex >= STORY.length) {
    await sleep(500);
    showScene("scene-surprise");
  }
}

function pauseStory() {
  storyPaused = !storyPaused;
  const btn = $id("btn-pause");
  if (btn) btn.textContent = storyPaused ? "▶" : "⏸";
}

function skipForward() {
  clearTimeout(storyTimeout);
  storyPaused = false;
  storyIndex++;
  if (storyIndex >= STORY.length) {
    storyRunning = false;
    showScene("scene-surprise");
    startConfetti();
    return;
  }
  showSentence(storyIndex);
  storyTimeout = setTimeout(
    () => {
      storyIndex++;
      storyLoop();
    },
    holdDuration(STORY[storyIndex]) + 620,
  );
}

function skipBack() {
  clearTimeout(storyTimeout);
  storyPaused = false;
  storyIndex = Math.max(0, storyIndex - 1);
  showSentence(storyIndex);
  storyTimeout = setTimeout(
    () => {
      storyIndex++;
      storyLoop();
    },
    holdDuration(STORY[storyIndex]) + 620,
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN INIT
═══════════════════════════════════════════════════════════ */
window.addEventListener("load", () => {
  // Loading screen
  setTimeout(() => {
    const ls = $id("loading-screen");
    ls?.classList.add("fade-out");
    setTimeout(() => {
      if (ls) ls.style.display = "none";
    }, 950);
  }, 1800);

  // Start image orbs floating immediately
  initLights();

  /* ── SCENE 1: Start Button ── */
  $id("start-btn")?.addEventListener("click", () => {
    showScene("scene-celebrate");
    // Show first control button after short delay
    setTimeout(() => revealBtn("btn-lights"), 600);
  });

  /* ── SCENE 2: Celebration Sequence ── */

  // Step 1 — Lights On
  $id("btn-lights")?.addEventListener("click", async () => {
    $id("string-lights")?.classList.add("on");
    await hideBtn("btn-lights");
    await sleep(1000);
    revealBtn("btn-music");
  });

  // Step 2 — Music
  $id("btn-music")?.addEventListener("click", async () => {
    document
      .querySelector(".song")
      ?.play()
      .catch(() => {});
    await hideBtn("btn-music");
    await sleep(800);
    revealBtn("btn-banner");
  });

  // Step 3 — Banner
  $id("btn-banner")?.addEventListener("click", async () => {
    $id("site-banner")?.classList.add("show");
    await hideBtn("btn-banner");
    await sleep(1200);
    revealBtn("btn-balloons");
  });

  // Step 4 — Balloons Fly
  $id("btn-balloons")?.addEventListener("click", async () => {
    launchBalloons();
    await hideBtn("btn-balloons");
    await sleep(1600);
    revealBtn("btn-cake");
  });

  // Step 5 — Cake
  $id("btn-cake")?.addEventListener("click", async () => {
    $id("cake-wrap")?.classList.add("show");
    await hideBtn("btn-cake");
    await sleep(1000);
    revealBtn("btn-candles");
  });

  // Step 6 — Candles
  $id("btn-candles")?.addEventListener("click", async () => {
    const flames = document.querySelectorAll(".flame");
    flames.forEach((f, i) => {
      setTimeout(() => {
        f.style.display = "block";
        f.style.opacity = "0";
        f.style.transition = "opacity 0.4s ease";
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            f.style.opacity = "1";
          }),
        );
      }, i * 120);
    });
    await hideBtn("btn-candles");
    await sleep(800);
    revealBtn("btn-wish");
  });

  // Step 7 — Happy Birthday Wish: arrange balloons + show wish text
  $id("btn-wish")?.addEventListener("click", async () => {
    arrangeBalloons();
    // Hide cake, show wish text
    const cakeWrap = $id("cake-wrap");
    if (cakeWrap) {
      cakeWrap.style.transition = "opacity 0.5s ease";
      cakeWrap.style.opacity = "0";
      setTimeout(() => {
        cakeWrap.style.display = "none";
      }, 550);
    }
    const wishEl = $id("wish-display");
    if (wishEl) {
      wishEl.style.display = "block";
      wishEl.classList.remove("show");
      void wishEl.offsetWidth;
      await sleep(30);
      wishEl.classList.add("show");
    }
    await hideBtn("btn-wish");
    await sleep(1400);
    revealBtn("btn-message");
  });

  // Step 8 — A Message for You → transition to Story scene
  $id("btn-message")?.addEventListener("click", async () => {
    await hideBtn("btn-message");

    // Scatter balloons to screen edges (background deco during story)
    scatterBalloonsToEdges();

    // Dim banner instead of hiding
    const banner = $id("site-banner");
    if (banner) {
      banner.style.transition = "opacity 0.8s ease";
      banner.style.opacity = "0";
    }

    // Dim string-lights subtly (story-bg handles opacity)
    const lightsEl = $id("string-lights");
    if (lightsEl) lightsEl.classList.add("story-bg");

    // Hide wish display cleanly
    const wishEl = $id("wish-display");
    if (wishEl) {
      wishEl.style.transition = "opacity 0.6s ease";
      wishEl.style.opacity = "0";
      setTimeout(() => {
        wishEl.style.display = "none";
      }, 650);
    }

    await sleep(900);

    // Reset and show story scene
    storyIndex = 0;
    storyPaused = false;
    storyRunning = false;
    clearTimeout(storyTimeout);
    if (progressFill) progressFill.style.width = "0%";
    showScene("scene-story");
    setTimeout(() => {
      storyRunning = true;
      storyLoop();
    }, 700);
  });

  /* ── SCENE 3: Story Controls ── */
  $id("btn-pause")?.addEventListener("click", pauseStory);
  $id("btn-next")?.addEventListener("click", skipForward);
  $id("btn-prev")?.addEventListener("click", skipBack);

  /* ── SCENE 4: Replay ── */
  $id("replay-btn")?.addEventListener("click", () => {
    storyRunning = false;
    clearTimeout(storyTimeout);
    storyIndex = 0;
    storyPaused = false;
    if (progressFill) progressFill.style.width = "0%";
    showScene("scene-story");
    setTimeout(() => {
      storyRunning = true;
      storyLoop();
    }, 800);
  });

  /* ── Keyboard shortcuts ── */
  document.addEventListener("keydown", (e) => {
    const activeScene = document.querySelector(".scene:not(.hidden)");
    if (!activeScene || activeScene.id !== "scene-story") return;
    if (e.code === "Space" || e.code === "KeyP") {
      e.preventDefault();
      pauseStory();
    }
    if (e.code === "ArrowRight") skipForward();
    if (e.code === "ArrowLeft") skipBack();
  });

  /* ── Touch swipe (story scene only) ── */
  let touchStartX = 0;
  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );
  document.addEventListener(
    "touchend",
    (e) => {
      const scene = document.querySelector(".scene:not(.hidden)");
      if (!scene || scene.id !== "scene-story") return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 60) dx < 0 ? skipForward() : skipBack();
    },
    { passive: true },
  );

  /* ═══════════════════════════════════════════════════════════
     SURPRISE GIFT & STATS — Gift Reveal Logic
  ═══════════════════════════════════════════════════════════ */
  const giftBox = $id("gift-box");
  const statsDashboard = $id("stats-dashboard");
  const cardFlip = $id("card-flip");
  const finishBtn = $id("finish-btn");
  const replayBtn = $id("replay-btn");

  // Gift box click to reveal stats
  giftBox?.addEventListener("click", () => {
    giftBox.style.pointerEvents = "none";
    giftBox.style.transform = "scale(0)";
    giftBox.style.opacity = "0";
    statsDashboard?.classList.remove("hidden");
    animateStats();
  });

  // Animate stats numbers
  function animateStats() {
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target"));
      if (isNaN(target)) return; // Skip infinite symbol
      let current = 0;
      const increment = Math.ceil(target / 50);
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current;
      }, 20);
    });
  }

  // Card flip toggle
  cardFlip?.addEventListener("click", () => {
    cardFlip.classList.toggle("flipped");
  });

  // Finish button - go back to start
  finishBtn?.addEventListener("click", () => {
    location.reload();
  });

  // Override replay button in finale to show story again
  const oldReplayBtn = $id("replay-btn");
  oldReplayBtn?.addEventListener("click", () => {
    storyIndex = 0;
    storyPaused = false;
    storyRunning = false;
    clearTimeout(storyTimeout);
    if (progressFill) progressFill.style.width = "0%";
    showScene("scene-story");
    setTimeout(() => {
      storyRunning = true;
      storyLoop();
    }, 100);
  });

  // Replay button in surprise also resets
  replayBtn?.addEventListener("click", () => {
    storyIndex = 0;
    storyPaused = false;
    storyRunning = false;
    clearTimeout(storyTimeout);
    if (progressFill) progressFill.style.width = "0%";
    showScene("scene-story");
    setTimeout(() => {
      storyRunning = true;
      storyLoop();
    }, 100);
  });
});
