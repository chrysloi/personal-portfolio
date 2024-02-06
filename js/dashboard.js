const changeView = async (changeTo) => {
  const pages = {
    dashboard: "dashboard.html",
    articles: "articles.html",
    projects: "projects.html",
    viewArticle: "viewArticle.html",
    newArticle: "newArticle.html",
    newProject: "newProject.html",
  };
  if (pages[changeTo]) {
    const res = await fetch(pages[changeTo]);
    const content = await res.text();
    const navLinks = document.querySelectorAll(".dashboard-menu li a");
    navLinks.forEach((link) => {
      const sectionId = link.getAttribute("href").substring(1);
      if (pages[sectionId] && sectionId === changeTo) {
        link.classList.add("active");
      } else if (pages[sectionId]) {
        link.classList.remove("active");
      }
    });
    document.querySelector("main").innerHTML = content;
  }
};

const changeDashboardView = (changeTo) => {
  const changeToSection = document.getElementById(changeTo);
  if (changeToSection) {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".dashboard-menu li a");
    sections.forEach((section) => {
      if (section.id === changeTo) {
        section.classList.remove("hidden-section");
      } else {
        section.classList.add("hidden-section");
      }
    });
    navLinks.forEach((link) => {
      const sectionId = link.getAttribute("href").substring(1);
      if (sectionId === changeTo) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
    const newURL =
      window.location.origin + window.location.pathname + "#" + changeTo;
    history.pushState(null, null, newURL);
  }
};

const viewArticle = async () => {
  const contentArea = document.querySelector(
    "section#articles .dashboard-content"
  );
  const res = await fetch("viewArticle.html");
  // console.log(await res.text());
  const content = await res.text();
  contentArea.innerHTML = "Loading...";
  setTimeout(() => {
    contentArea.innerHTML = content;
  });
};

const newArticle = async () => {
  const title = document.querySelector("form #title");
  const coverImage = document.querySelector("form #coverImage");
  const content = document.querySelector("form #editor");
  const articles = localStorage.getItem("articles");
  if (articles) {
    const articlesArray = JSON.parse(articles);
    articlesArray.push({
      title: title.value,
      // coverImage: coverImage.value,
      content: content.innerHTML,
    });
    localStorage.setItem("articles", JSON.stringify(articlesArray));
    setTimeout(() => {
      title.value = "";
      coverImage.value = "";
      content.innerHTML = "";
      window.location.reload();
      // changeView("articles");
    }, 500);
  } else {
    localStorage.setItem(
      "articles",
      JSON.stringify([
        {
          title: title.value,
          // coverImage: coverImage.value,
          content: content.innerHTML,
        },
      ])
    );
    setTimeout(() => {
      title.value = "";
      coverImage.value = "";
      content.innerHTML = "";
      window.location.reload();
      // changeView("articles");
    }, 500);
  }
};

const newProject = async () => {
  const name = document.querySelector("form #name");
  const coverImage = document.querySelector("form #coverImage");
  const description = document.querySelector("form #editor");
  const projects = localStorage.getItem("projects");
  if (projects) {
    const projectsArray = JSON.parse(projects);
    // saveImages(coverImage.files[0]);
    projectsArray.push({
      name: name.value,
      // coverImage: coverImage.files[0],
      description: description.innerHTML,
    });
    localStorage.setItem("projects", JSON.stringify(projectsArray));
    setTimeout(() => {
      name.value = "";
      coverImage.value = "";
      description.innerHTML = "";
      window.location.reload();
      // changeDashboardView("projects");
    }, 500);
  } else {
    localStorage.setItem(
      "projects",
      JSON.stringify([
        {
          name: name.value,
          // coverImage: coverImage.files[0],
          description: description.innerHTML,
        },
      ])
    );
    setTimeout(() => {
      name.value = "";
      coverImage.value = "";
      description.innerHTML = "";
      window.location.reload();
      // changeDashboardView("projects");
    }, 500);
  }
};

const loadSaved = () => {
  const articles = localStorage.getItem("articles");
  const projects = localStorage.getItem("projects");
  console.log({ articles, projects });
  if (articles) {
    const articlesArray = JSON.parse(articles);
    const articlesList = document.querySelector(
      "section#articles .dashboard-content .dashboard-content-body .contents"
    );
    articlesList.innerHTML = "";
    articlesArray.forEach((article) => {
      articlesList.innerHTML += `
        <div class="card" onclick="viewArticle()">
            <img
              src="../assets//images/wizzy-safaris.png"
              alt=""
              class="card-image"
            />
            <div class="card-title">${article.title
              .split(" ")
              .slice(0, 3)
              .join(" ")}</div>
            <div class="card-description">
              ${article.content.split(" ").slice(0, 25).join(" ")}
            </div>
          </div>
        `;
    });
  }
  if (projects) {
    const projectsArray = JSON.parse(projects);
    const projectsList = document.querySelector(
      "section#projects .dashboard-content .dashboard-content-body .contents"
    );
    console.log(projects);
    projectsList.innerHTML = "";
    projectsArray.forEach((project) => {
      projectsList.innerHTML += `
        <div class="card" onclick="viewArticle()">
            <img
              src="../assets//images/wizzy-safaris.png"
              alt=""
              class="card-image"
            />
            <div class="card-title">${project.name
              .split(" ")
              .slice(0, 3)
              .join(" ")}</div>
            <div class="card-description">
              ${project.description.split(" ").slice(0, 25).join(" ")}
            </div>
          </div>
        `;
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  loadSaved();
  if (window.location.hash) {
    changeDashboardView(window.location.hash.substring(1));
  } else {
    changeDashboardView("dashboard");
  }
});
