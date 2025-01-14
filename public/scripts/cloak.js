const settings = JSON.parse(localStorage.getItem("tabCloakSettings")) || {
  cloakTitle: "Cloaked Tab Title",
  cloakFavicon: "favicon-cloak.png",
};

document.title = settings.cloakTitle;
document.getElementById("favicon").href = settings.cloakFavicon;
