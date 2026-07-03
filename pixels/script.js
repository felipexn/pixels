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
  const slides = Array.from(carousel.querySelectorAll(".example-slide"));

  if (slides.length < 2) {
    return;
  }

  let activeIndex = slides.findIndex((slide) => slide.classList.contains("active"));
  activeIndex = activeIndex >= 0 ? activeIndex : 0;
  slides[activeIndex].classList.add("active");

  window.setInterval(() => {
    slides[activeIndex].classList.remove("active");
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex].classList.add("active");
  }, 2600 + carouselIndex * 450);
});
