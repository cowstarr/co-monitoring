window.onload = function() {
  const channelID = 2963348;  // Replace with your ThingSpeak channel ID
  const sensorCount = 4;
  const dataPoints = 50;
  const alertThreshold = 100; // Example threshold for alert

  const dashboard = document.getElementById("dashboard");
  const themeToggle = document.getElementById("theme-toggle");
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const loginSection = document.getElementById("login-section");
  const submitLogin = document.getElementById("submit-login");
  const closeLogin = document.getElementById("close-login");
  const filterBtn = document.getElementById("filter-btn");
  const exportBtn = document.getElementById("export-btn");
  const dateFromInput = document.getElementById("date-from");
  const dateToInput = document.getElementById("date-to");

  // Store charts globally for update
  let charts = [];
  let sensorDataAll = []; // Will hold all fetched data per sensor for filtering/export

  // Set initial theme based on localStorage
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add("dark");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  loginBtn.addEventListener("click", () => {
    loginSection.classList.remove("hidden");
  });

  closeLogin.addEventListener("click", () => {
    loginSection.classList.add("hidden");
  });

  logoutBtn.addEventListener("click", () => {
    alert("Logged out!");
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline-block";
  });

  submitLogin.addEventListener("click", () => {
    // MOCK login, accept any input
    alert("Logged in!");
    loginSection.classList.add("hidden");
    loginBtn.style.display = "none";
    logoutBtn.style

