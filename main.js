document.addEventListener("DOMContentLoaded", function () {
  loadPage();
  initCarousel();
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

function loadPage() {
  const enterButton = document.getElementById("enter-btn");
  const enterPage = document.getElementById("enter-page");
  const loadingScreen = document.getElementById("loading-screen");
  const homePage = document.getElementById("home-page");
  const flower = document.getElementById("flower");
  const textTitle = enterPage.querySelector("p");

  if (
    !enterButton ||
    !enterPage ||
    !loadingScreen ||
    !homePage ||
    !flower ||
    !textTitle
  ) {
    console.error("Salah satu elemen dalam loadPage tidak ditemukan.");
    return;
  }

  enterButton.addEventListener("click", (event) => {
    event.preventDefault(); // Hindari reload

    // Tambahkan efek animasi
    flower.classList.add("animate-pulse");
    textTitle.classList.add("fade-out");
    enterPage.classList.add("fade-out");

    setTimeout(() => {
      enterPage.style.display = "none"; // Sembunyikan setelah animasi selesai

      // Tampilkan layar loading dengan efek fade-in
      loadingScreen.classList.remove("hidden");
      loadingScreen.classList.add("fade-in");

      setTimeout(() => {
        loadingScreen.classList.add("fade-out");

        setTimeout(() => {
          loadingScreen.style.display = "none"; // Sembunyikan loading screen

          // Tampilkan halaman home dengan efek fade-in
          homePage.classList.remove("hidden");
          homePage.classList.add("fade-in");
        }, 1000); // Waktu yang sama dengan animasi fade-out
      }, 1000); // Lama tampilan loading screen
    }, 1000); // Tunggu animasi enter-page selesai sebelum loading screen
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      document.getElementById("enter-btn").click();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const photos = document.querySelectorAll(".photo-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.dataset.category;

      // Reset semua tombol ke warna default
      filterButtons.forEach((btn) => {
        btn.classList.remove("bg-black", "text-white");
        btn.classList.add("bg-gray-200", "text-gray-800");
      });

      // Set tombol aktif ke warna hitam
      this.classList.add("bg-black", "text-white");
      this.classList.remove("bg-gray-200", "text-gray-800");

      // Filter gambar berdasarkan kategori
      photos.forEach((photo) => {
        if (category === "all" || photo.dataset.category === category) {
          photo.classList.remove("hidden");
        } else {
          photo.classList.add("hidden");
        }
      });
    });
  });
});
