class previewModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div
      id="imageModal"
      class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999] opacity-0 invisible transition-all duration-300 ease-in-out"
    >
      <div class="relative max-w-3xl max-h-full">
        <img
          id="modalImage"
          src=""
          alt="Preview"
          class="max-w-full max-h-[80vh] rounded-lg shadow-lg transform scale-90 opacity-0 transition-all duration-300 ease-in-out"
        />
        <button
          id="closeModalBtn"
          class="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer hover:text-gray-300"
        >
          &times;
        </button>
      </div>
    </div>
      `;
  }
}
customElements.define("my-previewmodal", previewModal);
