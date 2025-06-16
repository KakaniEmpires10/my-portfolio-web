let swiper = null;

// Swiper initialization
function initSwiper() {
  if (window.innerWidth <= 767 && !swiper) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    script.onload = () => {
      swiper = new Swiper(".skills-carousel", {
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
    };
    document.body.appendChild(script);
  }
}

// Counter animation
function animateCounter() {
  const counter = document.getElementById("experienceCounter");
  if (!counter) return;

  const target = 3;
  let current = 0;
  const increment = target / 30;

  function updateCounter() {
    if (current < target) {
      current += increment;
      counter.textContent = Math.floor(current);
      setTimeout(updateCounter, 30);
    } else {
      counter.textContent = target;
    }
  }

  updateCounter();
}

// Counter animation observer
function initCounterAnimation() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.id === "skills") {
        animateCounter();
        counterObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    counterObserver.observe(skillsSection);
  }
}

// Accordion functionality
function toggleAccordion(panelToActivate) {
  const buttons = panelToActivate.parentElement.querySelectorAll("button");
  const contents = panelToActivate.parentElement.querySelectorAll(".accordion-content");

  buttons.forEach((button) => {
    button.setAttribute("aria-expanded", false);
  });

  contents.forEach((content) => {
    content.setAttribute("aria-hidden", true);
  });

  panelToActivate.querySelector("button").setAttribute("aria-expanded", true);
  panelToActivate.querySelector(".accordion-content").setAttribute("aria-hidden", false);
}

function initAccordion() {
  const accordion = document.querySelector(".accordion");
  if (!accordion) return;

  accordion.addEventListener("click", (e) => {
    const activePanel = e.target.closest(".accordion-panel");
    if (!activePanel) return;
    toggleAccordion(activePanel);
  });
}

// Accessible tabs
function initAccessibleTabs() {
  const tabsContainer = document.querySelector(".about-tabs");
  if (tabsContainer && typeof AccessibleTabs !== 'undefined') {
    new AccessibleTabs(tabsContainer);
  }
}

// Resize handler
function handleResize() {
  if (window.innerWidth <= 767 && !document.querySelector(".swiper-initialized")) {
    initSwiper();
  }
}

// Make hero visible immediately
function showHero() {
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.opacity = "1";
    hero.style.transform = "translateY(0)";
  }
}

// Initialize homepage
function initHomepage() {
  createParticles(".hero"); // Create particles for hero section
  initSwiper();
  initCounterAnimation();
  initAccordion();
  initAccessibleTabs();
  showHero();
  
  // Setup resize listener
  window.addEventListener("resize", handleResize);
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", initHomepage);