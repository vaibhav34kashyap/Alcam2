function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const headerRight = document.querySelector('.header-right');
  navMenu.classList.toggle('active');
  headerRight.classList.toggle('active');
}
const track = document.querySelector(".carousel-track");

const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
const slideWidth = 610; // Use same width as image

function updateCarousel(index) {
  track.style.transform = `translateX(-${index * slideWidth}px)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % dots.length;
  updateCarousel(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + dots.length) % dots.length;
  updateCarousel(currentIndex);
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel(currentIndex);
  });
});


function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("active");
}

function toggleSearch() {
  const container = document.getElementById("searchContainer");
  container.classList.toggle("active");

  const input = container.querySelector(".search-input");
  if (container.classList.contains("active")) {
    input.focus();
  }

  input.addEventListener("blur", () => {
    container.classList.remove("false");
  });
}



// Counter animation function
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);

    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// Intersection Observer for triggering animations when in view
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target.querySelector('.counter');
      const target = parseInt(counter.getAttribute('data-target'));

      // Small delay to ensure the element is visible
      setTimeout(() => {
        animateCounter(counter, target, 1500);
      }, 200);

      // Unobserve after animation starts
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all stat items
document.querySelectorAll('.stat-item').forEach(item => {
  observer.observe(item);
});

// Fallback: trigger animations on page load if intersection observer doesn't work
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.counter').forEach(counter => {
      if (counter.textContent === '0') {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target, 1500);
      }
    });
  }, 1000);
});

const questions = document.querySelectorAll(".faq-question");

questions.forEach(q => {
  q.addEventListener("click", () => {
    const currentItem = q.parentElement;

    // Close all other items
    document.querySelectorAll(".faq-item").forEach(item => {
      if (item !== currentItem) {
        item.classList.remove("open");
      }
    });

    // Toggle current item
    currentItem.classList.toggle("open");
  });
});

const testimonialTrackArea = document.getElementById('testimonialTrackArea');
const prevTestimonialBtn = document.getElementById('testimonialPrevBtn');
const nextTestimonialBtn = document.getElementById('testimonialNextBtn');
const testimonialDotsContainer = document.getElementById('testimonialDots');

let testimonialSlideIndex = 0;
let autoplayInterval;

function getVisibleCardsCount() {
  return window.innerWidth <= 768 ? 1 : 3;
}

function getTotalGroups() {
  const totalCards = document.querySelectorAll('.testimonial-card').length;
  const visible = getVisibleCardsCount();
  return Math.ceil(totalCards / visible);
}

function updateTestimonialSlider() {
  const card = testimonialTrackArea.querySelector('.testimonial-card');
  if (!card) return;

  const cardWidth = card.offsetWidth;
  testimonialTrackArea.style.transform = `translateX(-${testimonialSlideIndex * cardWidth}px)`;

  updateActiveDot();
}

function createDots() {
  testimonialDotsContainer.innerHTML = '';
  const totalGroups = getTotalGroups();

  for (let i = 0; i < totalGroups; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.dataset.index = i;

    dot.addEventListener('click', () => {
      testimonialSlideIndex = i;
      updateTestimonialSlider();
      resetAutoplay();
    });

    testimonialDotsContainer.appendChild(dot);
  }

  updateActiveDot();
}

function updateActiveDot() {
  const dots = testimonialDotsContainer.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[testimonialSlideIndex]) {
    dots[testimonialSlideIndex].classList.add('active');
  }
}

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    const totalGroups = getTotalGroups();
    testimonialSlideIndex = (testimonialSlideIndex + 1) % totalGroups;
    updateTestimonialSlider();
  }, 3000); // Change every 3 seconds
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

nextTestimonialBtn.addEventListener('click', () => {
  const totalGroups = getTotalGroups();
  if (testimonialSlideIndex < totalGroups - 1) {
    testimonialSlideIndex++;
    updateTestimonialSlider();
    resetAutoplay();
  }
});

prevTestimonialBtn.addEventListener('click', () => {
  if (testimonialSlideIndex > 0) {
    testimonialSlideIndex--;
    updateTestimonialSlider();
    resetAutoplay();
  }
});

window.addEventListener('resize', () => {
  createDots();
  updateTestimonialSlider();
});

window.addEventListener('load', () => {
  createDots();
  updateTestimonialSlider();
  startAutoplay();
});
