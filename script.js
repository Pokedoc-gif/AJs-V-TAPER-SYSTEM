const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.querySelector(".toggle-label");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navActions = document.getElementById("navActions");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id], header.hero[id]");

const root = document.documentElement;
const savedTheme = localStorage.getItem("theme") || "dark";

function setTheme(theme) {
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    themeIcon.textContent = "☀";
    themeLabel.textContent = "Light Mode";
  } else {
    root.setAttribute("data-theme", "dark");
    themeIcon.textContent = "☾";
    themeLabel.textContent = "Light Mode";
  }
  localStorage.setItem("theme", theme);
}

setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark");
});

mobileMenuBtn.addEventListener("click", () => {
  const open = navActions.classList.toggle("open");
  mobileMenuBtn.setAttribute("aria-expanded", String(open));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
);

sections.forEach((section) => observer.observe(section));