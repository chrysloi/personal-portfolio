type Pages = {
  // dashboard: string;
  // articles: string;
  // projects: string;
  viewDetails: string;
  edit: string;
  newArticle: string;
  newProject: string;
  main: string;
};

const pages: Pages = {
  // dashboard: "dashboard.html",
  // articles: "articles.html",
  // projects: "projects.html",
  viewDetails: "viewDetails.html",
  edit: "edit.html",
  newArticle: "newArticle.html",
  newProject: "newProject.html",
  main: "index.html",
};

type ObjKey = keyof typeof pages;

type Project = {
  name: string;
  coverImage: string;
  description: string;
};

type Article = {
  title: string;
  coverImage: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const articles = localStorage.getItem("articles");
const articlesArray: Article[] = articles ? JSON.parse(articles) : [];

const mainContainer = document.querySelector("main") as HTMLElement;
const changeView = async (changeTo: ObjKey) => {
  if (pages[changeTo] && mainContainer) {
    const res = await fetch(pages[changeTo]);
    const content = await res.text();
    // const navLinks = document.querySelectorAll(".dashboard-menu li a");
    // console.log({ content });

    // navLinks.forEach((link) => {
    //   const sectionId = link.getAttribute("href")?.substring(1);
    //   if (pages[sectionId as ObjKey] && sectionId === changeTo) {
    //     link.classList.add("active");
    //   } else if (pages[sectionId as ObjKey]) {
    //     link.classList.remove("active");
    //   }
    // });
    mainContainer.innerHTML = content;
    // const contentArea = document.querySelector("section .dashboard-content");
    // console.log(contentArea);
    // console.log(mainContainer);
  }
};

const goBack = async () => {
  window.location.reload();
};

const changeDashboardView = (changeTo: string) => {
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
      const sectionId = link.getAttribute("href")?.substring(1);
      if (sectionId === changeTo) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
    const newURL =
      window.location.origin + window.location.pathname + "#" + changeTo;
    history.pushState(null, "", newURL);
  }
};

/* View article */
const viewArticle = async (title: string) => {
  const article = articlesArray.filter((item) => item.title === title)[0];
  const articleView = await (await fetch(pages["viewDetails"])).text();
  mainContainer.innerHTML = articleView;
  const contentArea = document.querySelector(
    "section#viewDetails .dashboard-content"
  );
  if (contentArea) {
    contentArea.innerHTML = `
      <div class="dashboard-content-header view-header">
      <div class="dashboard-content-header-title">
        <a onclick="goBack()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 30 30"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m15 5l-6 7l6 7"
            />
          </svg>
        </a>
        <h1>View Article</h1>
      </div>
      <div class="btn-group">
        <div class="login-btn">
          <a onclick="editArticle('${
            article.title
          }')" class="theme-btn edit">Edit</a>
        </div>
        <div class="login-btn">
          <a onClick="deleteArticle('${
            article.title
          }')" class="theme-btn delete">Delete</a>
        </div>
      </div>
    </div>
    <div class="blog-content">
      <p class="title">${article.title}</p>
      <div class="author-date">
        <img
          style="width: 45px; height: 45px; border-radius: 25px"
          src="../assets/images/1642048213572.jpg"
        />
        <div class="date">
          <p>Eloi Chrysanthe<br /><span>${
            article.createdAt
              ? new Date(article.createdAt).toDateString()
              : new Date().toDateString()
          }</span></p>
        </div>
      </div>
      <img
        style="width: 100%; height: auto"
        src="${article.coverImage}"
      />
      <br />
      <br />
      <p class="details">${article.content}</p>
    <div>`;
  }
};

/* Deleting an article */
const deleteArticle = (title: string) => {
  const restArticles = articlesArray.filter((item) => item.title !== title);
  localStorage.setItem("articles", JSON.stringify(restArticles));
  window.location.reload();
};

