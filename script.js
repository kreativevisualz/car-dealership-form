let currentStep = 0;
const steps = document.querySelectorAll('.step');
const dots = document.querySelectorAll('.dot');
const progressText = document.getElementById('progressText');
const maritalStatus = document.getElementById('maritalStatus');
const marriageDateGroup = document.getElementById('marriageDateGroup');

maritalStatus.addEventListener('change', () => {
  if (maritalStatus.value === 'Married') {
    marriageDateGroup.classList.remove('hidden');
    marriageDateGroup.querySelector('input').setAttribute('required', 'required');
  } else {
    marriageDateGroup.classList.add('hidden');
    marriageDateGroup.querySelector('input').removeAttribute('required');
  }
});

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i <= index - 1); // intro not counted
  });

  const totalFormSteps = steps.length - 2; // excluding intro & success
  if (index === 0) {
    progressText.textContent = `Welcome`;
  } else if (index === steps.length - 1) {
    progressText.textContent = `Completed`;
  } else {
    progressText.textContent = `Step ${index} of ${totalFormSteps}`;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() {
  // Skip validation on intro screen
  if (currentStep !== 0) {
    const inputs = steps[currentStep].querySelectorAll('input, select');
    for (let input of inputs) {
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
    }
  }

  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

document.getElementById('multiStepForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // 1. Visual feedback for the user
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending Application...";
  submitBtn.disabled = true;

  // 2. Prepare the data as a JSON object
  const formData = new FormData(this);
  const dataObject = {};
  formData.forEach((value, key) => {
    dataObject[key] = value;
  });

  // 3. Send the data to your Google Apps Script
  // REPLACE THE URL BELOW WITH YOUR ACTUAL DEPLOYMENT URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxq4VhAFa9QZxHsJKlBxvxjYpEs-BDw1fzBsfBjl-YuMeEm9bYEtZXgfUNiMqjStAPk/exec';

  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors', // Essential for Google Apps Script
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataObject)
  })
  .then(() => {
    // 4. On success, show the success screen
    currentStep = steps.length - 1;
    showStep(currentStep);
  })
  .catch(error => {
    // 5. On error, let the user try again
    console.error('Submission Error:', error);
    alert('There was a problem submitting your application. Please try again.');
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
});

function resetForm() {
  document.getElementById('multiStepForm').reset();
  currentStep = 0;
  showStep(currentStep);
}

// JS for Admin Modal
const adminButton = document.getElementById('adminButton');
const adminModal = document.getElementById('adminModal');
const cancelAdmin = document.getElementById('cancelAdmin');
const loginAdmin = document.getElementById('loginAdmin');
const adminPasswordInput = document.getElementById('adminPasswordInput');
const adminError = document.getElementById('adminError');

const ADMIN_PASSWORD = "dealership123"; // your password

// Open modal
adminButton.addEventListener('click', () => {
  adminModal.style.display = 'flex';
  adminPasswordInput.value = "";
  adminError.classList.add('hidden');
});

// Close modal
cancelAdmin.addEventListener('click', () => {
  adminModal.style.display = 'none';
});

// Check password and redirect
loginAdmin.addEventListener('click', () => {
  if (adminPasswordInput.value === ADMIN_PASSWORD) {
    window.location.href = "admin.html"; // put your admin page path here
  } else {
    adminError.classList.remove('hidden');
    adminPasswordInput.value = "";
  }
});



