const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.querySelector(".toggle-label");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navActions = document.getElementById("navActions");
const navLinks = document.querySelectorAll(".nav-links a");
const backToTop = document.getElementById("backToTop");

const bodyWeightKg = 80;
const resistanceMET = 6;
const inclineWalkMET = 5;
const lissWalkMET = 3.5;
const absCaloriesPerWorkout = 80;

const exerciseLinks = {
  "Weighted Wide-grip Pull-ups": "pull-ups",
  "Incline Dumbbell Press": "incline-press",
  "Chest-supported Machine Row": "machine-row",
  "Heavy Lateral Raises (DB)": "lateral-raises",
  "Lateral Raises (Volume)": "lateral-raises",
  "Lateral Raises (Moderate)": "lateral-raises",
  "Lateral Raises (Dropset)": "lateral-raises",
  "Face Pulls": "face-pulls",
  "Dumbbell Pullovers": "pullovers",
  "Dumbbell Pullovers (Slow Tempo)": "pullovers",
  "Straight-arm Pulldowns": "straight-arm-pulldowns",
  "Seated Cable Rows (V-grip)": "seated-cable-rows",
  "Close-grip Pulldowns": "close-grip-pulldowns",
  "Flat Dumbbell Bench Press": "flat-bench-press",
  "Rear Delt Machine Flyes": "rear-delt-flyes",
  "Incline Dumbbell Press (light)": "incline-press-light",
  "Hammer Curls": "hammer-curls",
  "Incline Dumbbell Curls": "incline-dumbbell-curls",
  "Overhead Tricep Extension": "overhead-tricep-extension",
  "Lat Pulldowns (Wide, High Reps)": "lat-pulldowns",
  "Cable Cross-overs": "crossovers",
  "Cable Cross-overs (Flat/Mid)": "crossovers",
  "Seated Dumbbell Shoulder Press": "shoulder-press",
  "Leg Press (Feet High & Wide)": "leg-press",
  "Lying Leg Curls": "lying-leg-curls",
  "Leg Extensions": "leg-extensions",
  "Glute Bridges (Bodyweight)": "glute-bridges",
  "Seated Calf Raises": "seated-calf-raises",
  "Plank": "plank",
  "Side Plank": "side-plank",
  "Seated Arnold Press": "arnold-press",
  "EZ-Bar Skull Crushers": "skull-crushers",
  "Preacher Curls": "preacher-curls",
  "Tricep Pushdowns (Rope)": "pushdowns",
  "Dumbbell Curls (Strict)": "dumbbell-curls",
  "High-to-Low Cable Cross-overs": "high-to-low-crossovers",
  "Dips": "dips",
  "Dips (Bodyweight or Weighted)": "dips",
  "Decline Dumbbell Press": "decline-press",
  "Push-ups": "push-ups",
  "Seated Dumbbell Curls": "seated-dumbbell-curls",
  "Close-grip Bench Press (DB)": "close-grip-bench-press-db",
  "Cable Curls": "cable-curls",
  "Cable Tricep Kickbacks": "cable-tricep-kickbacks"
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}

function setTheme(theme) {
  const isLight = theme === "light";
  root.setAttribute("data-theme", isLight ? "light" : "dark");

  if (themeIcon) themeIcon.textContent = isLight ? "☀" : "☾";
  if (themeLabel) themeLabel.textContent = isLight ? "Light Mode" : "Dark Mode";

  localStorage.setItem("theme", isLight ? "light" : "dark");
}

setTheme(localStorage.getItem("theme") || "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    setTheme(isDark ? "light" : "dark");
  });
}

