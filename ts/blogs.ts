type BlogArticle = {
  title: string;
  coverImage: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const loadarticles = () => {
  console.log(">>>>>>>>>>>>>>>>");
  const articles = localStorage.getItem("articles");
  console.log(articles);
  const articlesArray: BlogArticle[] = articles ? JSON.parse(articles) : [];
  const articlesList = document.querySelector(".blog-content") as HTMLElement;
  if (articlesArray.length > 0 && articlesList) {
    console.log(articlesList);
    articlesList.innerHTML = "";
    articlesArray.forEach((article) => {
      articlesList.innerHTML += `
      <a href="./viewBlog.html" class="blog-card">
      <div class="blog-card-left">
        <div class="blog-card-title">
          ${article.title}
        </div>
        <div class="blog-card-description">
          ${article.content.split(" ").slice(0, 30).join(" ")}...
        </div>
        <div class="blog-card-footer">
          <div class="blog-card-date">${
            article.createdAt
              ? new Date(article.createdAt).toDateString()
              : new Date().toDateString()
          }</div>
          <p class="blog-card-topic">React</p>
        </div>
      </div>
      <img
        style="width: 250px; height: 200px; border-radius: 5px"
        src="${article.coverImage}"
      />
    </a>
        `;
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  loadarticles();
});
