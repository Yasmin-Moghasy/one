// check local storage color option
let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // check for active class
  // remove active class from all colors list item
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");
    // add active class on ele with data-color === local storage item
    if (ele.dataset.color === mainColors) {
      ele.classList.add("active");
    }
  });
}
let backgroundOption = true;

// variable to clear interval
let backgroundInterval;

// check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background-option");
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // remove active class from all spans
  document.querySelectorAll(".option-box span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".option-box span.yes").classList.add("active");
  } else {
    document.querySelector(".option-box span.no").classList.add("active");
  }
}

// toggle spin class on icon
let icon = document.querySelector(".toggle .fa-gear");
// toggle  open class on setting box
let settingBox = document.querySelector(".setting-box");

icon.onclick = function () {
  this.classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
};
// switch colors
let colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // set color on local storage
    localStorage.setItem("color-option", e.target.dataset.color);

    handleActive(e);
  });
});
// switch random background option
let randomBg = document.querySelectorAll(".span-container span");
randomBg.forEach((span) => {
  span.addEventListener("click", (e) => {
    // // remove active class from all children
    // e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    //   ele.classList.remove("active");
    // });

    // // add active class on target
    // e.target.classList.add("active");
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      localStorage.setItem("background-option", true);

      randomizeImg();
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

// landing page elements selector
let landingPage = document.querySelector(".landing");

// get imgs array
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"];

// function to randomize option
function randomizeImg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // change background image Url
      landingPage.style.backgroundImage =
        "url('images/" + imgsArray[randomNumber] + "')";
    }, 1000);
  }
}
randomizeImg();

// select skills
let skills = document.querySelector(".skills");
window.onscroll = function () {
  // skills Offset Top
  let skillsOffsetTop = skills.offsetTop;

  // skills Outer Height
  let skillsOuterHeight = skills.offsetHeight;

  // window Height
  let windowHeight = this.innerHeight;

  // window scroll top
  let windowScrollTop = window.pageYOffset;
  // console.log(windowScrollTop);

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create popup with the image
let gallery = document.querySelectorAll(".gallery .img-box img");
// console.log(gallery);

gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);

      let popupImg = document.createElement("img");
      popupImg.src = img.src;

      popupBox.appendChild(popupImg);
      document.body.appendChild(popupBox);

      // create close span
      let closeButton = document.createElement("span");
      let buttonText = document.createTextNode("X");
      closeButton.className = "close-btn";
      closeButton.appendChild(buttonText);
      popupBox.appendChild(closeButton);
    }
  });
});
document.addEventListener("click", function (e) {
  if (e.target.className == "close-btn") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// select all links
let allLinks = document.querySelectorAll(".links a");
let footerList = document.querySelectorAll("footer .footer-content ul.list li a")

function scrolltoView(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        bahavior: "smooth",
      });
    });
  });
}

scrolltoView(allBullets);
scrolltoView(allLinks);
scrolltoView(footerList);

//  Function to handle active class on self

function handleActive(ev) {
  // remove active class from all children
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  // add active class on self

  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalStorage = localStorage.getItem("bullets_option");

if (bulletLocalStorage !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalStorage === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});
//reset button
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets_option");

  window.location.reload();
};

// toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector("ul.links");
toggleBtn.onclick = function (e) {
  e.stopPropagation();

  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // check if menu is open
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});
// stop propagation on menu 
tLinks.onclick = function(e){
  e.stopPropagation();

}
