// /js/moments.js
import { momentsData } from "./moments-data.js";

export function initMomentsModal() {
  const momentsBtn = document.getElementById("momentsBtn");
  const momentsModal = document.getElementById("momentsModal");
  const momentsCloseBtn = document.getElementById("momentsCloseBtn");
  const momentsBackBtn = document.getElementById("momentsBackBtn");
  const momentsHeaderTitle = document.getElementById("momentsHeaderTitle");

  const momentsListView = document.getElementById("momentsListView");
  const momentsDetailView = document.getElementById("momentsDetailView");

  const momentVideo = document.getElementById("momentVideo");
  const momentVideoSrc = document.getElementById("momentVideoSrc");
  const momentText = document.getElementById("momentText");

  // The container around the <video> (used to toggle portrait mode)
  const videoBox = momentsDetailView?.querySelector(".video-box");

  if (!momentsBtn || !momentsModal || !momentsListView || !momentsDetailView) return;

  function openMomentsModal() {
    momentsModal.classList.add("show");
    momentsModal.setAttribute("aria-hidden", "false");
    showMomentsList();
  }

  function closeMomentsModal() {
    // Stop video when closing
    try {
      momentVideo?.pause();
      // reset src so it doesn't keep buffering audio on some browsers
      if (momentVideoSrc) momentVideoSrc.src = "";
      momentVideo?.load?.();
    } catch {}

    // reset portrait class
    videoBox?.classList.remove("portrait");

    momentsModal.classList.remove("show");
    momentsModal.setAttribute("aria-hidden", "true");
  }

  function showMomentsList() {
    // Header + buttons
    if (momentsHeaderTitle) momentsHeaderTitle.textContent = "Favourite Moments ✨";
    momentsBackBtn?.classList.add("hidden");

    // Views
    momentsDetailView.classList.add("hidden");
    momentsListView.classList.remove("hidden");

    // Reset video
    try {
      momentVideo?.pause();
      if (momentVideoSrc) momentVideoSrc.src = "";
      momentVideo?.load?.();
    } catch {}

    // Reset portrait state
    videoBox?.classList.remove("portrait");
  }

  function showMomentDetail(index) {
    const m = momentsData[index];
    if (!m) return;

    // Header + buttons
    if (momentsHeaderTitle) momentsHeaderTitle.textContent = m.title;
    momentsBackBtn?.classList.remove("hidden");

    // Views
    momentsListView.classList.add("hidden");
    momentsDetailView.classList.remove("hidden");

    // Text
    if (momentText) momentText.textContent = m.text ?? "";

    // Video
    if (momentVideoSrc) momentVideoSrc.src = m.video ?? "";
    momentVideo?.load?.();

    // Detect orientation once metadata is loaded and toggle portrait mode
    if (momentVideo) {
      momentVideo.onloadedmetadata = () => {
        const isPortrait = momentVideo.videoHeight > momentVideo.videoWidth;
        videoBox?.classList.toggle("portrait", isPortrait);
      };
    }
  }

  // Open / close
  momentsBtn.addEventListener("click", openMomentsModal);
  momentsCloseBtn?.addEventListener("click", closeMomentsModal);
  momentsBackBtn?.addEventListener("click", showMomentsList);

  // Click outside closes
  momentsModal.addEventListener("click", (e) => {
    if (e.target === momentsModal) closeMomentsModal();
  });

  // Escape closes (only if open)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && momentsModal.classList.contains("show")) {
      closeMomentsModal();
    }
  });

  // List item click + keyboard open
  document.querySelectorAll(".moment-item").forEach((item) => {
    const open = () => showMomentDetail(Number(item.dataset.moment));

    item.addEventListener("click", open);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}
