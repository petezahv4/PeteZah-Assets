const form = document.getElementById("settings-form");
const savedSettings = JSON.parse(localStorage.getItem("tabCloakSettings")) || {
    cloakTitle: "Cloaked Tab Title",
    cloakFavicon: "favicon-cloak.png"
};

document.getElementById("cloak-title").value = savedSettings.cloakTitle;
document.getElementById("cloak-favicon").value = savedSettings.cloakFavicon;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newSettings = {
        cloakTitle: document.getElementById("cloak-title").value,
        cloakFavicon: document.getElementById("cloak-favicon").value
    };
    localStorage.setItem("tabCloakSettings", JSON.stringify(newSettings));
    alert("Settings saved!");
});
