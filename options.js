document.addEventListener('DOMContentLoaded', function() {
  var colorSelect = document.getElementById('logoColor');
  var saveButton = document.getElementById('save');
  function updateBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    // Adjust text color for better visibility
    document.body.style.color = isColorLight(color) ? 'black' : 'white';
  }

  function isColorLight(color) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 155;
  }

  // Load saved color
  chrome.storage.sync.get('logoColor', function(data) {
    if (data.logoColor) {
      colorSelect.value = data.logoColor;
      updateBackgroundColor(data.logoColor);
    }
  });
  // Update background color when selection changes
  colorSelect.addEventListener('change', function() {
    updateBackgroundColor(colorSelect.value);
  });

  // Save color when the save button is clicked
  saveButton.addEventListener('click', function() {
    var color = colorSelect.value;
    chrome.storage.sync.set({logoColor: color}, function() {
      console.log('Color saved');
      // Provide visual feedback
      saveButton.textContent = 'Saved!';
      setTimeout(() => {
        saveButton.textContent = 'Save';
      }, 1000);
    });
  });
});
