// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const tabsContainer = document.querySelector(".about-tabs");
const accordion = document.querySelector(".accordion");
const year = new Date().getFullYear();
const nextLogos = document.querySelectorAll(
  "img[src='/public/image/logos/next-logo.png']"
);
const prismaLogo = document.querySelector(
  "img[src='/public/image/logos/prisma-logo.webp"
);
let isDarkMode = true;

// theme switcher
themeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    body.removeAttribute("data-theme");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    nextLogos.forEach((nextLogo) => {
      nextLogo.style.filter = "invert(100%)";
    });
    prismaLogo.style.filter = "invert(100%)";
  } else {
    body.setAttribute("data-theme", "light");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    nextLogos.forEach((nextLogo) => {
      nextLogo.style.filter = "invert(0)";
    });
    prismaLogo.style.filter = "invert(0)";
  }
});

// Color Theme Switcher
const colorOptions = document.querySelectorAll(".color-option");
const root = document.documentElement;

colorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // Remove active class from all options
    colorOptions.forEach((opt) => opt.classList.remove("active"));
    // Add active class to clicked option
    option.classList.add("active");

    // Update CSS variables
    const primary = option.dataset.primary;
    const secondary = option.dataset.secondary;
    const third = option.dataset.third;

    root.style.setProperty("--primary", primary);
    root.style.setProperty("--secondary", secondary);
    root.style.setProperty("--third", third);
  });
});

// Scroll Progress
window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scrollProgress");
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + "%";
});

// Initialize Swiper when on mobile view
function initSwiper() {
  if (window.innerWidth <= 767) {
    const swiper = new Swiper(".skills-carousel", {
      slidesPerView: "auto",
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
}

// Counter Animation
function animateCounter() {
  const counter = document.getElementById("experienceCounter");
  const target = 3;
  let current = 0;
  const increment = target / 30;

  const updateCounter = () => {
    if (current < target) {
      current += increment;
      counter.textContent = Math.floor(current);
      setTimeout(updateCounter, 30);
    } else {
      counter.textContent = target;
    }
  };

  updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.id === "skills") {
        animateCounter();
      }
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(50px)";
  section.style.transition = "all 0.6s ease";
  observer.observe(section);
});

// Hero section should be visible immediately
document.querySelector(".hero").style.opacity = "1";
document.querySelector(".hero").style.transform = "translateY(0)";

// Particle background effect
function createParticles() {
  const hero = document.querySelector(".hero");
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "3px";
    particle.style.height = "3px";
    particle.style.background = "var(--primary)";
    particle.style.borderRadius = "50%";
    particle.style.opacity = Math.random() * 0.5;
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animation = `float ${
      3 + Math.random() * 4
    }s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 2 + "s";
    hero.appendChild(particle);
  }
}

// accordion control
accordion.addEventListener("click", (e) => {
  const activePanel = e.target.closest(".accordion-panel");
  if (!activePanel) return;
  toggleAccordion(activePanel);
});

// accordion toggle function
function toggleAccordion(panelToActivate) {
  const buttons = panelToActivate.parentElement.querySelectorAll("button");
  const contents =
    panelToActivate.parentElement.querySelectorAll(".accordion-content");

  buttons.forEach((button) => {
    button.setAttribute("aria-expanded", false);
  });

  contents.forEach((content) => {
    content.setAttribute("aria-hidden", true);
  });

  panelToActivate.querySelector("button").setAttribute("aria-expanded", true);

  panelToActivate
    .querySelector(".accordion-content")
    .setAttribute("aria-hidden", false);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  document.getElementById("year").innerHTML = year;

  // inverse next js logo
  if (isDarkMode && nextLogos.length > 0) {
    nextLogos.forEach((nextLogo) => {
      nextLogo.style.filter = "invert(100%)";
      nextLogo.style.webkitFilter = "invert(100%)";
    });
  }

  // inverse prisma logo
  if (isDarkMode && prismaLogo) {
    prismaLogo.style.filter = "invert(100%)";
    prismaLogo.style.webkitFilter = "invert(100%)";
  }

  // Initialize accessible tabs
  if (tabsContainer) {
    new AccessibleTabs(tabsContainer);
  }

  initSwiper();
});

// Reinitialize on resize
window.addEventListener("resize", function () {
  if (
    window.innerWidth <= 767 &&
    !document.querySelector(".swiper-initialized")
  ) {
    initSwiper();
  }
});
