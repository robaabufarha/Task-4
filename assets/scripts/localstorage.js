export const getTheme = () => localStorage.getItem("isDarkMode");

export const setTheme = (isDarkMode) =>
  localStorage.setItem("isDarkMode", isDarkMode);

export const setSelectedCountry = (selectedCountry) =>
  localStorage.setItem("selectedCountry", selectedCountry);

export const saveToLocalStorage = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

export const getFromLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

export const addCountryToStorage = (countryName) => {
  const storedCountries = getFromLocalStorage("storedCountries") || [];
  if (!storedCountries.includes(countryName)) {
    storedCountries.push(countryName);
    saveToLocalStorage("storedCountries", storedCountries);
  }
};

export const removeCountryFromStorage = (countryName) => {
  const storedCountries = getFromLocalStorage("storedCountries") || [];
  const updatedStoredCountries = storedCountries.filter(
    (name) => name !== countryName
  );
  saveToLocalStorage("storedCountries", updatedStoredCountries);
};
