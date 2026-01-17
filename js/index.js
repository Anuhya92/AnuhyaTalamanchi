// Navigation menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isActive = navLinks.classList.toggle("active");
  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
  menuToggle.setAttribute("aria-expanded", isActive);
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = menuToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Featured projects data
const featuredProjects = [
  {
    name: "Stockholm Games",
    description:
      "Responsive website built with pure HTML and CSS, showcasing modern layout techniques and mobile-first design principles.",
    html_url: "https://github.com/Anuhya92/StockholmGames.git",
    homepage: "",
    topics: ["html", "css", "responsive"],
  },
  {
    name: "Pokemon Explorer",
    description:
      "A dynamic and responsive web application that leverages the Pokémon API to provide users with comprehensive information about their favorite Pokémon. Features real-time data fetching, search functionality, and a modern, intuitive interface designed for Pokémon enthusiasts.",
    html_url: "https://github.com/Anuhya92/pokemon-explorer",
    homepage: "https://pokemon-explorer-gamma-umber.vercel.app/",
    topics: ["HTML5", "CSS3", "JavaScript", "API Integration"],
  },
  {
    name: "Numberle Game",
    description:
      "An engaging, kid-friendly number guessing game that combines fun gameplay with educational value. Built with vanilla JavaScript, featuring DOM manipulation, responsive design, and interactive feedback to help children develop their number sense and logical thinking skills.",
    html_url: "https://github.com/Anuhya92/Numberle-Game",
    homepage: "https://anuhya92.github.io/Numberle-Game/",
    topics: ["HTML5", "CSS3", "JavaScript", "Game"],
  },
  {
    name: "Animal Zoo",
    description:
      "A collaborative group project showcasing teamwork and technical skills. This interactive application displays detailed animal information using JavaScript objects and modern web development practices. Developed by a team of 5 developers, demonstrating effective communication and version control workflows.",
    html_url: "https://github.com/Anuhya92/animal-zoo",
    homepage: "https://fg-animal-zoo-group-assignment.vercel.app/",
    topics: ["HTML5", "CSS3", "JavaScript", "Git Collaboration"],
  },
  {
    name: "Word Detective Game",
    description:
      "Interactive word guessing game using basic HTML, CSS, and JavaScript with prompt-based gameplay and win/lose messaging.",
    html_url: "https://github.com/Anuhya92/Word-Detective-Game",
    homepage: "https://anuhya92.github.io/Word-Detective-Game/",
    topics: ["html", "css", "javascript", "game"],
  },
];

// Project emojis and gradients
const projectEmojis = {
  "stockholm games": "🏛️",
  "pokemon explorer": "⚡",
  "numberle game": "🔢",
  "animal zoo": "🦁",
  "word detective game": "🔍",
  default: "💻",
};

const projectGradients = [
  "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
  "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%)",
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
  "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
];

