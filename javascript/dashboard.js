// Constants for Google Sheets API
const SPREADSHEET_ID = '10Yk0vUSo6jN0Y7JjXvZI4nWhhdcOSEydFiqI01101HY';
const API_KEY = 'AIzaSyBm85FeLenfn7dCvmLecFO3SMDkyFX0DMo';
const SHEET_NAME = 'Sheet1';

// DOM Elements
let bookingsTableBody;
let searchInput;
let statusFilter;
let paginationContainer;
let totalBookingsElement;
let pendingBookingsElement;
let completedBookingsElement;

// State
let bookings = [];
let filteredBookings = [];
let currentPage = 1;
const itemsPerPage = 10;

// Initialize dashboard
async function initializeDashboard() {
  console.log('Initializing dashboard...');
  try {
    // Initialize DOM elements after document is loaded
    bookingsTableBody = document.getElementById('bookingsTableBody');
    searchInput = document.getElementById('searchInput');
    statusFilter = document.getElementById('statusFilter');
    paginationContainer = document.getElementById('pagination');
    totalBookingsElement = document.getElementById('totalBookings');
    pendingBookingsElement = document.getElementById('pendingBookings');
    completedBookingsElement = document.getElementById('completedBookings');

    // Verify DOM elements are found
    if (!bookingsTableBody) {
      throw new Error('Could not find bookingsTableBody element');
    }

    console.log('DOM elements initialized successfully');
    await loadBookings();
    setupEventListeners();
    updateStatistics();
  } catch (error) {
    console.error('Error during dashboard initialization:', error);
    if (bookingsTableBody) {
      bookingsTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-8 py-5 text-center text-red-600">
            Error initializing dashboard: ${error.message}
          </td>
        </tr>
      `;
    }
  }
}

// Load bookings from Google Sheets
async function loadBookings() {
  console.log('Loading bookings from Google Sheets...');
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
    console.log('Fetching from URL:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Received data:', data);
    
    if (data.values && data.values.length > 1) {
      // Skip header row and map data
      bookings = data.values.slice(1).map((row, index) => ({
        id: index + 1,
        date: row[0],
        name: row[1],
        email: row[2],
        phone: row[3],
        service: row[4],
        location: row[5],
        notes: row[6] || ''
      }));
      
      console.log('Processed bookings:', bookings);
      filteredBookings = [...bookings];
      displayBookings();
    } else {
      console.log('No booking data found in response');
      throw new Error('No booking data found');
    }
  } catch (error) {
    console.error('Error loading bookings:', error);
    if (bookingsTableBody) {
      bookingsTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-8 py-5 text-center text-red-600">
            Error loading bookings: ${error.message}. Please try again later.
          </td>
        </tr>
      `;
    }
  }
}

// Display bookings in table
function displayBookings() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  bookingsTableBody.innerHTML = currentBookings.map(booking => `
    <tr class="hover:bg-neutral-50 transition-colors duration-200 ivyora-regular">
      <td class="px-8 py-5">
        <div class="ethic-regular">${booking.name}</div>
        <div class="text-sm text-neutral-500">${booking.email}</div>
      </td>
      <td class="px-8 py-5 ethic-regular">${formatDate(booking.date)}</td>
      <td class="px-8 py-5 ethic-regular">${booking.service}</td>
      <td class="px-8 py-5 ethic-regular">${booking.location}</td>
      <td class="px-8 py-5">
        <button 
          data-action="view"
          data-booking-id="${booking.id}"
          class="p-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200 cursor-pointer"
          title="View Details"
        >
          <i class="fas fa-eye text-lg pointer-events-none"></i>
        </button>
      </td>
    </tr>
  `).join('');

  updatePagination();
}

