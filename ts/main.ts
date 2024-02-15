const iconMenu: HTMLElement | null = document.querySelector(".icon-menu");
const overLay: HTMLElement | null = document.querySelector(
  ".responsive-sidebar-menu .overlay"
);
const root = document.documentElement;
const themeSwitch = document.querySelector(".mode") as HTMLElement;
// const currentMode = localStorage.getItem("light-theme");
const darkThemeBtn = `
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.4375 7.8125V3.125C23.4375 2.7106 23.6021 2.31317 23.8951 2.02015C24.1882 1.72712 24.5856 1.5625 25 1.5625C25.4144 1.5625 25.8118 1.72712 26.1049 2.02015C26.3979 2.31317 26.5625 2.7106 26.5625 3.125V7.8125C26.5625 8.2269 26.3979 8.62433 26.1049 8.91735C25.8118 9.21038 25.4144 9.375 25 9.375C24.5856 9.375 24.1882 9.21038 23.8951 8.91735C23.6021 8.62433 23.4375 8.2269 23.4375 7.8125ZM37.5 25C37.5 27.4723 36.7669 29.889 35.3934 31.9446C34.0199 34.0002 32.0676 35.6024 29.7835 36.5485C27.4995 37.4946 24.9861 37.7421 22.5614 37.2598C20.1366 36.7775 17.9093 35.587 16.1612 33.8388C14.413 32.0907 13.2225 29.8634 12.7402 27.4386C12.2579 25.0139 12.5054 22.5005 13.4515 20.2165C14.3976 17.9324 15.9998 15.9801 18.0554 14.6066C20.111 13.2331 22.5277 12.5 25 12.5C28.3141 12.5036 31.4914 13.8217 33.8348 16.1652C36.1783 18.5086 37.4964 21.6859 37.5 25ZM34.375 25C34.375 23.1458 33.8252 21.3332 32.795 19.7915C31.7649 18.2498 30.3007 17.0482 28.5877 16.3386C26.8746 15.6291 24.9896 15.4434 23.171 15.8051C21.3525 16.1669 19.682 17.0598 18.3709 18.3709C17.0598 19.682 16.1669 21.3525 15.8051 23.171C15.4434 24.9896 15.6291 26.8746 16.3386 28.5877C17.0482 30.3007 18.2498 31.7649 19.7915 32.795C21.3332 33.8252 23.1458 34.375 25 34.375C27.4856 34.3724 29.8687 33.3839 31.6263 31.6263C33.3839 29.8687 34.3724 27.4856 34.375 25ZM11.3945 13.6055C11.6877 13.8987 12.0854 14.0634 12.5 14.0634C12.9146 14.0634 13.3123 13.8987 13.6055 13.6055C13.8987 13.3123 14.0634 12.9146 14.0634 12.5C14.0634 12.0854 13.8987 11.6877 13.6055 11.3945L10.4805 8.26953C10.1873 7.97634 9.78963 7.81163 9.375 7.81163C8.96037 7.81163 8.56272 7.97634 8.26953 8.26953C7.97634 8.56272 7.81163 8.96037 7.81163 9.375C7.81163 9.78963 7.97634 10.1873 8.26953 10.4805L11.3945 13.6055ZM11.3945 36.3945L8.26953 39.5195C7.97634 39.8127 7.81163 40.2104 7.81163 40.625C7.81163 41.0396 7.97634 41.4373 8.26953 41.7305C8.56272 42.0237 8.96037 42.1884 9.375 42.1884C9.78963 42.1884 10.1873 42.0237 10.4805 41.7305L13.6055 38.6055C13.7506 38.4603 13.8658 38.288 13.9444 38.0983C14.0229 37.9086 14.0634 37.7053 14.0634 37.5C14.0634 37.2947 14.0229 37.0914 13.9444 36.9017C13.8658 36.712 13.7506 36.5397 13.6055 36.3945C13.4603 36.2494 13.288 36.1342 13.0983 36.0556C12.9086 35.9771 12.7053 35.9366 12.5 35.9366C12.2947 35.9366 12.0914 35.9771 11.9017 36.0556C11.712 36.1342 11.5397 36.2494 11.3945 36.3945ZM37.5 14.0625C37.7052 14.0627 37.9085 14.0224 38.0982 13.944C38.2879 13.8655 38.4603 13.7505 38.6055 13.6055L41.7305 10.4805C42.0237 10.1873 42.1884 9.78963 42.1884 9.375C42.1884 8.96037 42.0237 8.56272 41.7305 8.26953C41.4373 7.97634 41.0396 7.81163 40.625 7.81163C40.2104 7.81163 39.8127 7.97634 39.5195 8.26953L36.3945 11.3945C36.1758 11.6131 36.0268 11.8916 35.9664 12.1948C35.906 12.4981 35.9369 12.8124 36.0553 13.0981C36.1736 13.3838 36.3741 13.6279 36.6313 13.7996C36.8885 13.9712 37.1908 14.0627 37.5 14.0625ZM38.6055 36.3945C38.3123 36.1013 37.9146 35.9366 37.5 35.9366C37.0854 35.9366 36.6877 36.1013 36.3945 36.3945C36.1013 36.6877 35.9366 37.0854 35.9366 37.5C35.9366 37.9146 36.1013 38.3123 36.3945 38.6055L39.5195 41.7305C39.6647 41.8756 39.837 41.9908 40.0267 42.0694C40.2164 42.1479 40.4197 42.1884 40.625 42.1884C40.8303 42.1884 41.0336 42.1479 41.2233 42.0694C41.413 41.9908 41.5853 41.8756 41.7305 41.7305C41.8756 41.5853 41.9908 41.413 42.0694 41.2233C42.1479 41.0336 42.1884 40.8303 42.1884 40.625C42.1884 40.4197 42.1479 40.2164 42.0694 40.0267C41.9908 39.837 41.8756 39.6647 41.7305 39.5195L38.6055 36.3945ZM9.375 25C9.375 24.5856 9.21038 24.1882 8.91735 23.8951C8.62433 23.6021 8.2269 23.4375 7.8125 23.4375H3.125C2.7106 23.4375 2.31317 23.6021 2.02015 23.8951C1.72712 24.1882 1.5625 24.5856 1.5625 25C1.5625 25.4144 1.72712 25.8118 2.02015 26.1049C2.31317 26.3979 2.7106 26.5625 3.125 26.5625H7.8125C8.2269 26.5625 8.62433 26.3979 8.91735 26.1049C9.21038 25.8118 9.375 25.4144 9.375 25ZM25 40.625C24.5856 40.625 24.1882 40.7896 23.8951 41.0826C23.6021 41.3757 23.4375 41.7731 23.4375 42.1875V46.875C23.4375 47.2894 23.6021 47.6868 23.8951 47.9799C24.1882 48.2729 24.5856 48.4375 25 48.4375C25.4144 48.4375 25.8118 48.2729 26.1049 47.9799C26.3979 47.6868 26.5625 47.2894 26.5625 46.875V42.1875C26.5625 41.7731 26.3979 41.3757 26.1049 41.0826C25.8118 40.7896 25.4144 40.625 25 40.625ZM46.875 23.4375H42.1875C41.7731 23.4375 41.3757 23.6021 41.0826 23.8951C40.7896 24.1882 40.625 24.5856 40.625 25C40.625 25.4144 40.7896 25.8118 41.0826 26.1049C41.3757 26.3979 41.7731 26.5625 42.1875 26.5625H46.875C47.2894 26.5625 47.6868 26.3979 47.9799 26.1049C48.2729 25.8118 48.4375 25.4144 48.4375 25C48.4375 24.5856 48.2729 24.1882 47.9799 23.8951C47.6868 23.6021 47.2894 23.4375 46.875 23.4375Z"
        fill="black"
      />
    </svg>`;

