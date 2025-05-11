document.addEventListener("DOMContentLoaded", function () {
  initModal(); // Initialize modal for menu

  // Add click event listeners to service cards
  const serviceCards = document.querySelectorAll('.service .grid > div:not(:last-child)');
  serviceCards.forEach(card => {
    card.addEventListener('click', function() {
      window.location.href = 'contact.html';
    });
    card.style.cursor = 'pointer';
  });
});

// Function to initialize modal
function initModal() {
  const modal = document.getElementById("menuModal");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const closeIcon = document.getElementById("closeIcon");

  if (!modal || !hamburgerIcon || !closeIcon) {
    console.error("Required modal elements not found");
    return;
  }

  hamburgerIcon.addEventListener("click", () => {
    modal.classList.remove("scale-0", "opacity-0", "-translate-x-full");
    modal.classList.add("scale-100", "opacity-100", "translate-x-0");
    hamburgerIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  });

  closeIcon.addEventListener("click", () => {
    modal.classList.remove("scale-100", "opacity-100", "translate-x-0");
    modal.classList.add("scale-0", "opacity-0", "-translate-x-full");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  });
}

// Initialize Swiper
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
