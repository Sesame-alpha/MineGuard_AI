// ===== GRAPH SETUP =====
const ctx = document.getElementById("riskChart").getContext("2d");

const riskChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Risk Level",
      data: [],
      borderColor: "red",
      fill: false
    }]
  }
});

// ===== SENSOR SIMULATION =====
function getSensorData() {
  return {
    temp: Math.floor(Math.random() * 80),
    gas: Math.floor(Math.random() * 100),
    rock: Math.floor(Math.random() * 10) + 1
  };
}

// ===== RISK ENGINE =====
function calculateRisk(t, g, r) {
  let score = 0;

  score += t > 60 ? 3 : 1;
  score += g > 70 ? 3 : 1;
  score += r < 4 ? 3 : 1;

  return score;
}

// ===== MAP UPDATE =====
function updateMap(score) {
  const zones = ["z1", "z2", "z3", "z4"];

  zones.forEach(z => {
    let el = document.getElementById(z);

    if (score >= 7) {
      el.style.background = "red";
    } else if (score >= 5) {
      el.style.background = "orange";
    } else {
      el.style.background = "green";
    }
  });
}

// ===== CHART UPDATE =====
function updateChart(score) {
  if (riskChart.data.labels.length > 10) {
    riskChart.data.labels.shift();
    riskChart.data.datasets[0].data.shift();
  }

  riskChart.data.labels.push("");
  riskChart.data.datasets[0].data.push(score);
  riskChart.update();
}

// ===== MAIN SYSTEM LOOP =====
function updateSystem() {
  const data = getSensorData();

  document.getElementById("temp").innerText = data.temp;
  document.getElementById("gas").innerText = data.gas;
  document.getElementById("rock").innerText = data.rock;

  const score = calculateRisk(data.temp, data.gas, data.rock);

  let status = "";
  let alert = "";

  if (score >= 7) {
    status = "🔴 DANGER";
    alert = "Evacuate mine immediately!";
  } else if (score >= 5) {
    status = "🟡 WARNING";
    alert = "High risk detected.";
  } else {
    status = "🟢 SAFE";
    alert = "Conditions stable.";
  }

  document.getElementById("status").innerText = status;
  document.getElementById("alert").innerText = alert;

  document.getElementById("prediction").innerText =
    score >= 7
      ? "Collapse risk rising fast ⚠️"
      : score >= 5
      ? "Instability detected in mine zones"
      : "Normal operating conditions";

  updateMap(score);
  updateChart(score);
}

// ===== RUN LOOP =====
setInterval(updateSystem, 2000);
updateSystem();
