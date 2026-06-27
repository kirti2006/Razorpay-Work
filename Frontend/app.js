const API_URL = 'http://127.0.0.1:7002/rest';

// Elements
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const authMessage = document.getElementById('auth-message');
const rMessage = document.getElementById('r-message');
const reimbursementsUl = document.getElementById('reimbursements-ul');

// Buttons
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');

// Forms
const reimbursementForm = document.getElementById('reimbursement-form');

// State
let user = null;

// Helper: Custom fetch with credentials
async function apiFetch(endpoint, options = {}) {
    options.credentials = 'include'; // To send/receive cookies
    options.headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'API Error');
    }
    return data;
}

// Show/Hide Sections
function updateUI() {
    if (user) {
        authSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        fetchReimbursements();
    } else {
        authSection.style.display = 'block';
        dashboardSection.style.display = 'none';
        reimbursementsUl.innerHTML = '';
    }
}

// Register
registerBtn.addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const data = await apiFetch('/onboardings/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });
        user = data.data.user;
        authMessage.innerText = '';
        updateUI();
    } catch (err) {
        authMessage.innerText = err.message;
    }
});

// Login
loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const data = await apiFetch('/onboardings/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        user = data.data.user;
        authMessage.innerText = '';
        updateUI();
    } catch (err) {
        authMessage.innerText = err.message;
    }
});

// Logout
logoutBtn.addEventListener('click', async () => {
    try {
        await apiFetch('/onboardings/logout', { method: 'POST' });
        user = null;
        updateUI();
    } catch (err) {
        alert(err.message);
    }
});

// Fetch Reimbursements
async function fetchReimbursements() {
    try {
        const data = await apiFetch('/reimbursements');
        const reimbursements = data.data.reimbursements;
        renderReimbursements(reimbursements);
    } catch (err) {
        console.error(err);
        rMessage.innerText = 'Failed to load reimbursements.';
    }
}

// Render List
function renderReimbursements(list) {
    reimbursementsUl.innerHTML = '';
    if (!list || list.length === 0) {
        reimbursementsUl.innerHTML = '<li>No reimbursements found.</li>';
        return;
    }
    
    list.forEach(r => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="r-details">
                <span class="r-title">${r.title}</span>
                <span class="r-desc">${r.description}</span>
                <span class="r-amount">$${r.amount}</span>
            </div>
            <span class="status ${r.status}">${r.status}</span>
        `;
        reimbursementsUl.appendChild(li);
    });
}

// Create Reimbursement
reimbursementForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('r-title').value;
    const description = document.getElementById('r-desc').value;
    const amount = parseFloat(document.getElementById('r-amount').value);

    try {
        await apiFetch('/reimbursements', {
            method: 'POST',
            body: JSON.stringify({ title, description, amount })
        });
        rMessage.innerText = '';
        reimbursementForm.reset();
        fetchReimbursements(); // Refresh list
    } catch (err) {
        rMessage.innerText = err.message;
    }
});
