document.addEventListener("DOMContentLoaded", function () {
  loadPage();
  initCarousel();
  setupMenuToggle();
});

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

function toggleModal() {
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