if (mobileMenuBtn && navActions) {
  mobileMenuBtn.addEventListener("click", () => {
    const open = navActions.classList.toggle("open");
    mobileMenuBtn.setAttribute("aria-expanded", String(open));
  });
}

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const workouts = [
  {
    id: "monday",
    title: "Monday: Upper A — Heavy Width + Chest Starter + Arms",
    focus: "Lats, Upper Chest, Side Delts, Biceps and Triceps",
    cardio: "20 min incline walk",
    cardioMinutes: 20,
    cardioMET: inclineWalkMET,
    exercises: [
      "Weighted Wide-grip Pull-ups — 3 x 6–8 — 60s — Lats = V-taper width. Hang fully. Squeeze at top.",
      "Incline Dumbbell Press — 3 x 10–12 — 60s — Upper chest. 30° incline. No arch.",
      "Chest-supported Machine Row — 3 x 10–12 — 45s — Mid-back thickness. Last set: dropset.",
      "Heavy Lateral Raises (DB) — 4 x 8–10 — 45s — Side delts. Last set: dropset.",
      "Face Pulls — 3 x 15–20 — 45s — Rear delts + rotator cuff health.",
      "Dumbbell Pullovers — 3 x 12–15 — 45s — Lats + chest stretch.",
      "Seated Dumbbell Curls — 3 x 10–12 — 45s — Biceps. Seated, back supported. No swinging.",
      "Tricep Pushdowns (Rope) — 3 x 12–15 — 45s — Triceps. Elbows locked at sides. Squeeze at bottom.",
      "Finisher: Straight-arm Pulldowns — 2 x 15–20 — 30s — Lat burnout. Dropset on final set.",
      "Finisher: Dips — 3 x 8–12 — 45s — Daily finisher. Lean forward slightly for chest + triceps."
    ]
  },
  {
    id: "tuesday",
    title: "Tuesday: Upper B — Heavy Thickness + Mid-Chest + Arms",
    focus: "Back, Flat Chest, Delts, Biceps and Triceps",
    cardio: "20 min incline walk",
    cardioMinutes: 20,
    cardioMET: inclineWalkMET,
    exercises: [
      "Seated Cable Rows (V-grip) — 3 x 8–10 — 60s — Mid-back. Last set: dropset.",
      "Close-grip Pulldowns — 3 x 10–12 — 45s — Lats + biceps. Squeeze hard.",
      "Flat Dumbbell Bench Press — 3 x 10–12 — 60s — Middle chest. No arch.",
      "Lateral Raises (Volume) — 4 x 15–20 — 45s — Side delt pump.",
      "Rear Delt Machine Flyes — 3 x 15–20 — 45s — Rear delts.",
      "Incline Dumbbell Press (light) — 3 x 12–15 — 45s — Upper chest burnout. Last set: dropset.",
      "Incline Dumbbell Curls — 3 x 12–15 — 45s — Biceps. Incline bench (45°). Stretch the long head.",
      "Overhead Tricep Extension — 3 x 12–15 — 45s — Triceps. Seated with back support. One DB with both hands.",
      "Hammer Curls — 3 x 10–12 — 45s — Biceps. Last set: dropset.",
      "Finisher: Dips — 3 x 8–12 — 45s — Daily finisher."
    ]
  },
  {
    id: "wednesday",
    title: "Wednesday: Upper C — Pump & Stretch + Inner Chest + Arms",
    focus: "Lats, Inner Chest, Shoulders, Biceps and Triceps",
    cardio: "20 min incline walk",
    cardioMinutes: 20,
    cardioMET: inclineWalkMET,
    exercises: [
      "Lat Pulldowns (Wide, High Reps) — 3 x 15–20 — 45s — Light weight. Full stretch.",
      "Dumbbell Pullovers (Slow Tempo) — 3 x 15–20 — 45s — 3-second negative. Deep lat stretch.",
      "Lateral Raises (Moderate) — 3 x 12–15 — 45s — Side delts. Controlled tempo.",
      "Cable Cross-overs — 3 x 15–20 — 45s — Inner chest. Squeeze at center.",
      "Seated Dumbbell Shoulder Press — 3 x 10–12 — 60s — Shoulders. Back supported.",
      "Hammer Curls — 3 x 12–15 — 45s — Biceps. Neutral grip. Builds brachialis.",
      "Close-grip Bench Press (DB) — 3 x 10–12 — 45s — Triceps. Flat bench, feet flat.",
      "Finisher: Face Pulls — 2 x 20 — 30s — Rear delt burnout.",
      "Finisher: Dips — 3 x 8–12 — 45s — Daily finisher."
    ]
  },
  {
    id: "thursday",
    title: "Thursday: Legs + Core + Arms",
    focus: "Lower Body, Core, Biceps and Triceps",
    cardio: "20 min incline walk",
    cardioMinutes: 20,
    cardioMET: inclineWalkMET,
    exercises: [
      "Leg Press (Feet High & Wide) — 4 x 12–15 — 60s — Back braced. Hamstring focus.",
      "Lying Leg Curls — 4 x 12–15 — 45s — Hamstrings. Control negative.",
      "Leg Extensions — 3 x 15–20 — 45s — Quads. Light weight.",
      "Glute Bridges (Bodyweight) — 3 x 25 — 45s — Glute activation.",
      "Seated Calf Raises — 4 x 15–20 — 45s — Calves.",
      "Preacher Curls — 3 x 10–12 — 45s — Biceps. Strict form.",
      "EZ-Bar Skull Crushers — 3 x 12–15 — 45s — Triceps. Lower to forehead.",
      "Core Finisher: Plank — 3 x 60s — 45s — Core.",
      "Core Finisher: Side Plank — 3 x 45s per side — 45s — Core.",
      "Finisher: Dips — 3 x 8–12 — 45s — Daily finisher."
    ]
  },
  {
    id: "friday",
    title: "Friday: Arms + Lower Chest Contour",
    focus: "Lower Chest, Arms, Side Delts",
    cardio: "20 min incline walk",
    cardioMinutes: 20,
    cardioMET: inclineWalkMET,
    exercises: [
      "Lateral Raises (Dropset) — 4 x 10+10+10 — 30s — Side delt burnout.",
      "High-to-Low Cable Cross-overs — 4 x 12–15 — 45s — Lower chest.",
      "Seated Arnold Press — 3 x 10–12 — 60s — Shoulders. Back supported.",
      "EZ-Bar Skull Crushers — 3 x 12–15 — 45s — Triceps. No arch.",
      "Preacher Curls — 3 x 10–12 — 45s — Biceps. Last set: dropset.",
      "Tricep Pushdowns (Rope) — 3 x 12–15 — 45s — Triceps. Squeeze at bottom.",
      "Dumbbell Curls (Strict) — 3 x 10–12 — 45s — Biceps. Last set: dropset.",
      "Finisher: Dips — 3 x 8–12 — 45s — Daily finisher."
    ]
  },
  {
    id: "saturday",
    title: "Saturday: Dedicated Chest Day + Arms Finisher",
    focus: "All Chest, Biceps and Triceps Pump",
    cardio: "30–40 min LISS walk",
    cardioMinutes: 35,
    cardioMET: lissWalkMET,
    exercises: [
      "Decline Dumbbell Press — 4 x 10–12 — 60s — Lower chest.",
      "High-to-Low Cable Cross-overs — 4 x 12–15 — 45s — Lower chest.",
      "Dips (Bodyweight or Weighted) — 4 x 8–12 — 60s — Lower chest + triceps.",
      "Incline Dumbbell Press (light) — 3 x 15–20 — 45s — Upper chest pump.",
      "Cable Cross-overs (Flat/Mid) — 3 x 15–20 — 45s — Inner chest.",
      "Cable Curls — 3 x 20–25 — 30s — Biceps finisher.",
      "Cable Tricep Kickbacks — 3 x 20–25 — 30s — Triceps finisher.",
      "Finisher: Push-ups — 3 x AMRAP — 30s — Chest burnout.",
      "Finisher: Dips — 3 x 8–12 — 45s — Daily finisher."
    ]
  },
  {
    id: "sunday",
    title: "Sunday: Complete Rest",
    focus: "Recovery",
    cardio: "Nerve glides only if stiff",
    cardioMinutes: 0,
    cardioMET: 0,
    rest: true,
    exercises: []
  }
];

