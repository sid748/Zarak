

// navbar scroll effect
// === Blur effect on scroll ===
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

// === Mobile menu toggle ===
const toggler = document.querySelector('.navbar-toggler');
const mobileMenu = document.querySelector('.mobile-menu-overlay');
const closeMenu = document.querySelector('.close-menu');

// Open menu
toggler.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  toggler.classList.add('hide');
});

// Close menu
closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  toggler.classList.remove('hide');
});

// Optional: close menu when clicking a link
document.querySelectorAll('.mobile-menu-list a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    toggler.classList.remove('hide');
  });
});


// why choose us section animation
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".customer-approach");
  const lineWrapper = section.querySelector(".vertical-line-wrapper");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lineWrapper.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(section);
});
// our project section starts here
/* Simple slider with two-visible layout + partial peek of next slide.
  Tabs filter slides by data-cat values (all/shopping/parking).
*/

document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.slider-track');
  const slides = Array.from(document.querySelectorAll('.card-slide'));
  const leftBtn = document.querySelector('.left-arrow');
  const rightBtn = document.querySelector('.right-arrow');
  const tabs = Array.from(document.querySelectorAll('.tab-btn'));
  let index = 0;

  // Compute spacing & widths to move slider precisely.
  function computeTranslate(i) {
    // We'll calculate the pixel translate so that index 0 = start (leftmost),
    // index increments move by (slideWidth + gap). We want a peek of next slide.
    const gap = parseInt(getComputedStyle(track).gap) || 28;
    const slideRect = slides[0].getBoundingClientRect();
    const slideWidth = slideRect.width;
    // Move by (slideWidth + gap) * i
    return -(i * (slideWidth + gap));
  }

  function clampIndex(i) {
    // max index so last visible slide still leaves partial next like PNG.
    const visible = getVisibleCount();
    const maxIndex = Math.max(0, slides.length - visible); // allow peek
    return Math.min(Math.max(0, i), maxIndex);
  }

  function getVisibleCount() {
    // approximate number of fully visible slides based on viewport and slide width
    const viewport = document.querySelector('.slider-viewport').clientWidth;
    const slideRect = slides[0].getBoundingClientRect();
    const slideWidth = slideRect.width;
    return Math.floor(viewport / (slideWidth + parseInt(getComputedStyle(track).gap || 28)));
  }

  function goTo(i) {
    index = clampIndex(i);
    track.style.transform = `translateX(${computeTranslate(index)}px)`;
    // Disable right button if at max index
    if (index >= Math.max(0, slides.length - getVisibleCount())) {
      rightBtn.style.opacity = 0.5;
      rightBtn.style.pointerEvents = 'none';
    } else {
      rightBtn.style.opacity = 1;
      rightBtn.style.pointerEvents = 'auto';
    }
    // Disable left button if at 0
    if (index <= 0) {
      leftBtn.style.opacity = 0.5;
      leftBtn.style.pointerEvents = 'none';
    } else {
      leftBtn.style.opacity = 1;
      leftBtn.style.pointerEvents = 'auto';
    }
  }

  // Wait images to load before computing sizes (basic)
  window.addEventListener('load', () => { goTo(0); });

  // Buttons
  rightBtn.addEventListener('click', () => {
    goTo(index + 1);
  });
  leftBtn.addEventListener('click', () => {
    goTo(index - 1);
  });

  // Tabs: filter slides by data-cat
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      // show/hide slides
      slides.forEach(s => {
        if (cat === 'all') s.style.display = 'block';
        else s.style.display = s.dataset.cat === cat ? 'block' : 'none';
      });
      // rebuild slides array to only visible ones for translation
      // but simple approach: reset transform and go to 0
      // small timeout to let layout recalc
      setTimeout(() => { goTo(0); }, 60);
    });
  });

  // Recompute on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { goTo(index); }, 120);
  });

});

// Homepage "Who We Are" section counter animation
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // lower = faster

  const animateCounters = () => {
    counters.forEach(counter => {
      const update = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(update, 20);
        } else {
          counter.innerText = target;
        }
      };
      update();
    });
  };

  // Trigger only when the section enters viewport (even a little)
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect(); // stop after first run
        }
      });
    },
    {
      root: null,          // viewport
      threshold: 0.1,      // run when 10% of section is visible
      rootMargin: "0px 0px -50px 0px" // triggers slightly earlier
    }
  );

  const section = document.querySelector(".who-we-are");
  if (section) observer.observe(section);
});

