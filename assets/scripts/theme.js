import { setTheme, getTheme } from "./localstorage.js";
let isDarkMode = getTheme();

if (isDarkMode == "false") {
  isDarkMode = false;
}

export const darkMode = () => {
  isDarkMode = !isDarkMode;
  setTheme(isDarkMode);
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
};

export const theme = () => {
  let mode = getTheme();
  if (mode === "true") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
};
