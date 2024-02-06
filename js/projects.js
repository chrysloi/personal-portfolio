export const loadProjects = () => {
  console.log(">>>>>>>>>>>>>>>>");
  const projects = localStorage.getItem("projects");
  console.log(projects);
  if (projects) {
    const projectsArray = JSON.parse(projects);
    const projectsList = document.querySelector("#allProjects");
    console.log(projectsList);
    projectsList.innerHTML = "";
    projectsArray.forEach((project) => {
      console.log(">>>>>>>>>>>>>>>>");
      projectsList.innerHTML += `
      <div class="card">
          <img
            src="${project.coverImage}"
            alt=""
            class="card-image"
          />
          <div class="card-title">${project.name}</div>
          <div class="card-description">
            ${project.description}
          </div>
        </div>
      `;
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  loadProjects();
});
