document.addEventListener("DOMContentLoaded", () => {
  console.log("Popup script loaded");

  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const year = document.getElementById("year").value;
    const day = document.getElementById("day").value;
    const language = document.getElementById("language").value;

    const key = `aoc_${year}_${day}`;
    chrome.storage.sync.get(key, (data) => {
      const languages = data[key] || [];
      if (!languages.includes(language)) {
        languages.push(language);
      }
      data[key] = languages;

      chrome.storage.sync.set(data, () => {
        console.log(`Language ${language} saved for year ${year}, day ${day}`);
      });
    });
  });
});
