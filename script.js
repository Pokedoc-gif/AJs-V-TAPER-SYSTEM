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

const libraryIds = {
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
  Plank: "plank",
  "Side Plank": "side-plank",
  "Seated Arnold Press": "arnold-press",
  "EZ-Bar Skull Crushers": "skull-crushers",
  "Preacher Curls": "preacher-curls",
  "Tricep Pushdowns (Rope)": "pushdowns",
  "Dumbbell Curls (Strict)": "dumbbell-curls",
  "High-to-Low Cable Cross-overs": "high-to-low-crossovers",
  Dips: "dips",
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

function getSavedTheme() {
  try {
    return localStorage.getItem("theme") || "dark";
  } catch {
    return "dark";
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Theme still applies for the current page session.
  }
}

function setTheme(theme) {
  const isLight = theme === "light";
  const activeTheme = isLight ? "light" : "dark";

  root.setAttribute("data-theme", activeTheme);

  if (themeIcon) themeIcon.textContent = isLight ? "☀" : "☾";
  if (themeLabel) themeLabel.textContent = isLight ? "Light Mode" : "Dark Mode";

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
  }

  saveTheme(activeTheme);
}

setTheme(getSavedTheme());

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

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!navActions || !mobileMenuBtn) return;

    navActions.classList.remove("open");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  });
});

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function exercise(name, sets, reps, rest, notes) {
  return {
    name,
    sets,
    reps,
    rest,
    notes,
    libraryId: libraryIds[name] || null
  };
}

function workoutVideoUrl(title) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${title.replace(/^[^:]+:\s*/, "")} workout how to`
  )}`;
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
      exercise("Weighted Wide-grip Pull-ups", 3, "6–8", 60, "Lats = V-taper width. Hang fully. Squeeze at top."),
      exercise("Incline Dumbbell Press", 3, "10–12", 60, "Upper chest. 30° incline. No arch."),
      exercise("Chest-supported Machine Row", 3, "10–12", 45, "Mid-back thickness. Last set: dropset."),
      exercise("Heavy Lateral Raises (DB)", 4, "8–10", 45, "Side delts. Last set: dropset."),
      exercise("Face Pulls", 3, "15–20", 45, "Rear delts + rotator cuff health."),
      exercise("Dumbbell Pullovers", 3, "12–15", 45, "Lats + chest stretch."),
      exercise("Seated Dumbbell Curls", 3, "10–12", 45, "Biceps. Seated, back supported. No swinging."),
      exercise("Tricep Pushdowns (Rope)", 3, "12–15", 45, "Triceps. Elbows locked at sides. Squeeze at bottom."),
      exercise("Straight-arm Pulldowns", 2, "15–20", 30, "Lat burnout. Dropset on final set."),
      exercise("Dips", 3, "8–12", 45, "Daily finisher. Lean forward slightly for chest + triceps.")
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
      exercise("Seated Cable Rows (V-grip)", 3, "8–10", 60, "Mid-back. Last set: dropset."),
      exercise("Close-grip Pulldowns", 3, "10–12", 45, "Lats + biceps. Squeeze hard."),
      exercise("Flat Dumbbell Bench Press", 3, "10–12", 60, "Middle chest. No arch."),
      exercise("Lateral Raises (Volume)", 4, "15–20", 45, "Side delt pump."),
      exercise("Rear Delt Machine Flyes", 3, "15–20", 45, "Rear delts."),
      exercise("Incline Dumbbell Press (light)", 3, "12–15", 45, "Upper chest burnout. Last set: dropset."),
      exercise("Incline Dumbbell Curls", 3, "12–15", 45, "Biceps. Incline bench (45°). Stretch the long head."),
      exercise("Overhead Tricep Extension", 3, "12–15", 45, "Triceps. Seated with back support. One DB with both hands."),
      exercise("Hammer Curls", 3, "10–12", 45, "Biceps. Last set: dropset."),
      exercise("Dips", 3, "8–12", 45, "Daily finisher.")
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
      exercise("Lat Pulldowns (Wide, High Reps)", 3, "15–20", 45, "Light weight. Full stretch."),
      exercise("Dumbbell Pullovers (Slow Tempo)", 3, "15–20", 45, "3-second negative. Deep lat stretch."),
      exercise("Lateral Raises (Moderate)", 3, "12–15", 45, "Side delts. Controlled tempo."),
      exercise("Cable Cross-overs", 3, "15–20", 45, "Inner chest. Squeeze at center."),
      exercise("Seated Dumbbell Shoulder Press", 3, "10–12", 60, "Shoulders. Back supported."),
      exercise("Hammer Curls", 3, "12–15", 45, "Biceps. Neutral grip. Builds brachialis."),
      exercise("Close-grip Bench Press (DB)", 3, "10–12", 45, "Triceps. Flat bench, feet flat."),
      exercise("Face Pulls", 2, "20", 30, "Rear delt burnout."),
      exercise("Dips", 3, "8–12", 45, "Daily finisher.")
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
      exercise("Leg Press (Feet High & Wide)", 4, "12–15", 60, "Back braced. Hamstring focus."),
      exercise("Lying Leg Curls", 4, "12–15", 45, "Hamstrings. Control negative."),
      exercise("Leg Extensions", 3, "15–20", 45, "Quads. Light weight."),
      exercise("Glute Bridges (Bodyweight)", 3, "25", 45, "Glute activation."),
      exercise("Seated Calf Raises", 4, "15–20", 45, "Calves."),
      exercise("Preacher Curls", 3, "10–12", 45, "Biceps. Strict form."),
      exercise("EZ-Bar Skull Crushers", 3, "12–15", 45, "Triceps. Lower to forehead."),
      exercise("Plank", 3, "60s", 45, "Core."),
      exercise("Side Plank", 3, "45s per side", 45, "Core."),
      exercise("Dips", 3, "8–12", 45, "Daily finisher.")
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
      exercise("Lateral Raises (Dropset)", 4, "10+10+10", 30, "Side delt burnout."),
      exercise("High-to-Low Cable Cross-overs", 4, "12–15", 45, "Lower chest."),
      exercise("Seated Arnold Press", 3, "10–12", 60, "Shoulders. Back supported."),
      exercise("EZ-Bar Skull Crushers", 3, "12–15", 45, "Triceps. No arch."),
      exercise("Preacher Curls", 3, "10–12", 45, "Biceps. Last set: dropset."),
      exercise("Tricep Pushdowns (Rope)", 3, "12–15", 45, "Triceps. Squeeze at bottom."),
      exercise("Dumbbell Curls (Strict)", 3, "10–12", 45, "Biceps. Last set: dropset."),
      exercise("Dips", 3, "8–12", 45, "Daily finisher.")
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
      exercise("Decline Dumbbell Press", 4, "10–12", 60, "Lower chest."),
      exercise("High-to-Low Cable Cross-overs", 4, "12–15", 45, "Lower chest."),
      exercise("Dips (Bodyweight or Weighted)", 4, "8–12", 60, "Lower chest + triceps."),
      exercise("Incline Dumbbell Press (light)", 3, "15–20", 45, "Upper chest pump."),
      exercise("Cable Cross-overs (Flat/Mid)", 3, "15–20", 45, "Inner chest."),
      exercise("Cable Curls", 3, "20–25", 30, "Biceps finisher."),
      exercise("Cable Tricep Kickbacks", 3, "20–25", 30, "Triceps finisher."),
      exercise("Push-ups", 3, "AMRAP", 30, "Chest burnout."),
      exercise("Dips", 3, "8–12", 45, "Daily finisher.")
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

