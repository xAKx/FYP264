
//////////////////////////////////////////////////////////////////////////////////////////
// Only show the prompt if not already shown in this session (dashboard.php)
if (!sessionStorage.getItem('finalProductPromptShown')) {
  var prompt = document.getElementById('finalProductPrompt');
  if (prompt) prompt.style.display = '';
  setTimeout(function() {
    if (prompt) prompt.style.display = 'none';
  }, 5000); // 5 seconds
  sessionStorage.setItem('finalProductPromptShown', '1');
}

////////////////////////////////////////////////////////////////////////////////////
//index.html
// Loading bar logic 
      document.addEventListener("DOMContentLoaded", function () {
        let progress = 0;
        const bar = document.getElementById("loading-bar-progress");
        const container = document.getElementById("loading-bar-container");
        function animateBar() {
          if (progress < 100) {
            progress += Math.random() * 20 + 10;
            if (progress > 100) progress = 100;
            bar.style.width = progress + "%";
            setTimeout(animateBar, 200);
          } else {
            setTimeout(() => {
              container.style.opacity = 0;
              setTimeout(() => (container.style.display = "none"), 500);
            }, 400);
          }
        }
        animateBar();
      });

      function toggleSidebar() {
        const sidebar = document.querySelector(".sidebar");
        const overlay = document.querySelector(".overlay");

        sidebar.classList.add("active");
        overlay.classList.add("active");
      }

      function closeSidebar() {
        const sidebar = document.querySelector(".sidebar");
        const overlay = document.querySelector(".overlay");

        sidebar.classList.remove("active");
        overlay.classList.remove("active");
      }

      function loadPage(pageName) {
        // Close sidebar first
        closeSidebar();

      }

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      // Close sidebar when clicking outside on mobile
      document.addEventListener("click", function (e) {
        const sidebar = document.querySelector(".sidebar");
        const menuToggle = document.querySelector(".menu-toggle");

        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          closeSidebar();
        }
      });
// Hero slideshow
      let slideIndex = 0;
      const slides = document.querySelectorAll(".hero-slide");

      function showSlides() {
        slides.forEach((slide) => {
          slide.classList.remove("active");
        });

        slideIndex++;
        if (slideIndex > slides.length) {
          slideIndex = 1;
        }

        slides[slideIndex - 1].classList.add("active");
        setTimeout(showSlides, 3000); // Change image every 3 seconds
      }

      if (slides.length > 0) {
        showSlides();
      }


      var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 8) || 1000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };
/////////////////////////////////////////////////////////////////////////////////
//login.html
// Function to validate email format
      function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      }
      // Function to show error message
      function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = "block";
      }
      // Function to clear error message
      function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = "";
        errorElement.style.display = "none";
      }
      // Function to handle form submission
      function handleLogin(event) {
        // Clear previous errors
        ["emailError", "passwordError"].forEach(clearError);
        // Get form values
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        // Validate inputs
        let isValid = true;
        if (!validateEmail(email)) {
          showError("emailError", "Please enter a valid email address");
          isValid = false;
        }
        if (password.length < 8) {
          showError(
            "passwordError",
            "Password must be at least 8 characters long"
          );
          isValid = false;
        }
        if (!isValid) {
          event.preventDefault();
          return false;
        }
        // If validation passes, form will submit normally to login.php
        return true;
      }
      document
        .getElementById("loginForm")
        .addEventListener("submit", handleLogin);
      // Display PHP error message if present in sessionStorage (set by login.php on redirect)
      window.onload = function () {
        if (sessionStorage.getItem("phpErrorMessage")) {
          document.getElementById("phpErrorMessage").innerHTML =
            '<div style="background-color: #ff6b6b; color: white; padding: 10px; border-radius: 8px; margin-bottom: 1rem;">' +
            sessionStorage.getItem("phpErrorMessage") +
            "</div>";
          sessionStorage.removeItem("phpErrorMessage");
        }
      };

//////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// Gallery Page
function openModal(src, alt) {
  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = src;
  captionText.innerHTML = alt;
}

function closeModal() {
  const modal = document.getElementById("galleryModal");
  modal.style.display = "none";
}
