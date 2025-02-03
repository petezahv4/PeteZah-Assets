document.addEventListener("DOMContentLoaded", function () {
  function saveToLocalStorage(key, value) {
      localStorage.setItem(key, value);
  }

  function loadFromLocalStorage(key, defaultValue = "") {
      return localStorage.getItem(key) || defaultValue;
  }

  function persistInput(input) {
      if (!input) return;
      const key = input.id;
      input.value = loadFromLocalStorage(key, input.value);
      input.addEventListener("input", () => saveToLocalStorage(key, input.value));
  }

  function persistButton(button, key, value) {
      if (!button) return;
      button.addEventListener("click", () => saveToLocalStorage(key, value));
  }

  persistInput(document.getElementById("tabTitle"));

  const tabForm = document.getElementById("tabForm");
  if (tabForm) {
      tabForm.addEventListener("submit", function (event) {
          event.preventDefault();
          document.title = document.getElementById("tabTitle").value;
          saveToLocalStorage("tabTitle", document.title);
      });
  }

  const resetTab = document.getElementById("resetTab");
  if (resetTab) {
      resetTab.addEventListener("click", function () {
          localStorage.removeItem("tabTitle");
          document.getElementById("tabTitle").value = "";
          document.title = "";
      });
  }

  document.title = loadFromLocalStorage("tabTitle");

  const panicKey = document.getElementById("currentPanicKey");
  if (panicKey) {
      panicKey.textContent = "Current Panic Key: " + loadFromLocalStorage("panicKey", "2");
  }

  window.changePanicKey = function () {
      const newKey = prompt("Enter new Panic Key:");
      if (newKey) {
          saveToLocalStorage("panicKey", newKey);
          if (panicKey) {
              panicKey.textContent = "Current Panic Key: " + newKey;
          }
      }
  };

  function toggleDebugMode() {
      const debugStats = document.getElementById("debugStats");
      if (!debugStats) return;
      debugStats.style.display = debugStats.style.display === "none" ? "block" : "none";
      saveToLocalStorage("debugMode", debugStats.style.display);
  }

  const debugStats = document.getElementById("debugStats");
  if (debugStats) {
      debugStats.style.display = loadFromLocalStorage("debugMode", "none");
  }

  const debugButton = document.querySelector("button[onclick='toggleDebugMode()']");
  if (debugButton) {
      debugButton.addEventListener("click", toggleDebugMode);
  }

  const tabFavicon = document.getElementById("tabFavicon");
  if (tabFavicon) {
      tabFavicon.addEventListener("change", function () {
          const file = tabFavicon.files[0];
          if (file) {
              const reader = new FileReader();
              reader.onload = function (e) {
                  saveToLocalStorage("tabFavicon", e.target.result);
                  updateFavicon(e.target.result);
              };
              reader.readAsDataURL(file);
          }
      });
  }

  function updateFavicon(src) {
      let link = document.querySelector("link[rel='icon']") || document.createElement("link");
      link.rel = "icon";
      link.href = src;
      document.head.appendChild(link);
  }

  const savedFavicon = loadFromLocalStorage("tabFavicon");
  if (savedFavicon) {
      updateFavicon(savedFavicon);
  }
});