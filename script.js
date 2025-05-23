const channelID = "2963348";
const fields = [1, 2, 3, 4];
const charts = {};



document.addEventListener("DOMContentLoaded", () => {
  fields.forEach((field) => fetchAndRenderChart(field));
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
});


function fetchAndRenderChart(fieldNum) {
  const url = https://api.thingspeak.com/channels/${channelID}/fields/${fieldNum}.json?results=30;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const labels = data.feeds.map(feed => feed.created_at);
      const values = data.feeds.map(feed => parseFloat(feed[field${fieldNum}]));

      const ctx = document.getElementById(chart${fieldNum}).getContext("2d");
      charts[fieldNum] = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: SENSOR ${fieldNum} (ppm),
            data: values,
            borderColor: getColor(fieldNum),
            backgroundColor: 'transparent',
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 1500
            }
          }
        }
      });
    });
}

function getColor(field) {
  const colors = ["#007BFF", "#28a745", "#ffc107", "#dc3545"];
  return colors[field - 1] || "#333";
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const btn = document.getElementById("themeToggle");
  const isDark = document.body.classList.contains("dark-mode");
  btn.textContent = isDark ? "🌞" : "🌙";
}

function downloadCSV() {
  const csvLink = https://thingspeak.com/channels/${channelID}/feed.csv;
  window.open(csvLink, "_blank");
}
