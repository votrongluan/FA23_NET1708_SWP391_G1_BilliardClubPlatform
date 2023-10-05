// Get all move-left-btn and move-right-btn
const moveLeftBtns = document.querySelectorAll(".move-left-btn");
const moveRightBtns = document.querySelectorAll(".move-right-btn");

moveLeftBtns.forEach((moveLeftBtn) => {
  moveLeftBtn.addEventListener("click", () => {
    const clubList = moveLeftBtn.parentElement;
    let firstElement = clubList.firstElementChild;
    while (firstElement.tagName !== "LI") {
      firstElement = firstElement.nextElementSibling;
    }
    clubList.removeChild(firstElement);
    clubList.appendChild(firstElement);
  });
});

moveRightBtns.forEach((moveRightBtn) => {
  moveRightBtn.addEventListener("click", () => {
    const clubList = moveRightBtn.parentElement;
    let lastElement = clubList.lastElementChild;
    while (lastElement.tagName !== "LI") {
      lastElement = lastElement.previousElementSibling;
    }
    clubList.removeChild(lastElement);
    clubList.insertBefore(lastElement, clubList.firstElementChild);
  });
});

// Get the modal and login button and close
const modal = document.querySelector(".modal");
const loginBtn = document.querySelector(".login-btn");
const closeBtn = document.querySelector(".form__close");

// When the user clicks on the button, open the modal
loginBtn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Get user location
function getUserLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Use a reverse geocoding service to get location information
      const reverseGeocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

      fetch(reverseGeocodingUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.address && data.address.city_district) {
            const province = data.address.city_district;
            const nearbyLocation = document.querySelector(".nearby-location");
            nearbyLocation.textContent = province;
          } else {
            return null;
          }
        })
        .catch((error) => {
          return null;
        });
    });
  } else {
    return null;
  }
}

getUserLocation();

const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;
});
