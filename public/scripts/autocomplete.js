const searchInput = document.getElementById("uv-address");
const suggestionsContainer = document.createElement("div");
suggestionsContainer.className = "autocomplete-suggestions";
searchInput.parentElement.appendChild(suggestionsContainer);

// Function to fetch suggestions from DuckDuckGo API
async function fetchSuggestions(query) {
    const url = `https://api.duckduckgo.com/ac?q=${encodeURIComponent(query)}&format=json`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.map(item => item.phrase); // Extract the 'phrase' field from each suggestion
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        return [];
    }
}

// Event listener for input
searchInput.addEventListener("input", async function () {
    const inputValue = this.value.trim();
    suggestionsContainer.innerHTML = ""; // Clear previous suggestions

    if (inputValue) {
        const suggestions = await fetchSuggestions(inputValue);
        suggestions.forEach(suggestion => {
            const suggestionElement = document.createElement("div");
            suggestionElement.textContent = suggestion;
            suggestionElement.addEventListener("click", function () {
                searchInput.value = suggestion;
                suggestionsContainer.innerHTML = ""; // Clear suggestions after selection
            });
            suggestionsContainer.appendChild(suggestionElement);
        });
    }
});

// Hide suggestions when clicking outside the search bar
document.addEventListener("click", function (event) {
    if (event.target !== searchInput) {
        suggestionsContainer.innerHTML = "";
    }
});