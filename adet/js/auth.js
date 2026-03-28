// --- TEACHER LOGIN ---
function doLogin() {
  const email = document.getElementById("login-email").value;
  const pw = document.getElementById("login-pw").value;

  // Basic validation check
  if (!email || !pw) {
    showNotif("Please enter both email and password.");
    return;
  }

  // Placeholder for your MariaDB/Backend verification
  if (email === "admin@studyworks.com" && pw === "password123") {
    showNotif("Login successful! Welcome, Instructor.");
    
    // Redirect to the Teacher Dashboard
    setTimeout(() => {
      loadPage('teacher-dashboard'); 
    }, 1000);
  } else {
    showNotif("Invalid credentials. Please try again.");
  }
}

// --- STUDENT LOGIN ---
function doStudentLogin() {
  const email = document.getElementById("slogin-email").value;
  const pw = document.getElementById("slogin-pw").value;

  if (!email || !pw) {
    showNotif("Email and Password are required.");
    return;
  }

  // Placeholder for Student Logic
  showNotif("Student login successful!");
  
  setTimeout(() => {
    loadPage('student-dashboard');
  }, 1000);
}

// --- SIGNUP LOGIC ---
function doSignup() {
  // You can gather values from your signup.html here
  showNotif("Account created! Please log in.");
  loadPage('login');
}