const lightThemeBtn = `
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.625 13.2812C15.625 10.291 16.0654 7.26465 17.1875 4.6875C9.72363 7.93652 4.6875 15.5586 4.6875 24.2188C4.6875 35.8682 14.1318 45.3125 25.7812 45.3125C34.4414 45.3125 42.0635 40.2764 45.3125 32.8125C42.7354 33.9346 39.709 34.375 36.7188 34.375C25.0693 34.375 15.625 24.9307 15.625 13.2812Z"
        stroke="#909090"
        stroke-width="3.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>`;

iconMenu?.addEventListener("click", function () {
  document.querySelector(".responsive-sidebar-menu")?.classList.add("active");
});

overLay?.addEventListener("click", function () {
  document
    .querySelector(".responsive-sidebar-menu")
    ?.classList.remove("active");
});

themeSwitch?.addEventListener("click", () => {
  root.classList.toggle("light-theme");
  if (root.classList.contains("light-theme")) {
    localStorage.setItem("light-theme", "light");
    themeSwitch.innerHTML = darkThemeBtn;
  } else {
    localStorage.removeItem("light-theme");
    themeSwitch.innerHTML = lightThemeBtn;
  }
});

const changeTo = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    document
      .querySelector(".responsive-sidebar-menu")
      ?.classList.remove("active");
  }
};

