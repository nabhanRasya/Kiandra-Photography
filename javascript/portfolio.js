document.addEventListener('DOMContentLoaded', function() {
  // Get all photo items
  const photoItems = document.querySelectorAll('.photo-item');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const photoGrid = document.getElementById('photo-grid');
  const noResults = document.getElementById('no-results');
  
  // Add click event to each photo item
  photoItems.forEach(item => {
    item.addEventListener('click', function() {
      window.location.href = 'clientDummy.html';
    });
  });

  // Add click event to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const category = this.getAttribute('data-category');
      let visibleItems = 0;

      // Show/hide items based on category
      photoItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
          visibleItems++;
        } else {
          item.style.display = 'none';
        }
      });

      // Show/hide no results message
      if (visibleItems === 0) {
        noResults.classList.remove('hidden');
        photoGrid.classList.add('hidden');
      } else {
        noResults.classList.add('hidden');
        photoGrid.classList.remove('hidden');
      }

      // Reorganize grid layout
      reorganizeGrid();
    });
  });

  // Function to reorganize grid layout
  function reorganizeGrid() {
    const visibleItems = Array.from(photoItems).filter(item => 
      item.style.display !== 'none'
    );

    // Clear the grid
    photoGrid.innerHTML = '';

    // Re-append visible items in order
    visibleItems.forEach(item => {
      photoGrid.appendChild(item);
    });
  }
}); 