// Update pagination
function updatePagination() {
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  
  let paginationHTML = '';
  
  // Previous button
  paginationHTML += `
    <button 
      data-page="${currentPage - 1}"
      class="px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-white text-neutral-700 hover:bg-neutral-50'}"
      ${currentPage === 1 ? 'disabled' : ''}
    >
      Previous
    </button>
  `;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button 
        data-page="${i}"
        class="px-4 py-2 rounded-lg ${currentPage === i ? 'bg-black text-white' : 'bg-white text-neutral-700 hover:bg-neutral-50'}"
      >
        ${i}
      </button>
    `;
  }

  // Next button
  paginationHTML += `
    <button 
      data-page="${currentPage + 1}"
      class="px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-white text-neutral-700 hover:bg-neutral-50'}"
      ${currentPage === totalPages ? 'disabled' : ''}
    >
      Next
    </button>
  `;

  paginationContainer.innerHTML = paginationHTML;

  // Add event listeners to pagination buttons
  paginationContainer.querySelectorAll('button[data-page]').forEach(button => {
    button.addEventListener('click', () => {
      const page = parseInt(button.getAttribute('data-page'));
      changePage(page);
    });
  });
}

// Update statistics
function updateStatistics() {
  const total = bookings.length;
  const pending = bookings.length; // Since there's no status, showing all as pending
  const completed = 0; // No status tracking in current spreadsheet

  totalBookingsElement.textContent = total;
  pendingBookingsElement.textContent = pending;
  completedBookingsElement.textContent = completed;
}

// Setup event listeners
function setupEventListeners() {
  searchInput.addEventListener('input', handleSearch);
  statusFilter.addEventListener('change', handleFilter);
  
  // Booking action listeners using event delegation
  bookingsTableBody.addEventListener('click', (e) => {
    const actionButton = e.target.closest('button[data-action]');
    if (actionButton) {
      const action = actionButton.getAttribute('data-action');
      const bookingId = parseInt(actionButton.getAttribute('data-booking-id'));
      
      if (action === 'view') {
        viewBooking(bookingId);
      }
    }
  });
  
  // Listen for booking updates
  document.addEventListener('booking-updated', handleBookingUpdate);
}

// Handle search
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  filteredBookings = bookings.filter(booking => 
    booking.name.toLowerCase().includes(searchTerm) ||
    booking.email.toLowerCase().includes(searchTerm) ||
    booking.service.toLowerCase().includes(searchTerm) ||
    booking.location.toLowerCase().includes(searchTerm)
  );
  currentPage = 1;
  displayBookings();
}

// Handle filter
function handleFilter(e) {
  // Since there's no status in the current spreadsheet, we'll just reset to show all
  filteredBookings = [...bookings];
  currentPage = 1;
  displayBookings();
}

// Handle booking update
async function handleBookingUpdate(e) {
  console.log('Handling booking update:', e.detail);
  const updatedBooking = e.detail;
  
  try {
    // Update in Google Sheets
    const rowIndex = updatedBooking.id;
    const range = `${SHEET_NAME}!A${rowIndex + 1}:G${rowIndex + 1}`;
    const values = [
      [
        updatedBooking.date,
        updatedBooking.name,
        updatedBooking.email,
        updatedBooking.phone,
        updatedBooking.service,
        updatedBooking.location,
        updatedBooking.notes
      ]
    ];

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=USER_ENTERED&key=${API_KEY}`;
    console.log('Updating Google Sheet:', url);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Update local state
    const index = bookings.findIndex(b => b.id === updatedBooking.id);
    if (index !== -1) {
      bookings[index] = updatedBooking;
      filteredBookings = [...bookings];
      displayBookings();
      updateStatistics();
      console.log('Booking updated successfully');
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    alert('Error updating booking. Please try again.');
  }
}

// View booking
function viewBooking(id) {
  console.log('Opening view modal for booking:', id);
  const booking = bookings.find(b => b.id === id);
  if (booking) {
    const viewModal = document.querySelector('view-booking-modal');
    if (viewModal) {
      viewModal.showModal(booking);
    } else {
      console.error('View modal component not found');
    }
  } else {
    console.error('Booking not found:', id);
  }
}

// Change page
function changePage(page) {
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    displayBookings();
  }
}

// Format date
function formatDate(dateString) {
  if (!dateString) return '-';
  
  try {
    // First, check if the date is in DD/MM/YYYY format
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      const date = new Date(year, month - 1, day);
      if (isValidDate(date)) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }
    
    // Try parsing as ISO date (YYYY-MM-DD)
    if (dateString.includes('-')) {
      const date = new Date(dateString);
      if (isValidDate(date)) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }
    
    // If it's a timestamp or other format
    const date = new Date(dateString);
    if (isValidDate(date)) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    // If all parsing attempts fail, return the original string
    return dateString;
  } catch (error) {
    console.warn('Date parsing error:', error);
    return dateString;
  }
}

// Helper function to check if a date is valid
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

// Format date for input fields (YYYY-MM-DD)
function formatDateForInput(dateString) {
  if (!dateString) return '';
  
  try {
    let date;
    
    // Handle DD/MM/YYYY format
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      date = new Date(year, month - 1, day);
    } else {
      date = new Date(dateString);
    }
    
    if (isValidDate(date)) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    
    return '';
  } catch (error) {
    console.warn('Date formatting error:', error);
    return '';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDashboard);

// Export functions for use in other modules
export {
  viewBooking,
  changePage
}; 