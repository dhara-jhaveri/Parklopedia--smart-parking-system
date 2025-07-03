function parkCar() {
    const car = document.getElementById('car');
    const spots = document.querySelectorAll('.spot');
    const availableSpot = spots[Math.floor(Math.random() * spots.length)];
    
    // Calculate positions
    const spotRect = availableSpot.getBoundingClientRect();
    const carRect = car.getBoundingClientRect();
    
    // Set CSS variables for animation
    car.style.setProperty('--start-x', `${carRect.left}px`);
    car.style.setProperty('--end-x', `${spotRect.left + spotRect.width/2 - carRect.width/2}px`);
    car.style.setProperty('--end-y', `${spotRect.top - carRect.height}px`);
    
    // Start animation
    car.style.animation = 'none';
    car.style.transition = 'none';
    setTimeout(() => {
        car.style.animation = 'parkingSuccess 1.5s forwards';
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 1500);
    }, 10);
}

// Initialize car searching animation
document.addEventListener('DOMContentLoaded', () => {
    const car = document.getElementById('car');
    car.style.animation = 'carSearching 8s infinite';
});

function showStep(stepId) {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.add('hidden');
    });
    document.getElementById(stepId).classList.remove('hidden');
}

// Add parking spots dynamically
window.onload = function() {
    const parkingLot = document.querySelector('.parking-lot');
    for(let i = 0; i < 5; i++) {
        const spot = document.createElement('div');
        spot.className = 'parking-spot';
        parkingLot.appendChild(spot);
    }
}

// Add this to your existing script.js
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Call this function when the page loads
window.addEventListener('load', createParticles);

// Session Management
let currentUser = null;
let currentBooking = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Check which page we're on
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    
    // Initialize common elements
    initializeAnimations();
    setupTabSwitching();
    
    // Page-specific initialization
    if (pageName === 'index.html' || pageName === '' || pageName === '/') {
        setupLoginForm();
    } else if (pageName === 'locations.html') {
        checkSession();
        setupLocationCards();
    } else if (pageName === 'parking-map.html') {
        checkSession();
        initializeParkingMap();
    } else if (pageName === 'booking.html') {
        checkSession();
        initializeBookingForm();
    }
}

// Login Page Functions
function setupLoginForm() {
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }
    
    const forgotPasswordLink = document.getElementById('forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', showForgotPasswordForm);
    }
}

function setupTabSwitching() {
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginTab && signupTab) {
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        });
        
        signupTab.addEventListener('click', () => {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    }
}

function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    // For demo purposes, accept any login
    // In a real app, you would validate against a backend
    const user = {
        id: 1,
        name: 'John Doe',
        email: email,
        vehicles: [
            { id: 1, name: 'Honda City', color: 'Silver', plate: 'GJ01AB1234' },
            { id: 2, name: 'Hyundai i20', color: 'Blue', plate: 'GJ01CD5678' }
        ]
    };
    
    // Save user to localStorage
    localStorage.setItem('parklopedia_user', JSON.stringify(user));
    
    // Redirect to locations page
    window.location.href = 'locations.html';
}

function showForgotPasswordForm(e) {
    e.preventDefault();
    alert('Password reset functionality would be implemented here');
    // In a real app, you would show a form to enter email for password reset
}

// Session Check
function checkSession() {
    const userSession = localStorage.getItem('parklopedia_user');
    if (!userSession) {
        // Redirect to login if no session
        window.location.href = 'index.html';
        return false;
    }
    
    currentUser = JSON.parse(userSession);
    updateUserInterface();
    return true;
}

// Update UI with user info
function updateUserInterface() {
    const userNameElement = document.getElementById('user-name');
    if (userNameElement && currentUser) {
        userNameElement.textContent = currentUser.name;
    }
}

// Animation Functions
function initializeAnimations() {
    const car = document.querySelector('.car');
    if (car) {
        car.style.animation = 'carSearching 8s infinite';
    }
}

// Add these functions to handle other pages
function setupLocationCards() {
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach(card => {
        card.addEventListener('click', () => {
            const locationId = card.dataset.locationId || '1';
            selectLocation(locationId);
        });
    });
}

function selectLocation(locationId) {
    localStorage.setItem('selected_location', locationId);
    window.location.href = 'parking-map.html';
}

function initializeParkingMap() {
    // Implementation for parking map
}

function initializeBookingForm() {
    // Implementation for booking form
}

// Utility function to create elements
function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}