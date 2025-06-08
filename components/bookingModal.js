class bookingModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="bookingModal"
        class="modal-container fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 hidden">
        <!-- Modal Content -->
        <div
          class="modal-content bg-white rounded-lg shadow-xl mx-auto p-6 md:p-8 w-11/12 md:max-w-4xl">
          <!-- Modal Header -->
          <div
            class="flex justify-between items-center border-b border-neutral-200 pb-4">
            <h2 class="text-2xl ivyora-regular text-neutral-700">Book Your
              Photography Session</h2>
            <button id="closeModal"
              class="text-neutral-500 hover:text-neutral-700 transition duration-300 bg-neutral-50 p-2 rounded-full">
              <svg class="w-5 h-5" fill="none" stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Booking Form -->
          <form name="submit-to-google-sheet" id="bookingForm" class="mt-6 space-y-6 neue">
            <!-- Personal Info Section -->
            <div class="space-y-4">
              <h3
                class="text-lg text-neutral-700 border-b border-neutral-200 pb-2">Personal
                Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name"
                    class="block text-sm text-neutral-600 mb-2">Name</label>
                  <input type="text" id="name" name="name"
                    required
                    class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition"
                    placeholder="Your name">
                </div>
                <div>
                  <label for="email"
                    class="block text-sm text-neutral-600 mb-2">Email</label>
                  <input type="email" id="email" name="email"
                    required
                    class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition"
                    placeholder="Your email">
                </div>
                <div>
                  <label for="phone"
                    class="block text-sm text-neutral-600 mb-2">Phone</label>
                  <input type="tel" id="phone" name="phone"
                    required
                    class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition"
                    placeholder="Your phone number">
                </div>
                <div>
                  <label for="date"
                    class="block text-sm text-neutral-600 mb-2">Event
                 z   Date</label>
                  <input type="date" id="date" name="date"
                    required
                    class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition cursor-pointer">
                </div>
              </div>
            </div>

            <!-- Photography Services Section -->
            <div class="space-y-4">
              <h3
                class="text-lg text-neutral-700 border-b border-neutral-200 pb-2">Photography
                Services</h3>

              <div>
                <label
                  class="block text-sm text-neutral-600 mb-2">Service
                  Type</label>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div class="relative">
                    <input type="radio" id="wedding-int"
                      name="service"
                      value="Wedding (International)"
                      class="peer absolute opacity-0 w-0 h-0">
                    <label for="wedding-int"
                      class="block p-3 bg-neutral-50 border border-neutral-300 rounded-lg cursor-pointer transition-colors peer-checked:bg-neutral-100 peer-checked:border-neutral-500 peer-checked:text-neutral-900 hover:bg-neutral-100">
                      <span
                        class="block text-center text-sm">Wedding
                        (International)</span>
                    </label>
                  </div>
                  <div class="relative">
                    <input type="radio" id="wedding-trad"
                      name="service"
                      value="Wedding (Traditional)"
                      class="peer absolute opacity-0 w-0 h-0">
                    <label for="wedding-trad"
                      class="block p-3 bg-neutral-50 border border-neutral-300 rounded-lg cursor-pointer transition-colors peer-checked:bg-neutral-100 peer-checked:border-neutral-500 peer-checked:text-neutral-900 hover:bg-neutral-100">
                      <span
                        class="block text-center text-sm">Wedding
                        (Traditional)</span>
                    </label>
                  </div>
                  <div class="relative">
                    <input type="radio" id="prewedding"
                      name="service" value="Pre-wedding"
                      class="peer absolute opacity-0 w-0 h-0">
                    <label for="prewedding"
                      class="block p-3 bg-neutral-50 border border-neutral-300 rounded-lg cursor-pointer transition-colors peer-checked:bg-neutral-100 peer-checked:border-neutral-500 peer-checked:text-neutral-900 hover:bg-neutral-100">
                      <span
                        class="block text-center text-sm">Pre-wedding</span>
                    </label>
                  </div>
                  <div class="relative">
                    <input type="radio" id="video"
                      name="service" value="Video"
                      class="peer absolute opacity-0 w-0 h-0">
                    <label for="video"
                      class="block p-3 bg-neutral-50 border border-neutral-300 rounded-lg cursor-pointer transition-colors peer-checked:bg-neutral-100 peer-checked:border-neutral-500 peer-checked:text-neutral-900 hover:bg-neutral-100">
                      <span
                        class="block text-center text-sm">Video</span>
                    </label>
                  </div>
                  <div class="relative">
                    <input type="radio" id="engagement"
                      name="service" value="Engagement"
                      class="peer absolute opacity-0 w-0 h-0">
                    <label for="engagement"
                      class="block p-3 bg-neutral-50 border border-neutral-300 rounded-lg cursor-pointer transition-colors peer-checked:bg-neutral-100 peer-checked:border-neutral-500 peer-checked:text-neutral-900 hover:bg-neutral-100">
                      <span
                        class="block text-center text-sm">Engagement</span>
                    </label>
                  </div>
                  <div class="relative">
                    <input type="radio" id="gathering"
                      name="service" value="Gathering"
                      class="peer absolute opacity-0 w-0 h-0">
                    <label for="gathering"
                      class="block p-3 bg-neutral-50 border border-neutral-300 rounded-lg cursor-pointer transition-colors peer-checked:bg-neutral-100 peer-checked:border-neutral-500 peer-checked:text-neutral-900 hover:bg-neutral-100">
                      <span
                        class="block text-center text-sm">Gathering</span>
                    </label>
                  </div>
                  <div class="relative">
                    <input type="radio" id="event"
                      name="service" value="Event"
                      class="peer absolute opacity-0 w-0 h-0">
                    <label for="event"
                      class="block p-3 bg-neutral-50 border border-neutral-300 rounded-lg cursor-pointer transition-colors peer-checked:bg-neutral-100 peer-checked:border-neutral-500 peer-checked:text-neutral-900 hover:bg-neutral-100">
                      <span
                        class="block text-center text-sm">Event</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label for="location"
                  class="block text-sm text-neutral-600 mb-2">Event
                  Location</label>
                <input type="text" id="location" name="location"
                  required
                  class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition"
                  placeholder="Event location">
              </div>

              <div>
                <label for="notes"
                  class="block text-sm text-neutral-600 mb-2">Additional
                  Notes</label>
                <textarea id="notes" name="notes" rows="4"
                  class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition"
                  placeholder="Your message"></textarea>
              </div>
            </div>

            <!-- Submit Button -->
            <div
              class="flex justify-center pt-6 border-t border-neutral-200">
              <button type="submit"
                class="px-6 py-2 text-lg ethic-regular bg-neutral-50 border border-neutral-300 text-neutral-700 rounded-full transition duration-300 shadow-sm">
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
      `;
  }
}
customElements.define("my-bookingmodal", bookingModal);
