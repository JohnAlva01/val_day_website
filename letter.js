export function initLetterModal() {
  const letterBtn = document.getElementById("letterBtn");
  const letterModal = document.getElementById("letterModal");
  const closeLetterBtn = document.getElementById("closeLetterBtn");

  if (!letterBtn || !letterModal || !closeLetterBtn) return;

  function openLetterModal() {
    letterModal.classList.add("show");
    letterModal.setAttribute("aria-hidden", "false");
  }

  function closeLetterModal() {
    letterModal.classList.remove("show");
    letterModal.setAttribute("aria-hidden", "true");
  }

  letterBtn.addEventListener("click", openLetterModal);
  closeLetterBtn.addEventListener("click", closeLetterModal);

  letterModal.addEventListener("click", (e) => {
    if (e.target === letterModal) closeLetterModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && letterModal.classList.contains("show")) {
      closeLetterModal();
    }
  });
}