// filter script
document.addEventListener("DOMContentLoaded", () => {
  const filterBtn = document.getElementById("filter-btn");
  const typeSelect = document.getElementById("filter-type");
  const locationSelect = document.getElementById("filter-location");
  const styleSelect = document.getElementById("filter-style");
  const categorySelect = document.getElementById("filter-category");
  const cards = document.querySelectorAll(".property-card");

  // --- FILTER FUNCTIONALITY ---
  filterBtn.addEventListener("click", () => {
    const type = typeSelect.value.trim();
    const location = locationSelect.value.trim();
    const style = styleSelect.value.trim();
    const category = categorySelect.value.trim();

    cards.forEach(card => {
      const matchType = !type || card.dataset.type === type;
      const matchLocation = !location || card.dataset.location === location;
      const matchStyle = !style || card.dataset.style === style;
      const matchCategory = !category || card.dataset.category === category;

      if (matchType && matchLocation && matchStyle && matchCategory) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });

  // --- CAROUSEL FUNCTIONALITY of filter section ---
  document.querySelectorAll(".property-card .carousel").forEach(carousel => {
    const carouselInner = carousel.querySelector(".carousel-inner");
    const items = carousel.querySelectorAll(".carousel-item");
    const prevBtn = carousel.querySelector(".carousel-control-prev");
    const nextBtn = carousel.querySelector(".carousel-control-next");
    const indicatorsContainer = carousel.querySelector(".carousel-indicators");
    indicatorsContainer.classList.remove("carousel-indicators");
    indicatorsContainer.classList.add("carousel-indicators");
    indicatorsContainer.innerHTML = ""; // Clear existing indicators

    // Create navigation dots dynamically
    items.forEach((_, index) => {
      const indicator = document.createElement("button");
      indicator.type = "button";
      indicator.classList.add("indicator-dot");
      if (index === 0) indicator.classList.add("active");
      indicator.addEventListener("click", () => {
        carousel.querySelector(".carousel-item.active").classList.remove("active");
        carousel.querySelector(".indicator-dot.active").classList.remove("active");
        items[index].classList.add("active");
        indicator.classList.add("active");
      });
      indicatorsContainer.appendChild(indicator);
    });

    // Handle next / prev buttons
    let currentIndex = 0;
    nextBtn.addEventListener("click", () => {
      items[currentIndex].classList.remove("active");
      indicatorsContainer.children[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % items.length;
      items[currentIndex].classList.add("active");
      indicatorsContainer.children[currentIndex].classList.add("active");
    });

    prevBtn.addEventListener("click", () => {
      items[currentIndex].classList.remove("active");
      indicatorsContainer.children[currentIndex].classList.remove("active");
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      items[currentIndex].classList.add("active");
      indicatorsContainer.children[currentIndex].classList.add("active");
    });
  });
});


// counter script
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const counters = document.querySelectorAll(".counter-number");

  counters.forEach((counter, i) => {
    const target = +counter.getAttribute("data-target");
    const box = counter.closest(".counter-box");

    gsap.fromTo(
      box,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: box,
          start: "top 90%",
        },
        onStart: () => animateCounter(counter, target),
      }
    );
  });

  function animateCounter(element, target) {
    let start = 0;
    const duration = 2; // seconds
    const stepTime = 20;
    const totalSteps = (duration * 1000) / stepTime;
    const increment = target / totalSteps;
    const initialLength = element.textContent.length; // Get initial text length for padding

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(start)
        .toString()
        .padStart(initialLength, "0");
    }, stepTime);
  }
});

// testimonial carousel script
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".testimonial-item");
  const buttons = document.querySelectorAll(".testimonial-indicators button");
  let current = 0;

  function showSlide(index) {
    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
      buttons[i].classList.toggle("active", i === index);
    });
  }

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      current = index;
      showSlide(current);
    });
  });

  // Disable auto-slide (manual only)
});