const getActiveSection = () => {
  const sections: NodeListOf<HTMLElement> =
    document.querySelectorAll("section");
  let currentSection: string = "null";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      currentSection = section.id;
    }
  });

  return currentSection;
};

// Function to update the active navigation button
const updateActiveButton = () => {
  const currentSection: string = getActiveSection();

  if (currentSection) {
    const navLinks = document.querySelectorAll(".dmenu li a");
    navLinks.forEach((link) => {
      const sectionId: string | undefined = link
        .getAttribute("href")
        ?.substring(1);
      if (sectionId === currentSection) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
    const newURL =
      window.location.origin + window.location.pathname + "#" + currentSection;
    history.pushState(null, "", newURL);
  }
};

type message = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

const errorReturn = (data: { container: string; message: string }) => {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error");
  const nameContainer = document.querySelector(
    `${data.container}`
  ) as HTMLElement;
  errorDiv.textContent = data.message;
  nameContainer.appendChild(errorDiv);
  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 3000);
};

const sendMessage = () => {
  const fullName = document.querySelector(
    "#contact #fullName"
  ) as HTMLInputElement;
  const email = document.querySelector("#contact #email") as HTMLInputElement;
  const subject = document.querySelector(
    "#contact #subject"
  ) as HTMLInputElement;
  const message = document.querySelector(
    "#contact #message"
  ) as HTMLInputElement;

  const messages = localStorage.getItem("message");
  const messagesArray: message[] = messages ? JSON.parse(messages) : [];
  if (fullName.value === "") {
    errorReturn({
      container: "#contact .fullName",
      message: "Fullname is required",
    });
    return;
  }
  if (email.value === "") {
    errorReturn({
      container: "#contact .email",
      message: "Email is required",
    });
  }
  if (subject.value === "") {
    errorReturn({
      container: "#contact .subject",
      message: "Subject is required",
    });
  }
  if (message.value === "") {
    errorReturn({
      container: "#contact .message",
      message: "Message is required",
    });
  }

  if (
    messagesArray.length > 0 &&
    message.value !== "" &&
    subject.value !== "" &&
    fullName.value !== "" &&
    email.value !== ""
  ) {
    const newMessage: message = {
      fullName: fullName.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };
    messagesArray.push(newMessage);
    localStorage.setItem("message", JSON.stringify(messagesArray));

    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    alertDiv.textContent = "Success! Message sent successfully.";
    document.body.appendChild(alertDiv);

    setTimeout(() => {
      email.value = "";
      subject.value = "";
      fullName.value = "";
      message.value = "";
      alertDiv.style.display = "none";
    }, 3000);
  } else {
    const newMessage: message = {
      fullName: fullName.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };
    messagesArray.push(newMessage);
    localStorage.setItem("message", JSON.stringify(messagesArray));
    setTimeout(() => {
      email.value = "";
      subject.value = "";
      fullName.value = "";
      message.value = "";
    }, 500);
  }
};

document.addEventListener("scroll", updateActiveButton); // Event listener for scroll
window.addEventListener("DOMContentLoaded", () => {
  updateActiveButton();
  const currentMode = localStorage.getItem("light-theme");
  if (currentMode === "light") {
    console.log(currentMode);
    root.classList.toggle("light-theme");
    themeSwitch.innerHTML = darkThemeBtn;
  }
}); // Initial update when the page loads
