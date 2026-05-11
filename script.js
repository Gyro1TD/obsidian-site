const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealItems = document.querySelectorAll(".reveal");
const siteHeader = document.querySelector(".site-header");

let lastScrollY = window.scrollY;

const syncHeaderVisibility = () => {
  if (!siteHeader) {
    return;
  }

  const currentScrollY = window.scrollY;

  if (currentScrollY <= 32) {
    siteHeader.classList.remove("is-hidden");
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY > lastScrollY + 8 && currentScrollY > 120) {
    siteHeader.classList.add("is-hidden");
  } else if (currentScrollY < lastScrollY - 8) {
    siteHeader.classList.remove("is-hidden");
  }

  lastScrollY = currentScrollY;
};

window.addEventListener("scroll", syncHeaderVisibility, { passive: true });

if (prefersReducedMotion.matches) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
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
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}
