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
  let url = `http://3.110.74.138:8082/adventures/detail/?adventure=${adventureId}`;
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
  // TODO: MODULE_ADVENTURE_DETAILS 🚩 Module-4 Milestone-3
  // 1. Add the bootstrap carousel to show the Adventure images
  // console.log(images);
  let adv_imgGallery = document.getElementById('photo-gallery');
  adv_imgGallery.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <!-- 🖼️ Adding carousel items here 🖼️ -->
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;

  let carousel_inner = document.querySelector('.carousel-inner');

  images.forEach((img) => {
    let carousel_itemDiv = document.createElement('div');
    carousel_itemDiv.setAttribute('class', 'carousel-item');

    let carousel_imgEl = document.createElement('img');
    carousel_imgEl.setAttribute('src', img);
    carousel_imgEl.setAttribute('class', "d-block w-100");

    carousel_itemDiv.append(carousel_imgEl);

    carousel_inner.append(carousel_itemDiv);
  })
  // setting the 1st child img elemnt to active
  document.querySelector(".carousel-inner > div:nth-child(1)").setAttribute('class', 'carousel-item active');

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS 🚩 Module-5 Milestone-1
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);

  let soldOut_panel = document.getElementById('reservation-panel-sold-out');
  let available_panel = document.getElementById('reservation-panel-available');
  let perhead_cost = document.getElementById('reservation-person-cost');

  if(adventure.available) {
    soldOut_panel.style.display = 'none';
    available_panel.style.display = 'block';
    perhead_cost.textContent = `${adventure.costPerHead}`
  } 
  else {
    soldOut_panel.style.display = 'block';
    available_panel.style.display = 'none';
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS 🚩 Module-5 Milestone-1
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  // let person_cost = adventure.costPerHead;
  let reservationCost_el = document.getElementById('reservation-cost');

  let totalReservation_cost = adventure.costPerHead * persons;
  reservationCost_el.textContent = totalReservation_cost;
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
