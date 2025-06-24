class menuModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div
        id="menuModal"
        class="fixed inset-y-0 left-0 md:w-lg w-[100%] md:w-[40%] z-20 flex justify-center items-center backdrop-blur-md bg-neutral-900/50 transition-all duration-300 transform scale-0 opacity-0 -translate-x-full">
        <ul class="space-y-2.5 text-4xl text-white">
          <li>
            <a
              href="/index.html"
              class="hover:underline underline-offset-4 decoration-1 hover:transition-all hover:duration-300">Home</a>
          </li>
          <li>
            <a
              href="/portofolio/portofolio.html"
              class="hover:underline underline-offset-4 decoration-1 hover:transition-all hover:duration-300">Portofolio</a>
          </li>
          <li>
            <a
              href="/aboutKiandra.html"
              class="hover:underline underline-offset-4 decoration-1 hover:transition-all hover:duration-300">About
              Kiandra</a>
          </li>
          <li>
            <a
              href="/contact.html"
              class="hover:underline underline-offset-4 decoration-1 hover:transition-all hover:duration-300">Contact</a>
          </li>
          <li>
            <a href="https://wa.me/62895376055400?text=Halo%2C%20saya%20ingin%20tanya%20pricelist." target="_blank" class="hover:underline underline-offset-4 decoration-1 hover:transition-all hover:duration-300">
  Ask Pricelist
</a>

          </li>
        </ul>
      </div>

      `;
  }
}
customElements.define("my-menumodal", menuModal);
