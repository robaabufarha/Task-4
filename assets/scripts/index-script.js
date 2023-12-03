import { fetchData, fetchSearchesData } from "./api.js";
import { darkMode, theme } from "./theme.js";
import {
  setSelectedCountry,
  getFromLocalStorage,
  saveToLocalStorage,
  addCountryToStorage,
  removeCountryFromStorage,
} from "./localstorage.js";

let filteredData = [];
let allData = await fetchData();

const displayData = async (data) => {
  let container = document.getElementById("country-info");
  let progressIndicator = document.getElementById("progress-indicator");
  container.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const country = data[i];
    const countryDiv = createCountryDiv(country);
    container.appendChild(countryDiv);
  }

  const div1 = document.getElementById("side-div");
  addDragAndDropListeners(div1);
  progressIndicator.style.display = "none";
  return container.innerHTML;
};

const createCountryDiv = (country) => {
  const countryDiv = document.createElement("div");
  countryDiv.classList.add("col", "col-12");
  countryDiv.id = country.name.common;

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const linkElement = document.createElement("a");
  linkElement.href = "Details.html";
  linkElement.target = "_blank";

  const imgElement = document.createElement("img");
  imgElement.src = country.flags.svg;
  imgElement.classList.add("card-img-top");
  imgElement.alt = country.flags.alt;

  imgElement.addEventListener("click", () => {
    setSelectedCountry(country.name.common);
  });

  linkElement.appendChild(imgElement);

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body");

  const headingElement = document.createElement("h4");
  headingElement.classList.add("card-title", "text-truncate");
  headingElement.textContent = country.name.common;

  const cardTextDiv = document.createElement("div");
  cardTextDiv.classList.add("card-text");

  const populationElement = document.createElement("div");
  populationElement.classList.add("text-truncate");
  populationElement.innerHTML = `<b>Population:</b> ${country.population}`;

  const regionElement = document.createElement("div");
  regionElement.classList.add("text-truncate");
  regionElement.innerHTML = `<b>Region:</b> ${country.region}`;

  const capitalElement = document.createElement("div");
  capitalElement.classList.add("text-truncate");
  capitalElement.innerHTML = `<b>Capital:</b> ${country.capital}`;

  cardTextDiv.appendChild(populationElement);
  cardTextDiv.appendChild(regionElement);
  cardTextDiv.appendChild(capitalElement);

  cardBodyDiv.appendChild(headingElement);
  cardBodyDiv.appendChild(cardTextDiv);
  const starButton = createStarButton(country.name.common);
  cardBodyDiv.appendChild(starButton);

  cardDiv.setAttribute("draggable", true);
  cardDiv.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", country.name.common);
  });

  cardDiv.appendChild(linkElement);
  cardDiv.appendChild(cardBodyDiv);

  countryDiv.appendChild(cardDiv);

  return countryDiv;
};

const createStarButton = (countryName) => {
  const starButton = document.createElement("button");
  starButton.innerHTML = "&#9733;";
  starButton.classList.add("star-button");

  const storedCountries = getFromLocalStorage("storedCountries") || [];
  if (storedCountries.includes(countryName)) {
    starButton.classList.add("yellow-star");
  }
  starButton.addEventListener("click", () => {
    if (starButton.classList.contains("yellow-star")) {
      starButton.classList.remove("yellow-star");
      removeCountryFromStorage(countryName);
    } else {
      starButton.classList.add("yellow-star");
      addCountryToStorage(countryName);
    }
  });

  return starButton;
};

const addDragAndDropListeners = (div) => {
  div.addEventListener("dragover", (e) => {
    e.preventDefault();
    div.style.border = "2px solid #27ae60";
  });

  div.addEventListener("dragleave", () => {
    div.style.border = "2px solid transparent";
  });

  div.addEventListener("drop", (e) => {
    e.preventDefault();
    const countryName = e.dataTransfer.getData("text");
    handleDrop(div, countryName);
    div.style.border = "2px solid transparent";
  });
};

const handleDrop = (div, countryName) => {
  const countryDiv = document.getElementById(countryName);
  const clonedContentContainer = createClonedContent(countryDiv);
  div.appendChild(clonedContentContainer);
  addCountryToStorage(countryName);
};

const handleDelete = (clonedContentContainer) => {
  const countryName = clonedContentContainer.querySelector("span").textContent;
  removeCountryFromStorage(countryName);
  clonedContentContainer.remove();
};

const createClonedContent = (countryDiv) => {
  const clonedContentContainer = document.createElement("div");

  clonedContentContainer.classList.add("favourit-div");

  const flagSrc = countryDiv.querySelector(".card-img-top").src;

  const countrySpan = document.createElement("span");
  countrySpan.textContent = countryDiv.querySelector(".card-title").textContent;
  countrySpan.classList.add("cloned-content-container", "text-truncate");

  const deleteButton = createDeleteButton(clonedContentContainer);

  const flagImage = document.createElement("img");
  flagImage.src = flagSrc;
  flagImage.alt = "Flag";
  flagImage.classList.add("flag-image");

  clonedContentContainer.appendChild(flagImage);
  clonedContentContainer.appendChild(countrySpan);
  clonedContentContainer.appendChild(deleteButton);

  return clonedContentContainer;
};

const createDeleteButton = (clonedContentContainer) => {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "x";
  deleteButton.classList.add("delete-button", "ms-auto");
  deleteButton.addEventListener("click", () => {
    handleDelete(
      clonedContentContainer,
      getFromLocalStorage("storedCountries") || []
    );
  });

  return deleteButton;
};

document.getElementById("search-input").addEventListener("keyup", (event) => {
  const searchTerm = event.target.value;
  searchForCountry(searchTerm);
});

const searchForCountry = async (countryName) => {
  let delay;
  clearTimeout(delay);
  let data1;
  delay = setTimeout(async () => {
    if (countryName === "") {
      data1 = allData;
    } else {
      data1 = await fetchSearchesData(countryName);
    }
    displayData(data1);
  }, 125);
};

document.getElementById("region-filter").addEventListener("change", () => {
  const selectedRegion = document.getElementById("region-filter").value;
  filterCountriesBySelect(selectedRegion);
});

const filterCountriesBySelect = (region) => {
  if (region.toLowerCase() === "favourits") {
    const storedCountriesNames = getFromLocalStorage("storedCountries") || [];
    console.log(storedCountriesNames);
    filteredData = allData.filter((country) => {
      const favariatCountry = country.name.common.toLowerCase();
      return storedCountriesNames.some((storedCountry) => {
        return favariatCountry === storedCountry.toLowerCase();
      });
    });
    displayData(filteredData);
  } else {
    filteredData = allData.filter((country) => {
      const countryRegion = country.region.toLowerCase();
      return countryRegion === region.toLowerCase() || region === "noValue";
    });

    displayData(filteredData);
  }
};

document.getElementById("dark-theme").addEventListener("click", () => {
  darkMode();
});

const displayStoredCountries = (container, storedCountries) => {
  storedCountries.forEach((countryName) => {
    const countryDiv = document.getElementById(countryName);
    if (countryDiv) {
      const clonedContentContainer = createClonedContent(countryDiv);
      container.appendChild(clonedContentContainer);
    }
  });
};

const init = async () => {
  theme();
  displayData(allData);
  const div1 = document.getElementById("side-div");

  const storedCountries = getFromLocalStorage("storedCountries");
  if (storedCountries) {
    displayStoredCountries(div1, storedCountries);
  }
};

// Call the init function
init();
