const channelID = 2963348;
const sensorCount = 4;
const dataPoints = 20; // last 20 readings

const dashboard = document.getElementById("dashboard");
const themeToggle = document.getElementById("theme-toggle");

// Toggle Dark/Light Mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Create cards dynamically
for (let i = 1; i <= sensorCount; i++) {
  dashboard.innerHTML += `
    <div class="card">
      <h2>Sensor ${i}</h2>
      <div class="value" id="value${i}">--</div>
      <canvas id="chart${i}"></canvas>
    </div>
  `;
  fetchAndPlot(i);
}

// Fetch ThingSpeak data & plot with Chart.js
function fetchAndPlot(fieldNum) {
  const url = `https://api.thingspeak.com/channels/${channelID}/fields/${fieldNum}.json?results=${dataPoints}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const values = data.feeds.map(feed => parseFloat(feed[`field${fieldNum}`]));
      const labels = data.feeds.map(feed => new Date(feed.created_at).toLocaleTimeString());

      // Update latest value
      const latest = values[values.length - 1];
      document.getElementById(`value${fieldNum}`).textContent = latest ?? "--";

      // Draw Chart
      new Chart(document.getElementById(`chart${fieldNum}`), {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: `Sensor ${fieldNum}`,
            data: values,
            fill: true,
            borderColor: "#007acc",
            backgroundColor: "rgba(0,122,204,0.1)",
            tension: 0.4,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    })
    .catch(err => console.error("Error loading data:", err));
}
