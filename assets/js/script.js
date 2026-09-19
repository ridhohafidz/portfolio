/* ==========================================================================
   MUHAMMAD RIDHO HAFIDZ - SYSTEM & CLOUD ENGINEER PORTFOLIO
   Interactive UI & CLI Terminal Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initializations
  initTerminal();
  initSkillFilters();
  initCertFilters();
  initNavigation();
  initBackToTop();
  initCopyToClipboard();
  initCvModal();
});

/* --------------------------------------------------------------------------
   1. CLI TERMINAL EMULATOR
   -------------------------------------------------------------------------- */
function initTerminal() {
  const terminalBody = document.getElementById('terminal-body');
  const chips = document.querySelectorAll('.t-chip');
  if (!terminalBody) return;

  const commands = {
    'whoami': () => `
<div class="t-prompt">$ whoami</div>
<div class="t-output">
  <strong>Muhammad Ridho Hafidz</strong><br>
  Role: System & Cloud Engineer<br>
  Location: Jakarta, Indonesia<br>
  Education: S.Kom (Information Technology) - GPA 3.90<br>
  Status: <span class="t-success">Active & Online</span>
</div>`,
    'cv': () => `
<div class="t-prompt">$ cat ~/resume/curriculum-vitae.md</div>
<div class="t-output">
  <strong>📄 CURRICULUM VITAE - MUHAMMAD RIDHO HAFIDZ</strong><br>
  Role: System & Cloud Engineer | Jakarta, Indonesia<br>
  Experience: PT. Biznet Gio Nusantara (Cloud Eng), Pusilkom UI (Infra Eng)<br>
  Certifications: AWS, Red Hat RH124, Acronis EDR/Backup, cPanel, Fortinet, MikroTik (19 Total)<br>
  Actions: <a href="cv.html" target="_blank" style="color: var(--accent-cyan); font-weight: bold; text-decoration: underline;">[ Open & Download PDF CV ]</a> &nbsp;|&nbsp; <a href="#" id="termOpenCvBtn" style="color: var(--accent-emerald); font-weight: bold;">[ Quick Preview Modal ]</a>
</div>`,
    'resume': () => `
<div class="t-prompt">$ cat ~/resume/curriculum-vitae.md</div>
<div class="t-output">
  <strong>📄 CURRICULUM VITAE - MUHAMMAD RIDHO HAFIDZ</strong><br>
  Role: System & Cloud Engineer | Jakarta, Indonesia<br>
  Experience: PT. Biznet Gio Nusantara (Cloud Eng), Pusilkom UI (Infra Eng)<br>
  Certifications: AWS, Red Hat RH124, Acronis EDR/Backup, cPanel, Fortinet, MikroTik<br>
  Actions: <a href="cv.html" target="_blank" style="color: var(--accent-cyan); font-weight: bold; text-decoration: underline;">[ Open & Download PDF CV ]</a>
</div>`,
    'get-nodes': () => `
<div class="t-prompt">$ kubectl get nodes -o wide</div>
<div class="t-output">
NAME             STATUS   ROLES    AGE   VERSION   INTERNAL-IP<br>
k8s-master-01    <span class="t-success">Ready</span>    control  4y    v1.28.2   10.0.10.5<br>
k8s-worker-01    <span class="t-success">Ready</span>    worker   4y    v1.28.2   10.0.10.6<br>
k8s-worker-02    <span class="t-success">Ready</span>    worker   4y    v1.28.2   10.0.10.7<br>
openstack-node   <span class="t-success">Ready</span>    compute  3y    v2023.1   10.0.20.12
</div>`,
    'uptime': () => `
<div class="t-prompt">$ uptime</div>
<div class="t-output">
  10:00:00 up 1461 days, 4+ years of infra operation exp, 0 downtime, load average: 0.05, 0.08, 0.02
</div>`,
    'skills': () => `
<div class="t-prompt">$ systemctl status cloud-infra.service</div>
<div class="t-output">
  ● cloud-infra.service - Multi-Cloud & Hybrid System Engine<br>
  &nbsp;&nbsp;&nbsp;Loaded: loaded (/etc/systemd/system/cloud-infra.service; <span class="t-success">enabled</span>)<br>
  &nbsp;&nbsp;&nbsp;Active: <span class="t-success">active (running)</span> since Mar 2022<br>
  &nbsp;&nbsp;&nbsp;Stack: Kubernetes, AWS, GCP, Proxmox, Terraform, Ansible, Prometheus, Grafana, Nginx
</div>`,
    'blog': () => `
<div class="t-prompt">$ curl -s https://dosys.my.id/blog/latest</div>
<div class="t-output">
  <strong>Tech Blog & Infrastructure Notes:</strong><br>
  URL: <a href="https://dosys.my.id/blog" target="_blank" style="color: var(--accent-cyan);">https://dosys.my.id/blog</a><br>
  Topics: Cloud Architecture, Kubernetes, Linux Admin & DevOps Practice.
</div>`,
    'help': () => `
<div class="t-prompt">$ help</div>
<div class="t-output">
  Available CLI commands:<br>
  - <span class="t-info">whoami</span> : Profile summary<br>
  - <span class="t-info">cv</span> : Curriculum Vitae details & PDF download link<br>
  - <span class="t-info">blog</span> : Access Tech Blog & Notes URL<br>
  - <span class="t-info">get-nodes</span> : Simulated Kubernetes & Cloud infrastructure nodes<br>
  - <span class="t-info">skills</span> : System service status & tech stack<br>
  - <span class="t-info">uptime</span> : Career experience duration<br>
  - <span class="t-info">clear</span> : Clear terminal screen
</div>`
  };

  terminalBody.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'termOpenCvBtn') {
      e.preventDefault();
      if (window.openCvModal) window.openCvModal();
    }
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd === 'clear') {
        terminalBody.innerHTML = `
        <div class="t-prompt">$ help</div>
        <div class="t-output">Terminal cleared. Click any chip below or scroll down to explore portfolio!</div>`;
        return;
      }
      if (commands[cmd]) {
        terminalBody.innerHTML += commands[cmd]();
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. SKILL CATEGORY FILTER
   -------------------------------------------------------------------------- */
function initSkillFilters() {
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      skillCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. CERTIFICATION CATEGORY FILTER
   -------------------------------------------------------------------------- */
function initCertFilters() {
  const certBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  certBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      certCards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. NAVIGATION & SCROLLSPY
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.header-nav');
  const toggleBtn = document.getElementById('mobileNavToggle');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const navBackdrop = document.getElementById('navBackdrop');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const allNavLinks = [...desktopLinks, ...drawerLinks];
  const sections = document.querySelectorAll('section, header');

  // Open Mobile Drawer
  const openDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.classList.add('nav-open');
  };

  // Close Mobile Drawer
  const closeDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.classList.remove('nav-open');
  };

  // Sticky Header on Scroll & Scrollspy
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy Active Link Tracking
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Drawer Open Button
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  // Mobile Drawer Close Button
  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }

  // Backdrop Click to Close
  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => {
      closeDrawer();
    });
  }

  // Close Mobile Drawer on Drawer Link Click
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   5. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   6. COPY TO CLIPBOARD TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initCopyToClipboard() {
  const copyBtns = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toast');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied: ${textToCopy}`);
      }).catch(() => {
        showToast('Failed to copy');
      });
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-msg').textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* --------------------------------------------------------------------------
   7. CV MODAL PREVIEW & EXPORT HANDLER
   -------------------------------------------------------------------------- */
function initCvModal() {
  const modal = document.getElementById('cvModal');
  const openBtns = document.querySelectorAll('#previewCvModalBtn, .open-cv-modal');
  const closeBtn = document.getElementById('closeCvModal');
  const printBtn = document.getElementById('modalPrintBtn');
  const iframe = modal ? modal.querySelector('.cv-modal-iframe') : null;

  if (!modal) return;

  window.openCvModal = function() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeCvModal = function() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.openCvModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', window.closeCvModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeCvModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      window.closeCvModal();
    }
  });

  if (printBtn && iframe) {
    printBtn.addEventListener('click', () => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (err) {
        window.open('cv.html', '_blank');
      }
    });
  }
}

