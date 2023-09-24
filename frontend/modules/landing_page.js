import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
  // console.log("From init()"); // instructed in Milestone 1 - 🚩 Activity 1
  // console.log(cities);
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let cityData;
  try {
    let cityFromApi = await fetch("http://3.7.59.23:8082/cities/")
    let jsonData = await cityFromApi.json()
      // .then((jsonData) => jsonData.json())
      .then((finalData) => { // instructed in Milestone 2 - 🚩 Activity 4
        let cityArr = finalData.map((cities) => cities);
        // console.log(cityArr);
        cityData = cityArr;
        return cityArr;
      });

      // instructed in Milestone 2 - 🚩 Activity 7 (2nd last)
      // checking if the fetching is successfull or not
      if(!cityFromApi.ok) {
        throw new Error("Network response was not OK!");
      }
  } catch (err) {
    // console.log(err);
    return null; // instructed in Milestone 2 - 🚩 Activity 8 (last)
  }
  return cityData;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
}

export { init, fetchCities, addCityToDOM };
