let selectedProfile = null;

// 🎬 INTRO FIX (black screen issue solved)
window.onload = () => {
  const intro = document.getElementById("intro");
  const main = document.getElementById("mainContent");

  setTimeout(() => {
    intro.style.opacity = "0";

    setTimeout(() => {
      intro.style.display = "none";
      main.classList.remove("hidden");
    }, 1000);

  }, 2200);

  initStars();
};

// 🌌 STAR BACKGROUND
function initStars() {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      ctx.fillStyle = "white";
      ctx.fillRect(s.x, s.y, s.size, s.size);
      s.y += 0.3;
      if (s.y > canvas.height) s.y = 0;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// 🔐 OPEN PIN
function openPin(el) {
  selectedProfile = el;

  el.classList.add("zoom");
  document.getElementById("overlay").classList.add("show");
  document.getElementById("pinModal").classList.add("show");
}

// ❌ CLOSE
function closePin() {
  document.getElementById("overlay").classList.remove("show");
  document.getElementById("pinModal").classList.remove("show");

  if (selectedProfile) {
    selectedProfile.classList.remove("zoom");
  }
}

// 🔓 CHECK PIN
function checkPin() {
  const pin = document.getElementById("pinInput").value;
  const correct = "040525";

  if (pin === correct) {

    document.getElementById("flash").style.opacity = "1";

    setTimeout(() => {
      document.body.classList.add("cinematic-zoom");
    }, 200);

    setTimeout(() => {
      window.location.href = "story.html";
    }, 1200);

  } else {
    document.getElementById("pinError").innerText = "Wrong PIN 💔";
  }
}