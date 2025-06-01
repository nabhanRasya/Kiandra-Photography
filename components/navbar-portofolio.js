class navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav
    class="flex justify-between items-center py-5 px-4 lg:px-[120px] fixed top-0 left-0 w-full z-50 bg-neutral-900/60 backdrop-blur-sm text-white">
    <img class="w-8" src="../assets/logo/main-logo.png" alt="Main Logo" />
    <a href="#" id="openModalBtn"
        class="text-sm lg:text-lg after:content-['_↗']">Book a
        meeting</a>
    <button
        id="menuButton"
        class="transition-transform duration-300">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="hamburgerIcon"
            class="h-9 w-9"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="closeIcon"
            class="h-9 w-9 hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
</nav>
      `;
    }
}
customElements.define("my-navbar", navbar);
