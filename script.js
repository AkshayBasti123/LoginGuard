async function sha1(str) {
  const buffer = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest("SHA-1", buffer);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}


async function checkPassword() {
  const password = document.getElementById("passwordInput").value;
  if (!password) {
    document.getElementById("result").textContent = "Please enter a password.";
    return;
  }

  const hash = await sha1(password);
  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5);

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await response.text();

  const found = text.split("\n").some(line => line.split(":")[0] === suffix);

  document.getElementById("result").textContent = found
    ? "⚠️ This password has been found in a breach. Please change it!"
    : "✅ This password has not been found in any breaches.";
}
