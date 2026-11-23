/* Редактируйте подписи и пути к четырём фотографиям здесь.
   Положите изображения в images/awards/award-01.jpg ... award-04.jpg */
const AWARDS = [
  { organization: "Dprofile", work: "Inter", year: "2025", category: "GR", image: "./images/awards/award-01.jpg", url: "https://dprofile.ru/case/123521/dizain-saita-onlain-galereia-inter" },
  { organization: "Dprofile", work: "Плакаты для фестиваля", year: "2025", category: "GR", image: "./images/awards/award-02.jpg", url: "https://dprofile.ru/case/123526/plakaty-dlia-festivalia-asteroidov" },
  { organization: "Dprofile", work: "Сайт для онлайн-галереи", year: "2025", category: "UI", image: "./images/awards/award-03.jpg", url: "https://dprofile.ru/case/123533/kreativnaia-prezentaciia" },
  { organization: "Dafes", work: "Inter", year: "2025", category: "UI", image: "./images/awards/award-04.jpg", url: "https://dafes.org/project/871bc128759742e7849dfc5d4b5eb6de" }
];

(() => {
  const list = document.getElementById("awardsList");
  const preview = document.getElementById("awardsPreview");
  const previewImage = document.getElementById("awardsPreviewImage");
  const fallback = document.getElementById("awardsPreviewFallback");
  if (!list || !preview || !previewImage) return;
  let current = -1;
  let imageRequest = 0;

  const rows = AWARDS.map((award, index) => {
    const row = document.createElement("a");
    row.className = "award-row";
    row.href = award.url;
    row.target = '_blank';
    row.rel = 'noopener noreferrer';
    row.setAttribute("aria-label", `${award.organization}: ${award.work}, ${award.year}, ${award.category}`);
    [award.organization, award.work, award.year, award.category].forEach(value => {
      const cell = document.createElement("span");
      cell.className = "award-cell";
      cell.textContent = value;
      row.appendChild(cell);
    });
    row.addEventListener("pointerenter", () => show(index));
    row.addEventListener("focus", () => show(index));
    list.appendChild(row);
    return row;
  });

  function show(index) {
    if (current === index) return;
    current = index;
    rows.forEach((row, i) => row.classList.toggle("is-active", i === index));
    const award = AWARDS[index];
    fallback.textContent = award.category;
    const request = ++imageRequest;
    preview.classList.remove("is-fallback");
    previewImage.style.visibility = "hidden";
    previewImage.onload = () => {
      if (request !== imageRequest) return;
      preview.classList.remove("is-fallback");
      previewImage.style.visibility = "visible";
    };
    previewImage.onerror = () => {
      if (request !== imageRequest) return;
      preview.classList.add("is-fallback");
    };
    previewImage.src = award.image;
    preview.classList.add("is-visible");
    // Превью располагается над строками, как в макете.
    const section = list.closest(".awards");
    const rowBox = rows[index].getBoundingClientRect();
    const sectionBox = section.getBoundingClientRect();
    const top = rowBox.top - sectionBox.top - preview.offsetHeight * .45;
    preview.style.top = `${Math.max(120, Math.min(top, section.clientHeight - preview.offsetHeight - 25))}px`;
  }
  function hide() {
    current = -1;
    ++imageRequest;
    rows.forEach(row => row.classList.remove("is-active"));
    preview.classList.remove("is-visible");
  }
  list.addEventListener("pointerleave", hide);
  list.addEventListener("focusout", event => {
    if (!list.contains(event.relatedTarget)) hide();
  });
})();
