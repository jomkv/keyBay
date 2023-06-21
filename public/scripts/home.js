document.getElementById('popupButton').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block'; // Show the popup
});
  
document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none'; // Hide the popup
});


// for notif
document.getElementsByClassName("popup")[0].classList.add("active")


document.getElementById("dismiss-popup-btn").addEventListener("click", function() {
    document.getElementsByClassName("popup")[0].classList.remove("active")
})

function handleFileUpload(input) {
    const fileUploadStatus = document.getElementById('file-upload-status');
    const fileUploadLabel = input.nextElementSibling;
  
    if (input.files.length > 0) {
      fileUploadStatus.textContent = input.files[0].name;
    } else {
      fileUploadStatus.textContent = 'No file selected';
    }
  }
