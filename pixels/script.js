const phoneNumber = "5594991606192";

document.querySelectorAll("[data-message]").forEach((link) => {
  const message = link.getAttribute("data-message");
  link.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
});

const filterButtons = document.querySelectorAll(".filter-button");
const cards = document.querySelectorAll(".service-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    cards.forEach((card) => {
      const categories = card.dataset.category || "";
      const shouldShow = filter === "todos" || categories.includes(filter);
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const imageModal = document.createElement("div");
imageModal.className = "image-modal";
imageModal.hidden = true;
imageModal.innerHTML = `
  <button class="image-modal-backdrop" type="button" aria-label="Fechar imagem"></button>
  <div class="image-modal-panel" role="dialog" aria-modal="true" aria-label="Imagem ampliada">
    <button class="image-modal-close" type="button" aria-label="Fechar imagem">×</button>
    <button class="image-modal-control image-modal-prev" type="button" aria-label="Imagem anterior">‹</button>
    <img class="image-modal-image" alt="" />
    <button class="image-modal-control image-modal-next" type="button" aria-label="Próxima imagem">›</button>
  </div>
`;
document.body.appendChild(imageModal);

const modalImage = imageModal.querySelector(".image-modal-image");
const modalClose = imageModal.querySelector(".image-modal-close");
const modalBackdrop = imageModal.querySelector(".image-modal-backdrop");
const modalPrev = imageModal.querySelector(".image-modal-prev");
const modalNext = imageModal.querySelector(".image-modal-next");
let modalSlides = [];
let modalIndex = 0;

const updateModalImage = () => {
  const image = modalSlides[modalIndex]?.querySelector("img");

  if (!image) {
    return;
  }

  modalImage.src = image.currentSrc || image.src;
  modalImage.alt = image.alt || "Imagem ampliada";
  const hasManyImages = modalSlides.length > 1;
  modalPrev.hidden = !hasManyImages;
  modalNext.hidden = !hasManyImages;
};

const openImageModal = (slides, index) => {
  modalSlides = slides;
  modalIndex = index;
  updateModalImage();
  imageModal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
};

const closeImageModal = () => {
  imageModal.hidden = true;
  document.body.classList.remove("modal-open");
};

const moveModalImage = (step) => {
  if (modalSlides.length < 2) {
    return;
  }

  modalIndex = (modalIndex + step + modalSlides.length) % modalSlides.length;
  updateModalImage();
};

modalClose.addEventListener("click", closeImageModal);
modalBackdrop.addEventListener("click", closeImageModal);
modalPrev.addEventListener("click", () => moveModalImage(-1));
modalNext.addEventListener("click", () => moveModalImage(1));

window.addEventListener("keydown", (event) => {
  if (imageModal.hidden) {
    return;
  }

  if (event.key === "Escape") {
    closeImageModal();
  }

  if (event.key === "ArrowLeft") {
    moveModalImage(-1);
  }

  if (event.key === "ArrowRight") {
    moveModalImage(1);
  }
});

document.querySelectorAll("[data-carousel]").forEach((carousel, carouselIndex) => {
  const allSlides = Array.from(carousel.querySelectorAll(".service-slide"));
  const imageSlides = allSlides.filter((slide) => slide.querySelector("img"));

  if (imageSlides.length === 0) {
    allSlides[0]?.classList.add("active");
    return;
  }

  carousel.classList.add("has-images");
  carousel.tabIndex = 0;
  allSlides.forEach((slide) => slide.classList.remove("active", "previous", "next"));

  const slides = imageSlides;
  let activeIndex = 0;
  let autoplayId = 0;

  const setActiveSlide = (previousIndex = -1) => {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === activeIndex);
      slide.classList.toggle("previous", index === previousIndex);
      slide.classList.toggle("next", index !== activeIndex && index !== previousIndex);
    });
  };

  const goToSlide = (nextIndex, resetTimer = false) => {
    const previousIndex = activeIndex;
    activeIndex = (nextIndex + slides.length) % slides.length;
    setActiveSlide(previousIndex);

    if (resetTimer) {
      startAutoplay();
    }
  };

  const startAutoplay = () => {
    window.clearInterval(autoplayId);

    if (slides.length < 2) {
      return;
    }

    autoplayId = window.setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 3400 + carouselIndex * 260);
  };

  setActiveSlide();

  if (slides.length > 1) {
    const previousButton = document.createElement("button");
    previousButton.className = "carousel-control carousel-control-prev";
    previousButton.type = "button";
    previousButton.setAttribute("aria-label", "Foto anterior");
    previousButton.textContent = "‹";

    const nextButton = document.createElement("button");
    nextButton.className = "carousel-control carousel-control-next";
    nextButton.type = "button";
    nextButton.setAttribute("aria-label", "Próxima foto");
    nextButton.textContent = "›";

    previousButton.addEventListener("click", (event) => {
      event.stopPropagation();
      goToSlide(activeIndex - 1, true);
    });

    nextButton.addEventListener("click", (event) => {
      event.stopPropagation();
      goToSlide(activeIndex + 1, true);
    });

    carousel.append(previousButton, nextButton);
    startAutoplay();
  }

  carousel.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      return;
    }

    openImageModal(slides, activeIndex);
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openImageModal(slides, activeIndex);
  });
});
