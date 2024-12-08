document.addEventListener("DOMContentLoaded", function () {
    var cloakElement;
  
    var tab = localStorage.getItem("tab");
    var tabData = tab ? JSON.parse(tab) || {} : {};
  
    var titleElement = document.getElementById("title");
    var iconElement = document.getElementById("icon");
  
    if (tabData.title && titleElement) titleElement.value = tabData.title;
    if (tabData.icon && iconElement) iconElement.value = tabData.icon;
  
    var settingsDefaultTab = {
      title: "Velara Unblocked | Best place to play games at work school anywhere even on the go |",
      icon: "/assets/icons/velara.ico",
    };
  
    function setTitle(title = "") {
      document.title = title || settingsDefaultTab.title;
  
      var tab = localStorage.getItem("tab");
      var tabData = tab ? JSON.parse(tab) || {} : {};
      if (title) {
        tabData.title = title;
      } else {
        delete tabData.title;
      }
  
      localStorage.setItem("tab", JSON.stringify(tabData));
    }
  
    function setFavicon(icon) {
      document.querySelector("link[rel='icon']").href = icon || settingsDefaultTab.icon;
  
      var tab = localStorage.getItem("tab");
      var tabData = tab ? JSON.parse(tab) || {} : {};
      if (icon) {
        tabData.icon = icon;
      } else {
        delete tabData.icon;
      }
  
      localStorage.setItem("tab", JSON.stringify(tabData));
    }
  
    function setCloak() {
      var cloak = cloakElement ? cloakElement.value : "";
  
      switch (cloak) {
        case "search":
          setTitle("Google");
          setFavicon("/assets/icons/Google Search.ico");
          break;
        case "wikipedia":
          setTitle("Wikipedia, the free encyclopedia");
          setFavicon("/assets/icons/Wikipedia.ico");
          break;
        case "bsite":
          setTitle("Billibilli");
          setFavicon("/assets/icons/Billibilli.ico");
          break;
        case "drive":
          setTitle("My Drive - Google Drive");
          setFavicon("/assets/icons/Google Drive.ico");
          break;
        case "gmail":
          setTitle("Gmail");
          setFavicon("/assets/icons/Gmail.ico");
          break;
        case "calendar":
          setTitle("Google Calendar");
          setFavicon("/assets/icons/Calendar.ico");
          break;
        case "meets":
          setTitle("Google Meet");
          setFavicon("/assets/icons/Meet.ico");
          break;
        case "classroom":
          setTitle("Classes");
          setFavicon("/assets/icons/Classroom.png");
          break;
        case "canvas":
          setTitle("Dashboard");
          setFavicon("/assets/icons/Canvas.ico");
          break;
        case "zoom":
          setTitle("Zoom");
          setFavicon("/assets/icons/Zoom.ico");
          break;
        case "khan":
          setTitle("Dashboard | Khan Academy");
          setFavicon("/assets/icons/Khan Academy.ico");
          break;
        case "itchio":
          setTitle("Download the latest indie games - itch.io");
          setFavicon("/assets/icons/itchio.ico");
          break;
        case "deltamath":
          setTitle("DeltaMath Student Application");
          setFavicon("/assets/icons/deltamath.png");
          break;
        case "ed":
          setTitle("Edpuzzle");
          setFavicon("/assets/icons/edpuzzle.png");
          break;
      }
    }
  

    if (cloakElement) {
      setCloak();
    }
  });
  