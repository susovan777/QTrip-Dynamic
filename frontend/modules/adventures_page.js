import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES 🚩 Module-2 Milestone-1 Activity-1
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  // console.log(params.get('city'));
  // we can get same thing by location.search method
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES 🚩 Milestone-2
  // 1. Fetch adventures using the Backend API and return the data
  let adventure_data;
  let url = `http://13.233.92.220:8082/adventures?city=${city}`;
  try {
    let api_data = await fetch(url)
      .then((response) => response.json()) // returns json data
      .then((final_data) => {
        // console.log(final_data)
        let advArr = final_data.map((adventures) => adventures);
        adventure_data = advArr;
        // console.log(advArr);
        return advArr;
      });
    // console.log(api_data)
  } catch (err) {
    return null;
  }
  // console.log(adventure_data);
  return adventure_data;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures);
  let row_div;
  adventures.forEach((adv) => {
    let adv_div = document.createElement("div");
    adv_div.setAttribute("class", "adv-div col-6 col-md-3 mb-3");
    adv_div.innerHTML = `
      <a href="detail/?adventure=${adv.id}" id="${adv.id}">
        <div class="category-banner">${adv.category}</div> 
        <div class="card activity-card">
          <img src="${adv.image}" class="img-fluid" alt="${adv.category}">
          <div class="card-body pb-0 d-flex flex-column flex-lg-row justify-content-between align-items-center">
            <h5 class="card-title">${adv.name}</h5>
            <p class="card-text">${adv.costPerHead}</p>
          </div>
          <div class="card-body d-flex flex-column flex-lg-row justify-content-between align-items-center">
            <h5 class="card-title">Duration</h5>
            <p class="card-text">${adv.duration} Hours</p>
          </div>
        </div>
      </a>
  `;

    row_div = document.getElementById("data").append(adv_div);
  });

  return row_div;
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredDurationList = list.filter((adv) => {
    return (adv.duration >= low && adv.duration <= high);
  })
  return filteredDurationList;
}

// 🚩 Milestone-1 TODO - Implement filter by Category 🚩
//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log(categoryList['category']);
  let filteredList = list.filter((element) => {
    return categoryList.includes(element.category);
  });
  // console.log(filteredList);
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

// 🚩 Milestone-1 TODO - Implement filter by Category 🚩
function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filteredList;
  // list -> goes to filters that are active -> filterdList
  // list fiters by two way: filterByDuration() and filterByCategory()
  let category_list = filters['category'];

  let selectedDuration = document.querySelector("#duration-select").value;
  const durations = selectedDuration.split('-');
  let low = durations[0];
  let high = durations[1];

  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    // filteredList = filterByCategory(list, filters["category"]);
    // filteredList = filterByDuration(list, low, high);
    filteredList = list.filter((item) => {
      return (item.duration >= low && item.duration <= high) && category_list.includes(item.category);
    })
  } else if (filters["duration"].length > 0) {
    filteredList = filterByDuration(list, low, high);
  } else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, category_list);
  }
  else filteredList = list;

  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  const savedData = JSON.parse(localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  // console.log(savedData);
  return savedData;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let category_list = document.getElementById("category-list");
  filters['category'].forEach((item) => {
    let active_category = document.createElement('p');
    active_category.setAttribute('class', 'category-filter');
    // active_category.textContent = item;
    active_category.innerHTML = `${item} <button class="x-btn">&#215;</button>`;

    category_list.append(active_category);
  })
  getFiltersFromLocalStorage();
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
