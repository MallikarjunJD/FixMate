// script.js
// Simple, well-documented JS for the login page.
// Replace the "mockAuthenticate" function with a real fetch() to your backend.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const usernameEl = document.getElementById('username');
  const passwordEl = document.getElementById('password');
  const usernameError = document.getElementById('username-error');
  const passwordError = document.getElementById('password-error');
  const status = document.getElementById('status');
  const toggleBtn = document.getElementById('toggle-password');
  const submitBtn = document.getElementById('submit-btn');
  const demoBtn = document.getElementById('demo-btn');

  // Toggle password visibility
  toggleBtn.addEventListener('click', () => {
    const isPwd = passwordEl.type === 'password';
    passwordEl.type = isPwd ? 'text' : 'password';
    toggleBtn.setAttribute('aria-label', isPwd ? 'Hide password' : 'Show password');
    toggleBtn.textContent = isPwd ? '🙈' : '👁';
    passwordEl.focus();
  });

  // Basic client-side validation
  function validate() {
    let ok = true;
    usernameError.textContent = '';
    passwordError.textContent = '';
    status.textContent = '';

    const username = usernameEl.value.trim();
    const password = passwordEl.value;

    if (!username) {
      usernameError.textContent = 'Please enter your email or username.';
      ok = false;
    } else if (username.length < 3) {
      usernameError.textContent = 'Too short.';
      ok = false;
    }

    if (!password) {
      passwordError.textContent = 'Please enter your password.';
      ok = false;
    } else if (password.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters.';
      ok = false;
    }

    return ok;
  }

  // Mock authentication function (for demo). Replace with fetch() in production.
  // Simulates network delay and returns a promise.
  function mockAuthenticate({ username, password }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Example: accept username "admin" or email "admin@example.com" with password "password123"
        const validUsers = [
          {u: 'admin', p: 'password123'},
          {u: 'admin@example.com', p: 'password123'}
        ];
        const matched = validUsers.some(item => item.u === username && item.p === password);
        resolve({ ok: matched, message: matched ? 'Login successful' : 'Invalid credentials' });
      }, 700);
    });
  }

  // Handler for real submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // disable UI while 'authenticating'
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';
    status.textContent = 'Signing in — please wait';

    const payload = {
      username: usernameEl.value.trim(),
      password: passwordEl.value,
      remember: document.getElementById('remember').checked
    };

    try {
      // --- Replace this block with an actual fetch to your API ---
      // Example:
      // const res = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      // const data = await res.json();
      const data = await mockAuthenticate(payload);
      // ---------------------------------------------------------

      if (data.ok) {
        status.textContent = data.message + '. Redirecting…';
        status.style.color = ''; // default color
        // Example redirect (uncomment when ready)
        // window.location.href = '/dashboard';
        // For demo, re-enable after a moment:
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Sign in';
        }, 800);
      } else {
        status.textContent = data.message;
        status.style.color = 'var(--danger)';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign in';
      }
    } catch (err) {
      console.error(err);
      status.textContent = 'An unexpected error occurred. Try again.';
      status.style.color = 'var(--danger)';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign in';
    }
  });

  // Demo button fills credentials for quick testing
  demoBtn.addEventListener('click', () => {
    usernameEl.value = 'admin';
    passwordEl.value = 'password123';
    usernameError.textContent = '';
    passwordError.textContent = '';
    status.textContent = 'Demo credentials filled — click Sign in';
    passwordEl.focus();
  });

  // Optional: basic 'Enter' handling and real-time validation
  [usernameEl, passwordEl].forEach(el => {
    el.addEventListener('input', () => {
      // live-clear error message for that field
      if (el === usernameEl) usernameError.textContent = '';
      if (el === passwordEl) passwordError.textContent = '';
      status.textContent = '';
    });
  });
});
