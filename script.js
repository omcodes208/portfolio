/* ---------- 1. Typing effect for the role ---------- */
const roles = ["Frontend Developer", "BCA Student", "Web Designer"];
const typed = document.getElementById("typed");
let roleIndex = 0, charIndex = 0, deleting = false;

function type() {
  const word = roles[roleIndex];
  typed.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex === word.length) {
    deleting = true;
    return setTimeout(type, 1600);
  }
  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  charIndex += deleting ? -1 : 1;
  setTimeout(type, deleting ? 40 : 90);
}

if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typed.textContent = roles[0];
} else {
  type();
}

/* ---------- 2. Highlight the active nav link while scrolling ---------- */
const links = document.querySelectorAll(".nav a");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
  });
}, { rootMargin: "-40% 0px -55% 0px" });

document.querySelectorAll("main section").forEach((s) => observer.observe(s));

/* ---------- 3. Projects: edit this list to add your own ---------- */
const projects = [
  { title: "Student Portfolio", text: "This portfolio site, built with HTML, CSS and JavaScript.", tags: ["HTML", "CSS", "JavaScript"], link: "#" },
  { title: "To-Do App", text: "Add, complete and delete tasks. Saves to the browser.", tags: ["JavaScript", "LocalStorage"], link: "#" },
  { title: "Weather Page", text: "Search a city and see the current weather.", tags: ["API", "JavaScript"], link: "#" },
];

const list = document.getElementById("project-list");
projects.forEach((p) => {
  const card = document.createElement("article");
  card.className = "card";

  const title = document.createElement("h3");
  title.textContent = p.title;

  const text = document.createElement("p");
  text.textContent = p.text;

  const tags = document.createElement("div");
  tags.className = "tags";
  p.tags.forEach((t) => {
    const tag = document.createElement("span");
    tag.textContent = t;
    tags.appendChild(tag);
  });

  const link = document.createElement("a");
  link.className = "link";
  link.href = p.link;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "View project";

  card.append(title, text, tags, link);
  list.appendChild(card);
});

/* ---------- 4. Contact form: opens the visitor's email app ---------- */
const MY_EMAIL = "your.email@example.com"; // change this

document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = encodeURIComponent("Portfolio message from " + f.get("name"));
  const body = encodeURIComponent(f.get("message") + "\n\nFrom: " + f.get("name") + " (" + f.get("email") + ")");
  window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
});

/* ---------- 5. Small extras ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

const photo = document.querySelector(".hero-img img");
const hidePhoto = () => (photo.hidden = true);
photo.addEventListener("error", hidePhoto);
if (photo.complete && photo.naturalWidth === 0) hidePhoto();