/* update article */
const updateArticle = (title: string) => {
  const articleIndex = articlesArray.findIndex((obj) => obj.title === title);
  const updatedTitle = document.querySelector(
    "form #title"
  ) as HTMLInputElement;
  const updatedCoverImage = document.querySelector(
    "form #coverImage"
  ) as HTMLInputElement;
  const updatedContent = document.querySelector("form #editor") as HTMLElement;
  articlesArray[articleIndex] = {
    title: updatedTitle.value,
    content: updatedContent.innerHTML,
    coverImage: updatedCoverImage.value,
    createdAt: articlesArray[articleIndex].createdAt,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem("articles", JSON.stringify(articlesArray));
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert");
  alertDiv.textContent = "Success! Article updated successfully";
  document.body.appendChild(alertDiv);
  setTimeout(() => {
    updatedTitle.value = "";
    updatedCoverImage.value = "";
    updatedContent.innerHTML = "";
    viewArticle(title);
    alertDiv.style.display = "none";
  }, 3000);
};

/* Go to edit screen */
const editArticle = async (title: string) => {
  const article = articlesArray.filter((item) => item.title === title)[0];
  const articleView = await (await fetch(pages["edit"])).text();
  mainContainer.innerHTML = articleView;
  const contentArea = document.querySelector(
    "section#editContent .dashboard-content"
  );
  if (contentArea) {
    contentArea.innerHTML = `
      <div class="dashboard-content-header view-header">
        <div class="dashboard-content-header-title">
          <a onclick="viewArticle('${article.title}')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 30 30"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m15 5l-6 7l6 7"
              />
            </svg>
          </a>
          <h1>Update Article</h1>
        </div>
        <div class="btn-group">
          <div class="login-btn">
            <a onclick="updateArticle('${article.title}')" class="theme-btn add">Update</a>
          </div>
        </div>
      </div>
      <div class="blog-content">
        <form method="post">
          <div class="row">
            <div class="col-md-6">
              <div class="input-group">
                <p>
                  <label for="title">Title<sup>*</sup> </label>
                  <span class="wpcf7-form-control-wrap" data-name="title">
                    <input
                      id="title"
                      size="40"
                      class="input-group"
                      aria-required="true"
                      aria-invalid="false"
                      placeholder="Article Title"
                      type="title"
                      name="title"
                      value="${article.title}"
                    />
                  </span>
                </p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="input-group">
                <p>
                  <label for="coverImage">Cover Image<sup>*</sup> </label>
                  <span class="wpcf7-form-control-wrap" data-name="coverImage">
                    <input
                      id="coverImage"
                      size="40"
                      class="input-group"
                      aria-required="true"
                      aria-invalid="false"
                      placeholder="Image url"
                      type="url"
                      name="coverImage"
                      value="${article.coverImage}"
                    />
                  </span>
                </p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="input-group">
                <p>
                  <label for="article">Article<sup>*</sup> </label>
                  <span class="wpcf7-form-control-wrap" data-name="article">
                    <div id="editor-container">
                      <!-- <div id="toolbar">
                        <button onclick="formatText('bold')">Bold</button>
                        <button onclick="formatText('italic')">Italic</button>
                        <button onclick="formatText('underline')">
                          Underline
                        </button>
                        <button onclick="alignText('left')">Align Left</button>
                        <button onclick="alignText('center')">
                          Align Center
                        </button>
                        <button onclick="alignText('right')">Align Right</button>
                      </div> -->
                      <div id="editor" contenteditable="true">${article.content}</div>
                    </div>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>`;
  }
};

/* Creating a new project */
const newArticle = async () => {
  const title = document.querySelector("form #title") as HTMLInputElement;
  const coverImage = document.querySelector(
    "form #coverImage"
  ) as HTMLInputElement;
  const content = document.querySelector("form #editor") as HTMLElement;

  if (articles) {
    articlesArray.push({
      title: title?.value,
      coverImage: coverImage.value,
      content: content.innerHTML,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    localStorage.setItem("articles", JSON.stringify(articlesArray));
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    alertDiv.textContent = "Success! Article published successfully";
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      title.value = "";
      coverImage.value = "";
      content.innerHTML = "";
      window.location.reload();
      alertDiv.style.display = "none";
    }, 3000);
  } else {
    articlesArray.push({
      title: title?.value,
      coverImage: coverImage.value,
      content: content.innerHTML,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    localStorage.setItem("articles", JSON.stringify(articlesArray));
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    alertDiv.textContent = "Success! Article published successfully";
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      title.value = "";
      coverImage.value = "";
      content.innerHTML = "";
      window.location.reload();
      alertDiv.style.display = "none";
    }, 3000);
  }
};

/* Creating a new project */
const newProject = async () => {
  const name = document.querySelector("form #name") as HTMLInputElement;
  const coverImage = document.querySelector(
    "form #coverImage"
  ) as HTMLInputElement;
  const description = document.querySelector("form #editor") as HTMLElement;
  const projects = localStorage.getItem("projects");
  const projectsArray: Project[] = projects ? JSON.parse(projects) : [];
  if (projectsArray.length > 0) {
    projectsArray.push({
      name: name.value,
      coverImage: coverImage.value,
      description: description.innerHTML,
    });
    localStorage.setItem("projects", JSON.stringify(projectsArray));
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    alertDiv.textContent = "Success! Article published successfully";
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      name.value = "";
      coverImage.value = "";
      description.innerHTML = "";
      window.location.reload();
      alertDiv.style.display = "none";
    }, 500);
  } else {
    localStorage.setItem(
      "projects",
      JSON.stringify([
        {
          name: name.value,
          coverImage: coverImage.value,
          description: description.innerHTML,
        },
      ])
    );
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    alertDiv.textContent = "Success! Article published successfully";
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      name.value = "";
      coverImage.value = "";
      description.innerHTML = "";
      window.location.reload();
      alertDiv.style.display = "none";
    }, 500);
  }
};

