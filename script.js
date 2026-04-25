const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");

const updateHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -48px 0px"
    }
  );

  revealItems.forEach((item) => {
    if (!item.classList.contains("is-visible")) {
      observer.observe(item);
    }
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
