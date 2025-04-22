async function checkBreach() {
  const input = document.getElementById("userInput").value.toLowerCase().trim();
  const resultBox = document.getElementById("resultBox");
  const resultHeader = document.getElementById("resultHeader");
  const breachDetails = document.getElementById("breachDetails");
  const recommendations = document.getElementById("recommendations");

  if (!input) return alert("Please enter a username or email.");

  const response = await fetch("data/breach-sim.json");
  const breachDB = await response.json();

  resultBox.classList.remove("hidden");
  recommendations.innerHTML = "";

  if (breachDB[input]) {
    const count = breachDB[input].length;
    resultHeader.innerHTML = `🔴 Leaked in ${count} breach${count > 1 ? "es" : ""}!`;
    breachDetails.innerHTML = `Breaches found: ${breachDB[input].join(", ")}`;

    const tips = [
      "🔐 Change your passwords immediately.",
      "🧠 Use a password manager like Bitwarden or 1Password.",
      "🛡️ Enable Two-Factor Authentication.",
      "🚫 Avoid reusing passwords across sites."
    ];
    tips.forEach(tip => {
      const li = document.createElement("li");
      li.textContent = tip;
      recommendations.appendChild(li);
    });
  } else {
    resultHeader.innerHTML = "✅ No breaches found!";
    breachDetails.innerHTML = "Your credentials were not found in the simulated database.";
  }
  const response = await fetch("data/breach-sim.json");
}
