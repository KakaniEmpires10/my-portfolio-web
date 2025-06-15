// Theme Management
let isDarkMode = localStorage.getItem('isDarkMode') !== 'false'; // default to dark
let savedColors = JSON.parse(localStorage.getItem('themeColors')) || null;

const themeElements = {
  body: document.body,
  root: document.documentElement,
  themeToggle: null,
  colorOptions: null,
  nextLogos: null,
  prismaLogo: null
};

function initThemeElements() {
  themeElements.themeToggle = document.getElementById("themeToggle");
  themeElements.colorOptions = document.querySelectorAll(".color-option");
  themeElements.nextLogos = document.querySelectorAll("img[src='/public/image/logos/next-logo.png']");
  themeElements.prismaLogo = document.querySelector("img[src='/public/image/logos/prisma-logo.webp']");
}

function applyTheme() {
  if (isDarkMode) {
    themeElements.body.removeAttribute("data-theme");
    if (themeElements.themeToggle) {
      themeElements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    invertLogos(true);
  } else {
    themeElements.body.setAttribute("data-theme", "light");
    if (themeElements.themeToggle) {
      themeElements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    invertLogos(false);
  }
}

function invertLogos(invert) {
  const filterValue = invert ? "invert(100%)" : "invert(0)";
  
  themeElements.nextLogos.forEach(logo => {
    logo.style.filter = filterValue;
    logo.style.webkitFilter = filterValue;
  });
  
  if (themeElements.prismaLogo) {
    themeElements.prismaLogo.style.filter = filterValue;
    themeElements.prismaLogo.style.webkitFilter = filterValue;
  }
}

function applySavedColors() {
  if (savedColors) {
    themeElements.root.style.setProperty("--primary", savedColors.primary);
    themeElements.root.style.setProperty("--secondary", savedColors.secondary);
    themeElements.root.style.setProperty("--third", savedColors.third);
    
    // Mark the active color option
    themeElements.colorOptions.forEach(option => {
      option.classList.remove("active");
      if (option.dataset.primary === savedColors.primary) {
        option.classList.add("active");
      }
    });
  }
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  localStorage.setItem('isDarkMode', isDarkMode);
  applyTheme();
}

function setColors(primary, secondary, third) {
  const colors = { primary, secondary, third };
  localStorage.setItem('themeColors', JSON.stringify(colors));
  themeElements.root.style.setProperty("--primary", primary);
  themeElements.root.style.setProperty("--secondary", secondary);
  themeElements.root.style.setProperty("--third", third);
}

function initThemeToggle() {
  if (themeElements.themeToggle) {
    themeElements.themeToggle.addEventListener("click", toggleTheme);
  }
}

function initColorOptions() {
  themeElements.colorOptions.forEach(option => {
    option.addEventListener("click", () => {
      themeElements.colorOptions.forEach(opt => opt.classList.remove("active"));
      option.classList.add("active");

      const primary = option.dataset.primary;
      const secondary = option.dataset.secondary;
      const third = option.dataset.third;

      setColors(primary, secondary, third);
    });
  });
}

// Utility Functions
function setYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.innerHTML = new Date().getFullYear();
  }
}

function initScrollProgress() {
  const scrollProgress = document.getElementById("scrollProgress");
  if (!scrollProgress) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + "%";
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 0.6s ease";
    observer.observe(section);
  });
}

function createParticles(containerSelector = ".hero") {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.position = "absolute";
    particle.style.width = "3px";
    particle.style.height = "3px";
    particle.style.background = "var(--primary)";
    particle.style.borderRadius = "50%";
    particle.style.opacity = Math.random() * 0.5;
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 2 + "s";
    particle.style.pointerEvents = "none";
    container.appendChild(particle);
  }
}

// Initialize everything
function initMain() {
  initThemeElements();
  applyTheme();
  applySavedColors();
  initThemeToggle();
  initColorOptions();
  setYear();
  initScrollProgress();
  initScrollAnimations();
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", initMain);