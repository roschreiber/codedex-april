let selectedElement = null;

document.addEventListener('click', function(event) {
  // Check if the clicked element has a border and the 'selectable' class
  if (window.getComputedStyle(event.target).borderStyle !== 'none' && event.target.classList.contains('selectable')) {
    // If there's a previously selected element, remove its green border
    if (selectedElement) {
      selectedElement.style.border = '';
    }

    // Add a green border to the clicked element
    event.target.style.border = '1px solid green';

    // Update the selected element
    selectedElement = event.target;
  }
});