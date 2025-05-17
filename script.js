// 👉 CONFIGURATION
const channelID = 2963348;   // Replace with your ThingSpeak Channel ID
const sensorCount = 4;       // Number of MQ135 sensors you're using
const dataPoints = 20;       // Number of recent readings to display per chart

// 🌙 Theme Toggle Button
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// 🎯 Generate sensor cards
const dashboard = document.getElementById("dashboard");

for (let i = 1; i <= sensorCount; i++) {
  dashboard.innerHTML += `
    <div class="card">
      <h2>Sensor ${i}</h2>
      <div class="value" id="value${i}">--</div>
      <canvas id="chart${i}"></canvas>
    </div>
  `;
  fetchAndDisplaySensorData(i);
}

// 📊 Fetch data & draw charts
function fetchAndDisplaySensorData(fieldNum) {
  const url = `https://api.thingspeak.com/channels/${channelID}/fields/${fieldNum}.json?results=${dataPoints}`;

  fetch(url)
    .then(res => res.json())
    .then
