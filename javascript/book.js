// Function to open modal
function openModal() {
  document.getElementById("bookingModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// Function to close modal
function closeModal() {
  document.getElementById("bookingModal").classList.add("hidden");
  document.body.style.overflow = "auto";
}

// Event listener for open button
document.getElementById("openModalBtn").addEventListener("click", openModal);

// Event listener for close button
document.getElementById("closeModal").addEventListener("click", closeModal);

// Close modal when clicking outside
document.getElementById("bookingModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Form submission
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  // Here you would normally send to a spreadsheet API
  // For demonstration, this just logs the data
  console.log("Sending to spreadsheet:", data);

  // Create success message
  const form = document.getElementById("bookingForm");
  const successMsg = document.createElement("div");
  successMsg.className =
    "bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-lg p-4 mt-4";
  successMsg.innerHTML = `
      <div class="flex">
        <svg class="h-5 w-5 text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <div class="ml-3">
          <p class="text-sm font-medium">Your booking request has been submitted successfully!</p>
          <p class="text-sm mt-1 text-neutral-600">We'll contact you shortly to confirm your appointment.</p>
        </div>
      </div>
    `;

  form.appendChild(successMsg);

  // Reset form after a delay
  setTimeout(() => {
    form.reset();
    successMsg.remove();
    closeModal();
  }, 3000);
});
