document.addEventListener("DOMContentLoaded", function () {
  initModal(); // Panggil fungsi untuk mengatur modal hanya sekali
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

// Mendefinisikan serviceData sebagai variabel global
window.serviceData = {
  "wedding-traditional": {
    title: "Wedding Traditional",
    image: "assets/photography-assets/carousel-1.png",
    description:
      "Layanan dokumentasi pernikahan tradisional yang menekankan kearifan lokal.",
    couples: ["Anindya & Rama", "Ayu & Bintang"],
  },
  "wedding-international": {
    title: "Wedding International",
    image: "assets/photography-assets/carousel-2.png",
    description: "Pernikahan bergaya internasional yang elegan dan berkelas.",
    couples: ["Sarah & James"],
  },
  prewedding: {
    title: "Prewedding",
    image: "assets/photography-assets/carousel-3.png",
    description:
      "Sesi prewedding profesional dengan konsep yang bisa disesuaikan.",
    couples: ["Maya & Dito"],
  },
  engagement: {
    title: "Engagement",
    image: "assets/photography-assets/carousel-1.png",
    description: "Dokumentasi acara pertunangan penuh cinta dan harapan.",
    couples: ["Amelia & Farhan"],
  },
  video: {
    title: "Video",
    image: "assets/photography-assets/carousel-2.png",
    description: "Video sinematik untuk semua momen istimewa.",
    couples: ["Karina & Leo"],
  },
};

// Inisialisasi loading screen
document.addEventListener("DOMContentLoaded", function () {
  const loadingBar = document.getElementById("loading-bar");
  const loadingScreen = document.getElementById("loading-screen");
  const contentScreen = document.getElementById("portofolio-page");

  // Animate loading bar
  let width = 0;
  const interval = setInterval(function () {
    if (width >= 100) {
      clearInterval(interval);

      // Add fade out effect
      loadingScreen.classList.add(
        "opacity-0",
        "transition-opacity",
        "duration-700"
      );

      // Hide loading screen after fade out
      setTimeout(function () {
        loadingScreen.classList.add("hidden");
        // Show content screen
        contentScreen.classList.remove("hidden");
        // Add fade-in effect for content
        contentScreen.classList.add(
          "opacity-100",
          "transition-opacity",
          "duration-700"
        );
      }, 700);
    } else {
      width += Math.random() * 10;
      if (width > 100) width = 100;
      loadingBar.style.width = width + "%";
    }
  }, 200);

  // Force complete loading after 5 seconds
  setTimeout(function () {
    width = 100;
    loadingBar.style.width = "100%";
  }, 5000);

  // Portfolio Filter Logic
  const filterButtons = document.querySelectorAll(".filter-btn");
  const photoItems = document.querySelectorAll(".photo-item");
  const photoGrid = document.getElementById("photo-grid");
  const noResults = document.getElementById("no-results");

  // Filter function
  function filterItems(category) {
    let visibleCount = 0;

    photoItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      if (category === "all" || itemCategory === category) {
        item.classList.remove("hidden");
        visibleCount++;
      } else {
        item.classList.add("hidden");
      }
    });

    // Show/hide no results message
    if (visibleCount === 0) {
      photoGrid.classList.add("hidden");
      noResults.classList.remove("hidden");
    } else {
      photoGrid.classList.remove("hidden");
      noResults.classList.add("hidden");
    }
  }

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active", "bg-neutral-800", "text-white");
        btn.classList.add("bg-neutral-50", "text-neutral-800");
      });

      // Add active class to clicked button
      button.classList.add("active", "bg-neutral-800", "text-white");
      button.classList.remove("bg-neutral-50", "text-neutral-800");

      const category = button.getAttribute("data-category");
      filterItems(category);
    });
  });

  // Modal functionality for portfolio items
  photoItems.forEach((item) => {
    const category = item.getAttribute("data-category");
    item.addEventListener("click", () => openModal(category));
  });

  // Optimize filter scrolling for mobile
  const filterSlider = document.getElementById("filter-slider");
  let isDown = false;
  let startX;
  let scrollLeft;

  filterSlider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - filterSlider.offsetLeft;
    scrollLeft = filterSlider.scrollLeft;
  });

  filterSlider.addEventListener("mouseleave", () => {
    isDown = false;
  });

  filterSlider.addEventListener("mouseup", () => {
    isDown = false;
  });

  filterSlider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - filterSlider.offsetLeft;
    const walk = (x - startX) * 2;
    filterSlider.scrollLeft = scrollLeft - walk;
  });

  // Initialize with "All" filter active
  filterItems("all");
});

