// script.js
document.addEventListener('DOMContentLoaded', function() {
  // ---------- PROJECT DATA (exact texts) ----------
  const projects = [
    {
      id: 'ecom',
      name: 'Rayanox E-Commerce & Order Tracking App',
      desc: '•Engineered a full-cycle cross-platform e‑commerce solution (Flutter + PHP/MySQL), consolidating manual order entry from 5+ channels into a single digital platform',
      tech: 'Flutter, PHP, MySQL',
      images: [
        'assets/projects/project1/screen1.jpg',
        'assets/projects/project1/screen2.jpg',
        'assets/projects/project1/screen3.jpg',
        'assets/projects/project1/screen4.jpg'
      ]
    },
    {
      id: 'fleet',
      name: 'GestiFlotte: Fleet & Logistics Management System',
      desc: '•Architected a fleet management application serving 70+ vehicles, integrating real-time mission tracking, fuel consumption analytics, and mileage monitoring',
      tech: 'Flutter, Dart, Firebase',
      images: [
        'assets/projects/project2/screen1.jpg',
        'assets/projects/project2/screen2.jpg',
        'assets/projects/project2/screen3.jpg'
      ]
    },
    {
      id: 'lead',
      name: 'Trade Fair Lead Capture Application',
      desc: '•Developed a cross-platform lead retrieval app replacing paper forms, enabling real-time sync of prospect data to CRM',
      tech: 'Flutter, PHP, MySQL',
      images: [
        'assets/projects/project3/screen1.jpg',
        'assets/projects/project3/screen2.jpg',
        'assets/projects/project3/screen3.jpg',
        'assets/projects/project3/screen4.jpg'
      ]
    }
  ];

  // render project cards
  const grid = document.getElementById('projectsGrid');
  projects.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="card-content">
        <h3>${p.name}</h3>
        <p class="tech-badge">${p.tech}</p>
        <p>${p.desc.substring(0,80)}…</p>
        <button class="view-btn" data-index="${idx}">🔍 View Project</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // ---------- MODAL GALLERY LOGIC ----------
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalDesc = document.getElementById('modalDescription');
  const thumbContainer = document.getElementById('thumbnails');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');

  let currentProject = null;
  let currentIndex = 0;

  function openModal(proj, idx) {
    currentProject = proj;
    currentIndex = idx;
    modalTitle.innerText = proj.name;
    modalDesc.innerText = proj.desc;
    updateModalImage();
    renderThumbnails(proj);
    modal.style.display = 'flex';
  }

  function updateModalImage() {
    if (currentProject && currentProject.images[currentIndex]) {
      modalImg.src = currentProject.images[currentIndex];
      modalImg.alt = 'project screenshot';
      // highlight thumb
      document.querySelectorAll('.thumbnails img').forEach((thumb, i) => {
        if (i === currentIndex) thumb.classList.add('active-thumb');
        else thumb.classList.remove('active-thumb');
      });
    }
  }

  function renderThumbnails(proj) {
    thumbContainer.innerHTML = '';
    proj.images.forEach((src, i) => {
      const thumb = document.createElement('img');
      thumb.src = src;
      thumb.onerror = () => thumb.src = 'https://via.placeholder.com/60x40?text=img';
      thumb.addEventListener('click', () => {
        currentIndex = i;
        updateModalImage();
      });
      if (i === currentIndex) thumb.classList.add('active-thumb');
      thumbContainer.appendChild(thumb);
    });
  }

  // attach view buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      openModal(projects[idx], 0);
    });
  });

  prevBtn.addEventListener('click', () => {
    if (!currentProject) return;
    currentIndex = (currentIndex - 1 + currentProject.images.length) % currentProject.images.length;
    updateModalImage();
  });
  nextBtn.addEventListener('click', () => {
    if (!currentProject) return;
    currentIndex = (currentIndex + 1) % currentProject.images.length;
    updateModalImage();
  });
  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

  // ---------- LANGUAGE SWITCHER (EN/FR) ----------
  const enBtn = document.getElementById('langEn');
  const frBtn = document.getElementById('langFr');
  const i18nElements = document.querySelectorAll('[data-i18n]');

  const translations = {
    en: {
      nav_home: 'Home', nav_about: 'About', nav_projects: 'Projects', nav_skills: 'Skills', nav_resume: 'Resume', nav_contact: 'Contact',
      hero_title: 'IT Operations & Infrastructure Specialist',
      hero_intro: 'IT professional with 4+ years of experience in technical support and IT operations within a fast-paced business environment.',
      download_btn: 'Download Resume', contact_btn: 'Contact Me',
      about_title: 'About',
      about_text: '•IT professional with 4+ years of experience in technical support and IT operations within a fast-paced business environment. Skilled in systems maintenance, infrastructure support, and business application development, with a strong understanding of both technical and operational needs.',
      skills_title: 'Skills',
      projects_title: 'Projects',
      resume_title: 'Resume',
      exp_title: 'Experience',
      edu_title: 'Education',
      cert_title: 'Certifications',
      lang_title: 'Languages',
      download_resume: 'Download Resume (PDF)',
      contact_title: 'Contact'
    },
    fr: {
      nav_home: 'Accueil', nav_about: 'À propos', nav_projects: 'Projets', nav_skills: 'Compétences', nav_resume: 'CV', nav_contact: 'Contact',
      hero_title: 'Spécialiste en opérations IT & infrastructure',
      hero_intro: 'Professionnel IT avec plus de 4 ans d\'expérience en support technique et opérations IT dans un environnement dynamique.',
      download_btn: 'Télécharger CV', contact_btn: 'Me contacter',
      about_title: 'À propos',
      about_text: '•Professionnel IT avec plus de 4 ans d\'expérience en support technique et opérations IT. Compétences en maintenance système, support infrastructure et développement d\'applications métier.',
      skills_title: 'Compétences',
      projects_title: 'Projets',
      resume_title: 'CV',
      exp_title: 'Expérience',
      edu_title: 'Formation',
      cert_title: 'Certifications',
      lang_title: 'Langues',
      download_resume: 'Télécharger CV (PDF)',
      contact_title: 'Contact'
    }
  };

  function setLanguage(lang) {
    localStorage.setItem('preferredLang', lang);
    i18nElements.forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = translations[lang][key];
        else el.innerText = translations[lang][key];
      }
    });
    enBtn.classList.toggle('active', lang === 'en');
    frBtn.classList.toggle('active', lang === 'fr');
  }

  enBtn.addEventListener('click', () => setLanguage('en'));
  frBtn.addEventListener('click', () => setLanguage('fr'));
  const savedLang = localStorage.getItem('preferredLang') || 'en';
  setLanguage(savedLang);

  // ---------- HAMBURGER MENU ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));

  // ---------- SCROLL REVEAL (progress bars) ----------
  const progressFills = document.querySelectorAll('.progress-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute('data-level');
        entry.target.style.width = level + '%';
      }
    });
  }, { threshold: 0.3 });
  progressFills.forEach(el => observer.observe(el));

  // ---------- IMAGE FALLBACKS (avoid broken) ----------
  document.querySelectorAll('img').forEach(img => {
    img.onerror = function() { this.src = 'https://via.placeholder.com/200x150?text=IT'; };
  });
});
