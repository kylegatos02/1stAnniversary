const intro = document.getElementById("intro");
const scenes = document.querySelectorAll(".scene");
const finalLetter = document.querySelector("#finalLetter");
const letterText = document.getElementById("letterText");
const music = document.getElementById("bgMusic");

let index = 0;
let interval;
let isMuted = false;
let started = false;

/* =========================
   🚀 INIT (INTRO FIRST)
========================= */
window.addEventListener("load", () => {

  checkOrientation();

  if (started) return;
  started = true;

  // 🎬 START MARVEL INTRO FIRST
  playIntro();
});

/* =========================
   🎬 MARVEL INTRO SEQUENCE
========================= */
function playIntro() {

  // lock scroll
  document.body.style.overflow = "hidden";

  setTimeout(() => {

    intro.style.transition = "opacity 1.5s ease";
    intro.style.opacity = "0";

    setTimeout(() => {

      intro.style.display = "none";

      // unlock flow
      document.body.style.overflow = "hidden";

      safeFullscreen();
      startMusicSystem();

      playScenes();

    }, 1500);

  }, 4500); // intro duration
}

/* =========================
   🎬 FULLSCREEN (SAFE)
========================= */
function safeFullscreen() {
  const doc = document.documentElement;

  try {
    if (!document.fullscreenElement) {
      doc.requestFullscreen?.() ||
      doc.webkitRequestFullscreen?.() ||
      doc.msRequestFullscreen?.();
    }
  } catch (e) {
    console.log("Fullscreen blocked");
  }
}

/* =========================
   🎵 MUSIC SYSTEM
========================= */
function startMusicSystem() {

  music.volume = 0;

  const playPromise = music.play();

  if (playPromise !== undefined) {
    playPromise.then(() => {
      fadeInMusic();
    }).catch(() => {
      document.body.addEventListener("click", unlockAudioOnce);
    });
  }
}

function unlockAudioOnce() {
  music.play();
  fadeInMusic();
  document.body.removeEventListener("click", unlockAudioOnce);
}

/* =========================
   🎵 FADE MUSIC
========================= */
function fadeInMusic() {
  let vol = 0;

  const fade = setInterval(() => {
    if (vol < 0.6) {
      vol += 0.03;
      music.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 80);
}

/* =========================
   🎬 SCENES
========================= */
function playScenes() {

  resetScenes();

  interval = setInterval(() => {

    scenes[index].classList.remove("active");
    index++;

    if (index < scenes.length) {

      setTimeout(() => {
        scenes[index].classList.add("active");
      }, 250);

    } else {
      clearInterval(interval);

      setTimeout(() => {
        showFinalLetter();
      }, 1200);
    }

  }, 3800);
}

/* reset */
function resetScenes() {
  index = 0;
  scenes.forEach((s, i) => {
    s.classList.remove("active");
    if (i === 0) s.classList.add("active");
  });
}

/* =========================
   💌 LETTER
========================= */
function showFinalLetter() {

  document.querySelector(".trailer").style.transition = "opacity 1s ease";
  document.querySelector(".trailer").style.opacity = "0";

  setTimeout(() => {
    document.querySelector(".trailer").style.display = "none";
    finalLetter.classList.remove("hidden");
  }, 900);

  const message = `
My Love happy 1st Anniversary myloveee, ang bilis ng panahon loveee nakaisang taon na tayo agad
  Thank you loveee sa pagtanggap mo sa akin bilang kasintahan mo, waiting pa din ako dumating oras na
  maging legal tayo sa side ng parents mo po loveee. Gusto ko din makahanap ka na ng work mo at masaya ka dun
  pagdasal natin yan at wag ka na paasahin ng mga pinapasahan mo anyways loveee mahal na mahal kita loveee
  kahit ang kulit kulit ko at minsan pinapasakit ko ulo mo, pero di ako nagsisinungaling na loveee na lovee kita.
  Sa aking napakagandang girlfriend happy 1st anniversary loveee sana naggustuhan mo mga gifts ko sayo at itong ginawa ko lovee
  Lagi lang ako nandito loveee for you susuportahan ka sa lahat ng gusto mo at mga pangarap mo sa buhay na gusto mo makamit.
  MORE GALA, MORE RIDES AND MANY MORE TO DO WITH YOU MY LOVEEEE!!!
  I LOVE YOUU SO MUCH!
  
  `;

  letterText.innerHTML = "";
  let i = 0;

  function type() {
    if (i < message.length) {
      letterText.innerHTML += message.charAt(i);
      i++;
      setTimeout(type, 32);
    }
  }

  setTimeout(type, 900);
}

/* =========================
   🔁 REWATCH
========================= */
function restartStory() {
  location.reload(); // clean restart (prevents intro bugs)
}


/* =========================
   🔊 SOUND TOGGLE
========================= */
function toggleSound() {
  const btn = document.getElementById("soundBtn");

  isMuted = !isMuted;
  music.muted = isMuted;

  btn.innerHTML = isMuted ? "🔇" : "🔊";
}

/* =========================
   📱 ORIENTATION
========================= */
function checkOrientation() {
  const hint = document.getElementById("rotateHint");

  if (window.innerHeight > window.innerWidth) {
    hint.style.display = "flex";
  } else {
    hint.style.display = "none";
  }
}

window.addEventListener("resize", checkOrientation);

/* =========================
   📱 FULLSCREEN BUTTON
========================= */
function toggleFullscreen() {
  const doc = document.documentElement;

  if (!document.fullscreenElement) {
    doc.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}