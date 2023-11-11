import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS 🚩 Module-5 Milestone-3
  // 1. Fetch Reservations by invoking the REST API and return them
  let reservation_data;
  let url = "http://65.0.60.140:8082/reservations/";
  try {
    let apiReservation_data = await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        reservation_data = result;
      });
  } catch (err) {
    // 🚩 TODO: Handle Exceptions
    return null;
  }

  // console.log(reservation_data);
  // Place holder for functionality to work in the Stubs
  return reservation_data;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS 🚩 Module-5 Milestone-3
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
    // console.log(reservations); 
  
    const reservation_tableData = document.getElementById("reservation-table");
    reservations.forEach((reserveItem) => {
      let tr_el = document.createElement("tr");
      
      const reserve_date = new Date(`${reserveItem.date}`).toLocaleDateString('en-IN');
      const reserve_dateAndTime = new Date(`${reserveItem.time}`).toLocaleString('en-IN', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
      const date_time = reserve_dateAndTime.split(' at').join(',');

      tr_el.innerHTML = `
        <td>${reserveItem.id}</td>
        <td>${reserveItem.name}</td>
        <td>${reserveItem.adventureName}</td>
        <td>${reserveItem.person}</td>
        <td>${reserve_date}</td>
        <td>${reserveItem.price}</td>
        <td>${date_time}</td>
  
        <td><button id=${reserveItem.id} class="reservation-visit-button"><a href="http://65.0.60.140:8081/frontend/pages/adventures/detail/?adventure=${reserveItem.adventure}">Visit Adventure</a></button></td>
      `;
      reservation_tableData.append(tr_el);
    });

    if (reservations.length > 0) {
      document.getElementById("no-reservation-banner").style.display = "none";
      document.getElementById("reservation-table-parent").style.display = "block";
    } else {
      document.getElementById("reservation-table-parent").style.display = "none";
      document.getElementById("no-reservation-banner").style.display = "block";
    }
}

export { fetchReservations, addReservationToTable };
