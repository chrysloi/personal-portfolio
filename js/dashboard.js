const changeView = (changeTo) => {
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

// const getActiveSection = () => {
//   const sections = document.querySelectorAll("section");
//   let currentSection = null;

//   console.log(sections);
//   sections.forEach((section) => {
//     const rect = section.getBoundingClientRect();
//     if (
//       rect.top <= window.innerHeight / 2 &&
//       rect.bottom >= window.innerHeight / 2
//     ) {
//       currentSection = section.id;
//     }
//   });

//   return currentSection;
// };

// // Function to update the active navigation button
// const updateActiveSection = () => {
//   const currentSection = getActiveSection();

//   if (currentSection) {
//     const navLinks = document.querySelectorAll(".dashboard-menu li a");
//     navLinks.forEach((link) => {
//       const sectionId = link.getAttribute("href").substring(1);
//       if (sectionId === currentSection) {
//         link.classList.add("active");
//       } else {
//         link.classList.remove("active");
//       }
//     });
//     const newURL =
//       window.location.origin + window.location.pathname + "#" + currentSection;
//     history.pushState(null, null, newURL);
//   }
// };

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    changeView(window.location.hash.substring(1));
  } else {
    changeView("dashboard");
  }
});
