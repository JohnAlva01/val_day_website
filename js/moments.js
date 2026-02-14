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

  if (!momentsBtn || !momentsModal) return;

  function openMomentsModal() {
    momentsModal.classList.add("show");
    momentsModal.setAttribute("aria-hidden", "false");
    showMomentsList();
  }

  function closeMomentsModal() {
    try { momentVideo?.pause(); } catch {}
    momentsModal.classList.remove("show");
    momentsModal.setAttribute("aria-hidden", "true");
  }

  function showMomentsList() {
    if (momentsHeaderTitle) momentsHeaderTitle.textContent = "Favourite Moments ✨";
    momentsBackBtn?.classList.add("hidden");
    momentsDetailView?.classList.add("hidden");
    momentsListView?.classList.remove("hidden");

    if (momentVideoSrc) momentVideoSrc.src = "";
    momentVideo?.load?.();
  }

  function showMomentDetail(index) {
    const m = momentsData[index];
    if (!m) return;

    if (momentsHeaderTitle) momentsHeaderTitle.textContent = m.title;
    momentsListView?.classList.add("hidden");
    momentsDetailView?.classList.remove("hidden");
    momentsBackBtn?.classList.remove("hidden");

    if (momentText) momentText.textContent = m.text;

    if (momentVideoSrc) momentVideoSrc.src = m.video;
    momentVideo?.load?.();
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
