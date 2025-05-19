// Function to check if element exists
function elementExists(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.error(`Element with id "${id}" not found`);
    return false;
  }
  return true;
}

// Function to sanitize input
function sanitizeInput(input) {
  return input.trim().replace(/[<>]/g, '');
}

// Function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate phone
function isValidPhone(phone) {
  const phoneRegex = /^[\d\s+()-]{8,}$/;
  return phoneRegex.test(phone);
}

// Function to open modal
function openModal() {
  if (!elementExists("bookingModal")) return;
  document.getElementById("bookingModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// Function to close modal
function closeModal() {
  if (!elementExists("bookingModal")) return;
  document.getElementById("bookingModal").classList.add("hidden");
  document.body.style.overflow = "auto";
}

// Function to show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 w-[95%] md:w-1/2 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full ivyora-regular`;
  
  if (type === 'success') {
    notification.classList.add('bg-green-50', 'border', 'border-green-200', 'text-green-800');
  } else {
    notification.classList.add('bg-red-50', 'border', 'border-red-200', 'text-red-800');
  }

  notification.innerHTML = `
    <div class="flex items-center">
      <svg class="h-9 w-9 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      <p class="font-medium">${sanitizeInput(message)}</p>
    </div>
  `;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Function to set loading state
function setLoading(isLoading) {
  const submitButton = form?.querySelector('button[type="submit"]');
  if (!submitButton) {
    console.error('Submit button not found in form');
    return;
  }

  if (isLoading) {
    submitButton.disabled = true;
    submitButton.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white hover:text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Submitting...
    `;
  } else {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Book Now';
  }
}

// Initialize event listeners only if elements exist
if (elementExists("openModalBtn")) {
document.getElementById("openModalBtn").addEventListener("click", openModal);
}

if (elementExists("closeModal")) {
document.getElementById("closeModal").addEventListener("click", closeModal);
}

if (elementExists("bookingModal")) {
document.getElementById("bookingModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbxcSW31MtVVbkEGKWdqImIZ8DZNG6a3JS5R3G6mlAd-APsvel9DCv6USvY7sA7MlzQ/exec'
const form = document.forms['submit-to-google-sheet']
let isSubmitting = false;

if (form) {
  form.addEventListener('submit', async e => {
  e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) {
      showNotification("Please wait while we process your previous submission", 'error');
      return;
    }

    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    let errorMessage = '';
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('border-red-500');
      } else {
        field.classList.remove('border-red-500');
        
        // Validate email format
        if (field.type === 'email' && !isValidEmail(field.value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
          field.classList.add('border-red-500');
        }
        
        // Validate phone format
        if (field.name === 'phone' && !isValidPhone(field.value)) {
          isValid = false;
          errorMessage = 'Please enter a valid phone number';
          field.classList.add('border-red-500');
        }
      }
    });

    if (!isValid) {
      showNotification(errorMessage || "Please fill in all required fields", 'error');
      return;
    }

    try {
      isSubmitting = true;
      setLoading(true);

      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000); // 10 second timeout
      });

      // Race between fetch and timeout
      const response = await Promise.race([
        fetch(scriptURL, { 
          method: 'POST', 
          body: new FormData(form)
        }),
        timeoutPromise
      ]);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      showNotification("Booking request submitted! Our admin will verify and contact you soon. For faster response, reach us via chat.");
  setTimeout(() => {
    form.reset();
    closeModal();
      }, 3000);

    } catch (error) {
      const errorMessage = error.message === 'Request timeout' 
        ? "Request timed out. Please try again."
        : "Sorry, there was an error submitting your request. Please try again.";
      showNotification(errorMessage, 'error');
      console.error('Error!', error.message);
    } finally {
      isSubmitting = false;
      setLoading(false);
    }
  });

  // Reset form validation on input
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('border-red-500');
    });
  });
} else {
  console.error('Form with name "submit-to-google-sheet" not found');
}