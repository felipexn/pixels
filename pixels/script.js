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
