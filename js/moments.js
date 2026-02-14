import { momentsData } from "./moments-data.js";

export function initMomentsModal() {
  const momentsBtn = document.getElementById("momentsBtn");
  const momentsModal = document.getElementById("momentsModal");
  const momentsCloseBtn = document.getElementById("momentsCloseBtn");
  const momentsBackBtn = document.getElementById("momentsBackBtn");
  const momentsHeaderTitle = document.getElementById("momentsHeaderTitle");

  const momentsListView = document.getElementById("momentsListView");
  const momentsDetailView = document.getElementById("momentsDetailView");

  const momentGif = document.getElementById("momentVideo");
  const momentText = document.getElementById("momentText");

  if (!momentsBtn || !momentsModal) return;

  function resetGif() {
    momentGif.removeAttribute("src");
  }

  function openMomentsModal() {
    momentsModal.classList.add("show");
    showMomentsList();
  }

  function closeMomentsModal() {
    resetGif();
    momentsModal.classList.remove("show");
  }

  function showMomentsList() {
    momentsHeaderTitle.textContent = "Favourite Moments ✨";
    momentsBackBtn.classList.add("hidden");

    momentsDetailView.classList.add("hidden");
    momentsListView.classList.remove("hidden");

    resetGif();
  }

  function showMomentDetail(index) {
    const m = momentsData[index];
    if (!m) return;

    momentsHeaderTitle.textContent = m.title;
    momentsBackBtn.classList.remove("hidden");

    momentsListView.classList.add("hidden");
    momentsDetailView.classList.remove("hidden");

    momentText.textContent = m.text;

    const gifUrl = new URL(m.video, import.meta.url);
    momentGif.src = gifUrl.href;
  }

  momentsBtn.addEventListener("click", openMomentsModal);
  momentsCloseBtn.addEventListener("click", closeMomentsModal);
  momentsBackBtn.addEventListener("click", showMomentsList);

  document.querySelectorAll(".moment-item").forEach((item) => {
    item.addEventListener("click", () => {
      showMomentDetail(Number(item.dataset.moment));
    });
  });
}
