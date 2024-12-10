const settings = JSON.parse(localStorage.getItem("tabCloakSettings")) || {
  cloakTitle: "edpuzzle",
  cloakFavicon: "assets/icons/edpuzzle.png"
};

document.addEventListener("visibilitychange", () => {
  const favicon = document.getElementById("favicon");
  const originalFavicon = "favicon-original.png";

  if (document.hidden) {
      document.title = settings.cloakTitle;
      favicon.href = settings.cloakFavicon;
  } else {
      document.title = "Original Tab Title";
      favicon.href = originalFavicon;
  }
});
