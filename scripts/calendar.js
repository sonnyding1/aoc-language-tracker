const calendar = document.querySelector(".calendar");

if (calendar) {
  console.log("Calendar script loaded");

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css";
  document.head.appendChild(link);

  const yearMatch = window.location.href.match(
    /https:\/\/adventofcode\.com\/(\d{4})/
  );
  const yearNumber = yearMatch ? yearMatch[1] : null;

  chrome.storage.sync.get(null, (data) => {
    const calendarDays = calendar.children;
    for (const day of calendarDays) {
      if ([...day.classList].some((c) => c.includes("calendar-day"))) {
        const dayNumber = day.querySelector(".calendar-day").textContent.trim();
        const languages = data[`aoc_${yearNumber}_${dayNumber}`] || [];
        const languageContainer = document.createElement("span");
        languageContainer.style.marginLeft = "1em";
        for (const language of languages) {
          const languageElement = document.createElement("i");
          languageElement.className = `devicon-${language}-plain`;
          languageElement.style.color = "#ffff66";
          languageElement.style.textShadow = "0 0 5px #ffff66";
          languageElement.style.marginLeft = "1px";
          languageContainer.appendChild(languageElement);
        }
        day.insertAdjacentElement("afterend", languageContainer);
      }
    }
  });
}
