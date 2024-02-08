// const loadarticles = () => {
//   console.log(">>>>>>>>>>>>>>>>");
//   const articles = localStorage.getItem("articles");
//   console.log(articles);
//   if (articles) {
//     const articlesArray = JSON.parse(articles);
//     const articlesList = document.querySelector(".blog-content");
//     console.log(articlesList);
//     articlesList.innerHTML = "";
//     articlesArray.forEach((article) => {
//       console.log(">>>>>>>>>>>>>>>>");
//       articlesList.innerHTML += `
//       <a href="./viewBlog.html" class="blog-card">
//       <div class="blog-card-left">
//         <div class="blog-card-title">
//           ${article.title}
//         </div>
//         <div class="blog-card-description">
//           ${article.content}
//         </div>
//         <div class="blog-card-footer">
//           <div class="blog-card-date">Jan 17, 2024</div>
//           <p class="blog-card-topic">React</p>
//         </div>
//       </div>
//       <img
//         style="width: 250px; height: 200px; border-radius: 5px"
//         src="https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2EP14mWkbx9sq03nWnRSGT/f1d22d88bb5dde030275f9520c0f2e92/React_YT_Thumbnail.png"
//       />
//     </a>
//         `;
//     });
//   }
// };

// window.addEventListener("DOMContentLoaded", () => {
//   loadarticles();
// });
