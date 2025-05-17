window.onload = function() {
  const channelID = 2963348;
  const sensorCount = 4;
  const dataPoints = 20;

  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

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

  function fetchAndDisplaySensorData(fieldNum) {
    const url = `https://api.thingspeak.com/channels/${channelID}/fields/${fieldNum}.json?results=${dataPoints}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const values = data.feeds.map(feed => parseFloat(feed[`field${fieldNum}`])).filter(v => !isNaN(v));
        const labels = data.feeds.map(feed => new Date(feed.created_at).toLocaleTimeString());

        document.getElementById(`value${fieldNum}`).textContent = values[values.length - 1] ?? "--";

        new Chart(document.getElementById(`chart${fieldNum}`), {
          type: "line",
          data: {
            labels,
            datasets: [{
              label: `Sensor ${fieldNum}`,
              data: values,
              borderColor: "#007acc",
              backgroundColor: "rgba(0,122,204,0.1)",
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: "CO Level (ppm)" }
              },
              x: {
                title: { display: true, text: "Time" }
              }
            }
          }
        });
      })
      .catch(e => console.error(`Error loading data for field ${fieldNum}`, e));
  }
};