// Variabel untuk melacak status like
let currentImage = "";
let liked = false;

// Fungsi untuk modal
function openModal(category) {
  const data = window.serviceData[category];
  if (!data) return;

  currentImage = data.image;

  const couples = data.couples || [""];
  const coupleIndex = Math.floor(Math.random() * couples.length);
  const selectedCouple = couples[coupleIndex];

  document.getElementById("modalTitle").textContent = data.title;
  document.getElementById("modalTitleMobile").textContent = data.title;
  document.getElementById("modalDescription").textContent = data.description;
  document.getElementById("modalImage").src = data.image;
  document.getElementById("modalCategory").textContent = selectedCouple;

  // Reset like button
  liked = false;
  updateHeartIcon();

  document.getElementById("serviceModal").classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Mencegah scrolling saat modal terbuka

  // Tambahkan animasi fade-in
  setTimeout(() => {
    document.getElementById("serviceModal").classList.add("opacity-100");
  }, 10);
}

function closeModal() {
  document.getElementById("serviceModal").classList.remove("opacity-100");
  setTimeout(() => {
    document.getElementById("serviceModal").classList.add("hidden");
    document.getElementById("shareOptions").classList.add("hidden");
    document.body.style.overflow = ""; // Aktifkan kembali scrolling
  }, 300);
}

// Like logic with fill animation
function toggleLike() {
  liked = !liked;
  updateHeartIcon();
}

function updateHeartIcon() {
  const heartIcon = document.getElementById("heartIcon");
  if (liked) {
    heartIcon.setAttribute("fill", "currentColor");
    heartIcon.parentElement.classList.add(
      "text-red-500",
      "bg-red-50",
      "dark:bg-red-900/30"
    );
  } else {
    heartIcon.setAttribute("fill", "none");
    heartIcon.parentElement.classList.remove(
      "text-red-500",
      "bg-red-50",
      "dark:bg-red-900/30"
    );
  }
}

// Share dropdown toggle
function toggleShareOptions() {
  const shareOptions = document.getElementById("shareOptions");
  shareOptions.classList.toggle("hidden");
}

// Share to WhatsApp
function shareToWhatsApp() {
  const title = document.getElementById("modalTitle").textContent;
  const text = encodeURIComponent(
    `Saya tertarik dengan layanan fotografi "${title}". Kunjungi: ${window.location.href}`
  );
  window.open(`https://wa.me/?text=${text}`, "_blank");

  // Hide share options after clicking
  document.getElementById("shareOptions").classList.add("hidden");
}

// Copy link with notification
function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showNotification("Link berhasil disalin!");
  });

  // Hide share options after clicking
  document.getElementById("shareOptions").classList.add("hidden");
}

// Contact form or WhatsApp action
function contactUs() {
  const title = document.getElementById("modalTitle").textContent;
  const message = encodeURIComponent(
    `Halo, saya tertarik dengan layanan "${title}". Bisakah Anda memberikan informasi lebih lanjut?`
  );
  window.open(`https://wa.me/+6281234567890?text=${message}`, "_blank");
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className =
    "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 opacity-0";
  notification.textContent = message;
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.remove("opacity-0");
  }, 10);

  // Hide and remove notification after 2 seconds
  setTimeout(() => {
    notification.classList.add("opacity-0");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

// Close modal when clicking outside
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("serviceModal")
    .addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal();
      }
    });

  // Close share options when clicking outside

  document.addEventListener("click", function (e) {
    const shareOptions = document.getElementById("shareOptions");
    const shareButton = document.querySelector(
      "[onclick='toggleShareOptions()']"
    );

    if (
      shareOptions &&
      shareButton &&
      !shareOptions.contains(e.target) &&
      e.target !== shareButton &&
      !shareButton.contains(e.target)
    ) {
      shareOptions.classList.add("hidden");
    }
  });

  // Add keyboard event listener (ESC to close)
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});
