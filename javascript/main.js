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
        "duration-700",
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
          "duration-700",
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

  // Filter Slider Scroll Indicators
  const scrollLeftIndicator = document.getElementById('scroll-left-indicator');
  const scrollRightIndicator = document.getElementById('scroll-right-indicator');

  function updateScrollIndicators() {
    if (!filterSlider) return;

    const isScrollable = filterSlider.scrollWidth > filterSlider.clientWidth;
    const isAtStart = filterSlider.scrollLeft === 0;
    const isAtEnd = Math.ceil(filterSlider.scrollLeft + filterSlider.clientWidth) >= filterSlider.scrollWidth;

    // Show/hide left indicator
    if (isScrollable && !isAtStart) {
      scrollLeftIndicator.style.opacity = '1';
    } else {
      scrollLeftIndicator.style.opacity = '0';
    }

    // Show/hide right indicator
    if (isScrollable && !isAtEnd) {
      scrollRightIndicator.style.opacity = '1';
    } else {
      scrollRightIndicator.style.opacity = '0';
    }
  }

  // Initial check
  updateScrollIndicators();

  // Update on scroll
  filterSlider?.addEventListener('scroll', updateScrollIndicators);

  // Update on resize
  window.addEventListener('resize', updateScrollIndicators);

  // Initialize with "All" filter active
  filterItems("all");
});
