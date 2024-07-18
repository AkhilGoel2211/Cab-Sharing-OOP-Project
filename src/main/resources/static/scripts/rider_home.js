// DOM Elements
const profileBtn = document.getElementById("profileBtn");
const backBtn = document.getElementById("backBtn");
const findRidesBtn = document.getElementById("findRidesBtn");
const createRideBtn = document.getElementById("createRideBtn");
const requestJoinBtn = document.getElementById("requestJoinBtn");
const publishRideBtn = document.getElementById("publishRideBtn");
const tripsHistoryBtn = document.getElementById("tripsHistoryBtn");

const screenTitle = document.getElementById("screenTitle");
const rideSearchScreen = document.getElementById("rideSearchScreen");
const rideListScreen = document.getElementById("rideListScreen");
const createRideScreen = document.getElementById("createRideScreen");
const rideHistoryScreen = document.getElementById("rideHistoryScreen");
const profileScreen = document.getElementById("profileScreen");

// New elements for edit profile and trips history
const desktopEditProfileBtn = document.querySelector(
  "#desktop-view .sidebar [onclick=\"toggleSection('edit-profile')\"]"
);
const mobileEditProfileBtn = document.querySelector(
  "#mobile-view #profileScreen [onclick=\"toggleSection('edit-profile')\"]"
);
const editProfileSection = document.getElementById("edit-profile");

const desktopViewHistoryBtn = document.querySelector(
  "#desktop-view .ride-list-container .flex button"
);
const desktopTripsHistoryBtn = document.querySelector(
  '#desktop-view .sidebar [onclick="showRideHistory()"]'
);
const mobileTripsHistoryBtn = document.querySelector(
  '#mobile-view #profileScreen [onclick="showRideHistory()"]'
);

// Event Listeners
profileBtn.addEventListener("click", toggleProfileScreen);
backBtn.addEventListener("click", showDefaultScreen);
findRidesBtn.addEventListener("click", showRideList);
createRideBtn.addEventListener("click", showCreateRide);
requestJoinBtn.addEventListener("click", () =>
  alert("Request sent to join the ride!")
);
publishRideBtn.addEventListener("click", () => {
  alert("Ride published!");
  showDefaultScreen();
});
tripsHistoryBtn.addEventListener("click", showRideHistory);

// New event listeners
if (desktopEditProfileBtn)
  desktopEditProfileBtn.addEventListener("click", toggleEditProfile);
if (mobileEditProfileBtn)
  mobileEditProfileBtn.addEventListener("click", toggleEditProfile);
if (desktopViewHistoryBtn)
  desktopViewHistoryBtn.addEventListener("click", showTripsHistory);
if (desktopTripsHistoryBtn)
  desktopTripsHistoryBtn.addEventListener("click", showTripsHistory);
if (mobileTripsHistoryBtn)
  mobileTripsHistoryBtn.addEventListener("click", showRideHistory);

// Functions to switch between screens
function showDefaultScreen() {
  hideAllScreens();
  rideSearchScreen.classList.remove("hidden");
  backBtn.classList.add("hidden");
  screenTitle.textContent = "Find Rides";
}

function showRideList() {
  hideAllScreens();
  rideListScreen.classList.remove("hidden");
  backBtn.classList.remove("hidden");
  screenTitle.textContent = "Available Rides";
  populateRideList();
}

function showCreateRide() {
  hideAllScreens();
  createRideScreen.classList.remove("hidden");
  backBtn.classList.remove("hidden");
  screenTitle.textContent = "Create Ride";
}

function showRideHistory() {
  hideAllScreens();
  rideHistoryScreen.classList.remove("hidden");
  backBtn.classList.remove("hidden");
  screenTitle.textContent = "Ride History";
  populateRideHistory();
}

function toggleProfileScreen() {
  if (profileScreen.classList.contains("hidden")) {
    hideAllScreens();
    profileScreen.classList.remove("hidden");
    backBtn.classList.remove("hidden");
    screenTitle.textContent = "Profile";
  } else {
    showDefaultScreen();
  }
}

function hideAllScreens() {
  rideSearchScreen.classList.add("hidden");
  rideListScreen.classList.add("hidden");
  createRideScreen.classList.add("hidden");
  rideHistoryScreen.classList.add("hidden");
  profileScreen.classList.add("hidden");
}

// Function to toggle visibility of edit profile section
function toggleEditProfile() {
  editProfileSection.classList.toggle("hidden");
}

function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