function caloriesFromMET(met, minutes) {
  return Math.round((met * 3.5 * bodyWeightKg * minutes) / 200);
}

function parseRestSeconds(exercise) {
  const match = exercise.match(/—\s*(\d+)s\s*—/);
  return match ? Number(match[1]) : 45;
}

function parseSets(exercise) {
  const match = exercise.match(/—\s*(\d+)\s*x\s*/i);
  return match ? Number(match[1]) : 3;
}

function calculateWorkoutCalories(workout) {
  if (workout.rest) return 0;

  const exerciseMinutes = workout.exercises.reduce((total, exercise) => {
    const sets = parseSets(exercise);
    const restSeconds = parseRestSeconds(exercise);
    const setWorkSeconds = 40;
    const transitionSeconds = 45;

    return total
      + (sets * setWorkSeconds)
      + ((sets - 1) * restSeconds)
      + transitionSeconds;
  }, 0) / 60;

  const resistanceCalories = caloriesFromMET(resistanceMET, exerciseMinutes);
  const cardioCalories = caloriesFromMET(workout.cardioMET, workout.cardioMinutes);

  return resistanceCalories + cardioCalories;
}

workouts.forEach((workout) => {
  workout.calories = calculateWorkoutCalories(workout);
  workout.abs = workout.rest ? 0 : absCaloriesPerWorkout;
});

function linkExercise(exercise) {
  const separator = " — ";
  const [name, ...details] = exercise.split(separator);
  const cleanName = name.replace(/^Finisher:\s*/, "").replace(/^Core Finisher:\s*/, "");
  const libraryId = exerciseLinks[cleanName];

  const label = libraryId
    ? `<a href="#${libraryId}">${escapeHtml(cleanName)}</a>`
    : escapeHtml(cleanName);

  const prefix = name.startsWith("Finisher:")
    ? "Finisher: "
    : name.startsWith("Core Finisher:")
      ? "Core Finisher: "
      : "";

  return `<li>${prefix}${label}${details.length ? `${separator}${escapeHtml(details.join(separator))}` : ""}</li>`;
}

