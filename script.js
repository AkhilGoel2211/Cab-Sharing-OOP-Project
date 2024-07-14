// DOM Elements
const profileBtn = document.getElementById("profileBtn");
const refreshBtn = document.getElementById("refreshBtn");
const findRidesBtn = document.getElementById("findRidesBtn");
const createRideBtn = document.getElementById("createRideBtn");
const requestJoinBtn = document.getElementById("requestJoinBtn");
const publishRideBtn = document.getElementById("publishRideBtn");

const rideSearchScreen = document.getElementById("rideSearchScreen");
const rideListScreen = document.getElementById("rideListScreen");
const createRideScreen = document.getElementById("createRideScreen");

// Event Listeners
findRidesBtn.addEventListener("click", showRideList);
createRideBtn.addEventListener("click", showCreateRide);
requestJoinBtn.addEventListener("click", () =>
  alert("Request sent to join the ride!")
);
publishRideBtn.addEventListener("click", () => {
  alert("Ride published!");
  showRideSearch();
});

// Functions to switch between screens (mobile only)
function showRideSearch() {
  rideSearchScreen.classList.remove("hidden");
  rideListScreen.classList.add("hidden");
  createRideScreen.classList.add("hidden");
}

function showRideList() {
  rideSearchScreen.classList.add("hidden");
  rideListScreen.classList.remove("hidden");
  createRideScreen.classList.add("hidden");
  populateRideList();
}

function showCreateRide() {
  rideSearchScreen.classList.add("hidden");
  rideListScreen.classList.add("hidden");
  createRideScreen.classList.remove("hidden");
}

// Function to populate ride list (both desktop and mobile)
function populateRideList() {
  const rideList = document.getElementById("rideList");
  const desktopRideList = document.querySelector(".ride-list-container");

  const rides = [
    {
      name: "Akhil",
      car: "Ertiga - SUV",
      cost: 360,
      duration: 22,
      available: 2,
      total: 4,
    },
    {
      name: "Harrshit",
      car: "Nano - Mini",
      cost: 190,
      duration: 22,
      available: 1,
      total: 2,
    },
    {
      name: "Puru",
      car: "Innova - SUV",
      cost: 420,
      duration: 22,
      available: 1,
      total: 4,
    },
    {
      name: "Saahil",
      car: "Verna - Sedan",
      cost: 280,
      duration: 22,
      available: 3,
      total: 3,
    },
    {
      name: "Malik",
      car: "Swift - Mini",
      cost: 290,
      duration: 22,
      available: 1,
      total: 4,
    },
  ];

  // Populate mobile ride list
  if (rideList) {
    rideList.innerHTML = "";
    rides.forEach((ride) => {
      const rideElement = document.createElement("div");
      rideElement.classList.add("bg-gray-800", "p-4", "rounded");
      rideElement.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="font-bold">${ride.name}</h3>
                        <p class="text-sm text-gray-400">${ride.car}</p>
                    </div>
                    <div class="text-right">
                        <p class="font-bold">Total Cost INR ${ride.cost}</p>
                        <p class="text-sm text-gray-400">Duration ${ride.duration} Min</p>
                    </div>
                </div>
                <p class="text-sm text-gray-400 mt-2">Available: ${ride.available} | Total: ${ride.total}</p>
            `;
      rideList.appendChild(rideElement);
    });
  }

  // Populate desktop ride list
  if (desktopRideList) {
    desktopRideList.innerHTML =
      '<h2 class="text-xl font-bold mb-4">Source | Destination | Date | Time</h2>';
    rides.forEach((ride) => {
      const rideElement = document.createElement("div");
      rideElement.classList.add(
        "flex",
        "justify-between",
        "items-center",
        "bg-gray-700",
        "p-2",
        "rounded",
        "mb-2"
      );
      rideElement.innerHTML = `
                <div>
                    <p class="font-bold">${ride.name}</p>
                    <p class="text-gray-400">${ride.car}</p>
                    <p class="text-gray-400">Total Cost INR ${ride.cost}</p>
                    <p class="text-gray-400">Duration ${ride.duration} Min</p>
                    <p class="text-gray-400">Available : ${ride.available} | Total: ${ride.total}</p>
                </div>
                <button class="bg-purple-600 text-white py-1 px-2 rounded">Select</button>
            `;
      desktopRideList.appendChild(rideElement);
    });
  }
}

// Initialize the app
showRideSearch();
populateRideList();

// Function to toggle visibility of sections (desktop only)
function toggleSection(id) {
  const section = document.getElementById(id);
  if (section.classList.contains("hidden")) {
    section.classList.remove("hidden");
  } else {
    section.classList.add("hidden");
  }
}
