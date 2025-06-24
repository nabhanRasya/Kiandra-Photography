class footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="bg-neutral-200 py-20 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <!-- Logo and Brand -->
            <div class="mb-8 md:mb-0 w-full flex flex-col items-center md:items-start">
              <img
                src="../../assets/logo/enter-logo.png"
                alt="Kiandra Photography"
                class="h-12 md:h-14" />
            </div>

            <!-- Contact Section -->
            <div class="text-center md:text-right w-full">
              <h3 class="text-xl font-light text-neutral-800 mb-4">
                Get in Touch
              </h3>
              <div class="mb-4 text-md font-light opacity-60">
                <p class="text-neutral-600 mb-1">mail@kiandraphotography.com</p>
                <p class="text-neutral-600">+62 8953-7605-5400</p>
              </div>

              <!-- Social Icons -->
              <div class="flex justify-center md:justify-end gap-4">
                <!-- YouTube -->
<a href="https://www.youtube.com/@kiandraproduction" 
   target="_blank" 
   rel="noopener noreferrer"
   class="text-neutral-500 hover:text-neutral-800 transition duration-300 bg-neutral-50 px-3 py-2 rounded-full">
  <i class="fab fa-youtube text-xl"></i>
</a>

<!-- Instagram -->
<a href="https://www.instagram.com/@kiandra_production" 
   target="_blank" 
   rel="noopener noreferrer"
   class="text-neutral-500 hover:text-neutral-800 transition duration-300 bg-neutral-50 px-3 py-2 rounded-full">
  <i class="fab fa-instagram text-xl"></i>
</a>

<!-- WhatsApp -->
<a href="https://wa.me/6285692280704" 
   target="_blank" 
   rel="noopener noreferrer"
   class="text-neutral-500 hover:text-neutral-800 transition duration-300 bg-neutral-50 px-3 py-2 rounded-full">
  <i class="fab fa-whatsapp text-xl"></i>
</a>
              </div>
            </div>
          </div>

          <!-- Copyright -->
          <div class="mt-12 pt-8 border-t border-neutral-200 text-center">
            <p class="text-md opacity-60 text-neutral-500">
              &copy; 2025 Kiandra Photography. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("my-footer", footer);