function renderWorkoutCards() {
  const grid = document.querySelector(".workout-grid");
  if (!grid) return;

  grid.innerHTML = workouts.map((workout) => {
    if (workout.rest) {
      return `
        <article class="card workout-card" id="${workout.id}">
          <h3>${escapeHtml(workout.title)}</h3>
          <p><strong>Focus:</strong> ${escapeHtml(workout.focus)}</p>
          <p><strong>Cardio:</strong> ${escapeHtml(workout.cardio)}</p>
          <p class="warning">Complete rest day. Perform nerve glides only if stiff.</p>
        </article>
      `;
    }

    return `
      <article class="card workout-card" id="${workout.id}">
        <h3>${escapeHtml(workout.title)}</h3>
        <p><strong>Focus:</strong> ${escapeHtml(workout.focus)}</p>
        <p><strong>Estimated Workout Calories:</strong> ${workout.calories} kcal</p>
        <p><strong>Post Workout Abs Calories:</strong> ${workout.abs} kcal</p>
        <p><strong>Total Estimated Calories:</strong> ${workout.calories + workout.abs} kcal</p>
        <p><strong>Cardio:</strong> ${escapeHtml(workout.cardio)}</p>
        <h4>The Workout</h4>
        <ul>${workout.exercises.map(linkExercise).join("")}</ul>
      </article>
    `;
  }).join("");
}

function renderSchedule() {
  const tbody = document.querySelector("#schedule tbody");
  if (!tbody) return;

  tbody.innerHTML = workouts.map((workout) => `
    <tr>
      <td>${escapeHtml(workout.title.split(":")[0])}</td>
      <td>${escapeHtml(workout.title.split(": ").slice(1).join(": "))}</td>
      <td>${escapeHtml(workout.focus)}</td>
      <td>${workout.rest ? "—" : `${workout.calories} kcal`}</td>
      <td>${workout.rest ? "—" : `${workout.abs} kcal`}</td>
      <td>${workout.rest ? "—" : `${workout.calories + workout.abs} kcal`}</td>
      <td>${escapeHtml(workout.cardio)}</td>
    </tr>
  `).join("");
}

function updatePlanLabels() {
  const trainingDays = workouts.filter((workout) => !workout.rest).length;
  const frequency = document.querySelector("#training-frequency");
  const absInstruction = document.querySelector("#abs p strong");

  if (frequency) frequency.textContent = `${trainingDays} training days per week`;
  if (absInstruction) {
    absInstruction.textContent = "Do this after each training-day workout; skip it on Sunday rest";
  }
}

function recalculatePlanValues() {
  const trainingWorkouts = workouts.filter((workout) => !workout.rest);
  const weeklyWorkoutCalories = trainingWorkouts.reduce((total, workout) => total + workout.calories, 0);
  const weeklyAbsCalories = trainingWorkouts.reduce((total, workout) => total + workout.abs, 0);
  const weeklyTotalCalories = weeklyWorkoutCalories + weeklyAbsCalories;
  const scheduleSummary = document.querySelector("#schedule .summary-card");

  if (scheduleSummary) {
    scheduleSummary.innerHTML = `
      <p><strong>Estimated Weekly Workout Calories Burned:</strong> ${weeklyWorkoutCalories} kcal from ${trainingWorkouts.length} training days</p>
      <p><strong>Estimated Weekly Post-Workout Abs Calories:</strong> ${weeklyAbsCalories} kcal</p>
      <p><strong>Estimated Weekly Total Burned:</strong> ${weeklyTotalCalories} kcal</p>
      <p><strong>Calculation basis:</strong> ${bodyWeightKg} kg body weight, ${resistanceMET} MET resistance training, and cardio-specific MET estimates.</p>
      <p><strong>Sunday:</strong> Complete rest. Nerve glides only if stiff.</p>
    `;
  }

  document.querySelectorAll(".progress-item").forEach((item) => {
    const label = item.querySelector(".progress-head span")?.textContent.trim();
    const value = item.querySelector(".progress-head strong");
    const bar = item.querySelector(".progress-bar span");

    if (label === "Weekly Workouts" && value && bar) {
      value.textContent = `${trainingWorkouts.length} / ${trainingWorkouts.length}`;
      bar.style.width = "100%";
    }
  });
}

function setupNavigationObserver() {
  const sections = document.querySelectorAll("section[id], header.hero[id]");
  const workoutCards = document.querySelectorAll(".workout-card");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => link.classList.remove("active"));
          const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);

          if (activeLink) activeLink.classList.add("active");
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    workoutCards.forEach((card) => observer.observe(card));
  } else {
    const updateActiveNavigation = () => {
      let currentId = "home";

      document.querySelectorAll("header.hero[id], section[id], .workout-card[id]").forEach((section) => {
        if (window.scrollY >= section.offsetTop - 180) currentId = section.id;
      });

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
      });
    };

    window.addEventListener("scroll", updateActiveNavigation);
    updateActiveNavigation();
  }
}

renderWorkoutCards();
renderSchedule();
updatePlanLabels();
recalculatePlanValues();
setupNavigationObserver();