document.addEventListener("DOMContentLoaded", function () {
  initModal(); // Panggil fungsi untuk mengatur modal hanya sekali

  const imageModal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeModalBtn = document.getElementById("closeModalBtn");

  // Fungsi untuk membuka modal
  function openModal(imageUrl) {
    modalImage.src = imageUrl; // Set sumber gambar di modal

    // Pastikan gambar di modal tersembunyi sebelum transisi
    modalImage.classList.add("scale-90", "opacity-0");

    // Tampilkan modal overlay
    imageModal.classList.remove("opacity-0", "invisible");
    imageModal.classList.add("opacity-100", "visible");

    // Animasi pop-up gambar di dalam modal (setelah modal terlihat)
    // Gunakan setTimeout kecil untuk memastikan transisi CSS dipicu
    setTimeout(() => {
      modalImage.classList.remove("scale-90", "opacity-0");
      modalImage.classList.add("scale-100", "opacity-100");
    }, 50); // Sedikit delay untuk memicu transisi gambar
  }

  // Fungsi untuk menutup modal
  function closeModal() {
    // Mulai animasi tutup (gambar menyusut dulu)
    modalImage.classList.remove("scale-100", "opacity-100");
    modalImage.classList.add("scale-90", "opacity-0");

    // Setelah animasi gambar selesai, sembunyikan modal overlay
    setTimeout(() => {
      imageModal.classList.remove("opacity-100", "visible");
      imageModal.classList.add("opacity-0", "invisible");
      // Opsional: bersihkan src gambar setelah modal tertutup sepenuhnya untuk memori
      // modalImage.src = "";
    }, 200); // Sesuaikan dengan durasi transisi gambar (misal 200ms jika durasi 300ms)
  }

  // --- Delegasi Event Listener untuk Pemicu Modal ---
  // Kita akan menggunakan atribut data-image-src pada elemen pemicu
  // Baik itu <img>, <div>, atau elemen lain.
  document.body.addEventListener("click", (event) => {
    // Mencari elemen terdekat yang memiliki kelas 'open-modal' atau 'open-modal-div'
    // dan memiliki atribut data-image-src
    const triggerElement = event.target.closest(
      ".open-modal"
    );

    if (triggerElement) {
      // Dapatkan URL gambar dari atribut data-image-src
      // Jika pemicunya <img> (memiliki src), gunakan src-nya.
      // Jika pemicunya div atau elemen lain, gunakan data-image-src.
      const imageUrl =
        triggerElement.dataset.imageSrc || triggerElement.src;

      if (imageUrl) {
        openModal(imageUrl);
      }
    }

    // Event listener untuk tombol tutup modal atau klik di luar gambar
    imageModal.addEventListener("click", (event) => {
      // Tutup modal jika tombol close diklik ATAU jika klik di luar gambar
      if (event.target === closeModalBtn || event.target === imageModal) {
        closeModal();
      }
    });

    // Tutup modal dengan tombol ESC
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        imageModal.classList.contains("visible")
      ) {
        closeModal();
      }
    });
  });

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
