// DOM Elements
const profileBtn = document.getElementById("profileBtn");
const refreshBtn = document.getElementById("refreshBtn");
const rideHistoryScreen = document.getElementById("rideHistoryScreen");
const profileScreen = document.getElementById("profileScreen");

// Event Listeners
profileBtn.addEventListener("click", toggleProfileScreen);
refreshBtn.addEventListener("click", refreshRideHistory);

// Functions to switch between screens (mobile only)
function showRideHistory() {
  rideHistoryScreen.classList.remove("hidden");
  profileScreen.classList.add("hidden");
}

function toggleProfileScreen() {
  if (profileScreen.classList.contains("hidden")) {
    rideHistoryScreen.classList.add("hidden");
    profileScreen.classList.remove("hidden");
  } else {
    profileScreen.classList.add("hidden");
    rideHistoryScreen.classList.remove("hidden");
  }
}

function refreshRideHistory() {
  // Implement the logic to refresh ride history
  console.log("Refreshing ride history...");
}

// Function to populate ride history
function populateRideHistory() {
  const rideHistoryList = document.querySelector(
    "#rideHistoryScreen .space-y-4"
  );

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
    rideElement.classList.add("bg-gray-800", "p-4", "rounded-lg");
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

// Initialize the app
showRideHistory();
populateRideHistory();

// Function to toggle visibility of sections (desktop only)
function toggleSection(id) {
  const section = document.getElementById(id);
  if (section.classList.contains("hidden")) {
    section.classList.remove("hidden");
  } else {
    section.classList.add("hidden");
  }
}
