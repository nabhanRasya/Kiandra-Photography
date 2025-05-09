document.addEventListener("DOMContentLoaded", function () {
  initCarousel();
  initModal();

  // Add click event listeners to service cards
  const serviceCards = document.querySelectorAll('.service .grid > div:not(:last-child)');
  serviceCards.forEach(card => {
    card.addEventListener('click', function() {
      window.location.href = 'clientDummy.html';
    });
    // Add cursor pointer style
    card.style.cursor = 'pointer';
  });
});

function initModal() {
  const modal = document.getElementById("menuModal");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const closeIcon = document.getElementById("closeIcon");

  if (!modal || !hamburgerIcon || !closeIcon) {
    console.error("Salah satu elemen dalam toggleModal tidak ditemukan.");
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

function initCarousel() {
  const carousel = document.getElementById("carousel");
  if (!carousel) {
    console.error("Elemen carousel tidak ditemukan.");
    return;
  }

  let index = 0;
  const slides = carousel.children;
  const totalSlides = slides.length;

  function moveCarousel() {
    index = (index + 1) % totalSlides;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(moveCarousel, 3000); // Ganti gambar setiap 3 detik
}

// Inisialisasi Swiper
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
