// Function to toggle visibility of sections
function toggleSection(id) {
  const section = document.getElementById(id);
  if (section.classList.contains("hidden")) {
    section.classList.remove("hidden");
  } else {
    section.classList.add("hidden");
  }
}

// Function to dynamically add rides
const rideList = document.getElementById("ride-list");
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
    name: "Harshhit",
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
  rideList.appendChild(rideElement);
});
