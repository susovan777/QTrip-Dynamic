import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS 🚩 Module-4 Milestone-1
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  // console.log(params.get('adventure'));
  // Place holder for functionality to work in the Stubs
  return params.get('adventure');
}

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS 🚩 Module-4 Milestone-1
  // 1. Fetch the details of the adventure by making an API call
  let advDetails_data;
  let url = `http://65.0.80.193:8082/adventures/detail/?adventure=${adventureId}`;
  try {
    let apiDetails_data = await fetch(url)
      .then((response) => response.json())
      .then((final_data) => {
          advDetails_data = final_data;
          // return final_data;
      })
  } 
  // 🚩 TODO: Handle Exceptions
  catch (err) {
    return null;
  }
  // console.log(advDetails_data);
  // Place holder for functionality to work in the Stubs
  return advDetails_data;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS 🚩 Module-4 Milestone-2
  // 1. Add the details of the adventure to the HTML DOM
  let adv_name = document.querySelector('#adventure-name');
  let adv_subTitle = document.querySelector('#adventure-subtitle');
  let adv_photo = document.querySelector('#photo-gallery');
  let adv_content = document.querySelector('#adventure-content');

  // heading and subtitle
  adv_name.textContent = `${adventure.name}`;
  adv_subTitle.textContent = `${adventure.subtitle}`;

  // images
  let imgDiv = document.createElement('div');
  adventure['images'].forEach((img) => {
    let imgElement = document.createElement('img');
    imgElement.setAttribute('src', img);
    imgElement.setAttribute('class', 'activity-card-image');
    imgDiv.append(imgElement);
  })
  adv_photo.append(imgDiv);

  // contents
  adv_content.textContent = `${adventure.content}`;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
