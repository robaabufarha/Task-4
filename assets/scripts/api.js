import { request } from "./requestapi.js";

export const fetchData = async () => {
  const allurl = "https://restcountries.com/v3.1/all";
  try {
    const response = await request(allurl);
    return response;
  } catch (error) {
    console.log("Error fetching data:", error);
    return [];
  }
};

export const fetchSearchesData = async (countryName) => {
  const searchurl = `https://restcountries.com/v3.1/name/${countryName}`;
  try {
    const response = await request(searchurl);
    return response;
  } catch (error) {
    console.log("Error fetching data:", error);
    return [];
  }
};
