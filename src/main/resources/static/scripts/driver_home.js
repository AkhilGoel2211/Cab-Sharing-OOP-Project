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

// Function to populate ride lists using Axios
function populateRideList() {
    axios.get('/driver/available')
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

// Function to populate upcoming ride lists using Axios
function showUpcomingRideList() {
    axios.get('/driver/upcoming')
    .then(response => {
        const rides = response.data;
        populateUpcomingRidesDesktop(rides);
        populateUpcomingRidesMobile(rides);
    })
    .catch(error => console.error('Error loading rides:', error));
}

function populateUpcomingRidesDesktop(rides) {
    const desktopRideList = document.getElementById("ride-list");
    desktopRideList.innerHTML = '';
    rides.forEach(ride => {
        const rideElement = document.createElement("div");
        rideElement.classList.add("flex", "justify-between", "items-center", "bg-gray-700", "p-2", "rounded", "mb-2");
        rideElement.innerHTML = `
            <form action="/driver/endride" method="post">
            <div>
                <h3 class="font-bold">${ride.pickup} - ${ride.dropoff}</h3>
                <p class="text-sm text-gray-400">Max Capacity: ${ride.maxcap}, Current: ${ride.currentnum}</p>
                <p class="font-bold">Total Cost INR ${ride.cost.toFixed(2)}</p>
            </div>
            <button type="submit" name="rideid" value="${ride.id}" class="bg-purple-600 text-white py-1 px-2 rounded">End Ride</button>
            </form>
        `;
        desktopRideList.appendChild(rideElement);
    });
}

function populateUpcomingRidesMobile(rides) {
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


// Function to populate past ride lists using Axios
function showPastRideList() {
    axios.get('/driver/finished')
    .then(response => {
        const rides = response.data;
        populatePastRidesDesktop(rides);
        populatePastRidesMobile(rides);
    })
    .catch(error => console.error('Error loading rides:', error));
}

function populatePastRidesDesktop(rides) {
    const desktopRideList = document.getElementById("ride-list");
    desktopRideList.innerHTML = '';
    rides.forEach(ride => {
        const rideElement = document.createElement("div");
        rideElement.classList.add("flex", "justify-between", "items-center", "bg-gray-700", "p-2", "rounded", "mb-2");
        rideElement.innerHTML = `
            <div>
                <h3 class="font-bold">${ride.pickup} - ${ride.dropoff}</h3>
                <p class="text-sm text-gray-400">Max Capacity: ${ride.maxcap}, Current: ${ride.currentnum}</p>
                <p class="font-bold">Total Cost INR ${ride.cost.toFixed(2)}</p>
            </div>
        `;
        desktopRideList.appendChild(rideElement);
    });
}

function populatePastRidesMobile(rides) {
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

// Initialize and populate ride list on page load
document.addEventListener("DOMContentLoaded", () => {
    populateRideList();
});

// Initialize the app
function initializeApp() {
//  showDefaultScreen();
//  checkScreenSizeAndPopulateRideList();
//  populateRideList()
}

// Call initializeApp when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeApp);


