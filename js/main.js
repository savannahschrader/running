const CALENDLY_URL = "https://calendly.com/savannahschrader65/30min";

const header = document.querySelector(".site-header");
const nav = document.querySelector(".site-nav");
const toggle = document.querySelector(".nav-toggle");
const form = document.getElementById("contact-form");
const success = document.getElementById("form-success");
const formError = document.getElementById("form-error");
const year = document.getElementById("year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (CALENDLY_URL) {
  document.querySelectorAll("[data-calendly]").forEach((link) => {
    link.href = CALENDLY_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  header.classList.toggle("is-menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";
}

toggle.addEventListener("click", () => {
  setMenu(!nav.classList.contains("is-open"));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}, { passive: true });

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("is-open")) {
    setMenu(false);
    toggle.focus();
  }
});

function emailLooksValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const interest = String(data.get("interest") || "").trim();
    const message = String(data.get("message") || "").trim();
    const fields = ["name", "email", "interest", "message"].map((id) => document.getElementById(id));

    fields.forEach((field) => field.classList.remove("is-invalid"));

    const missing = [];
    if (!name) missing.push(document.getElementById("name"));
    if (!emailLooksValid(email)) missing.push(document.getElementById("email"));
    if (!interest) missing.push(document.getElementById("interest"));
    if (!message) missing.push(document.getElementById("message"));

    if (missing.length) {
      missing.forEach((field) => field.classList.add("is-invalid"));
      formError.hidden = false;
      formError.textContent = "Please complete the highlighted fields so Savannah has enough to reply.";
      missing[0].focus();
      return;
    }

    formError.hidden = true;
    form.hidden = true;
    success.hidden = false;
    success.focus();
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
