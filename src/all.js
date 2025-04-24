window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("bg-white/80");
  } else {
    header.classList.remove("bg-white/80");
  }
});

// 首頁
// api相關

const apiUrl = "http://localhost:3005/api/v1/";
// 最新消息
fetch("http://localhost:3005/api/v1/home/news/", { method: "GET" })
  .then((response) => response.json())
  .then((response) => {
    console.log(response.result);
    const newsList = document.querySelector(".news-list");
    const data = response.result;
    // 把每一則新聞組成 HTML 字串
    data.forEach((item) => {
      newsList.innerHTML += `
          <li class="mb-4" id="${item._id}">
            <img src="${item.image}" alt="" />
            <div class="bg-white p-2">
              <h3 class="text-primary text-xl pb-4">${item.title}</h3>
              <p class="text-sm text-gray-500">${item.description}</p>  
            </div>
            
          </li>
        `;
    });
  })
  .catch((err) => console.error("Fetch news failed", err));

// 日曆

// modal

const openDate = document.querySelector(".open-date");
const calendar = document.querySelector(".calendar");
openDate.addEventListener("click", () => {
  calendar.classList.remove("hidden");
});

document.addEventListener("click", (e) => {
  if (!calendar.contains(e.target) && !openDate.contains(e.target)) {
    calendar.classList.add("hidden");
  }
});
// 日曆內部

const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");
// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();
// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";
  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive hover:bg-primary text-center rounded-full py-3 text-black/40">${
      lastDateofLastMonth - i + 1
    }</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "bg-primary/50  rounded-full"
        : "";
    liTag += `<li class="${isToday} hover:bg-primary text-center rounded-full py-3">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive hover:bg-primary text-center rounded-full py-3 text-black/40 ">${
      i - lastDayofMonth + 1
    }</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();
prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});

// 動畫
