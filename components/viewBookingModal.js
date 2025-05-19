class ViewBookingModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --modal-width: min(500px, 90%);
        }
        
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 9999;
        }

        .modal-backdrop.show {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
        }

        .modal-container {
          width: var(--modal-width);
          max-height: 90vh;
          margin: 2rem auto;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          position: relative;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .modal-backdrop.show .modal-container {
          transform: translateY(0);
        }

        .modal-header {
          padding: 1rem 1.5rem;
          background-color: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
          position: relative;
        }

        .modal-title {
          font-size: 1.25rem;
          color: #111827;
          padding-right: 2.5rem;
          margin: 0;
        }

        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          border: none;
          background: white;
          color: #6b7280;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .close-button:hover {
          background-color: #f3f4f6;
          color: #111827;
        }

        .modal-content {
          padding: 1.5rem;
          overflow-y: auto;
          max-height: calc(90vh - 4rem);
        }

        .detail-group {
          background-color: #f9fafb;
          padding: 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          margin-bottom: 1rem;
        }

        .detail-group:last-child {
          margin-bottom: 0;
        }

        .detail-label {
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .detail-value {
          color: #111827;
          font-size: 0.9375rem;
        }

        .contact-info {
          display: grid;
          gap: 0.5rem;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: white;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          color: inherit;
          text-decoration: none;
          transition: all 0.2s;
        }

        .contact-link.email:hover {
          border-color: #2563eb;
          color: #2563eb;
        }

        .contact-link.phone:hover {
          border-color: #059669;
          color: #059669;
        }

        .contact-link i {
          font-size: 1rem;
        }

        .notes-content {
          background: white;
          padding: 0.75rem;
          margin-bottom: 2rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          font-size: 0.875rem;
          line-height: 1.5;
          white-space: pre-wrap;
        }

        @media (max-width: 640px) {
          .modal-container {
            width: 100%;
            max-height: 85vh;
            margin: 0;
            border-radius: 1rem 1rem 0 0;
            position: fixed;
            bottom: 0;
            left: 0;
          }

          .modal-backdrop.show {
            align-items: flex-end;
          }
        }
      </style>

      <div class="modal-backdrop" id="viewBookingModal">
        <div class="modal-container">
          <div class="modal-header">
            <h2 class="modal-title ethic-regular">Booking Details</h2>
            <button class="close-button" id="closeModal">×</button>
          </div>
          
          <div class="modal-content">
            <div class="detail-group">
              <div class="detail-label ivyora-regular">Client Name</div>
              <div class="detail-value ethic-regular" id="viewName"></div>
            </div>

            <div class="detail-group">
              <div class="detail-label ivyora-regular">Date</div>
              <div class="detail-value ethic-regular" id="viewDate"></div>
            </div>

            <div class="detail-group">
              <div class="detail-label ivyora-regular">Service</div>
              <div class="detail-value ethic-regular" id="viewService"></div>
            </div>

            <div class="detail-group">
              <div class="detail-label ivyora-regular">Location</div>
              <div class="detail-value ethic-regular" id="viewLocation"></div>
            </div>

            <div class="detail-group">
              <div class="detail-label ivyora-regular">Contact Information</div>
              <div class="contact-info">
                <a id="viewEmail" href="" class="contact-link email ethic-regular">
                  <i class="fas fa-envelope"></i>
                  <span></span>
                </a>
                <a id="viewPhone" href="" class="contact-link phone ethic-regular">
                  <i class="fas fa-phone"></i>
                  <span></span>
                </a>
              </div>
            </div>

            <div class="detail-group">
              <div class="detail-label ivyora-regular">Notes</div>
              <div class="notes-content ethic-regular" id="viewNotes"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add event listeners
    const modal = this.shadowRoot.getElementById('viewBookingModal');
    const closeButton = this.shadowRoot.getElementById('closeModal');
    const modalContainer = modal.querySelector('.modal-container');

    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.hideModal();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.hideModal();
      }
    });

    modalContainer.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        this.hideModal();
      }
    });
  }

  showModal(booking) {
    const modal = this.shadowRoot.getElementById('viewBookingModal');
    
    // Update modal content
    this.shadowRoot.getElementById('viewName').textContent = booking.name;
    this.shadowRoot.getElementById('viewDate').textContent = this.formatDate(booking.date);
    this.shadowRoot.getElementById('viewService').textContent = booking.service;
    this.shadowRoot.getElementById('viewLocation').textContent = booking.location;
    
    // Set up email link
    const emailElement = this.shadowRoot.getElementById('viewEmail');
    emailElement.href = `mailto:${booking.email}`;
    emailElement.querySelector('span').textContent = booking.email;
    
    // Set up phone link
    const phoneElement = this.shadowRoot.getElementById('viewPhone');
    phoneElement.href = `tel:${booking.phone}`;
    phoneElement.querySelector('span').textContent = booking.phone;
    
    // Handle notes with proper formatting
    const notesElement = this.shadowRoot.getElementById('viewNotes');
    notesElement.textContent = booking.notes || 'No notes available';

    // Show modal with animation
    modal.style.display = 'flex';
    // Force reflow
    modal.offsetHeight;
    modal.classList.add('show');

    // Add padding to body to prevent content shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
  }

  hideModal() {
    const modal = this.shadowRoot.getElementById('viewBookingModal');
    modal.classList.remove('show');
    
    // Remove body styles
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      if (!modal.classList.contains('show')) {
        modal.style.display = 'none';
      }
    }, 300);
  }

  disconnectedCallback() {
    // Clean up when component is removed
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  formatDate(date) {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

customElements.define('view-booking-modal', ViewBookingModal);