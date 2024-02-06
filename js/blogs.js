const loadarticles = () => {
  console.log(">>>>>>>>>>>>>>>>");
  const articles = localStorage.getItem("articles");
  console.log(articles);
  if (articles) {
    const articlesArray = JSON.parse(articles);
    const articlesList = document.querySelector(".blog-content");
    console.log(articlesList);
    articlesList.innerHTML = "";
    articlesArray.forEach((article) => {
      console.log(">>>>>>>>>>>>>>>>");
      articlesList.innerHTML += `
      <a href="./viewBlog.html" class="blog-card">
      <div class="blog-card-left">
        <div class="blog-card-title">
          ${article.title}
        </div>
        <div class="blog-card-description">
          ${article.content}
        </div>
        <div class="blog-card-footer">
          <div class="blog-card-date">Jan 17, 2024</div>
          <p class="blog-card-topic">React</p>
        </div>
      </div>
      <img
        style="width: 250px; height: 200px; border-radius: 5px"
        src="../assets/images/thumbnail.svg"
      />
    </a>
        `;
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  loadarticles();
});