/* Loading all saved data and display them to the dasboard */
const loadSaved = async () => {
  const projects = localStorage.getItem("projects");

  const projectsArray: Project[] = projects ? JSON.parse(projects) : [];
  const articlesList = document.querySelector(
    "section#articles .dashboard-content .dashboard-content-body .contents"
  );
  const dashArticlesList = document.querySelector(
    "section#dashboard .dashboard-content #articles .contents"
  );
  const projectsList = document.querySelector(
    "section#projects .dashboard-content .dashboard-content-body .contents"
  );
  const dashProjectsList = document.querySelector(
    "section#dashboard .dashboard-content #projects .contents"
  );
  if (articlesList && articlesArray) {
    articlesList.innerHTML = "";
    articlesArray.forEach((article) => {
      articlesList.innerHTML += `
        <a class="card" onclick="viewArticle('${article.title}')">
        <img
          src="${article.coverImage}"
          alt="${article.title}"
          class="card-image"
        />
        <div class="card-title">${article.title
          .split(" ")
          .slice(0, 3)
          .join(" ")}</div>
        <div class="card-description">
          ${article.content.split(" ").slice(0, 25).join(" ")}...
        </div>
      </a>
          `;
    });
  }
  if (projectsArray && projectsList) {
    projectsList.innerHTML = "";
    projectsArray.forEach((project) => {
      projectsList.innerHTML += `
        <div class="card" onclick="viewArticle()">
            <img
              src="${project.coverImage}"
              alt=""
              class="card-image"
            />
            <div class="card-title">${project.name
              .split(" ")
              .slice(0, 3)
              .join(" ")}</div>
            <div class="card-description">
              ${project.description.split(" ").slice(0, 25).join(" ")}..
            </div>
          </div>
        `;
    });
  }
  if (dashArticlesList && articlesArray) {
    dashArticlesList.innerHTML = "";
    articlesArray.forEach((article) => {
      dashArticlesList.innerHTML += `
        <a class="card" onclick="viewArticle('${article.title}')">
        <img
          src="${article.coverImage}"
          alt=""
          class="card-image"
        />
        <div class="card-title">${article.title
          .split(" ")
          .slice(0, 3)
          .join(" ")}</div>
        <div class="card-description">
          ${article.content.split(" ").slice(0, 25).join(" ")}...
        </div>
      </a>
          `;
    });
  }
  if (projectsArray && dashProjectsList) {
    dashProjectsList.innerHTML = "";
    projectsArray.forEach((project) => {
      dashProjectsList.innerHTML += `
        <div class="card" onclick="viewArticle()">
            <img
              src="${project.coverImage}"
              alt=""
              class="card-image"
            />
            <div class="card-title">${project.name
              .split(" ")
              .slice(0, 3)
              .join(" ")}</div>
            <div class="card-description">
              ${project.description.split(" ").slice(0, 25).join(" ")}...
            </div>
          </div>
        `;
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  loadSaved();
  // if (window.location.hash.substring(1) === "articles") loadArticles();
  if (window.location.hash) {
    changeDashboardView(window.location.hash.substring(1) as ObjKey);
  } else {
    changeDashboardView("dashboard");
  }
});
