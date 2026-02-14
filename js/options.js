// options.js
import { initLetterModal } from "./letter.js";
import { initMomentsModal } from "./moments.js";

initLetterModal();
initMomentsModal();

window.addEventListener("DOMContentLoaded", async () => {
  const shouldPlay = sessionStorage.getItem("playMusic") === "true";
  if (!shouldPlay) return;

  const audio = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");

  const tryPlay = async () => {
    try {
      audio.loop = true;
      await audio.play();
      musicBtn?.classList.add("hidden");
      return true;
    } catch {
      return false;
    }
  };

  // Try immediately (may work on desktop, usually blocked on mobile)
  const ok = await tryPlay();

  // If blocked, show button and also allow first tap anywhere to start it
  if (!ok) {
    musicBtn?.classList.remove("hidden");

    const onFirstUserGesture = async () => {
      await tryPlay();
    };

    document.addEventListener("pointerdown", onFirstUserGesture, { once: true });
    musicBtn?.addEventListener("click", onFirstUserGesture, { once: true });
  }
});
