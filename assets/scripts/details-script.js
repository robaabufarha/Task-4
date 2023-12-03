import { fetchSearchesData } from "./api.js";
import { darkMode, theme } from "./theme.js";

async function getDetails() {
  let countryName = localStorage.getItem("selectedCountry");
  const data = await fetchSearchesData(countryName);
  let countryDetails = data[0];
  displayData(countryDetails);
}

function displayData(countryDetails) {
  const borderCountries = countryDetails.borders ? countryDetails.borders : [];
  let info = `
        <div>
          <img src=${countryDetails.flags.svg} 
          alt=${countryDetails.flags.alt}>
          
        </div>
        <div>
           
                 <h2 class="header-country">${countryDetails.name.common}</h2>
             <article class="details-container">
               <div class = "left-side">
                 <div class="details-info">Native Name:</div> ${
                   countryDetails.name.common
                 }<br>
             <div class="details-info">Population: </div> ${
               countryDetails.population
             }<br>
             <div class="details-info">Reagion: </div> ${
               countryDetails.region
             }<br> 
             <div class="details-info">Sub Reagion: </div>${
               countryDetails.subregion
             }<br>
             <div class="details-info">Capital: </div>${countryDetails.capital}
             </div>
             <div class="right-side">
               <div class="details-info">Top level Domain:</div> be<br>
        <div class="details-info">Currencies: </div> ${Object.keys(
          countryDetails.currencies
        )}<br>
        <div class="details-info">Langage: </div>${Object.keys(
          countryDetails.languages
        )}
          </div>
           </article>


          
    <div class="border-countries py-5">
    <div class = "border-countries-div">Border Countries: </div>
         
     ${borderCountries
       .map(
         (borderCountry) =>
           `<span class="px-2 px-md-3 m-1 d-inline-block rounded-1 border-secondary">${borderCountry}</span>`
       )
       .join("")}    
              
     </div>
          
    </div>  
   `;
  details.innerHTML = info;
}
//darkmode listener
document.getElementById("dark-theme").addEventListener("click", function () {
  darkMode();
});

async function init() {
  let details = document.getElementById("details");
  theme();
  getDetails();
}
init();
