const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll(".nav-links a")];
const progress = document.getElementById("scrollProgress");
const backTop = document.querySelector(".back-top");

function updateScroll() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
  backTop.classList.toggle("show", scrollTop > 500);

  let current = "home";
  sections.forEach((section) => {
    if (scrollTop >= section.offsetTop - 180) current = section.id;
  });
  navItems.forEach((item) =>
    item.classList.toggle(
      "active",
      item.getAttribute("href") === "#" + current,
    ),
  );
}
window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const message = document.getElementById("message");
const charCount = document.getElementById("charCount");
message.addEventListener(
  "input",
  () => (charCount.textContent = message.value.length),
);

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const data = new FormData(form);
  const note = document.getElementById("formNote");
  const subject = encodeURIComponent(
    data.get("subject") || "Portfolio enquiry",
  );
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
  );
  window.location.href = `mailto:vayam1607@gmail.com?subject=${subject}&body=${body}`;
  note.textContent = "Opening your email application…";
});

document.getElementById("year").textContent = new Date().getFullYear();

const startYear = 2021;
const currentYear = new Date().getFullYear();
const years = currentYear - startYear;

document.getElementById("experienceyears").textContent = years + "+";
