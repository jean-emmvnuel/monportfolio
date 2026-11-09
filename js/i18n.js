/* =========================================================
   i18n FR / EN
   Le HTML est écrit en français (langue source). Quand la page est en anglais,
   chaque élément [data-i18n="clé"] reçoit la traduction EN[clé] (HTML autorisé),
   et [data-i18n-attr="attribut:clé;attribut:clé"] traduit des attributs.
   La langue est choisie dans le <head> (avant le rendu) : ?lang= > choix enregistré
   > langue du navigateur. Les textes générés en JS utilisent I18N.L("fr", "en").
   Ce script s'exécute avant main.js, donc avant le découpage des titres animés.
   ========================================================= */
(() => {
  "use strict";

  const EN = {
    /* meta */
    "meta.title": "Jean Emmanuel Ahossi · Backend Developer, future DevSecOps Engineer",
    "meta.desc": "Jean Emmanuel Ahossi, Node.js and NestJS backend developer based in Abidjan, Côte d'Ivoire, moving into DevOps and DevSecOps.",
    "meta.ogDesc": "Node.js and NestJS backend developer based in Abidjan, Côte d'Ivoire, moving into DevOps and DevSecOps.",
    "meta.locale": "en_US",
    "meta.localeAlt": "fr_FR",

    /* nav */
    "nav.logo": "Jean Emmanuel Ahossi, back to top",
    "nav.aria": "Main navigation",
    "nav.menu": "Mobile menu",
    "nav.about": "About",
    "nav.pipeline": "Roadmap",
    "nav.projects": "Projects",
    "nav.journey": "Experience",
    "nav.certs": "Certificates",
    "nav.cta": "Contact me",
    "nav.theme": "Switch between light and dark theme",
    "nav.lang": "Switch the site to French",
    "nav.burger": "Open menu",

    /* hero */
    "hero.title": "I build solid <em>back-ends</em>. Now I'm learning to <em class=\"accent\">deploy</em> and <em>secure them.</em>",
    "hero.sub": "<b>Node.js</b> and <b>NestJS</b> backend developer based in Abidjan, Côte d'Ivoire. I design secure APIs and I'm specializing in <b>DevOps</b>, with <b>DevSecOps</b> as my goal.",
    "hero.cta": "View my projects",
    "hero.wa": "Message me on WhatsApp",
    "hero.alt": "Portrait of Jean Emmanuel Ahossi",
    "hero.status": "<span class=\"pulse\" aria-hidden=\"true\"></span>Open to opportunities · remote or on-site",

    /* about */
    "about.text": "I hold a Bachelor's degree in Computer Engineering, graduated with highest honors. Since 2025, I've shipped a wide range of projects: NestJS APIs, web apps and a mobile app, at a company, in a student club and as part of a team. I like starting from a real need, modeling data cleanly and delivering code that is readable, tested and ready to deploy.",
    "about.a.k": "What I do",
    "about.a.h": "Backend developer",
    "about.a.p": "REST APIs, JWT authentication, role-based access control, Prisma ORM. Skills I already use in projects and at work.",
    "about.b.k": "How I work",
    "about.b.h": "Autonomous &amp; team player",
    "about.b.p": "Tech watch, fast learning and Scrum. Comfortable owning a project alone or collaborating with others.",
    "about.c.k": "By the numbers",
    "about.c.h": "<span class=\"js-stat-projects\">7</span> projects",
    "about.c.p": "<span class=\"js-stat-live\">5</span> with a live demo",
    "about.d.p": "Côte d'Ivoire · UTC+0",
    "about.e.k": "Right now",
    "about.e.h": "Master's in Mobile Computing, Big Data &amp; Cloud",
    "about.e.p": "ESATIC, Abidjan · first year (2026–2028)",
    "about.f.k": "Languages",
    "about.f.h": "French · English",
    "about.f.p": "French: fluent. English: A2 (CEFR), improving.",

    /* pipeline */
    "pipe.title": "My <em>path</em> in four steps",
    "pipe.intro": "Only the first step is mastered. The next ones are what I'm learning and what I'm aiming for; the code snippets show what I'm working towards, not production experience.",
    "pipe.b1": "<svg width=\"13\" height=\"13\" aria-hidden=\"true\"><use href=\"#i-check\"/></svg>Mastered",
    "pipe.b2": "<i class=\"spin\" aria-hidden=\"true\"></i>In progress",
    "pipe.b3": "<svg width=\"13\" height=\"13\" aria-hidden=\"true\"><use href=\"#i-clock\"/></svg>Next step",
    "pipe.b4": "<svg width=\"13\" height=\"13\" aria-hidden=\"true\"><use href=\"#i-target\"/></svg>Goal",
    "pipe.p1": "My current job. I design robust, secure and maintainable REST APIs with Node.js, Express and NestJS.",
    "pipe.p2": "I'm learning to package my APIs into reproducible containers. I know the basics of Docker and Linux and practice on personal projects.",
    "pipe.p3": "Not acquired yet. Automating continuous integration and delivery, and managing infrastructure in the cloud: that's what I'll learn during my master's degree in Cloud at ESATIC.",
    "pipe.p4": "Where I'm heading. Building security into every stage of the pipeline: code analysis, image scanning, secrets management. A goal, not yet a skill.",

    /* skills */
    "skills.title": "The tools of my <em>trade</em>",
    "skills.tabs": "Skill categories",
    "skills.tab.lang": "Languages",
    "skills.tab.sec": "Security",

    /* projects */
    "proj.title": "What I've <em>shipped</em>",
    "proj.intro": "Backend APIs and web apps in healthcare, IoT, authentication and social media. Real-world projects, built to last.",
    "proj.prev": "Previous project",
    "proj.next": "Next project",
    "proj.drag": "drag",

    /* journey */
    "journey.title": "Experience &amp; <em>education</em>",
    "journey.exp": "Experience",
    "journey.edu": "Education",
    "journey.x1.head": "<h4>Web &amp; Mobile Developer</h4><time>Apr – Jun 2026</time>",
    "journey.x1.org": "Final-year bachelor's project, Abidjan",
    "journey.x1.p": "End-to-end design and development of DispoMed: NestJS API, PostgreSQL database with Prisma and React Native mobile app.",
    "journey.x2.head": "<h4>Backend Developer</h4><time>Dec 2025 – Apr 2026</time>",
    "journey.x2.p": "Backend development at a company, focused on access security (authentication, sessions, access control) and API performance.",
    "journey.x3.head": "<h4>Backend Developer</h4><time>Nov 2025</time>",
    "journey.x3.org": "Robotics Club, Computer Science Department, IUA",
    "journey.x3.p": "Built the API for the club's RFID attendance system and integrated it with the Arduino readers.",
    "journey.e1.head": "<h4>Master's in Mobile Computing, Big Data &amp; Cloud</h4><time>2026 – 2028</time>",
    "journey.e1.p": "Cloud, distributed systems and large-scale data. The foundation of my DevOps specialization.",
    "journey.e2.head": "<h4>Bachelor's Degree in Computer Engineering</h4><time>2023 – 2026</time>",
    "journey.e2.org": "Institut Universitaire d'Abidjan (IUA)",
    "journey.e2.p": "<span class=\"pill-hl\">Graduated with highest honors</span>",
    "journey.e3.head": "<h4>Baccalaureate (high school diploma)</h4><time>2020 – 2023</time>",

    /* certificates */
    "certs.title": "My <em>certificates</em>",
    "certs.intro": "Courses I have completed and passed. Click a card to open the original certificate. My DevOps certifications will be added here.",
    "certs.empty1": "My first DevOps certifications are in preparation.",
    "certs.empty2": "I'll publish them here and on LinkedIn as soon as I earn them.",
    "certs.empty3": "Follow my journey on LinkedIn",

    /* contact / footer */
    "contact.title": "A <em>backend</em> project or a first <em>DevOps</em> role?",
    "contact.sub": "I'm ready to work on backend projects and eager to put DevOps into practice: internship, work-study, freelance or just a chat. WhatsApp is the fastest way to reach me.",
    "contact.waAria": "Message me on WhatsApp at +225 07 04 52 64 37",
    "contact.wa": "Message me on WhatsApp",
    "contact.copy": "Copy email address",
    "footer.top": "Back to top",
  };

  const html = document.documentElement;
  const lang = html.lang === "en" ? "en" : "fr";

  if (lang === "en") {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = EN[el.dataset.i18n];
      if (v == null) return console.warn("i18n: clé manquante", el.dataset.i18n);
      el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) =>
      el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        if (EN[key] == null) return console.warn("i18n: clé manquante", key);
        el.setAttribute(attr, EN[key]);
      })
    );
  }
  html.classList.add("i18n-done");

  window.I18N = {
    lang,
    L: (fr, en) => (lang === "en" ? en : fr),
    /* Changer de langue recharge la page (les titres animés sont découpés au chargement),
       sans rejouer l'écran de démarrage et en gardant la position de défilement. */
    set(next) {
      if (next === lang) return;
      try {
        localStorage.setItem("lang", next);
        sessionStorage.setItem("i18n-scroll", String(Math.round(scrollY)));
        sessionStorage.setItem("i18n-skip-loader", "1");
      } catch {}
      const url = new URL(location.href);
      if (url.searchParams.has("lang")) { url.searchParams.set("lang", next); location.replace(url); }
      else location.reload();
    },
  };
})();