// Fetch GitHub projects
async function fetchGitHubProjects() {
  const container = document.getElementById("projects-container");

  try {
    const response = await fetch(
      "https://api.github.com/users/Anuhya92/repos?sort=updated&per_page=10",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const repos = await response.json();

    // Combine featured projects with GitHub repos
    const allProjects = [...featuredProjects];

    // Add other repos not in featured list
    repos.forEach((repo) => {
      const exists = featuredProjects.some(
        (fp) => fp.name.toLowerCase() === repo.name.toLowerCase(),
      );
      if (!exists && !repo.fork) {
        allProjects.push(repo);
      }
    });

    displayProjects(allProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    container.innerHTML = `
                    <div class="loading">
                        <p>Unable to load projects from GitHub. Showing featured projects instead.</p>
                    </div>
                `;
    setTimeout(() => {
      displayProjects(featuredProjects);
    }, 1000);
  }
}

function getProjectEmoji(projectName) {
  const name = projectName.toLowerCase();

  // Specific project emojis
  if (name.includes("stockholm")) return "🏛️";
  if (name.includes("pokemon")) return "⚡";
  if (name.includes("numberle") || name.includes("number")) return "🔢";
  if (name.includes("animal") || name.includes("zoo")) return "🦁";
  if (name.includes("word") || name.includes("detective")) return "🔤";
}

function getProjectTitle(projectName) {
  const name = projectName.toLowerCase();

  // Custom titles with emojis/text
  if (name.includes("stockholm")) {
    return `<span style="font-size: 4rem; margin-bottom: 0.5rem;">🏛️</span>
                  <h3 class="project-image-title">${projectName}</h3>`;
  }
  if (name.includes("pokemon")) {
    return `<div style="font-size: 3rem; margin-bottom: 0.5rem;">⚡ </div>
                  <h3 class="project-image-title">${projectName}</h3>`;
  }
  if (name.includes("numberle") || name.includes("number")) {
    return `<div style="font-size: 3.5rem; margin-bottom: 0.5rem; font-weight: bold; font-family: 'Courier New', monospace;">🔢</div>
                  <h3 class="project-image-title">${projectName}</h3>`;
  }
  if (name.includes("animal") || name.includes("zoo")) {
    return `<div style="font-size: 3rem; margin-bottom: 0.5rem;">🦁 🐘 🦒</div>
                  <h3 class="project-image-title">${projectName}</h3>`;
  }
  if (name.includes("word") || name.includes("detective")) {
    return `<div style="font-size: 3.5rem; margin-bottom: 0.5rem; font-weight: bold; font-family: 'Arial', sans-serif;">🔤</div>
                  <h3 class="project-image-title">${projectName}</h3>`;
  }

  // Default
  const emoji = getProjectEmoji(projectName);
  return `<span class="project-emoji" role="img" aria-label="${projectName} project icon">${emoji}</span>
                <h3 class="project-image-title">${projectName}</h3>`;
}

function displayProjects(projects) {
  const container = document.getElementById("projects-container");

  container.innerHTML = projects
    .slice(0, 5)
    .map((project, index) => {
      const gradient = projectGradients[index % projectGradients.length];
      const titleContent = getProjectTitle(project.name);

      return `
                <article class="project-card" data-project-index="${index}">
                    <div class="project-image" style="background: ${gradient}">
                        ${titleContent}
                        <span class="expand-hint">Click to expand</span>
                    </div>
                    <div class="project-content">
                        <p class="project-description">
                            ${
                              project.description ||
                              "A web development project showcasing modern techniques and best practices."
                            }
                        </p>
                        <div class="project-tech">
                            ${
                              project.topics || project.language
                                ? (project.topics || [project.language])
                                    .slice(0, 4)
                                    .map(
                                      (tech) =>
                                        `<span class="tech-tag">${tech}</span>`,
                                    )
                                    .join("")
                                : '<span class="tech-tag">web</span>'
                            }
                        </div>
                        <div class="project-links">
                            <a href="${
                              project.html_url
                            }" target="_blank" rel="noopener noreferrer" class="project-link github-link" aria-label="View ${
                              project.name
                            } source code on GitHub">
                                <i class="fab fa-github" aria-hidden="true"></i> View Code
                            </a>
                            ${
                              project.homepage
                                ? `<a href="${project.homepage}" target="_blank" rel="noopener noreferrer" class="project-link demo-link" aria-label="View ${project.name} live demo">
                                    <i class="fas fa-external-link-alt" aria-hidden="true"></i> Live Demo
                                </a>`
                                : ""
                            }
                        </div>
                    </div>
                </article>
            `;
    })
    .join("");

  // Add click event listeners to project images
  document.querySelectorAll(".project-image").forEach((image) => {
    image.addEventListener("click", function (e) {
      e.preventDefault();
      const card = this.closest(".project-card");
      const wasActive = card.classList.contains("active");

      // Close all other project cards
      document.querySelectorAll(".project-card").forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove("active");
        }
      });

      // Toggle current card
      if (wasActive) {
        card.classList.remove("active");
      } else {
        card.classList.add("active");
        // Smooth scroll to show the expanded content
        setTimeout(() => {
          card.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }
    });

    // Make it keyboard accessible
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    image.setAttribute("aria-expanded", "false");

    image.addEventListener("keypress", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Update aria-expanded when cards are toggled
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        const card = mutation.target;
        const image = card.querySelector(".project-image");
        const isActive = card.classList.contains("active");
        if (image) {
          image.setAttribute("aria-expanded", isActive);
        }
      }
    });
  });

  document.querySelectorAll(".project-card").forEach((card) => {
    observer.observe(card, { attributes: true });
  });
}

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formMessage = document.getElementById("formMessage");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Simple validation
  if (name && email && message) {
    formMessage.textContent =
      "Thank you for your message! I will get back to you soon.";
    formMessage.className = "form-message success";
    formMessage.style.display = "block";

    // Reset form
    this.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none";
    }, 5000);
  } else {
    formMessage.textContent = "Please fill in all fields.";
    formMessage.className = "form-message error";
    formMessage.style.display = "block";
  }
});

// Load projects when page loads
fetchGitHubProjects();

// Animate elements on scroll (excluding project cards which have their own animation)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".skill-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  scrollObserver.observe(el);
});
