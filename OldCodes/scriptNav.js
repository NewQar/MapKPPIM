document.addEventListener('scroll', function() {
    const headerContent = document.querySelector('.header-content');
    const scrollPosition = window.scrollY;
  
    if (scrollPosition > 50) {
        headerContent.style.transform = `translateY(${scrollPosition / 2}px)`;
        headerContent.style.opacity = `${1 - scrollPosition / 300}`;
    } else {
        headerContent.style.transform = 'translateY(0)';
        headerContent.style.opacity = '1';
    }
  });
  
  
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
  
  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
  
  let slideIndex = 1;
  let variable = 0 ;
  let room = "0";
  let activeButton = null;
  
  function setDestination(value) {
    variable = value;
    showSlides(slideIndex);
    var buttons = document.getElementsByClassName("select-btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("activ");
  }
  buttons[value].classList.add("activ");
  }
  
  function updateRoom(value) {
    room = value;
    var buttons = document.getElementsByClassName("slideshow-btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("activ");
  }
    if(value=="B1")
      buttons[1].classList.add("activ");
    if(value=="1S")
      buttons[2].classList.add("activ");
    showSlides(slideIndex);
  }
  
  
  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    updateSlideImages();
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
    var buttons = document.getElementsByClassName("slideshow-btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("activ");
  }
  buttons[n-1].classList.add("activ");
  }
  
  function updateSlideImages() {
    document.getElementById("slide1-img").src = `asset/level1/${variable}${room}.png`;
    document.getElementById("slide2-img").src = `asset/level2/${variable}${room}.png`;
    document.getElementById("slide3-img").src = `asset/level/${variable}${room}.png`;
  }
  
  showSlides(slideIndex);
  
  function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  // Function to toggle the list display
  function toggleList(listId) {
      const list = document.getElementById(listId);
      if (list.style.display === 'flex') {
          list.style.display = 'none';
      } else {
          list.style.display = 'flex';
      }
  }
  
  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  
  function findCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var mapFrame = document.getElementById('mapFrame');
    mapFrame.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.0429422974044!2d${lon-0.02}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc53cd51982bcf%3A0x85bf2ebccd02ec7e!2sNARC%20UiTM!5e0!3m2!1sen!2smy!4v1718730651423!5m2!1sen!2smy`;
  }
  
  function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
  }