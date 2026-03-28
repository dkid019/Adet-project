/**
 * navigation.js - Handles dynamic page loading for Study Works
 */

function loadPage(page) {
  const app = document.getElementById("app");
  
  // Optional: show a loading state styled like your auth cards
  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-card" style="text-align:center;">
        <p>Loading ${page}...</p>
      </div>
    </div>`;

  fetch(`pages/${page}.html`)
    .then(res => {
      if (!res.ok) throw new Error(`Could not find ${page}.html in the pages folder.`);
      return res.text();
    })
    .then(html => {
      // 1. Inject the HTML into the main container
      app.innerHTML = html;

      // 2. Trigger data population based on the page loaded
      // This connects to the fetchDashboardData function in your ui.js
      if (page === 'teacher-dashboard') {
        if (typeof fetchDashboardData === 'function') {
          fetchDashboardData('teacher');
        }
      } else if (page === 'student-dashboard') {
        if (typeof fetchDashboardData === 'function') {
          fetchDashboardData('student');
        }
      }

      // 3. Scroll to top on page change
      window.scrollTo(0, 0);
    })
    .catch(err => {
      app.innerHTML = `
        <div class="auth-page">
          <div class="auth-card">
            <h2 style="color: #e04040;">Navigation Error</h2>
            <p>${err.message}</p>
            <button class="btn-primary" onclick="loadPage('landing')" style="margin-top: 10px;">Return Home</button>
          </div>
        </div>`;
      console.error("Navigation error:", err);
    });
}