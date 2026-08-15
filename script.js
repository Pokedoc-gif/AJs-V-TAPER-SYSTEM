const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.querySelector(".toggle-label");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navActions = document.getElementById("navActions");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id], header.hero[id]");
const backToTop = document.getElementById("backToTop");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "dark";

function setTheme(theme) {
  const isLight = theme === "light";

  root.setAttribute("data-theme", isLight ? "light" : "dark");
  themeIcon.textContent = isLight ? "☀" : "☾";
  themeLabel.textContent = isLight ? "Light Mode" : "Dark Mode";

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

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function numberFromCell(cell) {
  return Number(cell?.textContent.replace(/[^\d.-]/g, "")) || 0;
}

function recalculatePlanValues() {
  const scheduleRows = [...document.querySelectorAll("#schedule tbody tr")];

  let weeklyWorkoutCalories = 0;
  let weeklyTotalCalories = 0;
  let trainingDays = 0;

  scheduleRows.forEach((row) => {
    const cells = row.querySelectorAll("td");

    if (cells.length < 6) return;

    const workoutCalories = numberFromCell(cells[3]);
    const absCalories = numberFromCell(cells[4]);
    const totalCalories = workoutCalories + absCalories;

    cells[5].textContent = String(totalCalories);

    weeklyWorkoutCalories += workoutCalories;
    weeklyTotalCalories += totalCalories;

    if (workoutCalories > 0) {
      trainingDays += 1;
    }
  });

  const weeklyAbsCalories = weeklyTotalCalories - weeklyWorkoutCalories;
  const scheduleSummary = document.querySelector("#schedule .summary-card");

  if (scheduleSummary) {
    scheduleSummary.innerHTML = `
      <p><strong>Estimated Weekly Workout Calories Burned:</strong> ${weeklyWorkoutCalories} kcal from ${trainingDays} training days</p>
      <p><strong>Estimated Weekly Post-Workout Abs Calories:</strong> ${weeklyAbsCalories} kcal</p>
      <p><strong>Estimated Weekly Total Burned:</strong> ${weeklyTotalCalories} kcal</p>
      <p><strong>Breakdown:</strong> Monday Upper A | Tuesday Upper B | Wednesday Upper C | Thursday Legs + Core | Friday Arms + Lower Chest | Saturday Dedicated Chest | Sunday Complete Arms Day</p>
    `;
  }

  const progressItems = document.querySelectorAll(".progress-item");

  progressItems.forEach((item) => {
    const label = item.querySelector(".progress-head span")?.textContent.trim();
    const value = item.querySelector(".progress-head strong");
    const bar = item.querySelector(".progress-bar span");

    if (label === "Weekly Workouts" && value && bar) {
      value.textContent = `${trainingDays} / ${trainingDays}`;
      bar.style.width = trainingDays > 0 ? "100%" : "0%";
    }
  });

  const trainingFrequency = document.querySelector(
    "#non-negotiables #training-frequency"
  );

  if (trainingFrequency) {
    trainingFrequency.textContent = `${trainingDays} training days per week`;
  }
}

recalculatePlanValues();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => link.classList.remove("active"));

      const activeLink = document.querySelector(
        `.nav-links a[href="#${entry.target.id}"]`
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
);

sections.forEach((section) => observer.observe(section));

document.querySelectorAll(".workout-card").forEach((workout) => {
  observer.observe(workout);
});