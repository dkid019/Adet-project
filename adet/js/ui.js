/**
 * ui.js - Handles UI interactions and dynamic rendering for Study Works
 */

// --- PASSWORD VISIBILITY ---
// Toggles the input type between 'password' and 'text'
function togglePw(id) {
  const input = document.getElementById(id);
  if (input) {
    input.type = input.type === "password" ? "text" : "password";
  }
}

// --- NOTIFICATIONS (Toast) ---
// Uses the .notif and .notif.show classes from main.css
function showNotif(message, duration = 3000) {
  const notif = document.getElementById('notif');
  if (!notif) return;

  notif.textContent = message;
  notif.classList.add('show');

  // Slide-out and hide after duration
  setTimeout(() => {
    notif.classList.remove('show');
  }, duration);
}

// --- LOGOUT MODAL ---
// Uses .modal-overlay and .modal-overlay.open from main.css
function openLogoutModal() {
  const modal = document.getElementById('logout-modal');
  if (modal) modal.classList.add('open');
}

function closeLogoutModal() {
  const modal = document.getElementById('logout-modal');
  if (modal) modal.classList.remove('open');
}

function confirmLogout() {
  // Logic to clear sessions can be added here
  closeLogoutModal();
  showNotif("Logged out successfully");
  
  // Return to the landing page
  if (typeof loadPage === 'function') {
    loadPage('landing');
  }
}

// --- CONTEXT MENU ---
// Positioned relative to the mouse click event
function showContextMenu(e, content) {
  e.preventDefault();
  const menu = document.getElementById('ctx-menu');
  if (!menu) return;

  menu.innerHTML = content;
  menu.style.display = 'block';
  menu.style.top = `${e.pageY}px`;
  menu.style.left = `${e.pageX}px`;

  // Close menu when clicking anywhere else
  document.addEventListener('click', () => {
    menu.style.display = 'none';
  }, { once: true });
}

// --- DYNAMIC DATA RENDERING ---

/**
 * Renders course cards into the .classes-grid container
 * @param {Array} courses - Objects containing title, stats, and theme color
 * @param {string} containerId - The ID of the target element
 */
function renderCourses(courses, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = courses.map(course => `
    <div class="class-card" onclick="loadPage('class-detail')">
      <div class="class-thumb" style="background: ${course.color || '#d4d4d4'};">
        <button class="class-menu-btn" onclick="event.stopPropagation(); showNotif('Options for ${course.title}')">⋮</button>
      </div>
      <div class="class-info">
        <h3>${course.title}</h3>
        <p>${course.stats}</p>
      </div>
    </div>
  `).join('');
}

/**
 * Mock data fetcher to simulate your MariaDB backend
 * @param {string} role - 'teacher' or 'student'
 */
function fetchDashboardData(role) {
  const mockData = {
    teacher: [
      { title: "Web Development 101", stats: "32 Students • 12 Lessons", color: "#2d7a7c" },
      { title: "Database Systems", stats: "28 Students • 8 Lessons", color: "#1b3a5c" },
      { title: "Linux Administration", stats: "15 Students • 5 Lessons", color: "#1a1a1a" }
    ],
    student: [
      { title: "Web Development 101", stats: "Instructor: John Doe • 45% Complete", color: "#7a9e87" },
      { title: "Database Systems", stats: "Instructor: Jane Smith • 10% Complete", color: "#b8ccb8" }
    ]
  };

  const courses = mockData[role] || [];
  renderCourses(courses, 'classes-grid');
}

/**
 * Handles the creation of a new class instance.
 */
function handleCreateClass() {
  const name = document.getElementById('class-name').value;
  const category = document.getElementById('class-category').value;
  const schedule = document.getElementById('class-schedule').value;

  if (!name || !schedule) {
    showNotif("Please fill in the required class details.");
    return;
  }

  // LOGIC: This is where you would normally perform a fetch() POST to your 
  // Debian/MariaDB backend to save the new class.
  console.log("Creating class:", { name, category, schedule });

  showNotif(`Successfully created ${name}!`);

  // Redirect back to dashboard after a short delay
  setTimeout(() => {
    loadPage('teacher-dashboard');
  }, 1500);
}