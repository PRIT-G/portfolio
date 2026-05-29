document.addEventListener("DOMContentLoaded", () => {
  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = hamburger.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.querySelector("i").classList.remove("fa-times");
      hamburger.querySelector("i").classList.add("fa-bars");
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").slice(1) === current) {
        item.classList.add("active");
      }
    });
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll(".section-reveal");

  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  };

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver(
    revealCallback,
    revealOptions,
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // Typing Effect for Hero Section
  const typingText = document.querySelector(".typing-text");
  const phrases = [
    "Computer Engineering Student",
    "Aspiring Software Developer",
    "Problem Solver",
  ];
  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;
      typeSpeed = 50;
    } else {
      typingText.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && letterIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end of phrase
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before next phrase
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing effect after a small delay
  setTimeout(type, 1000);
});
