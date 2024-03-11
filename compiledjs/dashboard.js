"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pages = {
    // dashboard: "dashboard.html",
    // articles: "articles.html",
    // projects: "projects.html",
    viewDetails: "viewDetails.html",
    edit: "edit.html",
    newArticle: "newArticle.html",
    newProject: "newProject.html",
    main: "index.html",
};
const articles = localStorage.getItem("articles");
const articlesArray = articles ? JSON.parse(articles) : [];
const projects = localStorage.getItem("projects");
const projectsArray = projects ? JSON.parse(projects) : [];
const mainContainer = document.querySelector("main");
const changeView = (changeTo) => __awaiter(void 0, void 0, void 0, function* () {
    if (pages[changeTo] && mainContainer) {
        const res = yield fetch(pages[changeTo]);
        const content = yield res.text();
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
});
const goBack = () => __awaiter(void 0, void 0, void 0, function* () {
    window.location.reload();
});
const changeDashboardView = (changeTo) => {
    const changeToSection = document.getElementById(changeTo);
    if (changeToSection) {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".dashboard-menu li a");
        sections.forEach((section) => {
            if (section.id === changeTo) {
                section.classList.remove("hidden-section");
            }
            else {
                section.classList.add("hidden-section");
            }
        });
        navLinks.forEach((link) => {
            var _a;
            const sectionId = (_a = link.getAttribute("href")) === null || _a === void 0 ? void 0 : _a.substring(1);
            if (sectionId === changeTo) {
                link.classList.add("active");
            }
            else {
                link.classList.remove("active");
            }
        });
        const newURL = window.location.origin + window.location.pathname + "#" + changeTo;
        history.pushState(null, "", newURL);
    }
};
/* View article */
const viewArticle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : "";
    const resp = yield fetch(`${url}/blog/one/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const article = JSON.parse(yield resp.text()).article;
    const articleView = yield (yield fetch(pages["viewDetails"])).text();
    mainContainer.innerHTML = articleView;
    const contentArea = document.querySelector("section#viewDetails .dashboard-content");
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
          <a onclick="editArticle('${article._id}')" class="theme-btn edit">Edit</a>
        </div>
        ${article.is_published
            ? `<div class="login-btn">
          <a onclick="unpublishArticle('${article._id}')" class="theme-btn edit">Unpublish</a>
        </div>`
            : `<div class="login-btn">
        <a onclick="publishArticle('${article._id}')" class="theme-btn edit">Publish</a>
      </div>`}
        <div class="login-btn">
          <a onClick="deleteArticle('${article._id}')" class="theme-btn delete">Delete</a>
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
          <p>${article.author.name}<br /><span>${article.is_published
            ? `Published: ${new Date(article.createdAt).toDateString()}`
            : `Created: ${article.createdAt && new Date(article.createdAt).toDateString()}`}</span></p>
        </div>
      </div>
      <img
        style="width: 100%; height: auto"
        src="${article.coverImage}"
      />
      <br />
      <br />
      <p class="details">${article.detailed}</p>
    <div>`;
    }
});
/* View Project */
const viewProject = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const project = projectsArray.filter((item) => item.name === name)[0];
    const projectView = yield (yield fetch(pages["viewDetails"])).text();
    mainContainer.innerHTML = projectView;
    const contentArea = document.querySelector("section#viewDetails .dashboard-content");
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
          <a onclick="editArticle('${project.name}')" class="theme-btn edit">Edit</a>
        </div>
        <div class="login-btn">
          <a onClick="deleteArticle('${project.name}')" class="theme-btn delete">Delete</a>
        </div>
      </div>
    </div>
    <div class="blog-content">
      <p class="title">${project.name}</p>
      <div class="author-date">
        <img
          style="width: 45px; height: 45px; border-radius: 25px"
          src="../assets/images/1642048213572.jpg"
        />
      </div>
      <img
        style="width: 100%; height: auto"
        src="${project.coverImage}"
      />
      <br />
      <br />
      <p class="details">${project.description}</p>
    <div>`;
    }
});
/* Deleting an article */
const deleteArticle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : "";
    const resp = yield fetch(`${url}/blog/one/${id}/delete`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const result = JSON.parse(yield resp.text());
    console.log(result);
    const alertDiv = document.createElement("div");
    if (resp.status !== 204) {
        alertDiv.classList.add("alert-error");
        alertDiv.textContent = resp.statusText
            ? `status ${resp.status} - ${resp.statusText}`
            : `status ${resp.status} - An error occured try again`;
        document.body.appendChild(alertDiv);
        setTimeout(() => {
            alertDiv.style.display = "none";
        }, 3000);
    }
    else if (resp.status === 204) {
        alertDiv.classList.add("alert");
        alertDiv.textContent = "Article deleted succcessfully";
        window.location.reload();
        alertDiv.style.display = "none";
        // setTimeout(() => {
        // }, 3000);
    }
});
const publishArticle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : "";
    const resp = yield fetch(`${url}/blog/one/${id}/publish`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const result = JSON.parse(yield resp.text());
    console.log(result);
    const alertDiv = document.createElement("div");
    if (result.status !== 200) {
        alertDiv.classList.add("alert-error");
        alertDiv.textContent = result.error
            ? `status ${result.status} - ${result.error[0]}`
            : `status ${result.status} - An error occured try again`;
        document.body.appendChild(alertDiv);
        setTimeout(() => {
            alertDiv.style.display = "none";
        }, 3000);
    }
    else if (result.status === 200) {
        alertDiv.classList.add("alert");
        window.location.reload();
        alertDiv.style.display = "none";
    }
});
const unpublishArticle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : "";
    const resp = yield fetch(`${url}/blog/one/${id}/unpublish`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const result = JSON.parse(yield resp.text());
    console.log(result);
    const alertDiv = document.createElement("div");
    if (result.status !== 200) {
        alertDiv.classList.add("alert-error");
        alertDiv.textContent = result.error
            ? `status ${result.status} - ${result.error[0]}`
            : `status ${result.status} - An error occured try again`;
        document.body.appendChild(alertDiv);
        setTimeout(() => {
            alertDiv.style.display = "none";
        }, 3000);
    }
    else if (result.status === 200) {
        alertDiv.classList.add("alert");
        window.location.reload();
        alertDiv.style.display = "none";
    }
    // const restArticles = articlesArray.filter((item) => item.title !== title);
    // localStorage.setItem("articles", JSON.stringify(restArticles));
    // window.location.reload();
});
/* update article */
const updateArticle = (title) => {
    const articleIndex = articlesArray.findIndex((obj) => obj.title === title);
    const updatedTitle = document.querySelector("form #title");
    const updatedCoverImage = document.querySelector("form #coverImage");
    const updatedContent = document.querySelector("form #editor");
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
const editArticle = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const article = articlesArray.filter((item) => item.title === title)[0];
    const articleView = yield (yield fetch(pages["edit"])).text();
    mainContainer.innerHTML = articleView;
    const contentArea = document.querySelector("section#editContent .dashboard-content");
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
});
/* Creating a new project */
const newArticle = () => __awaiter(void 0, void 0, void 0, function* () {
    const title = document.querySelector("form #title");
    const coverImage = document.querySelector("form #coverImage");
    const content = document.querySelector("form #editor");
    const summary = document.querySelector("form #summaryEditor");
    const newArticle = new FormData();
    newArticle.append("title", title === null || title === void 0 ? void 0 : title.value);
    (coverImage === null || coverImage === void 0 ? void 0 : coverImage.files) && newArticle.append("articleImage", coverImage === null || coverImage === void 0 ? void 0 : coverImage.files[0]);
    newArticle.append("detailed", content === null || content === void 0 ? void 0 : content.innerHTML);
    newArticle.append("summary", summary === null || summary === void 0 ? void 0 : summary.innerHTML);
    const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : "";
    console.log(token);
    const resp = yield fetch(`${url}/blog/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: newArticle,
    });
    const result = JSON.parse(yield resp.text());
    console.log(result);
    const alertDiv = document.createElement("div");
    if (result.status !== 201) {
        // loginButton.innerHTML = "Login";
        alertDiv.classList.add("alert-error");
        alertDiv.textContent = result.error
            ? result.error[0]
            : "An error occured try again";
        document.body.appendChild(alertDiv);
        setTimeout(() => {
            alertDiv.style.display = "none";
        }, 3000);
    }
    else if (result.status === 201) {
        alertDiv.classList.add("alert");
        title.value = "";
        coverImage.value = "";
        content.innerHTML = "";
        window.location.reload();
        alertDiv.style.display = "none";
    }
});
/* Creating a new project */
const newProject = () => __awaiter(void 0, void 0, void 0, function* () {
    const name = document.querySelector("form #name");
    const coverImage = document.querySelector("form #coverImage");
    const description = document.querySelector("form #editor");
    const projects = localStorage.getItem("projects");
    const projectsArray = projects ? JSON.parse(projects) : [];
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
    }
    else {
        localStorage.setItem("projects", JSON.stringify([
            {
                name: name.value,
                coverImage: coverImage.value,
                description: description.innerHTML,
            },
        ]));
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
});
/* Loading all saved data and display them to the dasboard */
const loadSaved = () => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : "";
    const resp = yield fetch(`${url}/blog/user/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const articles = JSON.parse(yield resp.text()).articles;
    const articlesList = document.querySelector("section#articles .dashboard-content .dashboard-content-body .contents");
    const dashArticlesList = document.querySelector("section#dashboard .dashboard-content #articles .contents");
    const projectsList = document.querySelector("section#projects .dashboard-content .dashboard-content-body .contents");
    const dashProjectsList = document.querySelector("section#dashboard .dashboard-content #projects .contents");
    if (articlesList && articles) {
        console.log(articles);
        articlesList.innerHTML = "";
        articles.forEach((article) => {
            articlesList.innerHTML += `
        <a class="card" onclick="viewArticle('${article._id}')">
        <img
          src="${article.coverImage
                ? article.coverImage
                : "https://repository-images.githubusercontent.com/329723227/62ff9135-2763-4fba-ae7f-0b1eefa0ea56"}"
          alt="${article.title}"
          class="card-image"
        />
        <div class="card-title">${article.title && article.title.split(" ").slice(0, 3).join(" ")}</div>
        <div class="card-description">
          ${article.detailed.split(" ").slice(0, 25).join(" ")}...
        </div>
      </a>
          `;
        });
    }
    if (projectsArray && projectsList) {
        projectsList.innerHTML = "";
        projectsArray.forEach((project) => {
            projectsList.innerHTML += `
        <a class="card" onclick="viewProject('${project.name})">
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
          </a>
        `;
        });
    }
    if (dashArticlesList && articles) {
        dashArticlesList.innerHTML = "";
        articles.forEach((article) => {
            dashArticlesList.innerHTML += `
        <a class="card" onclick="viewArticle('${article._id}')">
        <img
          src="${article.coverImage
                ? article.coverImage
                : "https://repository-images.githubusercontent.com/329723227/62ff9135-2763-4fba-ae7f-0b1eefa0ea56"}"
          alt="${article.title}"
          class="card-image"
        />
        <div class="card-title">${article.title && article.title.split(" ").slice(0, 3).join(" ")}</div>
        <div class="card-description">
          ${article.detailed.split(" ").slice(0, 25).join(" ")}...
        </div>
      </a>
          `;
        });
    }
    if (projectsArray && dashProjectsList) {
        dashProjectsList.innerHTML = "";
        projectsArray.forEach((project) => {
            dashProjectsList.innerHTML += `
        <a class="card" onclick="viewProject('${project.name})">
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
          </a>
        `;
        });
    }
});
window.addEventListener("DOMContentLoaded", () => {
    loadSaved();
    const loggedInUser = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : "";
    // console.log(loggedInUser.length === 0, "<<<<<<<<<");
    const currentMode = localStorage.getItem("light-theme");
    if (currentMode === "light") {
        console.log(currentMode);
        document.documentElement.classList.toggle("light-theme");
    }
    if (loggedInUser === "") {
        console.log(true);
        window.location.href = "/login.html";
    }
    // if (window.location.hash.substring(1) === "articles") loadArticles();
    if (window.location.hash && loggedInUser) {
        changeDashboardView(window.location.hash.substring(1));
    }
    else if (loggedInUser) {
        changeDashboardView("dashboard");
    }
});
