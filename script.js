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

  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // 1. Convert Form Data to a JSON Object
  const formData = new FormData(this);
  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });

  // 2. Send as JSON string
  fetch('YOUR_NEW_DEPLOYMENT_URL_HERE', {
    method: 'POST',
    mode: 'no-cors', // Required for Google Apps Script redirects
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(() => {
    // Since 'no-cors' doesn't return a readable response, we assume success if no error
    currentStep = steps.length - 1;
    showStep(currentStep);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Submission failed. Please try again.');
    submitBtn.textContent = "Submit Application";
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



// Replace the entire bottom section of your script.js with this:

document.getElementById('multiStepForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Stop page from refreshing

  // 1. Get the submit button to show "Processing..."
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // 2. Capture the Form Data (using the correct ID)
  const formData = new FormData(this);

  // 3. Send to Google Apps Script
  fetch('https://script.google.com/macros/s/AKfycbzL1vgwf-3PN_FwaSPmmlRUDmrx1ZrSCgx360OurtGtAtKGXGQfEuY2bLBSVEjg9kAI/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    console.log('Success:', response);
    // 4. Move to the Success Step only after successful fetch
    currentStep = steps.length - 1;
    showStep(currentStep);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Something went wrong. Please check your internet connection and try again.');
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
  });
});

// You can delete the old function submitForm() {} entirely