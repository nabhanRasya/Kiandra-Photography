document.addEventListener("DOMContentLoaded", function () {
  initModal(); // Initialize modal for menu

  // Add click event listeners to service cards
  const serviceCards = document.querySelectorAll('.service .grid > div:not(:last-child)');
  serviceCards.forEach(card => {
    card.addEventListener('click', function () {
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

document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.getElementById('carousel');
            const slides = document.querySelectorAll('.carousel-slide');
            const totalSlides = slides.length;
            let currentIndex = 0;
            
            function updateCarousel() {
                // Hitung posisi translateX berdasarkan currentIndex
                const translateX = -currentIndex * 100;
                carousel.style.transform = `translateX(${translateX}%)`;
            }
            
            function nextSlide() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            }
            
            // Auto slide setiap 3 detik
            const interval = setInterval(nextSlide, 3000);
            
            // Pause on hover (opsional)
            carousel.addEventListener('mouseenter', () => clearInterval(interval));
            carousel.addEventListener('mouseleave', () => {
                interval = setInterval(nextSlide, 3000);
            });
            
            // Inisialisasi
            updateCarousel();
        });

        document.addEventListener("DOMContentLoaded", function () {
        const CHANNEL_ID = "UCySWyRPHzYQ8EKHU0U4E3_g";
        const API_KEY = "AIzaSyC0o-dNMlHnf8YW6PgHmpqjdF1U4T4GPfo";
        const videoContainer = document.getElementById("videoContainer");
        const showMoreBtn = document.getElementById("showMoreBtn");
        const loadingSpinner = document.getElementById("loadingSpinner");

        let allVideos = [];
        let visibleVideos = 3;

        async function fetchVideos() {
          try {
            loadingSpinner.classList.remove("hidden");

            const response = await fetch(
              `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=10&order=date&type=video&key=${API_KEY}`
            );

            if (!response.ok) {
              throw new Error("Failed to fetch videos");
            }

            const data = await response.json();
            allVideos = data.items;

            if (allVideos.length > 3) {
              showMoreBtn.classList.remove("hidden");
            }

            displayVideos();
          } catch (error) {
            console.error("Error fetching videos:", error);
            videoContainer.innerHTML = `
              <div class="col-span-full text-center text-neutral-600">
                <p>Unable to load videos at this time. Please visit our 
                  <a href="https://www.youtube.com/channel/${CHANNEL_ID}" target="_blank" class="text-blue-600 hover:underline">YouTube channel</a>.
                </p>
              </div>
            `;
          } finally {
            loadingSpinner.classList.add("hidden");
          }
        }

        function displayVideos() {
          const videosToShow = allVideos.slice(0, visibleVideos);
          videoContainer.innerHTML = videosToShow
            .map(
              (video) => `
            <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div class="relative pt-[56.25%]"> <!-- 16:9 Aspect Ratio -->
                <iframe 
                  src="https://www.youtube.com/embed/${video.id.videoId}?rel=0" 
                  class="absolute top-0 left-0 w-full h-full"
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                  loading="lazy"
                  title="${video.snippet.title}"
                ></iframe>
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-lg mb-2 line-clamp-2">${
                  video.snippet.title
                }</h3>
                <p class="text-neutral-500 text-sm">${new Date(
                  video.snippet.publishedAt
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
              </div>
            </div>
          `
            )
            .join("");

          if (visibleVideos >= allVideos.length) {
            showMoreBtn.classList.add("hidden");
          }
        }

        showMoreBtn.addEventListener("click", function () {
          visibleVideos += 3;
          displayVideos();
        });

        fetchVideos();
      });