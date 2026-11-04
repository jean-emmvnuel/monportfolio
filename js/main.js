/* =========================================================
   Jean Emmanuel Ahossi — Portfolio · main.js
   GSAP + ScrollTrigger + Lenis
   ========================================================= */
(() => {
  "use strict";

  gsap.registerPlugin(ScrollTrigger);

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";

  /* ---------------- TECH ICONS ----------------
     One icon per technology, wherever its name appears (tags, marquee). */
  const SV = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="#C83E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const GLYPH = {
    shield: SV('<path d="M12 2 4 5v6c0 5 3.4 9.5 8 11 4.6-1.5 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/>'),
    key: SV('<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.8-9.8M17 6l3 3"/>'),
    lock: SV('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
    bug: SV('<rect x="7" y="7" width="10" height="13" rx="5"/><path d="M12 7V4M3 13h4M17 13h4M4 19l3-2M20 19l-3-2"/>'),
    pipe: SV('<circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M7.5 12h4l5-6M11.5 12l5 6"/>'),
    cloud: SV('<path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.8A6 6 0 0 0 4.5 12 3.5 3.5 0 0 0 6 19h11.5Z"/>'),
    api: SV('<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>'),
    jwt: SV('<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/>'),
    chip: SV('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>'),
    bolt: SV('<path d="M13 2 4 14h7l-1 8 9-12h-7Z"/>'),
  };
  const TECH = {
    "node.js": "nodejs/nodejs-original.svg", nestjs: "nestjs/nestjs-original.svg", express: "express/express-original.svg",
    typescript: "typescript/typescript-original.svg", javascript: "javascript/javascript-original.svg",
    prisma: "prisma/prisma-original.svg", postgresql: "postgresql/postgresql-original.svg", mysql: "mysql/mysql-original.svg",
    supabase: "supabase/supabase-original.svg", "react js": "react/react-original.svg", react: "react/react-original.svg",
    arduino: "arduino/arduino-original.svg", docker: "docker/docker-original.svg", compose: "docker/docker-original.svg",
    linux: "linux/linux-original.svg", git: "git/git-original.svg", "github actions": "githubactions/githubactions-original.svg",
    iac: "terraform/terraform-original.svg", redis: "redis/redis-original.svg", netlify: "netlify/netlify-original.svg", python: "python/python-original.svg",
    java: "java/java-original.svg",
    jwt: "@jwt", "refresh tokens": "@key", rbac: "@lock", "rest api": "@api", "ci/cd": "@pipe", cloud: "@cloud",
    sast: "@shield", dast: "@shield", trivy: "@shield", secrets: "@key", owasp: "@bug", "sécurité": "@shield",
    rfid: "@chip", "temps réel": "@bolt", perf: "@bolt", devsecops: "@shield",
  };
  function techIcon(name) {
    const v = TECH[name.trim().toLowerCase()];
    if (!v) return "";
    return `<span class="t-ico" aria-hidden="true">${v[0] === "@" ? GLYPH[v.slice(1)] : `<img src="${DEV}${v}" alt="" width="16" height="16" loading="lazy"/>`}</span>`;
  }
  function decorateTech(els) {
    els.forEach((el) => { if (!el.querySelector(".t-ico")) el.insertAdjacentHTML("afterbegin", techIcon(el.textContent)); });
  }
  decorateTech($$(".tags li, .marquee__track span"));

  document.body.classList.add("is-loading");
  $("#year").textContent = new Date().getFullYear();

  /* ---------------- THEME ---------------- */
  const root = document.documentElement;
  const storedTheme = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  if (storedTheme) root.dataset.theme = storedTheme;
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches) root.dataset.theme = "dark";

  $("#themeToggle").addEventListener("click", (e) => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch {}
    };
    if (!document.startViewTransition || reduceMotion) return apply();
    const x = e.clientX, y = e.clientY;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(.22,1,.36,1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  });

  /* ---------------- LENIS SMOOTH SCROLL ---------------- */
  let lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    window.lenis = lenis;
  }
  const scrollTo = (target) => {
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    else $(target)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };
  $$('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2 || !$(id)) return;
      e.preventDefault();
      closeMenu();
      scrollTo(id);
    })
  );

  /* ---------------- TEXT SPLITTING ---------------- */
  function splitChars(el) {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(" "));
            const w = document.createElement("span");
            w.className = "word";
            w.style.cssText = "overflow:hidden;vertical-align:top;padding:0 .06em .12em 0;margin-bottom:-.12em";
            [...part].forEach((ch) => {
              const c = document.createElement("span");
              c.className = "char";
              c.textContent = ch;
              w.appendChild(c);
            });
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    return $$(".char", el);
  }
  function splitWords(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(" ");
    return $$(".w", el);
  }
  const splitMap = new Map();
  $$("[data-split]").forEach((el) => splitMap.set(el, splitChars(el)));

  /* ---------------- PRELOADER ---------------- */
  const bootLines = [
    '<span class="p">$</span> docker compose up portfolio',
    '<b>✓</b> pulling image jean-emmanuel/backend:latest',
    '<b>✓</b> starting service api (nestjs) …',
    '<b>✓</b> connecting postgres://db:5432 …',
    '<b>✓</b> running security scan · 0 vulnerabilities',
    '<span class="p">→</span> ready · Jean Emmanuel Ahossi',
  ];
  function runLoader() {
    return new Promise((resolve) => {
      const lines = $("#loaderLines");
      const pct = { v: 0 };
      if (reduceMotion) {
        $("#loader").remove();
        return resolve();
      }
      const tl = gsap.timeline({ onComplete: resolve });
      bootLines.forEach((html, i) => {
        tl.call(() => {
          const d = document.createElement("div");
          d.className = "ln";
          d.innerHTML = html;
          lines.appendChild(d);
          gsap.from(d, { opacity: 0, x: -10, duration: 0.3 });
        }, null, i * 0.28);
      });
      tl.to(pct, {
        v: 100, duration: bootLines.length * 0.28 + 0.2, ease: "power2.inOut",
        onUpdate: () => {
          $("#loaderPct").textContent = Math.round(pct.v);
          $("#loaderBar").style.width = pct.v + "%";
        },
      }, 0);
      tl.to(".loader__term", { yPercent: -20, opacity: 0, duration: 0.5, ease: "power3.in" }, "+=.15")
        .to(".loader__curtain", { scaleY: 1, duration: 0.6, ease: "expo.inOut" }, "-=.2")
        .set(".loader", { backgroundColor: "transparent" })
        .set(".loader__curtain", { transformOrigin: "top" })
        .to(".loader__curtain", { scaleY: 0, duration: 0.8, ease: "expo.inOut" })
        .call(() => $("#loader").remove(), null, "-=0.35");
    });
  }

  /* ---------------- HERO INTRO ---------------- */
  function heroIntro() {
    document.body.classList.remove("is-loading");
    lenis?.start();
    const chars = splitMap.get($(".hero__title"));
    if (reduceMotion) return;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(chars, { yPercent: 115, rotate: 6, duration: 1.2, stagger: 0.016 })
      .from(".hero .reveal-up", { y: 20, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.45)
      .from(".portrait__frame", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" }, 0.05)
      .from(".portrait__frame img", { scale: 1.25, duration: 2, transformOrigin: "50% 100%" }, 0.2)
      .from(".portrait", { "--arch-o": 0, "--arch-shift": "28px", duration: 1.2 }, 0.9)
      .from(".portrait__cap > *", { y: 14, opacity: 0, duration: 0.8, stagger: 0.08 }, 1.05)
      .from(".nav", { y: -100, opacity: 0, duration: 1, clearProps: "transform,opacity" }, 0.3)
      .from(".wa-float", { scale: 0, duration: 0.8, ease: "back.out(2)", clearProps: "transform" }, 1.3);
  }

  /* ---------------- HERO PORTRAIT (mouse + scroll) ---------------- */
  if (finePointer && !reduceMotion) {
    const img = $(".portrait__frame img");
    const ix = gsap.quickTo(img, "x", { duration: 1.2, ease: "power3" });
    const ox = gsap.quickTo(".portrait", "--arch-x", { duration: 1.2, ease: "power3" });
    $("#hero").addEventListener("mousemove", (e) => {
      const nx = e.clientX / innerWidth - 0.5;
      ix(nx * -14);
      ox(nx * 10);
    });
  }
  if (!reduceMotion) {
    gsap.to(".hero__content", { yPercent: -14, opacity: 0.25, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".portrait", { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }

  /* ---------------- NETWORK CANVAS (infra nodes) ---------------- */
  (function network() {
    const cv = $("#netCanvas");
    if (!cv || reduceMotion) return;
    const ctx = cv.getContext("2d");
    let w, h, dpr, nodes = [], mouse = { x: -9999, y: -9999 }, running = true;
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.offsetWidth; h = cv.offsetHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(70, (w * h) / 18000));
      nodes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.8 + 1, hot: Math.random() < 0.12 }));
    };
    resize();
    addEventListener("resize", resize);
    $("#hero").addEventListener("mousemove", (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    $("#hero").addEventListener("mouseleave", () => (mouse.x = mouse.y = -9999));
    ScrollTrigger.create({ trigger: ".hero", start: "top bottom", end: "bottom top", onToggle: (s) => (running = s.isActive) });
    const draw = () => {
      if (!running) return;
      const dark = root.dataset.theme === "dark";
      const lineRGB = dark ? "244,239,230" : "20,18,16";
      ctx.clearRect(0, 0, w, h);
      for (const p of nodes) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = mouse.x - p.x, dy = mouse.y - p.y, dm = Math.hypot(dx, dy);
        if (dm < 160) { p.x += dx * 0.006; p.y += dy * 0.006; }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(${lineRGB},${(1 - d / 130) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const p = nodes[i], dm = Math.hypot(mouse.x - p.x, mouse.y - p.y);
        if (dm < 160) {
          ctx.strokeStyle = `rgba(255,91,31,${(1 - dm / 160) * 0.5})`;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      for (const p of nodes) {
        ctx.fillStyle = p.hot ? "rgba(255,91,31,.9)" : `rgba(${lineRGB},.35)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.hot ? p.r + 1 : p.r, 0, Math.PI * 2); ctx.fill();
      }
    };
    gsap.ticker.add(draw);
  })();

  /* ---------------- CURSOR ---------------- */
  if (finePointer) {
    document.body.classList.add("has-cursor");
    const cur = $(".cursor"), label = $(".cursor__label");
    const dx = gsap.quickTo(".cursor__dot", "x", { duration: 0.1 }), dy = gsap.quickTo(".cursor__dot", "y", { duration: 0.1 });
    const rx = gsap.quickTo(".cursor__ring", "x", { duration: 0.45, ease: "power3" }), ry = gsap.quickTo(".cursor__ring", "y", { duration: 0.45, ease: "power3" });
    addEventListener("mousemove", (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });
    document.addEventListener("mouseover", (e) => {
      const t = e.target.closest("a, button, [data-cursor]");
      cur.classList.remove("is-hover", "is-label");
      if (!t) return;
      if (t.dataset.cursorLabel) { label.textContent = t.dataset.cursorLabel; cur.classList.add("is-label"); }
      else cur.classList.add("is-hover");
    });
    document.addEventListener("mouseleave", () => gsap.to(cur, { opacity: 0 }));
    document.addEventListener("mouseenter", () => gsap.to(cur, { opacity: 1 }));
  }

  /* ---------------- MAGNETIC ---------------- */
  if (finePointer && !reduceMotion) {
    $$(".magnetic").forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1,0.4)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1,0.4)" });
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const s = el.classList.contains("big-btn") ? 0.45 : 0.3;
        xTo((e.clientX - r.left - r.width / 2) * s);
        yTo((e.clientY - r.top - r.height / 2) * s);
      });
      el.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
    });
  }

  /* ---------------- SCRAMBLE (nav) ---------------- */
  const glyphs = "!<>-_\\/[]{}=+*^?#01";
  $$("[data-scramble]").forEach((el) => {
    const original = el.textContent;
    let raf;
    el.addEventListener("mouseenter", () => {
      let frame = 0;
      cancelAnimationFrame(raf);
      const tick = () => {
        el.textContent = [...original].map((c, i) => (i < frame / 2 ? c : c === " " ? " " : glyphs[(Math.random() * glyphs.length) | 0])).join("");
        frame++;
        if (frame / 2 <= original.length) raf = requestAnimationFrame(tick);
        else el.textContent = original;
      };
      tick();
    });
  });

  /* ---------------- NAV / PROGRESS ---------------- */
  const nav = $("#nav");
  ScrollTrigger.create({
    start: 0, end: "max",
    onUpdate: (s) => {
      gsap.set("#progressBar", { scaleX: s.progress });
      if (s.scroll() < 120) nav.classList.remove("is-hidden");
      else nav.classList.toggle("is-hidden", s.direction === 1 && !menuOpen);
    },
  });
  $$(".nav__links a").forEach((a) => {
    const sec = $(a.getAttribute("href"));
    if (!sec) return;
    ScrollTrigger.create({ trigger: sec, start: "top 50%", end: "bottom 50%", onToggle: (s) => a.classList.toggle("active", s.isActive) });
  });

  /* ---------------- MOBILE MENU ---------------- */
  let menuOpen = false;
  const menu = $("#menu"), burger = $("#burger");
  const menuTl = gsap.timeline({ paused: true })
    .set(menu, { visibility: "visible" })
    .to(menu, { clipPath: "circle(150% at 92% 4%)", duration: 0.9, ease: "expo.inOut" })
    .from(".menu__links a", { y: 60, opacity: 0, stagger: 0.06, duration: 0.7, ease: "expo.out" }, "-=.4")
    .from(".menu__foot", { opacity: 0, duration: 0.4 }, "-=.4");
  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    burger.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    menuTl.timeScale(1.6).reverse();
    lenis?.start();
  }
  burger.addEventListener("click", () => {
    if (menuOpen) return closeMenu();
    menuOpen = true;
    nav.classList.remove("is-hidden");
    burger.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
    menuTl.timeScale(1).play();
    lenis?.stop();
  });

  /* ---------------- MARQUEE (velocity-driven) ---------------- */
  (function marquee() {
    const track = $("#marquee");
    track.innerHTML += track.innerHTML;
    if (reduceMotion) return;
    const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
    let dir = 1;
    ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (s) => {
        if (s.direction !== dir) { dir = s.direction; }
        const v = gsap.utils.clamp(-6, 6, s.getVelocity() / 300);
        gsap.to(loop, { timeScale: (dir === 1 ? 1 : -1) * (1 + Math.abs(v)), duration: 0.3, overwrite: true, onComplete: () => gsap.to(loop, { timeScale: dir, duration: 1.2 }) });
      },
    });
  })();

  /* ---------------- GENERIC REVEALS ---------------- */
  function setupReveals() {
    if (reduceMotion) return;
    // headings split into chars
    splitMap.forEach((chars, el) => {
      if (el.classList.contains("hero__title")) return;
      gsap.from(chars, {
        yPercent: 115, rotate: 5, duration: 1.1, ease: "expo.out", stagger: 0.015,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });
    // about points: a short, quiet settle (small offset, no theatrics)
    gsap.from(".point", {
      y: 16, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power2.out",
      scrollTrigger: { trigger: ".about__points", start: "top 88%" },
    });
  }

  /* ---------------- ABOUT — word scrub ---------------- */
  (function about() {
    const words = splitWords($("#aboutText"));
    if (reduceMotion) return;
    gsap.to(words, {
      opacity: 1, stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: "#aboutText", start: "top 80%", end: "bottom 45%", scrub: 0.6 },
    });
  })();

  /* ---------------- PIPELINE — horizontal scroll ---------------- */
  (function pipeline() {
    const panelsEl = $("#pipePanels");
    const stages = $$(".stage");
    const setStages = (p) => stages.forEach((s, i) => s.classList.toggle("on", p >= i / (stages.length - 1) - 0.02));
    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      if (reduceMotion) { setStages(1); gsap.set("#pipeFill", { scaleX: 1 }); return; }
      const dist = () => panelsEl.scrollWidth - innerWidth;
      const tween = gsap.to(panelsEl, {
        x: () => -dist(), ease: "none",
        scrollTrigger: {
          trigger: ".pipeline", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (s) => { gsap.set("#pipeFill", { scaleX: s.progress }); setStages(s.progress); },
        },
      });
      $$(".panel", panelsEl).forEach((p) => {
        gsap.from(p.querySelector(".panel__code"), { y: 80, opacity: 0, rotate: 4, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 95%", end: "left 45%", scrub: true } });
        gsap.from(p.querySelector("h3"), { xPercent: 20, opacity: 0, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 100%", end: "left 55%", scrub: true } });
      });
    });

    mm.add("(max-width: 900px)", () => {
      setStages(1);
      if (reduceMotion) return;
      $$(".panel", panelsEl).forEach((p) =>
        gsap.from(p, { y: 70, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 88%" } })
      );
    });
  })();

  /* ---------------- SKILLS — tabs ---------------- */
  const ico = {
    shield: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 9.5 8 11 4.6-1.5 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
    key: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.8-9.8M17 6l3 3M14.5 8.5l2 2"/></svg>',
    bug: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="13" rx="5"/><path d="M12 7V4M9 4l1 3M15 4l-1 3M3 13h4M17 13h4M4 19l3-2M20 19l-3-2M4 8l3 2M20 8l-3 2"/></svg>',
    lock: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    pipe: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M7.5 12h4l5-6M11.5 12l5 6"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.8A6 6 0 0 0 4.5 12 3.5 3.5 0 0 0 6 19h11.5Z"/></svg>',
    api: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
    jwt: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/></svg>',
  };
  const img = (p) => `<img src="${DEV}${p}" alt="" width="28" height="28" loading="lazy"/>`;
  const SKILLS = {
    backend: [
      { n: "Node.js", d: "Runtime principal", l: 85, i: img("nodejs/nodejs-original.svg"), lv: "avancé" },
      { n: "NestJS", d: "API structurées, guards, DI", l: 82, i: img("nestjs/nestjs-original.svg"), lv: "avancé" },
      { n: "Express.js", d: "API REST légères", l: 80, i: img("express/express-original.svg"), lv: "avancé" },
      { n: "TypeScript", d: "Typage strict partout", l: 78, i: img("typescript/typescript-original.svg"), lv: "solide" },
      { n: "Prisma ORM", d: "Schémas & migrations", l: 76, i: img("prisma/prisma-original.svg"), lv: "solide" },
      { n: "PostgreSQL", d: "Modélisation relationnelle", l: 75, i: img("postgresql/postgresql-original.svg"), lv: "solide" },
      { n: "MySQL", d: "Bases relationnelles", l: 68, i: img("mysql/mysql-original.svg"), lv: "solide" },
      { n: "Supabase", d: "Postgres hébergé, auth, stockage", l: 66, i: img("supabase/supabase-original.svg"), lv: "solide" },
      { n: "REST API", d: "Design, versioning, docs", l: 85, i: ico.api, lv: "avancé" },
      { n: "Postman", d: "Tests & collections d'API", l: 80, i: img("postman/postman-original.svg"), lv: "avancé" },
      { n: "Git & GitHub", d: "Workflow, branches, PR", l: 82, i: img("git/git-original.svg"), lv: "avancé" },
    ],
    lang: [
      { n: "JavaScript", d: "Langage de tous les jours", l: 82, i: img("javascript/javascript-original.svg"), lv: "avancé" },
      { n: "HTML & CSS", d: "Intégration, responsive", l: 75, i: img("css3/css3-original.svg"), lv: "solide" },
      { n: "React JS", d: "Interfaces web", l: 70, i: img("react/react-original.svg"), lv: "solide" },
      { n: "React Native", d: "Applications mobiles", l: 65, i: img("react/react-original.svg"), lv: "solide" },
      { n: "Python", d: "Scripts, automatisation", l: 40, i: img("python/python-original.svg"), lv: "bases" },
      { n: "Java", d: "Programmation orientée objet", l: 40, i: img("java/java-original.svg"), lv: "bases" },
      { n: "Arduino", d: "IoT, projet de pointage RFID", l: 55, i: img("arduino/arduino-original.svg"), lv: "pratiqué" },
    ],
    devops: [
      { n: "Docker", d: "Premières images, Compose", l: 40, i: img("docker/docker-original.svg"), lv: "en apprentissage", learn: true },
      { n: "Linux", d: "Shell, commandes de base", l: 40, i: img("linux/linux-original.svg"), lv: "bases", learn: true },
      { n: "CI/CD", d: "GitHub Actions, pipelines", l: 20, i: ico.pipe, lv: "en apprentissage", learn: true },
      { n: "Cloud", d: "Au programme du Master ESATIC", l: 10, i: ico.cloud, lv: "à venir", learn: true },
      { n: "Nginx", d: "Reverse proxy", l: 10, i: img("nginx/nginx-original.svg"), lv: "à venir", learn: true },
      { n: "Infrastructure as Code", d: "Terraform, Ansible", l: 5, i: ico.pipe, lv: "à venir", learn: true },
    ],
    sec: [
      { n: "JWT", d: "Access / refresh tokens", l: 82, i: ico.jwt, lv: "acquis" },
      { n: "RBAC", d: "Contrôle d'accès par rôles", l: 80, i: ico.lock, lv: "acquis" },
      { n: "Sécurité des API", d: "Validation, rate-limit, CORS", l: 70, i: ico.shield, lv: "acquis" },
      { n: "Traçabilité", d: "Logs & audit des opérations", l: 65, i: ico.key, lv: "acquis" },
      { n: "OWASP Top 10", d: "Vulnérabilités web", l: 30, i: ico.bug, lv: "en apprentissage", learn: true },
      { n: "SAST / DAST", d: "Analyse dans le pipeline", l: 5, i: ico.shield, lv: "objectif DevSecOps", learn: true },
      { n: "Scan d'images", d: "Trivy, dépendances", l: 5, i: img("docker/docker-original.svg"), lv: "objectif DevSecOps", learn: true },
      { n: "Gestion des secrets", d: "Vault, rotation", l: 5, i: ico.key, lv: "objectif DevSecOps", learn: true },
    ],
  };
  const SKILL_NOTES = {
    backend: "Ce que je <b>maîtrise et pratique</b> déjà, en projet comme en entreprise.",
    lang: "Les autres langages et outils que j'utilise, du front-end à l'<b>IoT</b>.",
    devops: "Compétences <b>en cours d'acquisition</b> dans le cadre de ma reconversion. Je ne les ai pas encore utilisées en production.",
    sec: "La sécurité des API est <b>acquise</b>. Le reste est mon <b>objectif DevSecOps</b>, pas encore une compétence.",
  };
  (function skills() {
    const grid = $("#skillGrid"), tabs = $$("#skillTabs button"), pill = $("#tabPill");
    let current = null, busy = false;
    const movePill = (btn, instant) => gsap.to(pill, { x: btn.offsetLeft - 5, width: btn.offsetWidth, duration: instant ? 0 : 0.6, ease: "expo.out" });
    const note = $("#skillNote");
    const render = (key) =>
      (note.innerHTML = SKILL_NOTES[key], grid.innerHTML = SKILLS[key].map((s) => `
        <li class="skill">
          <div class="skill__logo" aria-hidden="true">${s.i}</div>
          <div><h3>${s.n}</h3><p>${s.d}</p></div>
          <span class="skill__lvl${s.learn ? " skill__lvl--learn" : ""}">${s.lv}</span>
        </li>`).join(""));
    const animIn = () => {
      if (reduceMotion) return;
      gsap.fromTo($$(".skill", grid), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power2.out" });
    };
    const show = (key, btn) => {
      if (key === current || busy) return;
      busy = true;
      tabs.forEach((t) => { t.classList.toggle("active", t === btn); t.setAttribute("aria-selected", t === btn); });
      movePill(btn);
      const swap = () => { render(key); animIn(); current = key; busy = false; };
      if (current && !reduceMotion) gsap.to($$(".skill", grid), { y: -10, opacity: 0, duration: 0.22, stagger: 0.015, ease: "power2.in", onComplete: swap });
      else swap();
    };
    tabs.forEach((b) => b.addEventListener("click", () => show(b.dataset.tab, b)));
    render("backend"); current = "backend";
    requestAnimationFrame(() => movePill(tabs[0], true));
    addEventListener("resize", () => movePill($("#skillTabs button.active"), true));
    if (!reduceMotion) {
      gsap.set($$(".skill", grid), { opacity: 0 });
      ScrollTrigger.create({ trigger: grid, start: "top 85%", once: true, onEnter: animIn });
    }
  })();

  /* ---------------- PROJECTS — stacked cards ---------------- */
  /* Projet en ligne : { live: "https://…", img: "assets/projects/xxx.png" }
     Sans `img`, la carte affiche « Aperçu à venir » jusqu'à ce que la capture soit ajoutée. */
  const PROJECTS = [
    {
      cat: "projet web · react js", title: "AES", url: "aes-test.netlify.app",
      live: "https://aes-test.netlify.app/", img: "",
      desc: "Application web développée en React JS et déployée sur Netlify.",
      tags: ["React JS", "Netlify"], glow: "rgba(255,91,31,.3)",
    },
    {
      cat: "plateforme de cours · iua", title: "Cours Redis", url: "cours-redis-iua.netlify.app",
      live: "https://cours-redis-iua.netlify.app/", img: "",
      desc: "Plateforme de cours sur Redis pour l'IUA, développée en React JS avec Supabase comme backend.",
      tags: ["React JS", "Supabase"], glow: "rgba(220,56,45,.3)",
    },
    {
      cat: "santé · projet de fin de licence", title: "PharmaCare API", url: "api.pharmacare.ci/v1",
      desc: "API REST sécurisée pour la gestion des pharmacies, des médicaments et des utilisateurs. Authentification JWT et contrôle d'accès basé sur les rôles.",
      tags: ["NestJS", "Prisma", "PostgreSQL", "JWT", "RBAC"], glow: "rgba(255,91,31,.3)",
      kpi: "RBAC", kpiLabel: "3 rôles · guards NestJS",
      req: `<span class="m">GET</span> <span class="u">/v1/medicaments</span>
<span class="h">Authorization: Bearer eyJhbGci…</span>

<span class="st">200 OK</span> · 42ms
[{
  <span class="k">"nom"</span>: <span class="s">"Paracétamol"</span>,
  <span class="k">"stock"</span>: 128,
  <span class="k">"pharmacie"</span>: <span class="s">"Cocody"</span>
}]`,
    },
    {
      cat: "iot · club robotique iua", title: "RFID Pointage", url: "rfid.iua.local/api",
      desc: "Système de pointage RFID en temps réel : API REST sécurisée, architecture évolutive pour des équipements Arduino, traçabilité de chaque opération.",
      tags: ["Node.js", "Express", "Arduino", "RFID", "Temps réel"], glow: "rgba(62,224,143,.25)",
      kpi: "Live", kpiLabel: "badge → API → dashboard",
      req: `<span class="m">POST</span> <span class="u">/api/pointages</span>
<span class="h">X-Device: arduino-uno-07</span>
{ <span class="k">"uid"</span>: <span class="s">"04:A3:9F:2B"</span> }

<span class="st">201 Created</span> · 18ms
{
  <span class="k">"membre"</span>: <span class="s">"K. Yao"</span>,
  <span class="k">"entree"</span>: <span class="s">"08:02:14"</span>
}`,
    },
    {
      cat: "entreprise · djoumaf côte d'ivoire", title: "Djoumaf Auth", url: "auth.djoumaf.ci",
      desc: "Mise en place d'un système d'authentification robuste et optimisation des échanges entre front et back pour réduire la latence et améliorer l'expérience utilisateur.",
      tags: ["Node.js", "JWT", "Refresh tokens", "Sécurité", "Perf"], glow: "rgba(124,196,255,.25)",
      kpi: "Auth", kpiLabel: "tokens courts, refresh sécurisé",
      req: `<span class="m">POST</span> <span class="u">/auth/refresh</span>
<span class="h">Cookie: rt=••••••; HttpOnly; Secure</span>

<span class="st">200 OK</span>
{
  <span class="k">"accessToken"</span>: <span class="s">"eyJ…"</span>,
  <span class="k">"expiresIn"</span>: 900
}`,
    },
  ];
  (function projects() {
    const stack = $("#projStack");
    $("#projTotal").textContent = String(PROJECTS.length).padStart(2, "0");
    stack.innerHTML = PROJECTS.map((p) => `
      <article class="p-card" style="--glow:${p.glow}">
        <div class="p-card__bar"><span class="dots"><i></i><i></i><i></i></span><span class="p-card__url mono">${p.url}</span></div>
        ${p.live ? `
        <div class="p-card__shot">
          ${p.img
            ? `<img src="${p.img}" alt="Capture du site ${p.title}" loading="lazy" draggable="false" />`
            : `<div class="p-card__shot-ph"><svg width="44" height="44" aria-hidden="true"><use href="#i-logo"/></svg><span>Aperçu à venir</span></div>`}
        </div>` : `
        <div class="p-card__screen">
          <pre class="req">${p.req}</pre>
          <div class="p-card__big"><span></span><div class="p-card__kpi">${p.kpi}<small>${p.kpiLabel}</small></div></div>
        </div>`}
        <div class="p-card__info">
          <span class="p-card__cat mono">${p.cat}</span>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <ul class="tags">${p.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
          ${p.live ? `<a class="p-card__visit" href="${p.live}" target="_blank" rel="noopener">Voir le site en ligne <svg width="14" height="14" aria-hidden="true"><use href="#i-arrow"/></svg></a>` : ""}
        </div>
      </article>`).join("");

    decorateTech($$(".tags li", stack));
    let cards = $$(".p-card", stack);
    let order = cards.map((_, i) => i); // order[0] = front card index
    let animating = false;
    const pos = (depth) => ({ y: depth * -26, scale: 1 - depth * 0.06, rotate: depth === 0 ? 0 : depth % 2 ? 2.5 : -2.5, zIndex: 10 - depth, opacity: depth > 2 ? 0 : 1, filter: `brightness(${1 - depth * 0.25})` });
    const layout = (instant) => order.forEach((ci, depth) => {
      // only the front card is readable / focusable; the ones behind are decoration
      cards[ci].inert = depth !== 0;
      cards[ci].setAttribute("aria-hidden", depth !== 0);
      gsap.to(cards[ci], { ...pos(depth), duration: instant ? 0 : 0.9, ease: "expo.out" });
    });
    layout(true);

    const setCounter = (dirSign) => {
      const el = $("#projIdx");
      const val = String(order[0] + 1).padStart(2, "0");
      if (reduceMotion) return (el.textContent = val);
      gsap.to(el, { yPercent: -60 * dirSign, opacity: 0, duration: 0.2, onComplete: () => { el.textContent = val; gsap.fromTo(el, { yPercent: 60 * dirSign, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: "expo.out" }); } });
    };

    const next = (fromX = 0) => {
      if (animating) return;
      animating = true;
      const front = cards[order[0]];
      const dir = fromX < 0 ? -1 : 1;
      gsap.timeline({ onComplete: () => (animating = false) })
        .to(front, { x: dir * -(stack.offsetWidth * 0.9), y: 60, rotate: dir * -14, duration: 0.5, ease: "power3.in" })
        .call(() => { order.push(order.shift()); layout(); setCounter(1); })
        .set(front, { zIndex: 0 })
        .to(front, { x: 0, duration: 0.9, ease: "expo.out" });
    };
    const prev = () => {
      if (animating) return;
      animating = true;
      const backIdx = order[order.length - 1];
      const back = cards[backIdx];
      gsap.timeline({ onComplete: () => (animating = false) })
        .to(back, { x: stack.offsetWidth * 0.9, rotate: 12, opacity: 1, duration: 0.45, ease: "power3.in" })
        .call(() => { order.unshift(order.pop()); gsap.set(back, { zIndex: 20 }); layout(); setCounter(-1); })
        .to(back, { x: 0, duration: 0.9, ease: "expo.out" }, "<");
    };
    $("#projNext").addEventListener("click", () => next());
    $("#projPrev").addEventListener("click", prev);
    stack.setAttribute("tabindex", "0");
    stack.setAttribute("aria-label", "Projets. Flèches gauche et droite pour naviguer");
    stack.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); });

    // drag / swipe
    let startX = 0, dragging = false, dx = 0;
    stack.addEventListener("pointerdown", (e) => { if (animating || e.target.closest("a")) return; dragging = true; startX = e.clientX; dx = 0; stack.setPointerCapture(e.pointerId); });
    stack.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      dx = e.clientX - startX;
      gsap.set(cards[order[0]], { x: dx, rotate: dx * 0.04 });
    });
    const end = () => {
      if (!dragging) return;
      dragging = false;
      if (Math.abs(dx) > 90) { const front = cards[order[0]]; gsap.set(front, { x: 0, rotate: 0 }); next(dx > 0 ? -1 : 1); }
      else gsap.to(cards[order[0]], { x: 0, rotate: 0, duration: 0.8, ease: "elastic.out(1,0.5)" });
    };
    stack.addEventListener("pointerup", end);
    stack.addEventListener("pointercancel", end);

    // 3D tilt of front card on hover
    if (finePointer && !reduceMotion) {
      stack.addEventListener("mousemove", (e) => {
        if (dragging || animating) return;
        const r = stack.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(cards[order[0]], { rotationY: nx * 8, rotationX: -ny * 8, transformPerspective: 1200, duration: 0.6, ease: "power3" });
      });
      stack.addEventListener("mouseleave", () => gsap.to(cards[order[0]], { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power3" }));
    }

    if (!reduceMotion) {
      gsap.from(cards, { y: 160, opacity: 0, rotate: (i) => (i - 1) * 8, duration: 1.3, stagger: 0.1, ease: "expo.out", clearProps: "opacity", scrollTrigger: { trigger: stack, start: "top 80%" }, onComplete: () => layout() });
    }
  })();

  /* ---------------- JOURNEY — timeline draw ---------------- */
  (function journey() {
    if (reduceMotion) return;
    $$("[data-timeline]").forEach((tl) => {
      gsap.fromTo(tl.querySelector(".timeline__line"), { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: tl, start: "top 70%", end: "bottom 60%", scrub: 0.6 } });
      $$(".t-item", tl).forEach((it) => {
        gsap.from(it.querySelector(".t-card"), { x: 50, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: it, start: "top 85%" } });
        gsap.from(it.querySelector(".t-dot"), { scale: 0, duration: 0.6, ease: "back.out(3)", scrollTrigger: { trigger: it, start: "top 80%" } });
      });
    });
  })();

  /* ---------------- CERTIFICATES ----------------
     Ajouter un certificat = ajouter un objet ici :
       { title: "Docker Foundations", issuer: "Organisme", date: "2026-12",
         status: "obtenu" | "en cours", url: "https://lien-de-verification" (optionnel),
         image: "assets/certs/mon-certificat.jpg" (optionnel) }
     Tant que la liste est vide, la section affiche un message d'attente. */
  const CERTS = [];
  (function certs() {
    const grid = $("#certGrid"), empty = $("#certEmpty");
    if (!CERTS.length) { grid.hidden = true; empty.hidden = false; return; }
    const fmt = (d) => { const [y, m] = d.split("-"); return m ? new Date(+y, +m - 1).toLocaleDateString("fr-FR", { month: "short", year: "numeric" }) : y; };
    grid.innerHTML = CERTS.map((c) => `
      <li class="cert${c.status === "en cours" ? " cert--progress" : ""}">
        ${c.image ? `<img class="cert__img" src="${c.image}" alt="Certificat ${c.title}" loading="lazy" />` : `<div class="cert__img cert__img--ph" aria-hidden="true"><svg width="40" height="40"><use href="#i-logo"/></svg></div>`}
        <div class="cert__body">
          <span class="cert__status">${c.status === "en cours" ? "En cours" : "Obtenu"}</span>
          <h3>${c.title}</h3>
          <p>${c.issuer}${c.date ? ` · <time>${fmt(c.date)}</time>` : ""}</p>
          ${c.url ? `<a href="${c.url}" target="_blank" rel="noopener" class="cert__link link-line">Voir le certificat <svg width="14" height="14" aria-hidden="true"><use href="#i-arrow"/></svg></a>` : ""}
        </div>
      </li>`).join("");
    if (!reduceMotion) gsap.from(".cert", { y: 20, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: grid, start: "top 85%" } });
  })();

  /* ---------------- CONTACT ---------------- */
  (function contact() {
    if (!reduceMotion) {
      gsap.from(".big-btn", { scale: 0, rotate: -90, duration: 1.2, ease: "back.out(1.6)", scrollTrigger: { trigger: ".contact__actions", start: "top 90%" } });
      gsap.from(".contact__links > *, .contact__sub", { y: 30, opacity: 0, stagger: 0.08, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: ".contact__actions", start: "top 90%" } });
    }
    const btn = $("#copyMail"), txt = $("#copyText"), mail = "emmanuelahossi667@gmail.com";
    let resetTimer;
    btn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(mail); txt.textContent = "Adresse copiée"; }
      catch { txt.textContent = "Copie impossible, sélectionnez l'adresse"; }
      gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.6, ease: "elastic.out(1,0.4)" });
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => (txt.textContent = mail), 2000);
    });

    // floating WhatsApp button steps aside once the contact section (which has its own) is on screen
    const wa = $("#waFloat");
    ScrollTrigger.create({ trigger: ".contact", start: "top 70%", end: "bottom top", onToggle: (s) => wa.classList.toggle("is-off", s.isActive) });
  })();

  /* ---------------- BOOT ---------------- */
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.all([runLoader(), fontsReady]).then(() => {
    heroIntro();
    setupReveals();
    ScrollTrigger.refresh();
  });
})();
