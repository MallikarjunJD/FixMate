// Worker object (demo)
const worker = {
  id: "W001",
  name: "Ravi Kumar",
  phone: "9876543210",
  email: "ravi@example.com",
  primary: "Electrician",
  secondary: "Generator Repair, Wiring",
  area: "Kukatpally",
  available: true,
  activeRequest: null
};

// PRIORITY TIME WINDOW
const PRIORITY_MAP = {
  "Most Urgent": 1 * 60 * 60 * 1000,
  "Urgent": 3 * 60 * 60 * 1000,
  "Less Urgent": 12 * 60 * 60 * 1000,
  "Not Urgent": 24 * 60 * 60 * 1000
};

// Sample Requests
let requests = [
  { id: "R101", customer: "Rahul", customerId: "C101", phone: "9000011111", priority: "Most Urgent",
    createdAt: Date.now() - 10*60*1000, location: "Kukatpally", distance: "2.1 km", payment: "Online", service: "Electrician"
  },
  { id: "R102", customer: "Priya", customerId: "C102", phone: "9000022222", priority: "Urgent",
    createdAt: Date.now() - 20*60*1000, location: "Miyapur", distance: "4.5 km", payment: "Cash", service: "Electrician"
  },
  { id: "R103", customer: "Amrit", customerId: "C103", phone: "9000033333", priority: "Not Urgent",
    createdAt: Date.now() - 60*60*1000, location: "Ameerpet", distance: "7.1 km", payment: "Online", service: "Plumbing"
  }
];

// Filter requests based on worker skill
function getFilteredRequests() {
  return requests.filter(r => r.service === worker.primary);
}

// Time left formatting
function formatTime(ms) {
  if (ms <= 0) return "00:00";
  let h = Math.floor(ms / 3600000);
  let m = Math.floor((ms % 3600000) / 60000);
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
}

// COMPUTE TIME LEFT
function timeLeft(request) {
  let window = PRIORITY_MAP[request.priority];
  let elapsed = Date.now() - request.createdAt;
  return window - elapsed;
}

// RENDER Active Request
function renderActiveRequest() {
  const div = document.getElementById("active-container");

  if (!worker.activeRequest) {
    div.innerHTML = `<div class="request-card">No active requests.</div>`;
    return;
  }

  const r = worker.activeRequest;
  const t = formatTime(timeLeft(r));

  div.innerHTML = `
    <div class="request-card">
      <h3>Request ${r.id} — <span class="time-left">${r.priority}</span></h3>
      <p class="request-meta"><strong>Customer:</strong> ${r.customer}</p>
      <p class="request-meta"><strong>Phone:</strong> ${r.phone}</p>
      <p class="request-meta"><strong>Location:</strong> ${r.location} (${r.distance})</p>
      <p class="request-meta"><strong>Payment:</strong> ${r.payment}</p>
      <p class="request-meta"><strong>Time Left:</strong> ${t}</p>
    </div>
  `;
}

// RENDER Requests list
function renderRequests() {
  const list = document.getElementById("requests-list");
  const data = getFilteredRequests();

  if (data.length === 0) {
    list.innerHTML = `<div class="request-card">No requests available.</div>`;
    return;
  }

  list.innerHTML = "";

  data.forEach(r => {
    const t = formatTime(timeLeft(r));

    list.innerHTML += `
      <div class="request-card flex justify-between items-start">
        <div>
          <h3>${r.id} — ${r.customer}</h3>
          <p class="request-meta"><strong>Customer ID:</strong> ${r.customerId}</p>
          <p class="request-meta"><strong>Distance:</strong> ${r.distance}</p>
          <p class="request-meta"><strong>Priority:</strong> ${r.priority}</p>
          <p class="request-meta"><strong>Time Left:</strong> ${t}</p>
        </div>
        <div class="flex flex-col gap-2">
          <button class="btn btn-accept" onclick="acceptRequest('${r.id}')">Accept</button>
          <button class="btn btn-reject" onclick="rejectRequest('${r.id}')">Reject</button>
        </div>
      </div>
    `;
  });
}

// Accept Request
function acceptRequest(id) {
  const r = requests.find(req => req.id === id);
  if (!r) return;

  worker.activeRequest = r;
  worker.available = false;

  // Remove from list
  requests = requests.filter(req => req.id !== id);

  document.getElementById("availabilityToggle").checked = false;
  document.getElementById("status-label").textContent = "Busy";

  renderActiveRequest();
  renderRequests();
  showSection("active-request");
}

// Reject Request
function rejectRequest(id) {
  requests = requests.filter(req => req.id !== id);
  renderRequests();
}

// Render Profile
function renderProfile() {
  const card = document.getElementById("profile-card");
  card.innerHTML = `
    <h3>${worker.name}</h3>
    <p><strong>Phone:</strong> ${worker.phone}</p>
    <p><strong>Email:</strong> ${worker.email}</p>
    <p><strong>Primary Skill:</strong> ${worker.primary}</p>
    <p><strong>Secondary Skills:</strong> ${worker.secondary}</p>
    <p><strong>Area:</strong> ${worker.area}</p>

    <button class="btn btn-reject mt-4" onclick="logoutWorker()">Logout</button>
  `;
}

// Logout
function logoutWorker() {
  alert("Logged out!");
}

// Sidebar Navigation
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active-nav"));
  const match = Array.from(document.querySelectorAll(".nav-btn"))
    .find(b => b.textContent.toLowerCase().includes(id.split('-')[0]));
  if (match) match.classList.add("active-nav");

  if (id === "active-request") renderActiveRequest();
  if (id === "requests") renderRequests();
  if (id === "profile") renderProfile();
}

// Availability Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("availabilityToggle");
  toggle.checked = worker.available;

  toggle.addEventListener("change", () => {
    worker.available = toggle.checked;
    document.getElementById("status-label").textContent =
      worker.available ? "Available" : "Busy";
  });

  // Initial page
  showSection("active-request");
});
