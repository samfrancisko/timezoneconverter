const predefinedTimeZones = {
  Sydney: "Australia/Sydney",
  Thailand: "Asia/Bangkok",
  "New Zealand": "Pacific/Auckland",
  India: "Asia/Kolkata",
};

const additionalTimeZoneSelect = document.getElementById("additional-timezone");
const resultsDiv = document.getElementById("results");
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Populate additional time zone dropdown
const allTimeZones = Intl.supportedValuesOf("timeZone");
allTimeZones.forEach((tz) => {
  const option = document.createElement("option");
  option.value = tz;
  option.textContent = tz;
  additionalTimeZoneSelect.appendChild(option);
});

// Function to convert time
function convertTime() {
  const inputTime = document.getElementById("time").value;
  if (!inputTime) {
    resultsDiv.textContent = "Please enter a valid time.";
    return;
  }

  const [hours, minutes] = inputTime.split(":").map(Number);
  const singaporeTime = new Date();
  singaporeTime.setHours(hours, minutes, 0, 0);

  let results = `<strong>Converted Times:</strong><br>`;
  for (const [city, timeZone] of Object.entries(predefinedTimeZones)) {
    results += `<strong>${city}:</strong> ${formatTime(singaporeTime, timeZone)}<br>`;
  }

  const additionalTimeZone = additionalTimeZoneSelect.value;
  if (additionalTimeZone) {
    results += `<strong>${additionalTimeZone}:</strong> ${formatTime(
      singaporeTime,
      additionalTimeZone
    )}<br>`;
  }

  resultsDiv.innerHTML = results;
}

// Format time for a specific time zone
function formatTime(date, timeZone) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// Dark mode toggle
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.querySelectorAll("input, select, button, .results").forEach((el) => {
    el.classList.toggle("dark-mode");
  });

  const isDarkMode = document.body.classList.contains("dark-mode");
  darkModeToggle.textContent = isDarkMode
    ? "Switch to Light Mode"
    : "Switch to Dark Mode";
});

// Auto-detect system dark mode
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("dark-mode");
  document.querySelectorAll("input, select, button, .results").forEach((el) => {
    el.classList.add("dark-mode");
  });
  darkModeToggle.textContent = "Switch to Light Mode";
}
