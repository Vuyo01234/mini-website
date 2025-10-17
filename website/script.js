// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  // Navigation
  setupNavigation();

  // Monogram Logo Interactions
  setupMonogramInteractions();

  // Career Slideshow
  setupCareerSlideshow();

  // Contact Form
  setupContactForm();

  // Animations
  animateElements();
});

// Navigation System
function setupNavigation() {
  const navButtons = document.querySelectorAll(".nav-button");

  // Set initial active page
  const currentPage = window.location.hash.substring(1) || "home";
  changePage(currentPage);

  // Update navigation on hash change
  window.addEventListener("hashchange", function () {
    const page = window.location.hash.substring(1) || "home";
    changePage(page);
  });
}

function changePage(pageId) {
  // Update URL hash without triggering hashchange event
  const currentHash = window.location.hash.substring(1);
  if (currentHash !== pageId) {
    history.pushState(null, null, pageId === "home" ? "#" : `#${pageId}`);
  }

  // Update active page
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    if (page.id === pageId) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  });

  // Update navigation buttons
  const navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach((button) => {
    if (button.getAttribute("data-page") === pageId) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  // Scroll to top
  window.scrollTo(0, 0);

  // Re-trigger animations for the new page
  animateElements();
}

// Monogram Logo Interactions
function setupMonogramInteractions() {
  const monogramLogos = document.querySelectorAll(".monogram-logo");

  monogramLogos.forEach((logo) => {
    if (logo.classList.contains("interactive")) {
      logo.addEventListener("mouseenter", function () {
        this.classList.add("hovered");
      });

      logo.addEventListener("mouseleave", function () {
        this.classList.remove("hovered");
      });

      logo.addEventListener("click", function () {
        this.classList.add("clicked");
        setTimeout(() => {
          this.classList.remove("clicked");
        }, 300);
      });
    }
  });
}

// Career Slideshow
function setupCareerSlideshow() {
  // Career aspects data
  const careerAspects = [
    {
      title: "Graphic Design",
      description:
        "Creating visual concepts to communicate ideas that inspire, inform, and captivate consumers. Developing the overall layout and production design for applications such as advertisements, brochures, magazines, and reports using design software and creative skills to produce compelling visual solutions.",
      imageUrl:
        "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1ODc1Mzg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Software Development",
      description:
        "Building and maintaining software applications, websites, and digital platforms. Writing clean, efficient code using various programming languages and frameworks to create user-friendly interfaces and robust backend systems that solve real-world problems and enhance user experiences.",
      imageUrl:
        "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kaW5nfGVufDF8fHx8MTc1ODc4ODU2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Photography/Photo editing",
      description:
        "Capturing moments, emotions, and stories through the lens. Specializing in commercial photography, portrait sessions, and creative visual storytelling that combines technical expertise with artistic vision to produce compelling images for various clients and creative projects.",
      imageUrl:
        "https://images.unsplash.com/photo-1745848038150-9cff98332e8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoeSUyMGNhbWVyYXxlbnwxfHx8fDE3NTg4NDYzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Brand Manager",
      description:
        "Developing and executing comprehensive brand strategies that enhance market presence and drive business growth. Overseeing brand identity, messaging, and positioning while coordinating cross-functional teams to ensure consistent brand experience across all touchpoints and marketing channels.",
      imageUrl:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
  ];

  const slideshowContainer = document.getElementById("career-slideshow");
  if (!slideshowContainer) return;

  // Create slides
  let currentSlide = 0;

  // Generate slides HTML
  careerAspects.forEach((aspect, index) => {
    const slide = document.createElement("div");
    slide.className = `slide ${index === 0 ? "active" : ""}`;
    slide.dataset.index = index;

    slide.innerHTML = `
            <div class="bg-gradient-to-r from-blue-800 to-orange-500 text-white p-6">
                <h2 class="text-center text-white">${aspect.title}</h2>
            </div>
            
            <div class="p-8">
                <div class="flex flex-col lg:flex-row gap-8 items-center">
                    <!-- Image -->
                    <div class="lg:w-1/2">
                        <div class="aspect-video rounded-lg overflow-hidden shadow-lg">
                            <img src="${aspect.imageUrl}" alt="${
      aspect.title
    }" class="w-full h-full object-cover">
                        </div>
                    </div>
                    
                    <!-- Text -->
                    <div class="lg:w-1/2">
                        <p class="text-gray-700 leading-relaxed">
                            ${aspect.description}
                        </p>
                        
                        <div class="mt-6 flex items-center justify-between">
                            <div class="flex gap-2">
                                ${careerAspects
                                  .map(
                                    (_, i) => `
                                    <button
                                        onclick="changeSlide(${i})"
                                        class="w-3 h-3 rounded-full transition-all duration-300 ${
                                          i === index
                                            ? "bg-blue-800 scale-125"
                                            : "bg-gray-300 hover-bg-gray-400"
                                        }"
                                    ></button>
                                `
                                  )
                                  .join("")}
                            </div>
                            
                            <div class="text-sm text-gray-500">
                                ${index + 1} / ${careerAspects.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    slideshowContainer.appendChild(slide);
  });

  // Setup navigation buttons
  const prevButton = document.getElementById("prev-slide");
  const nextButton = document.getElementById("next-slide");

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      changeSlide(
        (currentSlide - 1 + careerAspects.length) % careerAspects.length
      );
    });

    nextButton.addEventListener("click", () => {
      changeSlide((currentSlide + 1) % careerAspects.length);
    });
  }

  // Make changeSlide function globally available
  window.changeSlide = function (index) {
    const slides = document.querySelectorAll(".slide");

    // Hide current slide
    slides[currentSlide].classList.remove("active");

    // Show new slide
    currentSlide = index;
    slides[currentSlide].classList.add("active");
  };
}

// Contact Form
function setupContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // In a real application, you would send this data to a server
    alert("Thank you for your message! I'll get back to you soon.");

    // Reset form
    contactForm.reset();
  });
}

// Animation System
function animateElements() {
  // This function will be called when a new page is loaded
  // It can be expanded to add more complex animations
  // For now, we'll rely on the CSS animations that are triggered
  // when elements enter the viewport
  // You could add more complex animations here using JavaScript
  // For example, staggered animations, scroll-triggered animations, etc.
}

// Helper Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
