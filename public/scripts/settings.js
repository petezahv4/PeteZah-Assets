const defaultSettings = {
    cloakTitle: "Velara | Best place to play games at school or work  unblocked ",
    cloakFavicon: "assets/icons/velara.ico"
};

const savedSettings = JSON.parse(localStorage.getItem("tabCloakSettings")) || defaultSettings;

const settingsDropdown = document.getElementById("cloak-setting");
settingsDropdown.value = `${savedSettings.cloakTitle},${savedSettings.cloakFavicon}`;

document.getElementById("settings-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const [cloakTitle, cloakFavicon] = settingsDropdown.value.split(",");

    const newSettings = { cloakTitle, cloakFavicon };
    localStorage.setItem("tabCloakSettings", JSON.stringify(newSettings));
    alert("Settings saved! Changes will apply immediately.");

    
    updateCloakedTab(newSettings);
})

document.getElementById("reset-settings").addEventListener("click", () => {
    localStorage.setItem("tabCloakSettings", JSON.stringify(defaultSettings));
    settingsDropdown.value = `${defaultSettings.cloakTitle},${defaultSettings.cloakFavicon}`;
    alert("Settings reset to default!");
    updateCloakedTab(defaultSettings);
});

function updateCloakedTab(settings) {
    document.title = settings.cloakTitle;
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = settings.cloakFavicon;
    document.head.appendChild(favicon);
}
