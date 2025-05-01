class menuModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div
        id="menuModal"
        class="fixed inset-y-0 left-0 md:w-lg w-[100%] md:w-[40%] z-20 flex justify-center items-center backdrop-blur-md bg-neutral-900/50 transition-all duration-300 transform scale-0 opacity-0 -translate-x-full">
        <ul class="space-y-4 text-4xl text-white">
          <li>
            <a
              href="index.html"
              class="hover:underline underline-offset-4 decoration-1 hover:transition-all hover:duration-300">Home</a>
          </li>
          <li>
            <a
              href="portofolio/portofolio.html"
              class="hover:underline underline-offset-4 decoration-1 hover:transition-all hover:duration-300">Portofolio</a>
          </li>
          <li>
            <a
              href="about.html"
              class="hover:underline underline-offset-4 decoration-1 hover:transition-all hover:duration-300">About
              Kiandra</a>
          </li>
          <li>
            <a
              href="contact.html"
              class="hover:underline underline-offset-4 decoration-1 hover:transition-all hover:duration-300">Contact</a>
          </li>
        </ul>
      </div>

      `;
  }
}
customElements.define("my-menumodal", menuModal);
