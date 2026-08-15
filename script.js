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
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    themeIcon.textContent = "☀";
    themeLabel.textContent = "Light Mode";
  } else {
    root.setAttribute("data-theme", "dark");
    themeIcon.textContent = "☾";
    themeLabel.textContent = "Dark Mode";
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

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const sundayWorkout = `
  <article class="card workout-card" id="sunday">
    <h3>Sunday: Complete Arms Day</h3>
    <p><strong>Focus:</strong> Biceps, Triceps, Brachialis</p>
    <p><strong>Workout Calories:</strong> 420</p>
    <p><strong>Post Workout Abs Calories:</strong> 80</p>
    <p><strong>Total Calories Burned:</strong> 500</p>
    <p><strong>Cardio:</strong> 20 min incline walk</p>

    <h4>Superset Workout</h4>
    <ul>
      <li><strong>Superset 1:</strong> Seated Dumbbell Curls — 4 x 8–10 — Biceps (Mass)</li>
      <li><strong>Superset 1:</strong> EZ-Bar Skull Crushers — 4 x 10–12 — Triceps (Mass)</li>
      <li><strong>Superset 2:</strong> Incline Dumbbell Curls — 4 x 12–15 — Biceps (Long Head)</li>
      <li><strong>Superset 2:</strong> Overhead Tricep Extension — 4 x 12–15 — Triceps (Long Head)</li>
      <li><strong>Superset 3:</strong> Preacher Curls — 4 x 10–12 — Biceps (Peak)</li>
      <li><strong>Superset 3:</strong> Tricep Pushdowns (Rope) — 4 x 12–15 — Triceps (Horseshoe)</li>
      <li><strong>Superset 4:</strong> Hammer Curls — 4 x 12–15 — Brachialis</li>
      <li><strong>Superset 4:</strong> Close-Grip Bench Press (DB) — 4 x 10–12 — Triceps (Mass)</li>
      <li><strong>Finisher:</strong> Cable Curls — 3 x 20–25 — Blood flow</li>
      <li><strong>Finisher:</strong> Cable Tricep Kickbacks — 3 x 20–25 — Blood flow</li>
    </ul>

    <p class="warning">
      Complete each superset by performing both exercises back-to-back, then rest.
      Use controlled reps and stop if you experience pain or nerve symptoms.
    </p>
  </article>
`;

function addSundayWorkout() {
  const workoutGrid = document.querySelector(".workout-grid");
  const saturdayWorkout = document.getElementById("saturday");

  if (workoutGrid && saturdayWorkout && !document.getElementById("sunday")) {
    saturdayWorkout.insertAdjacentHTML("afterend", sundayWorkout);
  }
}

function recalculatePlanValues() {
  const weeklyWorkoutCalories = 3180;
  const weeklyAbsCalories = 560;
  const weeklyTotalCalories = 3740;

  const progressValues = document.querySelectorAll(".progress-head strong");
  progressValues.forEach((value) => {
    if (value.textContent.includes("/ 6")) {
      value.textContent = "7 / 7";
    }
  });

  document.querySelectorAll(".progress-bar span").forEach((bar) => {
    const parentText = bar.closest(".progress-item")?.textContent || "";

    if (parentText.includes("Weekly Workouts")) {
      bar.style.width = "100%";
    }
  });

  const scheduleSummary = document.querySelector("#schedule .summary-card");
  if (scheduleSummary) {
    scheduleSummary.innerHTML = `
      <p><strong>Estimated Weekly Workout Calories Burned:</strong> ${weeklyWorkoutCalories} kcal from 7 training days</p>
      <p><strong>Estimated Weekly Total Including Post-Workout Abs:</strong> ${weeklyTotalCalories} kcal</p>
      <p><strong>Breakdown:</strong> Monday Upper A | Tuesday Upper B | Wednesday Upper C | Thursday Legs + Core | Friday Arms + Lower Chest | Saturday Dedicated Chest | Sunday Complete Arms Day</p>
    `;
  }

  const scheduleRows = document.querySelectorAll("#schedule tbody tr");
  const sundayRow = scheduleRows[scheduleRows.length - 1];

  if (sundayRow) {
    sundayRow.innerHTML = `
      <td>Sunday</td>
      <td>Complete Arms Day</td>
      <td>Biceps, Triceps, Brachialis</td>
      <td>420</td>
      <td>80</td>
      <td>500</td>
      <td>20 min incline walk</td>
    `;
  }

  const nonNegotiables = document.querySelector("#non-negotiables li");
  if (nonNegotiables && nonNegotiables.textContent.includes("6")) {
    nonNegotiables.textContent = "7 training days per week";
  }

  const quickLinks = document.querySelector(".quick-links");
  if (quickLinks && !quickLinks.querySelector('a[href="#sunday"]')) {
    quickLinks.insertAdjacentHTML("beforeend", '<a href="#sunday">Sunday</a>');
  }
}

addSundayWorkout();
recalculatePlanValues();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));

        const active = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );

        if (active) {
          active.classList.add("active");
        }
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
);

sections.forEach((section) => observer.observe(section));

const sundaySection = document.getElementById("sunday");
if (sundaySection) {
  observer.observe(sundaySection);
}