class footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="bg-neutral-200 py-20 shadow-md">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
            <!-- Logo and Brand -->
            <div
                class="mb-8 md:mb-0 w-full flex flex-col items-center md:items-start">
                <img
                    src="../assets/logo/enter-logo.png"
                    alt="Kiandra Photography"
                    class="h-14 md:h-16 mb-2" />
            </div>

            <!-- Contact Section -->
            <div class="text-center md:text-right w-full">
                <h3 class="text-xl font-light text-neutral-800 mb-4">
                    Get in Touch
                </h3>
                <div class="mb-4">
                    <p
                        class="text-neutral-600 mb-1">info@kiandraphotography.com</p>
                    <p class="text-neutral-600">+1 (555) 123-4567</p>
                </div>

                <!-- Social Icons -->
                <div class="flex justify-center md:justify-end space-x-4">
                    <!-- YouTube -->
                    <a
                        href="#"
                        class="text-neutral-500 hover:text-neutral-800 transition duration-300 bg-neutral-50 p-2 rounded-full">
                        <svg class="h-5 w-5" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </a>
                    <!-- Instagram -->
                    <a
                        href="#"
                        class="text-neutral-500 hover:text-neutral-800 transition duration-300 bg-neutral-50 p-2 rounded-full">
                        <svg class="h-5 w-5" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3.75c-1.698 0-1.906.007-2.573.037-.665.03-1.12.135-1.516.29a3.064 3.064 0 0 0-1.772 1.773c-.155.396-.26.85-.29 1.516-.03.666-.037.875-.037 2.573s.007 1.906.037 2.573c.03.665.135 1.12.29 1.516.157.4.366.767.662 1.09.323.296.69.505 1.09.662.396.155.85.26 1.516.29.667.03.875.037 2.573.037s1.906-.007 2.573-.037c.665-.03 1.12-.135 1.516-.29a3.064 3.064 0 0 0 1.772-1.773c.155-.396.26-.85.29-1.516.03-.666.037-.875.037-2.573s-.007-1.906-.037-2.573c-.03-.665-.135-1.12-.29-1.516a3.064 3.064 0 0 0-1.772-1.773c-.396-.155-.85-.26-1.516-.29C13.906 5.757 13.698 5.75 12 5.75zm0 1.125c1.67 0 1.865.006 2.523.036.608.028.938.129 1.157.214.291.113.5.248.717.466.218.218.353.426.466.717.085.22.186.55.214 1.157.03.658.036.854.036 2.523s-.006 1.865-.036 2.523c-.028.608-.129.938-.214 1.157a1.938 1.938 0 0 1-.466.717 1.938 1.938 0 0 1-.717.466c-.22.085-.55.186-1.157.214-.658.03-.854.036-2.523.036s-1.865-.006-2.523-.036c-.608-.028-.938-.129-1.157-.214a1.938 1.938 0 0 1-.717-.466 1.938 1.938 0 0 1-.466-.717c-.085-.22-.186-.55-.214-1.157-.03-.658-.036-.854-.036-2.523s.006-1.865.036-2.523c.028-.608.129-.938.214-1.157.113-.291.248-.5.466-.717.218-.218.426-.353.717-.466.22-.085.55-.186 1.157-.214.658-.03.854-.036 2.523-.036zm0 1.918a3.198 3.198 0 1 0 0 6.396 3.198 3.198 0 0 0 0-6.396zm0 5.271a2.073 2.073 0 1 1 0-4.146 2.073 2.073 0 0 1 0 4.146zm4.073-5.4a.748.748 0 1 1-1.497 0 .748.748 0 0 1 1.497 0z" />
                        </svg>
                    </a>
                    <!-- WhatsApp -->
                    <a
                        href="#"
                        class="text-neutral-500 hover:text-neutral-800 transition duration-300 bg-neutral-50 p-2 rounded-full">
                        <svg class="h-5 w-5" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.223-.298.335-.298.112 0 .224.025.372.124.149.1.994.693 1.07.773.075.08.149.174.074.272-.074.1-.149.223-.298.347-.149.124-.298.248-.41.298-.112.05-.223.1-.112.198.112.1.495.446 1.07.72.576.273.72.372.82.422.1.05.173.025.273-.05.1-.075.446-.41.56-.55.114-.14.228-.124.372-.075.149.05.93.425 1.09.5.16.075.26.112.298.174.04.062.04.36-.198.71M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <!-- Contact Form -->
        <div class="mt-12">
            <h3 class="text-xl font-light text-neutral-800 mb-6 text-center">
                Send us a Message
            </h3>
            <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm text-neutral-600 mb-2"
                        for="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition"
                        placeholder="Your name" />
                </div>
                <div>
                    <label class="block text-sm text-neutral-600 mb-2"
                        for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition"
                        placeholder="Your email" />
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm text-neutral-600 mb-2"
                        for="message">Message</label>
                    <textarea
                        id="message"
                        rows="4"
                        class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition"
                        placeholder="Your message"></textarea>
                </div>
                <div class="md:col-span-2 flex justify-center">
                    <button
                        type="submit"
                        class="px-5 py-2 text-sm bg-neutral-50 border border-neutral-300 text-neutral-800 hover:bg-neutral-800 hover:text-white rounded-full transition duration-300 uppercase tracking-wider text-sm shadow-sm">
                        Send Message
                    </button>
                </div>
            </form>
        </div>

        <!-- Copyright -->
        <div class="mt-12 pt-8 border-t border-neutral-200 text-center">
            <p class="text-sm text-neutral-500">
                &copy; 2025 Kiandra Photography. All rights reserved.
            </p>
        </div>
    </div>
</footer>
      `;
  }
}
customElements.define("my-footer", footer);
