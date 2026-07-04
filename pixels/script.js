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

document.querySelectorAll("[data-carousel]").forEach((carousel, carouselIndex) => {
  const allSlides = Array.from(carousel.querySelectorAll(".service-slide"));
  const imageSlides = allSlides.filter((slide) => slide.querySelector("img"));

  if (imageSlides.length === 0) {
    allSlides[0]?.classList.add("active");
    return;
  }

  carousel.classList.add("has-images");
  allSlides.forEach((slide) => slide.classList.remove("active", "previous", "next"));

  const slides = imageSlides;
  let activeIndex = 0;

  const setActiveSlide = (previousIndex = -1) => {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === activeIndex);
      slide.classList.toggle("previous", index === previousIndex);
      slide.classList.toggle("next", index !== activeIndex && index !== previousIndex);
    });
  };

  setActiveSlide();

  if (slides.length < 2) {
    return;
  }

  window.setInterval(() => {
    const previousIndex = activeIndex;
    activeIndex = (activeIndex + 1) % slides.length;
    setActiveSlide(previousIndex);
  }, 3200 + carouselIndex * 300);
});
