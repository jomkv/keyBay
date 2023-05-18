document.getElementById('popupButton').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block'; // Show the popup
});
  
document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none'; // Hide the popup
});