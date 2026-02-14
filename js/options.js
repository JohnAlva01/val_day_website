import { initLetterModal } from "./letter.js";
import { initMomentsModal } from "./moments.js";

initLetterModal();
initMomentsModal();

window.addEventListener('DOMContentLoaded', async () => {
  const shouldPlay = sessionStorage.getItem('playMusic') === 'true';
  if (!shouldPlay) return;

  const audio = document.getElementById('bgMusic');
  try {
    audio.loop = true;
    await audio.play();
  } catch (e) {
    console.warn('Music could not autoplay on options:', e);
  }
});