// Function to populate ride lists using Axios
function populateRideList() {
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;
//    const pickuptime = formatDate(document.getElementById('pickuptime').value);

    axios.get('/available', {
        params: {
            pickup: pickup,
            dropoff: dropoff
        }
    })
    .then(response => {
        const rides = response.data;
        populateRidesDesktop(rides);
        populateRidesMobile(rides);
    })
    .catch(error => console.error('Error loading rides:', error));
}

 function populateRidesDesktop(rides) {
     const desktopRideList = document.getElementById("ride-list");
     desktopRideList.innerHTML = '';
     rides.forEach(ride => {
         const rideElement = document.createElement("div");
         rideElement.classList.add("flex", "justify-between", "items-center", "bg-gray-700", "p-2", "rounded", "mb-2");
         rideElement.innerHTML = `
             <form action="/driver/accept" method="post">
             <div>
                 <h3 class="font-bold">${ride.pickup} - ${ride.dropoff}</h3>
                 <p class="text-sm text-gray-400">Max Capacity: ${ride.maxcap}, Current: ${ride.currentnum}</p>
                 <p class="font-bold">Total Cost INR ${ride.cost.toFixed(2)}</p>
             </div>
             <button type="submit" name="rideid" value="${ride.id}" class="bg-purple-600 text-white py-1 px-2 rounded">Accept</button>
             </form>
         `;
         desktopRideList.appendChild(rideElement);
     });
 }

 function populateRidesMobile(rides) {
     const mobileRideList = document.getElementById("rideList");
     mobileRideList.innerHTML = '';
     rides.forEach(ride => {
         const rideElement = document.createElement("div");
         rideElement.classList.add("bg-gray-800", "p-4", "rounded");
         rideElement.innerHTML = `
             <div>
                 <h3 class="font-bold">${ride.pickup} - ${ride.dropoff}</h3>
                 <p class="text-sm text-gray-400">Max Capacity: ${ride.maxcap}, Current: ${ride.currentnum}</p>
                 <p class="font-bold">Total Cost INR ${ride.cost.toFixed(2)}</p>
             </div>
         `;
         mobileRideList.appendChild(rideElement);
     });
 }

// Function to check screen size and populate ride list accordingly
function checkScreenSizeAndPopulateRideList() {
  const isMobile = window.innerWidth < 768;
  const desktopRideListContainer = document.querySelector(
    ".ride-list-container"
  );

  if (isMobile) {
    // For mobile view, we don't need to do anything special
  } else {
    if (desktopRideListContainer) {
      desktopRideListContainer.classList.remove("hidden");
      populateRideList();
    }
  }
}

// Function to show trips history
function showTripsHistory() {
  const rideListContainer = document.querySelector(".ride-list-container");
  const rideList = document.getElementById("ride-list");

  // Hide the regular ride list and show trip history
  rideList.classList.add("hidden");
  rideListContainer.querySelector("h2").textContent = "Trips History";

  // Create and show back button
  const backButton = document.createElement("button");
  backButton.textContent = "Back";
  backButton.classList.add(
    "bg-purple-600",
    "text-white",
    "py-1",
    "px-2",
    "rounded"
  );
  backButton.addEventListener("click", showDefaultRideList);

  const flexContainer = rideListContainer.querySelector(".flex");
  flexContainer.innerHTML = "";
  flexContainer.appendChild(backButton);

  // Populate trip history
  populateRideHistory(rideListContainer);
}

// Function to show default ride list
function showDefaultRideList() {
  const rideListContainer = document.querySelector(".ride-list-container");
  const rideList = document.getElementById("ride-list");

  // Show the regular ride list and hide trip history
  rideList.classList.remove("hidden");
  rideListContainer.querySelector("h2").textContent =
    "Source | Destination | Date | Time";

  // Restore the "View History" button
  const flexContainer = rideListContainer.querySelector(".flex");
  flexContainer.innerHTML =
    '<button onclick="showTripsHistory()" class="bg-purple-600 text-white py-1 px-2 rounded">View History</button>';

  // Populate regular ride list
  populateRideList();
}

// Function to populate ride history
function populateRideHistory(container = null) {
  const rideHistoryList = container
    ? container
    : document.getElementById("rideHistoryList");

  const rideHistory = [
    {
      type: "Upcoming",
      driverStatus: "Driver Not Alloted",
      cost: 190,
      source: "Source",
      destination: "Destination",
      date: "Date",
      time: "Time",
      maxPeople: 4,
      otp: "523 123",
      driverNo: "12345 1234",
      plateNo: "HR XXXX",
      status: "Not Confirmed",
    },
    // Add more ride history items here
  ];

  rideHistoryList.innerHTML = "";
  rideHistory.forEach((ride) => {
    const rideElement = document.createElement("div");
    rideElement.classList.add("bg-gray-800", "p-4", "rounded-lg", "mb-4");
    rideElement.innerHTML = `
      <div class="flex justify-between items-center">
        <h3 class="text-purple-500">${ride.type}</h3>
        <p>My Cost INR ${ride.cost}</p>
      </div>
      <p class="font-bold">${ride.driverStatus}</p>
      <p class="text-gray-400">${ride.source} | ${ride.destination}</p>
      <p class="text-gray-400">${ride.date} | ${ride.time}</p>
      <p class="text-gray-400">Max No of People: ${ride.maxPeople}</p>
      <p class="text-gray-400">OTP: ${ride.otp}</p>
      <p class="text-gray-400">Driver No: ${ride.driverNo}</p>
      <p class="text-gray-400">Plate No: ${ride.plateNo}</p>
      <p class="font-bold text-purple-500">Status: ${ride.status}</p>
      <button class="bg-purple-600 text-white py-1 px-4 rounded mt-2">CANCEL</button>
    `;
    rideHistoryList.appendChild(rideElement);
  });
}

function showPopup(message, isSuccess = true) {
  // Create popup element
  const popup = document.createElement("div");
  popup.classList.add("popup", isSuccess ? "success" : "error");
  popup.textContent = message;

  // Add popup to the body
  document.body.appendChild(popup);

  // Remove popup after 3 seconds
  setTimeout(() => {
    popup.remove();
  }, 3000);
}

// Initialize the app
function initializeApp() {
  showDefaultScreen();
  checkScreenSizeAndPopulateRideList();
}

// Call initializeApp when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeApp);

// Add event listener for window resize
window.addEventListener("resize", checkScreenSizeAndPopulateRideList);