function calculateWorkoutCalories(workout) {
  if (workout.rest) return 0;

  const exerciseMinutes = workout.exercises.reduce((total, item) => {
    const setWorkSeconds = 40;
    const transitionSeconds = 45;

    return total
      + (item.sets * setWorkSeconds)
      + ((item.sets - 1) * item.rest)
      + transitionSeconds;
  }, 0) / 60;

  const resistanceCalories = caloriesFromMET(resistanceMET, exerciseMinutes);
  const cardioCalories = caloriesFromMET(workout.cardioMET, workout.cardioMinutes);

  return resistanceCalories + cardioCalories;
}

workouts.forEach((workout) => {
  workout.calories = calculateWorkoutCalories(workout);
  workout.abs = workout.rest ? 0 : absCaloriesPerWorkout;
  workout.videoUrl = workoutVideoUrl(workout.title);
});

function renderExercise(item) {
  const label = item.libraryId
    ? `<a href="#${item.libraryId}">${escapeHtml(item.name)}</a>`
    : escapeHtml(item.name);

  return `
    <li>
      ${label} — ${item.sets} x ${escapeHtml(item.reps)} — ${item.rest}s —
      ${escapeHtml(item.notes)}
    </li>
  `;
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
        <p>
          <a class="cta-secondary" href="${workout.videoUrl}" target="_blank" rel="noopener noreferrer">
            Watch Workout How-To Videos
          </a>
        </p>
        <h4>The Workout</h4>
        <ul>${workout.exercises.map(renderExercise).join("")}</ul>
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
      <td>
        ${escapeHtml(workout.title.split(": ").slice(1).join(": "))}
        <br />
        <a href="${workout.videoUrl}" target="_blank" rel="noopener noreferrer">
          How-to videos
        </a>
      </td>
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
    absInstruction.textContent =
      "Do this after each training-day workout; skip it on Sunday rest";
  }
}

function recalculatePlanValues() {
  const trainingWorkouts = workouts.filter((workout) => !workout.rest);
  const weeklyWorkoutCalories = trainingWorkouts.reduce(
    (total, workout) => total + workout.calories,
    0
  );
  const weeklyAbsCalories = trainingWorkouts.reduce(
    (total, workout) => total + workout.abs,
    0
  );
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

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const activeLink = document.querySelector(
            `.nav-links a[href="#${entry.target.id}"]`
          );

          // Workout cards and sections without nav links do not clear the active link.
          if (!activeLink) return;

          navLinks.forEach((link) => link.classList.remove("active"));
          activeLink.classList.add("active");
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    const updateActiveNavigation = () => {
      let currentId = "home";

      document.querySelectorAll("header.hero[id], section[id]").forEach((section) => {
        if (window.scrollY >= section.offsetTop - 180) currentId = section.id;
      });

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${currentId}`
        );
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